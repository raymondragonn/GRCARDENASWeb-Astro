# GR-CARDENAS-WEBSITE

Sitio web de GR Cárdenas Construcciones, S.A. de C.V. — importado desde el proyecto de diseño
[GR Cárdenas Construcciones](https://claude.ai/design/p/65eaa1d4-b005-4b85-9950-25b2a2edaa67) en
Claude Design e implementado como una aplicación React (frontend) + PHP (backend).

## Estructura

```
GR-CARDENAS-WEBSITE/
├── frontend/          React + Vite + React Router
│   └── src/
│       ├── components/   Header.jsx y Footer.jsx (compartidos en todas las páginas)
│       ├── pages/        Inicio, Nosotros, Servicios, Renta, Experiencia, Practicas, Contacto
│       └── styles/       global.css — sistema de diseño (negro/blanco, Anton/Oswald/Archivo)
└── backend/
    └── php/
        ├── api/contact.php   Endpoint del formulario de contacto
        ├── config/config.php
        └── index.php
```

## Páginas y rutas

| Página original | Ruta en el sitio |
|---|---|
| Inicio.dc.html | `/` |
| Nosotros.dc.html | `/nosotros` |
| Servicios.dc.html | `/servicios` |
| Renta.dc.html | `/renta` |
| Experiencia.dc.html | `/experiencia` |
| Practicas.dc.html | `/practicas` |
| Contacto.dc.html | `/contacto` |

Header y Footer (de Header.dc.html / Footer.dc.html) se implementaron como componentes
compartidos (`src/components/Header.jsx` y `Footer.jsx`) que se incluyen una sola vez en
`App.jsx` y envuelven todas las rutas — no están duplicados por página.

## Cómo correr el frontend

```bash
cd frontend
npm install
npm run dev
```

Abre `http://localhost:5173`. El dev server de Vite hace proxy de `/api/*` hacia
`http://localhost:8000` (el backend PHP).

## Cómo correr el backend

Requiere PHP 8+.

```bash
cd backend/php
php -S localhost:8000
```

El formulario de contacto envía un `POST` a `/api/contact.php` con el JSON del formulario.
El endpoint valida los campos, guarda un registro en `backend/php/storage/contact-log.jsonl`
y trata de enviar un correo con `mail()` a la dirección configurada en
`backend/php/config/config.php`. Ajusta `contact_to_email` / `contact_from_email` según el
correo corporativo real, y configura un transporte SMTP en el servidor de producción para que
`mail()` funcione (en local normalmente no hay MTA configurado, así que el registro en el log
sirve como respaldo).

## Notas de diseño

- Paleta monocromática negro (`#000`) / blanco (`#fff`), con tipografías Anton (títulos
  grandes), Oswald (encabezados, etiquetas, navegación) y Archivo (cuerpo de texto).
- El botón flotante de WhatsApp y el formulario de contacto reproducen el comportamiento del
  diseño original (envío por WhatsApp con el mensaje prellenado, o por correo vía `mailto:`).
- Los espacios marcados como "Foto de obra" son placeholders — deben sustituirse por
  fotografía real de la empresa antes de publicar el sitio (ver
  `uploads/brief_nuevo_sitio_grcardenas.md` del proyecto de diseño para detalles del brief).
# GRCARDENASWeb-Astro
