# PitDev Club

El club vive en `/club` dentro del mismo sitio de PitDev. La carpeta contiene la interfaz independiente; el API compartido está en `../api/index.js`.

El flujo de prueba incluye registro con primer sello, QR personal, panel de personal con clave, sellos hasta seis y canje. Si la base compartida aún no está configurada, la página habilita una **simulación local**: el visitante crea una tarjeta con un nombre de prueba y suma sellos o canjea desde el mismo teléfono. Esa tarjeta no aparece en otros dispositivos; el teléfono no se solicita ni se guarda en este modo.

Los botones de Apple Wallet entregan **dos pases reales de muestra** (`/pitdev-club-demo.pkpass` y `/pitdev-club-demo-2.pkpass`). Comparten `passTypeIdentifier` y `serialNumber`; el segundo muestra 2 de 6 sellos y reemplaza al primero al agregarlo en Wallet. El QR de ambos abre el Club. No contienen el nombre ni el QR personal del visitante; los sellos de la simulación web no generan automáticamente un pase nuevo. Wallet Creator firmó la tarjeta de presentación anterior, pero su archivo no se puede modificar sin volver a firmarlo. Estos pases se emitieron con dos llamadas gratuitas a un servicio externo. Para generar un pase por cliente y sello se necesita un proveedor con API y capacidad suficiente o un certificado propio.

El arte del Club se genera con `python3 club/scripts/build_wallet_art.py`: seis estados de sellos con el emblema PitDev, en formato horizontal y en formato póster. La vista web utiliza el mismo emblema. Para reemitir los dos pases firmados de muestra con el diseño nuevo, usar `python3 club/scripts/issue_demo_passes.py --contact-email <correo-del-emisor>`; el script conserva la identidad de los pases anteriores y **solo sustituye ambos archivos si ambos se emiten y validan**. El servicio gratuito permite dos emisiones diarias y reinicia el cupo a las 00:00 UTC. En iOS 27 se muestra el arte póster; en versiones anteriores se usa la tarjeta clásica. Según la documentación de Apple, iOS 26 no muestra la imagen horizontal de las tarjetas de tienda, de modo que ahí puede verse el número de sellos sin los seis emblemas.

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
