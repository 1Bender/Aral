import React, { useState } from 'react';
import './ActionStyles.css';

const MeetingModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({ title: '', date: '' });
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    if (formData.title && formData.date) {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        setError('NO SE PUEDEN PLANIFICAR REUNIONES EN EL PASADO');
        return;
      }

      setError('');
      onSave(formData);
      setFormData({ title: '', date: '' });
      onClose();
    } else {
      setError('POR FAVOR, RELLENE TODOS LOS CAMPOS');
    }
  };

  const handleClose = () => {
    setError('');
    setFormData({ title: '', date: '' });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="action-modal-box">
        <div className="modal-header">
          <h2>PLANIFICAR REUNIÓN</h2>
          <button className="btn-close-action" onClick={handleClose}>CANCELAR</button>
        </div>
        <div className="action-form">
          {error && <div className="error-message" style={{ color: '#ff4444', marginBottom: '10px', fontSize: '0.9rem', fontWeight: 'bold' }}>{error}</div>}
          <div className="form-group">
            <label className="form-label">TITULO</label>
            <input
              className="form-input"
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value.toUpperCase() })}
            />
          </div>
          <div className="form-group">
            <label className="form-label">FECHA</label>
            <input
              className="form-input"
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          </div>
          <button className="btn-primary" onClick={handleSave}>CREATE_LOG_ENTRY</button>
        </div>
      </div>
    </div>
  );
};

export default MeetingModal;