import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { randomBytes } from 'node:crypto';

const dir = mkdtempSync(join(tmpdir(), 'pitdev-loyalty-'));
process.env.TURSO_DATABASE_URL = `file:${join(dir, 'test.sqlite')}`;
process.env.STAFF_PIN = 'test-pin-123456';
process.env.SESSION_SECRET = randomBytes(32).toString('hex');
const { default: app } = await import('../api/index.js');

test('registro, acceso de personal, sellos y canje', async () => {
  const server = app.listen(0, '127.0.0.1');
  await new Promise((resolve) => server.once('listening', resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  const call = async (path, method = 'GET', body, cookie) => {
    const response = await fetch(`${origin}/api/index?route=${encodeURIComponent(path)}`, {
      method, headers: { 'Content-Type': 'application/json', ...(cookie ? { Cookie: cookie } : {}) },
      body: body ? JSON.stringify(body) : undefined,
    });
    return { status: response.status, body: await response.json(), cookie: response.headers.get('set-cookie') };
  };
  try {
    const enrolled = await call('/enroll', 'POST', { name: 'Ana Prueba', phone: '5555 0101' });
    assert.equal(enrolled.status, 201);
    const cardId = enrolled.body.card.id;
    assert.equal(enrolled.body.card.stamps, 1);
    assert.equal((await call('/enroll', 'POST', { name: 'Ana Prueba', phone: '55550101' })).status, 409);
    assert.equal((await call('/staff/stamp', 'POST', { cardId })).status, 401);
    assert.equal((await call('/staff/login', 'POST', { pin: 'wrong-pin' })).status, 401);
    const session = await call('/staff/login', 'POST', { pin: process.env.STAFF_PIN });
    assert.equal(session.status, 200);
    const cookie = session.cookie.split(';')[0];
    for (let count = 2; count <= 6; count++) {
      const result = await call('/staff/stamp', 'POST', { cardId }, cookie);
      assert.equal(result.body.card.stamps, count);
    }
    assert.equal((await call('/staff/stamp', 'POST', { cardId }, cookie)).status, 409);
    const redeemed = await call('/staff/redeem', 'POST', { cardId }, cookie);
    assert.equal(redeemed.body.card.stamps, 0);
    assert.equal(redeemed.body.card.rewards, 1);
    assert.equal((await call('/staff/redeem', 'POST', { cardId }, cookie)).status, 409);
    const listed = await call('/staff/cards', 'GET', undefined, cookie);
    assert.equal(listed.body.cards[0].id, cardId);
  } finally {
    server.close();
    rmSync(dir, { recursive: true, force: true });
  }
});
