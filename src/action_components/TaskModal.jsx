import React, { useState } from 'react';
import './ActionStyles.css';

const TaskModal = ({ isOpen, onClose, onAddTask }) => {
  const [task, setTask] = useState({
    desc: '',
    date: '',
    priority: 'media',
    type: 'interna'
  });
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (task.date) {
      const selectedDate = new Date(task.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        setError('NO SE PUEDEN ASIGNAR TAREAS EN EL PASADO');
        return;
      }
    }

    setError('');
    onAddTask(task);
    setTask({ desc: '', date: '', priority: 'media', type: 'interna' });
    onClose();
  };

  const handleClose = () => {
    setError('');
    setTask({ desc: '', date: '', priority: 'media', type: 'interna' });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="action-modal-box">
        <div className="modal-header">
          <h2>NUEVA TAREA</h2>
          <button className="btn-close-action" onClick={handleClose}>CANCELAR</button>
        </div>

        <form className="action-form" onSubmit={handleSubmit}>
          {error && <div className="error-message" style={{ color: '#ff4444', marginBottom: '10px', fontSize: '0.9rem', fontWeight: 'bold' }}>{error}</div>}
          {/* DESCRIPCIÓN */}
          <div className="form-group">
            <label>ASUNTO</label>
            <input
              className="form-input"
              value={task.desc}
              onChange={e => setTask({ ...task, desc: e.target.value })}
              placeholder="Describa la tarea..."
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-group">
              <label>FECHA LIMITE</label>
              <input
                type="date"
                className="form-input"
                value={task.date}
                onChange={e => setTask({ ...task, date: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>PRIORIDAD</label>
              <select
                className="form-input"
                value={task.priority}
                onChange={e => setTask({ ...task, priority: e.target.value })}
              >
                <option value="baja">BAJA</option>
                <option value="media">MEDIA</option>
                <option value="urgent">URGENTE</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>CLASIFICACIÓN</label>
            <select
              className="form-input"
              style={{ border: '1px solid var(--accent)' }}
              value={task.type}
              onChange={e => setTask({ ...task, type: e.target.value })}
            >
              <option value="interna">TAREA INTERNA (PROPIA)</option>
              <option value="proyecto">TAREA DE PROYECTO</option>
            </select>
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: '20px' }}>
            GENERAR
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;