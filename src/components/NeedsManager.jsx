import React, { useState } from 'react';
import '../index.css';

const NeedsManager = ({ needs, personnel, onAddStaff, onRemoveStaff, onDeleteNeed }) => {
  const [removingId, setRemovingId] = useState(null);
  const [staffName, setStaffName] = useState('');

  const handleResolve = (id) => {
    setRemovingId(id);
    setTimeout(() => {
      onDeleteNeed(id);
      setRemovingId(null);
    }, 450);
  };

  const handleAddClick = () => {
    if (staffName.trim()) {
      onAddStaff(staffName.toUpperCase());
      setStaffName('');
    }
  };

  const renderCard = (need) => (
    <div 
      key={need.id} 
      className={`need-card ${removingId === need.id ? 'removing' : ''}`}
    >
      <span className="card-header-id">
        {need.id} {need.assignedTo && `// STAFF: ${need.assignedTo}`}
      </span>
      <p className="card-content">{need.content}</p>
      <span className="card-footer-tag">{need.tag}</span>
      <button className="btn-complete-need" onClick={() => handleResolve(need.id)}>✓</button>
    </div>
  );

  return (
    <div className="needs-container">
      <section>
        <h3 className="task-section-title">EN PROYECTO</h3>
        <div className="needs-grid">
          {needs.filter(n => n.type === 'general').map(renderCard)}
        </div>
      </section>

      <section>
        <h3 className="task-section-title">DE EQUIPO</h3>
        <div className="staff-split-layout">
          
          <aside className="staff-sidebar">
            <h4 className="staff-sidebar-title">EQUIPO</h4>
            
            <div className="staff-input-group">
              <input 
                type="text"
                placeholder="NOMBRE..."
                value={staffName}
                onChange={(e) => setStaffName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddClick()}
              />
              <button className="btn-add-staff" onClick={handleAddClick}>+</button>
            </div>

            <ul className="staff-list">
              {personnel.map((member) => (
                <li key={member} className="staff-list-item">
                  <span>{member}</span>
                  <button 
                    className="btn-remove-staff" 
                    onClick={() => onRemoveStaff(member)}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          <div className="staff-needs-panel">
            <div className="needs-grid">
              {needs.filter(n => n.type === 'staff').map(renderCard)}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NeedsManager;