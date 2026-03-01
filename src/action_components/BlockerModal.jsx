import React, { useState } from 'react';
import './ActionStyles.css';

const BlockerModal = ({ isOpen, onClose, onSave }) => {
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('INFRA');
  const [severity, setSeverity] = useState('NORMAL');

  if (!isOpen) return null;

  const handleSave = () => {
    if (content.trim()) {
      onSave({ content: content.toUpperCase(), category, severity });
      setContent('');
      onClose();
    }
  };

  return (
    <div className="modal-overlay">

      <div className="action-modal-box">

        <div className="modal-header">
          <h2 style={{ color: severity === 'CRITICAL' ? '#ff4444' : 'var(--text-bright)' }}>
            {severity === 'CRITICAL' ? '⚠️ BLOQUEO CRITICO' : 'REPORTAR BLOQUEO'}
          </h2>
          <button className="btn-close-action" onClick={onClose}>CANCELAR</button>
        </div>

        <div className="action-form">
          <div className="form-group">
            <label className="form-label">DESCRIPCIÓN</label>
            <textarea
              className="form-input"
              rows="3"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="DESCRIPCIÓN..."
              style={{ resize: 'none' }}
            />
          </div>

          <div className="form-row" style={{ display: 'flex', gap: '20px' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">CATEGORÍA</label>
              <select
                className="form-input"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="INFRA">INFRAESTRUCTURA</option>
                <option value="CLIENT">DE CLIENTE</option>
              </select>
            </div>

            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">PRIORIDAD</label>
              <select
                className="form-input"
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
                style={{ borderColor: severity === 'CRITICAL' ? '#ff4444' : '' }}
              >
                <option value="NORMAL">NORMAL</option>
                <option value="HIGH">ALTA</option>
                <option value="CRITICAL">CRITICO</option>
              </select>
            </div>
          </div>
          <button className="btn-primary" onClick={handleSave}>
            GENERAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlockerModal;