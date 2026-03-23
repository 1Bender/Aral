import React from 'react';
import '../index.css'

const MeetingManager = ({ meetings, onUpdatePoints, onAddSlot, onUpdateSlot, onDelete, onSync }) => {
  const sortedMeetings = [...meetings].sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="meeting-section-container">
      <h3 className="task-section-title">REUNIONES Y SEGUIMIENTOS</h3>
      {meetings.length === 0 && <p style={{ opacity: 0.3, textAlign: 'center' }}>SIN PLANIFICACIÓN</p>}

      {sortedMeetings.map((mtg) => (
        <div key={mtg.id} className="meeting-full-card">
          <div className="meeting-card-header">
            <div>
              <span className="mtg-id">{mtg.id}</span>
              <h4 className="mtg-title">{mtg.title}</h4>
            </div>
            <div className="mtg-meta">
              <span className="mtg-date">{new Date(mtg.date).toLocaleDateString()}</span>
              <button className="btn-delete-mtg" onClick={() => onDelete(mtg.id)}>CATALOGAR</button>
            </div>
          </div>

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
      ))}
    </div>
  );
};

export default MeetingManager;