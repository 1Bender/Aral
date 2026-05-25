import React from 'react';

const AralLogo = ({ className }) => {
  return (
    <svg 
      className={className}
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Nivel Externo: Hexágono o contenedor del sistema */}
      <path 
        d="M50 10 L85 30 L85 70 L50 90 L15 70 L15 30 Z" 
        stroke="currentColor" 
        strokeWidth="4" 
        strokeLinejoin="round" 
        opacity="0.3"
      />
      
      {/* Nodos de infraestructura conectados */}
      <circle cx="50" cy="15" r="5" fill="var(--accent)" />
      <circle cx="85" cy="35" r="5" fill="var(--accent)" />
      <circle cx="85" cy="65" r="5" fill="var(--accent)" />
      <circle cx="50" cy="85" r="5" fill="var(--accent)" />
      <circle cx="15" cy="65" r="5" fill="var(--accent)" />
      <circle cx="15" cy="35" r="5" fill="var(--accent)" />

      {/* Líneas de bus de datos hacia el núcleo */}
      <line x1="50" y1="20" x2="50" y2="38" stroke="var(--accent)" strokeWidth="3" opacity="0.5" />
      <line x1="15" y1="35" x2="35" y2="45" stroke="var(--accent)" strokeWidth="3" opacity="0.5" />
      <line x1="15" y1="65" x2="35" y2="55" stroke="var(--accent)" strokeWidth="3" opacity="0.5" />
      <line x1="85" y1="35" x2="65" y2="45" stroke="var(--accent)" strokeWidth="3" opacity="0.5" />
      <line x1="85" y1="65" x2="65" y2="55" stroke="var(--accent)" strokeWidth="3" opacity="0.5" />

      {/* Núcleo Central del Sistema (Simulando actividad/procesamiento) */}
      <circle 
        cx="50" 
        cy="50" 
        r="12" 
        fill="var(--accent)" 
        className="aral-core-pulse" 
      />
    </svg>
  );
};

export default AralLogo;