import express from 'express';
import { createClient } from '@libsql/client';
import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

const app = express();
app.disable('x-powered-by');
app.set('trust proxy', 1);
app.use((req, res, next) => {
  if (req.path !== '/api/index') return next();
  const route = req.query.route;
  if (typeof route !== 'string' || !/^\/(health|enroll|card\/[a-f0-9]{32}|staff\/(login|logout|me|cards|stamp|redeem))$/.test(route)) {
    return res.status(404).json({ error: 'Ruta no encontrada.' });
  }
  req.url = `/api${route}`;
  next();
});
app.use(express.json({ limit: '12kb' }));

const databaseUrl = process.env.TURSO_DATABASE_URL || 'file:local.sqlite';
const db = createClient({ url: databaseUrl, authToken: process.env.TURSO_AUTH_TOKEN || undefined });
const storageConfigured = !process.env.VERCEL || (databaseUrl.startsWith('libsql://') && Boolean(process.env.TURSO_AUTH_TOKEN));
let ready;

function init() {
  if (!ready) {
    ready = db.batch([
      `CREATE TABLE IF NOT EXISTS cards (
        id TEXT PRIMARY KEY, business_id TEXT NOT NULL, name TEXT NOT NULL,
        phone TEXT NOT NULL, stamps INTEGER NOT NULL DEFAULT 1,
        rewards INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL, UNIQUE (business_id, phone)
      )`,
      `CREATE TABLE IF NOT EXISTS events (
        id TEXT PRIMARY KEY, card_id TEXT NOT NULL, kind TEXT NOT NULL,
        created_at TEXT NOT NULL, note TEXT NOT NULL DEFAULT '',
        FOREIGN KEY (card_id) REFERENCES cards(id)
      )`,
      `CREATE TABLE IF NOT EXISTS login_attempts (
        id TEXT PRIMARY KEY, count INTEGER NOT NULL, reset_at INTEGER NOT NULL
      )`,
    ], 'write');
  }
  return ready;
}

const now = () => new Date().toISOString();
const id = () => randomBytes(16).toString('hex');
const cleanPhone = (value) => String(value || '').replace(/\D/g, '');
const validName = (value) => typeof value === 'string' && value.trim().length >= 2 && value.trim().length <= 80;
const pin = process.env.STAFF_PIN;
const secret = process.env.SESSION_SECRET;

app.use('/api', (_req, res, next) => storageConfigured ? next() : res.status(503).json({ error: 'Falta conectar la base de datos compartida.' }));

function same(a, b) {
  const left = Buffer.from(String(a || ''));
  const right = Buffer.from(String(b || ''));
  return left.length === right.length && timingSafeEqual(left, right);
}

function makeSession() {
  const payload = Buffer.from(JSON.stringify({ exp: Date.now() + 24 * 60 * 60 * 1000 })).toString('base64url');
  return `${payload}.${createHmac('sha256', secret).update(payload).digest('base64url')}`;
}

function staffOnly(req, res, next) {
  if (!secret || !pin) return res.status(503).json({ error: 'El acceso de personal aún no está configurado.' });
  const token = /(?:^|;\s*)pitdev_staff=([^;]+)/.exec(req.headers.cookie || '')?.[1];
  const [payload, signature] = (token || '').split('.');
  if (!payload || !signature || !same(signature, createHmac('sha256', secret).update(payload).digest('base64url'))) {
    return res.status(401).json({ error: 'Iniciá sesión como personal para continuar.' });
  }
  try {
    if (JSON.parse(Buffer.from(payload, 'base64url').toString()).exp > Date.now()) return next();
  } catch { /* Invalid session. */ }
  return res.status(401).json({ error: 'La sesión venció. Iniciá sesión de nuevo.' });
}

function sendCard(card) {
  return {
    id: card.id, name: card.name, stamps: Number(card.stamps),
    rewards: Number(card.rewards), createdAt: card.created_at,
    updatedAt: card.updated_at,
  };
}

app.get('/api/health', async (_req, res, next) => {
  try { await init(); res.json({ ok: true, storage: databaseUrl.startsWith('file:') ? 'local' : 'shared' }); }
  catch (error) { next(error); }
});

app.post('/api/enroll', async (req, res, next) => {
  try {
    await init();
    const name = req.body?.name;
    const phone = cleanPhone(req.body?.phone);
    if (!validName(name) || phone.length < 8 || phone.length > 15) {
      return res.status(400).json({ error: 'Ingresá tu nombre y un teléfono válido.' });
    }
    const existing = await db.execute({ sql: 'SELECT * FROM cards WHERE business_id = ? AND phone = ?', args: ['pitdev', phone] });
    if (existing.rows[0]) return res.status(409).json({ error: 'Este teléfono ya tiene una tarjeta. Pedí ayuda al negocio para recuperarla.' });
    const cardId = id();
    const date = now();
    await db.batch([
      { sql: 'INSERT INTO cards (id, business_id, name, phone, stamps, rewards, created_at, updated_at) VALUES (?, ?, ?, ?, 1, 0, ?, ?)', args: [cardId, 'pitdev', name.trim(), phone, date, date] },
      { sql: 'INSERT INTO events (id, card_id, kind, created_at, note) VALUES (?, ?, ?, ?, ?)', args: [id(), cardId, 'welcome', date, 'Primer sello por registro'] },
    ], 'write');
    res.status(201).json({ card: { id: cardId, name: name.trim(), stamps: 1, rewards: 0, createdAt: date, updatedAt: date } });
  } catch (error) { next(error); }
});

app.get('/api/card/:id', async (req, res, next) => {
  try {
    await init();
    if (!/^[a-f0-9]{32}$/.test(req.params.id)) return res.status(404).json({ error: 'Tarjeta no encontrada.' });
    const result = await db.execute({ sql: 'SELECT * FROM cards WHERE id = ? AND business_id = ?', args: [req.params.id, 'pitdev'] });
    if (!result.rows[0]) return res.status(404).json({ error: 'Tarjeta no encontrada.' });
    res.json({ card: sendCard(result.rows[0]) });
  } catch (error) { next(error); }
});

app.post('/api/staff/login', async (req, res, next) => {
  try {
    if (!secret || !pin || pin.length < 8 || secret.length < 32) return res.status(503).json({ error: 'Configurá las claves del personal antes de iniciar sesión.' });
    await init();
    const key = createHmac('sha256', secret).update(req.ip || 'unknown').digest('hex');
    const current = await db.execute({ sql: 'SELECT count, reset_at FROM login_attempts WHERE id = ?', args: [key] });
    if (current.rows[0] && Number(current.rows[0].reset_at) > Date.now() && Number(current.rows[0].count) >= 5) {
      return res.status(429).json({ error: 'Demasiados intentos. Esperá 15 minutos.' });
    }
    if (!same(req.body?.pin, pin)) {
      const reset = Date.now() + 15 * 60 * 1000;
      await db.execute({ sql: 'INSERT INTO login_attempts (id, count, reset_at) VALUES (?, 1, ?) ON CONFLICT(id) DO UPDATE SET count = CASE WHEN reset_at < ? THEN 1 ELSE count + 1 END, reset_at = CASE WHEN reset_at < ? THEN ? ELSE reset_at END', args: [key, reset, Date.now(), Date.now(), reset] });
      return res.status(401).json({ error: 'Clave incorrecta.' });
    }
    await db.execute({ sql: 'DELETE FROM login_attempts WHERE id = ?', args: [key] });
    const secure = req.secure || req.headers['x-forwarded-proto'] === 'https';
    res.setHeader('Set-Cookie', `pitdev_staff=${makeSession()}; Path=/api; HttpOnly; SameSite=Strict; Max-Age=86400${secure ? '; Secure' : ''}`);
    res.json({ ok: true });
  } catch (error) { next(error); }
});

app.post('/api/staff/logout', (_req, res) => {
  res.setHeader('Set-Cookie', 'pitdev_staff=; Path=/api; HttpOnly; SameSite=Strict; Max-Age=0');
  res.json({ ok: true });
});

app.get('/api/staff/me', staffOnly, (_req, res) => res.json({ ok: true }));

app.get('/api/staff/cards', staffOnly, async (_req, res, next) => {
  try {
    await init();
    const result = await db.execute({ sql: 'SELECT id, name, phone, stamps, rewards, updated_at FROM cards WHERE business_id = ? ORDER BY updated_at DESC LIMIT 100', args: ['pitdev'] });
    res.json({ cards: result.rows.map((row) => ({ ...sendCard(row), phone: row.phone })) });
  } catch (error) { next(error); }
});

app.post('/api/staff/stamp', staffOnly, async (req, res, next) => {
  try {
    await init();
    const cardId = req.body?.cardId;
    if (!/^[a-f0-9]{32}$/.test(cardId || '')) return res.status(400).json({ error: 'Código de tarjeta inválido.' });
    const date = now();
    const result = await db.execute({ sql: 'UPDATE cards SET stamps = stamps + 1, updated_at = ? WHERE id = ? AND business_id = ? AND stamps < 6 RETURNING *', args: [date, cardId, 'pitdev'] });
    if (!result.rows[0]) return res.status(409).json({ error: 'La tarjeta no existe o ya completó sus seis sellos.' });
    await db.execute({ sql: 'INSERT INTO events (id, card_id, kind, created_at, note) VALUES (?, ?, ?, ?, ?)', args: [id(), cardId, 'stamp', date, 'Sello agregado por personal'] });
    res.json({ card: sendCard(result.rows[0]) });
  } catch (error) { next(error); }
});

app.post('/api/staff/redeem', staffOnly, async (req, res, next) => {
  try {
    await init();
    const cardId = req.body?.cardId;
    if (!/^[a-f0-9]{32}$/.test(cardId || '')) return res.status(400).json({ error: 'Código de tarjeta inválido.' });
    const date = now();
    const result = await db.execute({ sql: 'UPDATE cards SET stamps = 0, rewards = rewards + 1, updated_at = ? WHERE id = ? AND business_id = ? AND stamps = 6 RETURNING *', args: [date, cardId, 'pitdev'] });
    if (!result.rows[0]) return res.status(409).json({ error: 'Esta tarjeta aún no tiene seis sellos.' });
    await db.execute({ sql: 'INSERT INTO events (id, card_id, kind, created_at, note) VALUES (?, ?, ?, ?, ?)', args: [id(), cardId, 'redeem', date, 'Recompensa canjeada'] });
    res.json({ card: sendCard(result.rows[0]) });
  } catch (error) { next(error); }
});

app.use('/api', (_req, res) => res.status(404).json({ error: 'Ruta no encontrada.' }));
app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ error: 'Ocurrió un error. Intentá de nuevo.' });
});

export default app;
