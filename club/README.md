# PitDev Club

El club vive en `/club` dentro del mismo sitio de PitDev. La carpeta contiene la interfaz independiente; el API compartido está en `../api/index.js`.

El flujo de prueba incluye registro con primer sello, QR personal, panel de personal con clave, sellos hasta seis y canje. La tarjeta es una **vista web**: aún no se emite un archivo Apple Wallet, ya que el servicio gratuito anterior no tiene una API de personalización confirmada.

## Compilar y comprobar

Desde la raíz del sitio:

```bash
npm install
npm run test:club
npm run build
```

La compilación genera `public/club` temporalmente y luego lo incluye en `dist/club` junto con la web actual.

## Configuración para publicar el registro

En Vercel se necesitan estas variables del servidor:

- `TURSO_DATABASE_URL`: URL `libsql://...` de una base Turso/libSQL compartida.
- `TURSO_AUTH_TOKEN`: token de acceso a esa base.
- `STAFF_PIN`: clave para personal, mínimo ocho caracteres.
- `SESSION_SECRET`: secreto aleatorio, mínimo 32 caracteres.

Sin base compartida, el API responde 503 en Vercel: así evitamos guardar sellos en un archivo temporal que pueda perderse. La base local se usa solo para desarrollo y pruebas.

Antes de venderlo a locales faltan verificación de teléfono, recuperación de tarjeta, administración por negocio y un proveedor que firme y emita tarjetas Apple Wallet personalizadas. No se envían promociones en esta versión.
