import React from 'react';

const NotebookIllustration = ({ className }) => {
  return (
    <svg 
      className={className}
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Sombra de la libreta */}
      <rect x="25" y="25" width="140" height="150" rx="8" fill="#16161a" />
      
      {/* Cuerpo principal de la libreta / Bloc de notas */}
      <rect x="20" y="20" width="140" height="150" rx="8" fill="#2d3748" stroke="#4a5568" strokeWidth="2" />
      
      {/* Cabecera de la libreta (Efecto canutillo/espiral superior) */}
      <rect x="20" y="20" width="140" height="24" rx="4" fill="#1a202c" />
      <circle cx="40" cy="32" r="4" fill="#4a5568" />
      <circle cx="70" cy="32" r="4" fill="#4a5568" />
      <circle cx="100" cy="32" r="4" fill="#4a5568" />
      <circle cx="130" cy="32" r="4" fill="#4a5568" />

      {/* Líneas de la libreta (Simulando renglones de anotaciones o código) */}
      <line x1="40" y1="65" x2="140" y2="65" stroke="#718096" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
      <line x1="40" y1="85" x2="120" y2="85" stroke="#718096" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
      <line x1="40" y1="105" x2="135" y2="105" stroke="#718096" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
      <line x1="40" y1="125" x2="100" y2="125" stroke="#718096" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
      <line x1="40" y1="145" x2="115" y2="145" stroke="#718096" strokeWidth="3" strokeLinecap="round" opacity="0.4" />

      {/* Ilustración de un lápiz/bolígrafo cruzado en diagonal */}
      <g transform="translate(110, 80) rotate(-15)">
        {/* Cuerpo del lápiz */}
        <rect x="0" y="0" width="12" height="70" rx="2" fill="#00ffcc" opacity="0.8" />
        {/* Punta */}
        <path d="M0 0 L6 -10 L12 0 Z" fill="#e2e8f0" />
        <path d="M4 -6 L6 -10 L8 -6 Z" fill="#1a202c" />
        {/* Goma de borrar superior */}
        <rect x="0" y="66" width="12" height="4" fill="#ff5555" />
      </g>
    </svg>
  );
};

export default NotebookIllustration;