import React, { useState } from 'react';
import './ActionStyles.css';

const ResolutionModal = ({ isOpen, onClose, onConfirm }) => {
  const [note, setNote] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(note);
    setNote('');
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="action-modal-box">
        <div className="modal-header">
          <h2 style={{ fontSize: '1rem' }}>RESOLVER</h2>
          <button className="btn-close-action" onClick={onClose}>CANCELAR</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>NOTAS DE RESOLUCIÓN</label>
            <textarea
              className="form-input"
              rows="3"
              value={note}
              onChange={e => setNote(e.target.value)}
              required
              autoFocus
              style={{ width: '100%', background: '#000', resize: 'none' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button type="submit" className="btn-primary" style={{ flex: 1 }}>
              REGISTRAR FINALIZACIÓN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResolutionModal;