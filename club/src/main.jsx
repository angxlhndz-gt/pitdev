import React from 'react';
import { createRoot } from 'react-dom/client';
import { QRCodeSVG } from 'qrcode.react';
import { ArrowRight, Check, ChevronLeft, CircleHelp, Gift, LockKeyhole, LogOut, QrCode, ScanLine, ShieldCheck, Sparkles, Stamp, Ticket, X } from 'lucide-react';
import './style.css';

const storedCardKey = 'pitdev-loyalty-card-id';
const demoCardPrefix = 'pitdev-club-demo-card:';
const clubBase = '/club';
const path = window.location.pathname.replace(/^\/club(?=\/|$)/, '') || '/';

function readDemoCard(id) {
  if (!/^[a-f0-9]{32}$/.test(id || '')) return null;
  try {
    const value = JSON.parse(window.localStorage.getItem(`${demoCardPrefix}${id}`));
    return value?.id === id && Number.isInteger(value.stamps) && value.stamps >= 0 && value.stamps <= 6
      ? { ...value, demo: true }
      : null;
  } catch { return null; }
}

function saveDemoCard(card) {
  window.localStorage.setItem(`${demoCardPrefix}${card.id}`, JSON.stringify(card));
  window.localStorage.setItem(storedCardKey, card.id);
  return { ...card, demo: true };
}

function createDemoCard(name) {
  const current = window.localStorage.getItem(storedCardKey);
  if (readDemoCard(current)) return readDemoCard(current);
  const date = new Date().toISOString();
  return saveDemoCard({ id: crypto.randomUUID().replaceAll('-', ''), name: name.trim(), stamps: 1, rewards: 0, createdAt: date, updatedAt: date });
}

function changeDemoCard(id, action) {
  const card = readDemoCard(id);
  if (!card) throw new Error('Esta tarjeta de prueba solo existe en el teléfono donde se creó.');
  if (action === 'stamp' && card.stamps >= 6) throw new Error('La tarjeta ya completó sus seis sellos.');
  if (action === 'redeem' && card.stamps !== 6) throw new Error('Aún faltan sellos para canjear.');
  return saveDemoCard({ ...card, stamps: action === 'stamp' ? card.stamps + 1 : 0, rewards: action === 'redeem' ? card.rewards + 1 : card.rewards, updatedAt: new Date().toISOString() });
}

async function request(url, options = {}) {
  const response = await fetch(`/api/index?route=${encodeURIComponent(url)}`, {
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || 'No se pudo completar la solicitud.');
  return data;
}

function useCard(id) {
  const [card, setCard] = React.useState(null);
  const [error, setError] = React.useState('');
  const refresh = React.useCallback(async () => {
    if (!id) return;
    const demo = readDemoCard(id);
    if (demo) { setCard(demo); setError(''); return; }
    try { setCard((await request(`/card/${id}`)).card); setError(''); }
    catch (e) { setError(e.message); }
  }, [id]);
  React.useEffect(() => {
    refresh();
    const timer = window.setInterval(refresh, 12000);
    return () => window.clearInterval(timer);
  }, [refresh]);
  return { card, error, refresh };
}

function Brand({ dark = false }) {
  return <a className={`brand ${dark ? 'brand-dark' : ''}`} href={clubBase} aria-label="PitDev Club, inicio">
    <span className="brand-mark" aria-hidden="true"><span /><span /><span /><span /></span>
    <span>Pit<span>Dev</span><small>CLUB</small></span>
  </a>;
}

function Shell({ children, theme = 'light' }) {
  return <div className={`app-shell ${theme}`}>
    <header className="site-header"><Brand dark={theme === 'dark'} /><nav aria-label="Navegación principal"><a href={clubBase} className="header-link">Inicio</a><a href={`${clubBase}/staff`} className="header-link">Soy del negocio</a></nav></header>
    {children}
    <footer><span>Una experiencia PitDev</span><span>Tarjetas que hacen volver.</span></footer>
  </div>;
}

function StampGrid({ count, compact = false }) {
  return <div className={`stamp-grid ${compact ? 'compact' : ''}`} aria-label={`${count} de 6 sellos acumulados`}>
    {Array.from({ length: 6 }, (_, index) => <div key={index} className={`stamp-slot ${index < count ? 'filled' : ''}`} aria-label={index < count ? `Sello ${index + 1} obtenido` : `Sello ${index + 1} pendiente`}>
      {index < count ? <Check aria-hidden="true" size={compact ? 19 : 25} strokeWidth={2.6} /> : <span>{String(index + 1).padStart(2, '0')}</span>}
    </div>)}
  </div>;
}

function LoyaltyCard({ card, preview = false }) {
  const count = card?.stamps ?? 1;
  return <div className="loyalty-card">
    <div className="card-top"><span className="card-brand">PitDev <b>Club</b></span><span className="card-series">MEMBER CARD / 001</span></div>
    <div className="card-copy"><span className="card-eyebrow">TU PRÓXIMA RECOMPENSA</span><strong>6 visitas.<br /><em>1 gran gracias.</em></strong></div>
    <StampGrid count={count} compact />
    <div className="card-bottom"><span>{preview ? 'TU NOMBRE AQUÍ' : card.name}</span><span>{count === 6 ? 'LISTA PARA CANJEAR' : `${6 - count} PARA TU PREMIO`}</span></div>
    <span className="card-orbit orbit-one" /><span className="card-orbit orbit-two" />
  </div>;
}

function Welcome() {
  const saved = window.localStorage.getItem(storedCardKey);
  const [available, setAvailable] = React.useState(null);
  const [form, setForm] = React.useState({ name: '', phone: '' });
  const [error, setError] = React.useState('');
  const [busy, setBusy] = React.useState(false);
  React.useEffect(() => { request('/health').then((data) => setAvailable(data.ok === true)).catch(() => setAvailable(false)); }, []);
  async function enroll(event) {
    event.preventDefault(); setBusy(true); setError('');
    try {
      const card = available === false
        ? createDemoCard(form.name)
        : (await request('/enroll', { method: 'POST', body: JSON.stringify(form) })).card;
      window.localStorage.setItem(storedCardKey, card.id);
      window.location.assign(`${clubBase}/card/${card.id}`);
    } catch (e) { setError(e.message); setBusy(false); }
  }
  return <Shell theme="dark">
    <main>
      <section className="hero wrap">
        <div className="hero-content">
          <div className="eyebrow"><span className="eyebrow-line" /> EL CLUB DE LOS QUE VUELVEN</div>
          <h1>Cada visita<br />cuenta <span>más.</span></h1>
          <p>Una tarjeta frecuente simple: sumá sellos con cada visita y disfrutá tu recompensa al completar seis.</p>
          <div className="hero-actions"><a className="button button-light" href="#unirme">Quiero mi tarjeta <ArrowRight size={18} /></a>{saved && <a className="button button-ghost" href={`${clubBase}/card/${saved}`}>Ver mi tarjeta</a>}</div>
          <div className="hero-note"><ShieldCheck size={17} /><span>Tu primer sello te espera al registrarte.</span></div>
        </div>
        <div className="hero-visual" aria-label="Vista previa de tarjeta PitDev Club">
          <span className="visual-caption">UNA TARJETA, MUCHAS VISITAS</span><div className="visual-card"><LoyaltyCard preview /></div><span className="visual-index">01 / 06</span>
        </div>
      </section>
      <section className="steps" aria-labelledby="steps-heading"><div className="wrap"><div className="section-heading"><span className="eyebrow">ASÍ DE FÁCIL</span><h2 id="steps-heading">Tu rutina, con recompensa.</h2></div><div className="step-grid">
        <article><span className="step-icon"><Ticket size={23} /></span><b>01</b><h3>Registrate</h3><p>{available === false ? 'Usá un nombre de prueba. Tu tarjeta nace con el primer sello en este teléfono.' : 'Dejá tu nombre y teléfono. Tu tarjeta nace con el primer sello.'}</p></article>
        <article><span className="step-icon"><QrCode size={23} /></span><b>02</b><h3>Mostrá tu código</h3><p>{available === false ? 'Probá el QR y simulá las siguientes visitas desde tu tarjeta.' : 'En cada visita, el negocio escanea tu código personal y suma un sello.'}</p></article>
        <article><span className="step-icon"><Gift size={23} /></span><b>03</b><h3>Canjeá tu premio</h3><p>{available === false ? 'Al llegar a seis sellos, podés simular el canje.' : 'Al completar los seis sellos, tu recompensa está lista para usar.'}</p></article>
      </div></div></section>
      <section className="join-section wrap" id="unirme">
        <div className="join-intro">
          <span className="eyebrow">EMPEZÁ HOY</span>
          <h2>Tu primera visita<br /><i>ya suma.</i></h2>
          <p>Creá tu tarjeta en menos de un minuto. La vas a poder consultar desde este teléfono.</p>
          <div className="join-stat"><span>01</span><span>SELLO DE BIENVENIDA<br />INCLUIDO</span></div>
        </div>
        <form className="join-form" onSubmit={enroll} aria-labelledby="form-heading" action="/api/index?route=%2Fenroll" method="post">
          <div className="form-top"><Sparkles size={24} /><h3 id="form-heading">Crear mi tarjeta</h3><p>Solo necesitamos estos datos para identificarla.</p></div>
          {available === false && <p className="demo-banner" role="status">Modo demostración: tu nombre y tus sellos se guardarán solo en este teléfono. No se compartirán con el negocio.</p>}
          <label htmlFor="name">{available === false ? 'Nombre de prueba' : 'Nombre y apellido'} <span aria-hidden="true">*</span></label>
          <input id="name" name="name" autoComplete={available === false ? 'off' : 'name'} required minLength={2} maxLength={80} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder={available === false ? 'Ej. Cliente demo' : 'Ej. Andrea López'} />
          {available !== false && <>
            <label htmlFor="phone">Teléfono <span aria-hidden="true">*</span></label>
            <input id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" required minLength={8} maxLength={20} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Ej. 5555 1234" />
          </>}
          <p className="form-help">{available === false ? 'Usá un nombre inventado. No hace falta ingresar tu teléfono.' : 'Usaremos tu número para identificar tu tarjeta. Esta demo no envía promociones.'}</p>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="button button-accent full" disabled={busy || available === null}>{busy ? 'Creando tarjeta…' : <>Crear mi tarjeta <ArrowRight size={18} /></>}</button>
        </form>
      </section>
    </main>
  </Shell>;
}

function CardPage({ id }) {
  const { card, error, refresh } = useCard(id);
  React.useEffect(() => { if (card) window.localStorage.setItem(storedCardKey, id); }, [card, id]);
  const scanUrl = `${window.location.origin}${clubBase}/scan/${id}`;
  return <Shell><main className="card-page wrap">
    <a className="back-link" href={clubBase}><ChevronLeft size={17} /> Volver al inicio</a>
    <div className="card-page-grid">
      <div>
        <span className="eyebrow">TU TARJETA FRECUENTE</span>
        <h1>Hola, <span>{card?.name?.split(' ')[0] || 'bienvenido'}.</span></h1>
        <p className="page-lead">Cada visita te acerca un poco más a tu recompensa.</p>
        {card && <>
          <LoyaltyCard card={card} />
          <div className="progress-copy"><span>{card.stamps === 6 ? '¡Tu recompensa está lista!' : `${6 - card.stamps} sellos para tu recompensa`}</span><button type="button" onClick={refresh}>Actualizar tarjeta</button></div>
          {card.demo && <div className="demo-controls">
            <b>Probá cómo funcionan los sellos</b>
            <p>Esta es una simulación en tu teléfono. Para sumar sellos desde otro celular necesitaremos la base compartida.</p>
            <button type="button" className="button button-dark" onClick={() => { changeDemoCard(id, card.stamps === 6 ? 'redeem' : 'stamp'); refresh(); }}>
              {card.stamps === 6 ? <><Gift size={18} /> Simular canje</> : <><Stamp size={18} /> Simular siguiente visita</>}
            </button>
          </div>}
        </>}
      </div>
      <aside className="qr-panel">
        <span className="eyebrow">TU CÓDIGO PERSONAL</span>
        <h2>{card?.demo ? 'Así se verá tu QR.' : 'Mostralo al visitar el negocio.'}</h2>
        <p>{card?.demo ? 'En esta prueba, el QR solo encuentra tu tarjeta en este teléfono. Aún no funciona entre teléfonos distintos.' : 'El personal escanea este código para sumar tu próximo sello. Podés abrir esta página cuando quieras.'}</p>
        {card && <div className="qr-frame"><QRCodeSVG value={scanUrl} size={208} marginSize={1} bgColor="#ffffff" fgColor="#12212a" /><span>Tarjeta #{id.slice(0, 8).toUpperCase()}</span></div>}
        <div className="panel-tip"><CircleHelp size={20} /><span>Tu saldo se guarda en {card?.demo ? 'este teléfono' : 'el sistema'}, no dentro del código QR.</span></div>
      </aside>
    </div>
    {error && <p className="form-error" role="alert">{error}</p>}
    <div className="wallet-note"><Stamp size={21} /><div><b>Vista web de la tarjeta</b><p>La integración para agregarla a Apple Wallet se habilitará cuando definamos un proveedor que permita crear tarjetas personalizadas sin costo fijo.</p></div></div>
  </main></Shell>;
}

function parseCardId(value) {
  const match = String(value || '').match(/(?:^|\/scan\/|\/card\/)([a-f0-9]{32})(?:$|[?#/])/i);
  return match?.[1]?.toLowerCase() || '';
}

function DemoStaffPage({ initialId }) {
  const id = initialId || window.localStorage.getItem(storedCardKey);
  const { card, refresh } = useCard(id);
  const [notice, setNotice] = React.useState('');
  function simulate(action) {
    try { changeDemoCard(id, action); refresh(); setNotice(action === 'stamp' ? 'Sello de prueba agregado.' : 'Canje de prueba completado.'); }
    catch (error) { setNotice(error.message); }
  }
  return <Shell><main className="staff-page wrap">
    <div className="staff-heading"><div><span className="eyebrow">MODO DEMOSTRACIÓN</span><h1>Simular una visita.</h1><p>Este panel usa únicamente la tarjeta guardada en este teléfono.</p></div></div>
    {card?.demo ? <section className="staff-card demo-staff-card">
      <span className="eyebrow">TARJETA DE PRUEBA</span><h2>{card.name}</h2>
      <StampGrid count={card.stamps} />
      <div className="result-progress"><strong>{card.stamps} de 6</strong><span>sellos acumulados</span></div>
      <button type="button" className="button button-accent full" onClick={() => simulate(card.stamps === 6 ? 'redeem' : 'stamp')}>
        {card.stamps === 6 ? <><Gift size={18} /> Simular canje</> : <><Stamp size={18} /> Sumar sello de prueba</>}
      </button>
      {notice && <p role="status" className="demo-status">{notice}</p>}
      <p className="fine-print">Para que un negocio escanee la tarjeta desde otro dispositivo necesitamos conectar una base compartida.</p>
    </section> : <section className="staff-card demo-staff-card"><h2>Esta tarjeta no está en este teléfono.</h2><p>Las tarjetas de prueba solo se guardan en el dispositivo donde se crean.</p><a href={clubBase} className="button button-dark">Crear tarjeta de prueba <ArrowRight size={18} /></a></section>}
  </main></Shell>;
}

function StaffPage({ initialId = '' }) {
  const [logged, setLogged] = React.useState(false);
  const [demoOnly, setDemoOnly] = React.useState(false);
  const [pin, setPin] = React.useState('');
  const [lookup, setLookup] = React.useState(initialId);
  const [selected, setSelected] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');
  const [busy, setBusy] = React.useState(false);
  const [scanning, setScanning] = React.useState(false);
  const scanner = React.useRef(null);

  React.useEffect(() => { request('/health').then((data) => setDemoOnly(data.ok !== true)).catch(() => setDemoOnly(true)); }, []);
  React.useEffect(() => { request('/staff/me').then(() => setLogged(true)).catch(() => {}); }, []);
  React.useEffect(() => { if (logged) request('/staff/cards').then((data) => setCards(data.cards)).catch(() => {}); }, [logged]);
  React.useEffect(() => { if (logged && initialId) loadCard(initialId); }, [logged, initialId]);
  React.useEffect(() => () => { scanner.current?.stop().catch(() => {}); }, []);

  async function login(event) {
    event.preventDefault(); setBusy(true); setError('');
    try { await request('/staff/login', { method: 'POST', body: JSON.stringify({ pin }) }); setLogged(true); setPin(''); }
    catch (e) { setError(e.message); }
    finally { setBusy(false); }
  }
  async function loadCard(value) {
    const cardId = parseCardId(value);
    if (!cardId) { setError('Ingresá un código de tarjeta válido.'); return; }
    try { const data = await request(`/card/${cardId}`); setSelected(data.card); setLookup(cardId); setError(''); setSuccess(''); }
    catch (e) { setError(e.message); }
  }
  async function change(kind) {
    if (!selected) return;
    setBusy(true); setError(''); setSuccess('');
    try {
      const data = await request(`/staff/${kind}`, { method: 'POST', body: JSON.stringify({ cardId: selected.id }) });
      setSelected(data.card);
      setSuccess(kind === 'stamp' ? 'Sello agregado correctamente.' : 'Recompensa canjeada correctamente.');
      const list = await request('/staff/cards'); setCards(list.cards);
    } catch (e) { setError(e.message); }
    finally { setBusy(false); }
  }
  async function startScan() {
    setError('');
    try {
      const { Html5Qrcode } = await import('html5-qrcode');
      const reader = new Html5Qrcode('qr-reader'); scanner.current = reader;
      setScanning(true);
      await reader.start({ facingMode: 'environment' }, { fps: 10, qrbox: { width: 220, height: 220 } }, async (decoded) => {
        await reader.stop(); setScanning(false); await loadCard(decoded);
      }, () => {});
    } catch { setScanning(false); setError('No se pudo abrir la cámara. Revisá el permiso o ingresá el código manualmente.'); }
  }
  async function stopScan() { await scanner.current?.stop().catch(() => {}); setScanning(false); }
  async function logout() { await request('/staff/logout', { method: 'POST' }); setLogged(false); setSelected(null); }

  if (demoOnly) return <DemoStaffPage initialId={initialId} />;

  return <Shell><main className="staff-page wrap"><div className="staff-heading"><div><span className="eyebrow">PANEL DEL NEGOCIO</span><h1>Registrar visitas.</h1><p>Escaneá una tarjeta y sumá un sello. Cada movimiento queda guardado.</p></div>{logged && <button type="button" className="text-button" onClick={logout}><LogOut size={17} /> Cerrar sesión</button>}</div>
    {!logged ? <form className="staff-login" onSubmit={login} aria-labelledby="login-heading" action="/api/staff/login" method="post"><div className="staff-login-icon"><LockKeyhole size={25} /></div><h2 id="login-heading">Acceso para el personal</h2><p>Ingresá la clave del negocio para gestionar las tarjetas.</p><label htmlFor="staff-pin">Clave de acceso</label><input id="staff-pin" name="pin" type="password" autoComplete="current-password" required minLength={8} value={pin} onChange={(e) => setPin(e.target.value)} /><button className="button button-dark full" disabled={busy}>{busy ? 'Entrando…' : 'Entrar al panel'}</button>{error && <p className="form-error" role="alert">{error}</p>}</form> : <div className="staff-grid"><section className="staff-card"><div className="section-icon"><ScanLine size={24} /></div><h2>Buscar una tarjeta</h2><p>Usá la cámara del teléfono o ingresá el código que muestra el cliente.</p><div id="qr-reader" className={scanning ? 'scanner-active' : 'scanner-idle'} />{scanning ? <button type="button" className="button button-outline full" onClick={stopScan}>Cerrar cámara</button> : <button type="button" className="button button-dark full" onClick={startScan}><ScanLine size={18} /> Escanear QR</button>}<div className="divider"><span>O INGRESAR CÓDIGO</span></div><form onSubmit={(event) => { event.preventDefault(); loadCard(lookup); }}><label htmlFor="card-code">Código o enlace de la tarjeta</label><div className="inline-form"><input id="card-code" name="card-code" value={lookup} onChange={(e) => setLookup(e.target.value)} placeholder="Pegá el enlace aquí" /><button type="submit" className="button button-accent">Buscar</button></div></form></section>
      <section className="staff-card result-card">{selected ? <><span className="eyebrow">TARJETA ENCONTRADA</span><h2>{selected.name}</h2><p>Tarjeta #{selected.id.slice(0, 8).toUpperCase()}</p><StampGrid count={selected.stamps} /><div className="result-progress"><strong>{selected.stamps} de 6</strong><span>sellos acumulados</span></div><button type="button" className="button button-accent full" disabled={busy || selected.stamps === 6} onClick={() => change('stamp')}><Stamp size={18} /> {selected.stamps === 6 ? 'Tarjeta completa' : 'Agregar un sello'}</button>{selected.stamps === 6 && <button type="button" className="button button-dark full" disabled={busy} onClick={() => change('redeem')}><Gift size={18} /> Canjear recompensa</button>}<p className="fine-print">Confirmá una compra o visita válida antes de sumar el sello.</p></> : <div className="empty-state"><span><QrCode size={34} /></span><h2>Lista para escanear</h2><p>La tarjeta del cliente aparecerá aquí para que confirmés su próximo sello.</p></div>}</section>
      <section className="staff-card roster"><div className="roster-heading"><div><span className="eyebrow">ACTIVIDAD DEL CLUB</span><h2>Tarjetas recientes</h2></div><span className="count-pill">{cards.length}</span></div>{cards.length === 0 ? <p className="muted">Todavía no hay tarjetas registradas.</p> : <div className="roster-list">{cards.map((card) => <button type="button" key={card.id} onClick={() => loadCard(card.id)}><span className="avatar">{card.name.slice(0, 1).toUpperCase()}</span><span className="roster-name"><b>{card.name}</b><small>{card.phone}</small></span><span className="roster-count">{card.stamps}/6 <ArrowRight size={15} /></span></button>)}</div>}</section></div>}
    {success && <div className="toast success" role="status"><Check size={19} />{success}<button type="button" aria-label="Cerrar aviso" onClick={() => setSuccess('')}><X size={17} /></button></div>}{error && logged && <div className="toast error" role="alert">{error}<button type="button" aria-label="Cerrar error" onClick={() => setError('')}><X size={17} /></button></div>}
  </main></Shell>;
}

function App() {
  if (path.startsWith('/card/')) return <CardPage id={path.split('/')[2]} />;
  if (path.startsWith('/scan/')) return <StaffPage initialId={path.split('/')[2]} />;
  if (path === '/staff') return <StaffPage />;
  return <Welcome />;
}

createRoot(document.getElementById('root')).render(<App />);
