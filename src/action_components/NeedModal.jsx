import React, { useState } from 'react';
import './ActionStyles.css';

const NeedModal = ({ isOpen, onClose, onSave, personnel }) => {
  const [need, setNeed] = useState({
    content: '',
    tag: 'GENERAL',
    type: 'general',
    assignedTo: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(need);
    setNeed({ content: '', tag: 'GENERAL', type: 'general', assignedTo: '' });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="action-modal-box">
        <div className="modal-header">
          <h2 style={{ color: 'var(--accent)', fontSize: '1rem', letterSpacing: '4px' }}>
            NUEVA NECESIDAD
          </h2>
          <button type="button" className="btn-close-action" onClick={onClose}>
            CANCELAR
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
          <div className="form-group">
            <label>DESCRIPCIÓN</label>
            <textarea
              className="form-input"
              required
              value={need.content}
              onChange={e => setNeed({ ...need, content: e.target.value.toUpperCase() })}
              rows="3"
              style={{ resize: 'none' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div className="form-group">
              <label>CATEGORÍA</label>
              <select
                className="form-input"
                value={need.tag}
                onChange={e => setNeed({ ...need, tag: e.target.value })}
              >
                <option value="GENERAL">GENERAL</option>
                <option value="FORMACIÓN">FORMACIÓN</option>
                <option value="DEBILIDAD">DEBILIDAD</option>
                <option value="RESPONSABILIDAD">RESPONSABILIDAD</option>
                <option value="CAPACITACION">CAPACITACIÓN</option>
              </select>
            </div>

            <div className="form-group">
              <label>SECCIÓN</label>
              <select
                className="form-input"
                value={need.type}
                onChange={e => setNeed({ ...need, type: e.target.value })}
              >
                <option value="general">PROYECTO</option>
                <option value="staff">EQUIPO</option>
              </select>
            </div>
          </div>

          {need.type === 'staff' && (
            <div className="form-group form-group-dynamic">
              <label>MIEMBROS_DE_EQUIPO</label>
              <select
                className="form-input"
                value={need.assignedTo}
                onChange={e => setNeed({ ...need, assignedTo: e.target.value })}
                style={{ borderColor: 'var(--accent)' }}
              >
                <option value="">-- EQUIPO --</option>
                {personnel.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          )}

          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button type="submit" className="btn-primary" style={{ flex: 1 }}>
              GENERAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NeedModal;