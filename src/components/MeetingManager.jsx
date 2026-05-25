import { useState } from 'react';
import '../index.css';

const MeetingManager = ({ meetings, onUpdatePoints, onAddSlot, onUpdateSlot, onDelete, onSync }) => {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  // Estado para controlar qué reunión está abierta (guarda el ID de la reunión)
  const [expandedMeetingId, setExpandedMeetingId] = useState(null);

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  // Filtros de reuniones pasadas y futuras
  const activeMeetings = meetings
    .filter((mtg) => {
      if (!mtg.date) return true;
      return new Date(mtg.date) >= hoy;
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const pastMeetings = meetings
    .filter((mtg) => {
      if (!mtg.date) return false;
      return new Date(mtg.date) < hoy;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  // Función para alternar el acordeón
  const toggleAccordion = (id) => {
    setExpandedMeetingId(prevId => (prevId === id ? null : id));
  };

  return (
    <div className="meeting-section-container">
      <div className="mtg-header-container">
        <h3 className="task-section-title mtg-title-main">REUNIONES Y SEGUIMIENTOS</h3>
        <button onClick={() => setIsHistoryOpen(true)} className="btn-history-trigger">
          ⏱️ HISTORIAL
        </button>
      </div>

      {activeMeetings.length === 0 && (
        <p style={{ opacity: 0.3, textAlign: 'center', padding: '20px 0' }}>SIN PLANIFICACIÓN ACTIVA</p>
      )}

      {/* Renderizado de Activas */}
      {activeMeetings.map((mtg) => {
        const isExpanded = expandedMeetingId === mtg.id;

        return (
          <div key={mtg.id} className="meeting-full-card">
            
            {/* Cabecera interactiva para abrir/cerrar */}
            <div className="meeting-card-header" onClick={() => toggleAccordion(mtg.id)}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {/* Icono indicador que rota mediante CSS */}
                <span className={`mtg-expand-icon ${isExpanded ? 'rotated' : ''}`}>▶</span>
                <div>
                  <span className="mtg-id">{mtg.id}</span>
                  <h4 className="mtg-title" style={{ display: 'inline-block', marginLeft: '10px', margin: 0 }}>
                    {mtg.title}
                  </h4>
                </div>
              </div>
              <div className="mtg-meta" onClick={(e) => e.stopPropagation()}>
                <span className="mtg-date">{new Date(mtg.date).toLocaleDateString()}</span>
                <button className="btn-delete-mtg" onClick={() => onDelete(mtg.id)}>CATALOGAR</button>
              </div>
            </div>

            {/* Contenedor del Acordeón controlado por clases de CSS */}
            <div className={`meeting-card-accordion-content ${isExpanded ? 'expanded' : ''}`}>
              <div className="accordion-inner-wrapper">
                
                {/* Bloque de Slots e Inputs */}
                <div className="mtg-slots-container">
                  {mtg.slots.map((slot) => (
                    <div key={slot.id} className="mtg-quick-row">
                      <input
                        className="mtg-line-input"
                        placeholder="Punto a tratar..."
                        value={slot.point}
                        onChange={(e) => onUpdateSlot(mtg.id, slot.id, 'point', e.target.value)}
                        onBlur={() => onSync(mtg.id)}
                      />
                      <input
                        className="mtg-line-input highlight-input"
                        placeholder="Conclusión..."
                        value={slot.conclusion}
                        onChange={(e) => onUpdateSlot(mtg.id, slot.id, 'conclusion', e.target.value)}
                        onBlur={() => onSync(mtg.id)}
                      />
                    </div>
                  ))}

                  <button className="btn-add-slot" onClick={() => onAddSlot(mtg.id)}>
                    + AÑADIR_PUNTO_Y_CONCLUSIÓN
                  </button>
                </div>

                {/* Bloque de Textarea de Agenda */}
                <div className="meeting-card-body">
                  <label className="form-label">AGENDA Y PUNTOS DE SEGUIMIENTO</label>
                  <textarea
                    className="mtg-textarea"
                    placeholder="Escribe los detalles..."
                    value={mtg.points || ''}
                    onChange={(e) => onUpdatePoints(mtg.id, e.target.value)}
                    onBlur={() => onSync(mtg.id)}
                  />
                </div>

              </div>
            </div>

          </div>
        );
      })}

      {isHistoryOpen && (
        <>
          <div onClick={() => setIsHistoryOpen(false)} className="drawer-backdrop" />

          <div className="drawer-sidebar">
            <div className="drawer-header">
              <h4 className="drawer-title">🗄️ HISTORIAL DE REUNIONES</h4>
              <button onClick={() => setIsHistoryOpen(false)} className="btn-drawer-close">×</button>
            </div>

            <div className="drawer-content-list">
              {pastMeetings.length === 0 ? (
                <p className="drawer-empty-state">NO HAY REGISTROS PASADOS</p>
              ) : (
                pastMeetings.map((mtg) => (
                  <div key={mtg.id} className="history-card">
                    <div className="history-card-meta">
                      <span>{new Date(mtg.date).toLocaleDateString()}</span>
                      <span className="history-card-meta-id">{mtg.id}</span>
                    </div>

                    <h5 className="history-card-title">{mtg.title}</h5>
                    
                    {mtg.slots && mtg.slots.length > 0 && (
                      <div className="history-card-slots">
                        {mtg.slots.map((s, idx) => (
                          <div key={s.id || idx} className="history-slot-item">
                            • <strong>{s.point || 'Punto sin especificar'}:</strong>{' '}
                            <span className="history-slot-conclusion">{s.conclusion || 'Sin conclusión'}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {mtg.points && (
                      <div className="history-card-notes">
                        {mtg.points}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MeetingManager;