import React, { useState } from 'react';
import '../index.css'

const BlockerManager = ({ blockers = [], onDeleteBlocker }) => {
  const [removingId, setRemovingId] = useState(null);
  const handleResolve = (id) => {
    setRemovingId(id); 
    setTimeout(() => {
      onDeleteBlocker(id);
      setRemovingId(null);
    }, 450); 
  };

  const renderBlocker = (blocker) => {
    if (!blocker) return null; 

    return (
      <div 
        key={blocker.id} 
        className={`blocker-card ${blocker.category.toLowerCase()} ${
          blocker.severity === 'CRITICAL' ? 'critical' : ''
        } ${removingId === blocker.id ? 'removing' : ''}`}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span className="card-header-id" style={{ color: 'inherit', opacity: 0.7 }}>
            {blocker.id}
          </span>
          <span className="severity-tag">{blocker.severity}</span>
        </div>
        
        <p className="card-content" style={{ marginBottom: '40px' }}>
          {blocker.content}
        </p>

        <button 
          className="btn-resolve-blocker-v2"
          onClick={() => handleResolve(blocker.id)}
        >
          RESOLVER
        </button>
      </div>
    );
  };

  return (
    <div className="needs-container">
      <h3 className="task-section-title">RADAR DE BLOQUEOS</h3>
      <div className="blocker-section">
        
        <div className="blocker-column">
          <h4 className="staff-sidebar-title" style={{ color: '#00f2ff' }}>LIMITACIONES INTERNAS</h4>
          {blockers.filter(b => b.category === 'INFRA').map(renderBlocker)}
        </div>

        <div className="blocker-column">
          <h4 className="staff-sidebar-title" style={{ color: '#ff9d00' }}>LIMITACIONES DE PROYECTO</h4>
          {blockers.filter(b => b.category === 'CLIENT').map(renderBlocker)}
        </div>

      </div>
    </div>
  );
};

export default BlockerManager;