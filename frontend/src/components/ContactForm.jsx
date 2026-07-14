import { useState } from 'react';

const SERVICIOS = [
  'Obra Civil',
  'Obra Mecánica e Industrial',
  'Infraestructura Metálica',
  'Obra Eléctrica',
  'Protección Anticorrosiva',
  'Ingeniería y Proyectos',
  'Renta de Maquinaria',
  'Servicios Especializados',
];

const INITIAL_STATE = {
  nombre: '',
  empresa: '',
  correo: '',
  telefono: '',
  servicio: '',
  mensaje: '',
};

function buildText(state) {
  const lines = [
    'Solicitud de contacto — GR Cárdenas Construcciones',
    '',
    'Nombre: ' + (state.nombre || '—'),
    state.empresa ? 'Empresa: ' + state.empresa : null,
    state.correo ? 'Correo: ' + state.correo : null,
    state.telefono ? 'Teléfono: ' + state.telefono : null,
    'Servicio de interés: ' + (state.servicio || 'General'),
    '',
    'Mensaje:',
    state.mensaje || '—',
  ].filter(Boolean);
  return lines.join('\n');
}

export default function ContactForm() {
  const [form, setForm] = useState(INITIAL_STATE);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const onChange = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await fetch('/api/contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setStatus('sent');
    } catch {
      setStatus('error');
    }
    const url = 'https://wa.me/2291863819?text=' + encodeURIComponent(buildText(form));
    window.open(url, '_blank', 'noopener');
  };

  const mail = () => {
    const subject = encodeURIComponent('Solicitud de contacto — ' + (form.servicio || 'General'));
    const body = encodeURIComponent(buildText(form));
    window.location.href = 'mailto:contacto@grcardenasconstrucciones.com?subject=' + subject + '&body=' + body;
  };

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div className="form-field">
        <label htmlFor="c-nombre" className="form-label">Nombre *</label>
        <input
          className="form-input"
          id="c-nombre"
          type="text"
          required
          value={form.nombre}
          onChange={onChange('nombre')}
          placeholder="Tu nombre"
        />
      </div>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="c-empresa" className="form-label">Empresa</label>
          <input
            className="form-input"
            id="c-empresa"
            type="text"
            value={form.empresa}
            onChange={onChange('empresa')}
            placeholder="Opcional"
          />
        </div>
        <div className="form-field">
          <label htmlFor="c-tel" className="form-label">Teléfono</label>
          <input
            className="form-input"
            id="c-tel"
            type="tel"
            value={form.telefono}
            onChange={onChange('telefono')}
            placeholder="+52 ..."
          />
        </div>
      </div>
      <div className="form-field">
        <label htmlFor="c-correo" className="form-label">Correo</label>
        <input
          className="form-input"
          id="c-correo"
          type="email"
          value={form.correo}
          onChange={onChange('correo')}
          placeholder="tu@correo.com"
        />
      </div>
      <div className="form-field">
        <label htmlFor="c-serv" className="form-label">Servicio de interés</label>
        <select className="form-input" id="c-serv" value={form.servicio} onChange={onChange('servicio')}>
          <option value="">Selecciona una opción</option>
          {SERVICIOS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      <div className="form-field">
        <label htmlFor="c-msg" className="form-label">Mensaje *</label>
        <textarea
          className="form-input"
          id="c-msg"
          required
          rows={4}
          value={form.mensaje}
          onChange={onChange('mensaje')}
          placeholder="Describe tu proyecto, ubicación y alcance."
        />
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 6 }}>
        <button
          type="submit"
          className="btn btn-dark"
          style={{ flex: 1, minWidth: 200 }}
          disabled={status === 'sending'}
        >
          {status === 'sending' ? 'Enviando…' : 'Enviar por WhatsApp'} <span aria-hidden="true">→</span>
        </button>
        <button type="button" onClick={mail} className="btn btn-outline-dark" style={{ flex: 1, minWidth: 180, border: '2px solid #000' }}>
          Enviar por correo
        </button>
      </div>
      <p style={{ margin: 0, fontSize: '.82rem', color: 'rgba(0,0,0,.55)' }}>
        Al enviar este formulario aceptas el tratamiento de tus datos conforme a nuestro{' '}
        <a href="/aviso-de-privacidad" style={{ textDecoration: 'underline' }}>Aviso de Privacidad</a>.
      </p>
      {status === 'sent' && (
        <p style={{ margin: 0, fontSize: '.9rem', color: 'rgba(0,0,0,.65)' }}>
          Tu solicitud se registró correctamente. Se abrió WhatsApp para que la envíes.
        </p>
      )}
      {status === 'error' && (
        <p style={{ margin: 0, fontSize: '.9rem', color: 'rgba(0,0,0,.65)' }}>
          No pudimos registrar la solicitud en el servidor, pero puedes continuar por
          WhatsApp o correo.
        </p>
      )}
    </form>
  );
}
