import '../index.css';
import React, { useState } from 'react';
import ResolutionModal from '../action_components/ResolutionModal';

const TrashIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
  </svg>
);

const TaskManager = ({ tasks, onToggleComplete, onArchive }) => {
  const [selectedTaskId, setSelectedTaskId] = useState(null);
    const handleCheckClick = (task) => {
    if (task.completed) {
      onToggleComplete(task.id, ""); 
    } else {
      setSelectedTaskId(task.id);
    }
  };
  
  const renderTable = (type) => (
    <table className="task-table">
      <thead className="task-header">
        <tr>
          <th style={{width: '90px'}}>ID</th>
          <th>DESCRIPCIÓN</th>
          <th>NOTAS DE RESOLUCIÓN</th>
          <th style={{width: '120px'}}>FECHA_OBJ</th>
          <th style={{width: '100px'}}>PRIORIDAD</th>
          <th style={{width: '160px', textAlign: 'center'}}>ACCIONES</th>
        </tr>
      </thead>
      <tbody>
        {tasks.filter(t => t.type === type).map(task => (
          <tr key={task.id} className={`task-row ${task.completed ? 'is-completed' : ''}`}>
            <td >{task.id}</td>
            <td style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.desc}</td>
            <td className="notes-cell">{task.notes || <span style={{opacity: 0.1}}>---</span>}</td>
            <td>{new Date(task.date).toLocaleDateString('es-ES')}</td>
            <td>
              <span className="priority-tag"
              style={{ backgroundColor: `var(--priority-${task.priority})` }}>
              </span>
              <span className={`priority-text priority-${task.priority}`}>
              {task.priority.toUpperCase()}
              </span>
            </td>
            <td className="cell-actions">
              <button 
                className="btn-task-action" 
                onClick={() => handleCheckClick(task)}
                style={{ color: task.completed ? 'var(--accent)' : '#666' }}
              >
                {task.completed ? 'DONE' : 'CHECK'}
              </button>
              <button className="btn-task-action archive" onClick={() => onArchive(task.id)}>
                <TrashIcon />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="task-module">
      <h3 className="task-section-title">TAREAS DE PROYECTO</h3>
      {renderTable('interna')}
      <div style={{margin: '40px 0'}}></div>
      <h3 className="task-section-title">TAREAS INTERNAS</h3>
      {renderTable('proyecto')}
        <ResolutionModal 
        isOpen={!!selectedTaskId} 
        onClose={() => setSelectedTaskId(null)}
        onConfirm={(note) => {
          onToggleComplete(selectedTaskId, note);
          setSelectedTaskId(null);
        }}
      />
    </div>
  );
};

export default TaskManager;