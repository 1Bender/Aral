import './index.css'
import React, { useState } from 'react';
import Login from './components/Login';
import TaskManager from './components/TaskManager';
import TaskModal from './action_components/TaskModal';
import NeedsManager from './components/NeedsManager';
import NeedModal from './action_components/NeedModal';
import MeetingModal from './action_components/MeetingModal';
import BlockerModal from './action_components/BlockerModal';
import BlockerManager from './components/BlockerManager';
import MeetingManager from './components/MeetingManager';


const ActionToolbar = ({ section, onOpenTaskModal, onOpenNeedModal, onOpenBlockerModal, onOpenMeetingModal}) => {
  const renderActions = () => {
    switch (section) {
      case 'DASHBOARD':
        return (
          <>
            <button 
              className="action-btn" 
              style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
              onClick={onOpenTaskModal} 
            >
              [+] NUEVA_TAREA
            </button>
          </>
        );
      case 'NECESIDADES':
        return (
          <>
            <button 
              className="action-btn" 
              style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
              onClick={onOpenNeedModal} 
            >
              [+] NUEVO_ITEM</button>
          </>
        );
      case 'BLOQUEOS':
        return (
          <>
            <button 
            className="action-btn" 
            style={{ borderColor: '#ff4444', color: '#ff4444' }}
            onClick={onOpenBlockerModal}
            >
            [!] REGISTRAR_BLOQUEO
            </button>
          </>
        );
      case 'REUNIONES':
        return (
          <>
            <button 
              className="action-btn" 
              style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
              onClick={onOpenMeetingModal} 
            >
              [+] NUEVA_REUNIÓN
            </button>
          </>
        );
      default:
        return null;
    }
  };

  return <div className="nav-actions">{renderActions()}</div>;
};

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [activeSection, setActiveSection] = useState('DASHBOARD');
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [tasks, setTasks] = useState([{ id: 'T-001', desc: 'Arranque de sistema Aral', notes:'', date: '2026-02-14', priority: 'media', type: 'interna' }]);
  const [isNeedModalOpen, setIsNeedModalOpen] = useState(false);
  const [isBlockerModalOpen, setIsBlockerModalOpen] = useState(false);
  const [needs, setNeeds] = useState([
  { id: 'REQ-001', content: 'ACTUALIZACIÓN DE PROTOCOLOS DE ENCRIPTADO', tag: 'SEGURIDAD', type: 'general' },
  { id: 'REQ-002', content: 'REEMPLAZO DE UNIDADES DE ESTADO SÓLIDO EN SERVIDOR_04', tag: 'HARDWARE', type: 'general' },
  { id: 'STF-001', content: 'CAPACITACIÓN EN SISTEMAS DE RESPUESTA RÁPIDA', tag: 'PERSONAL', type: 'staff' }
  ]);
  const [personnel, setPersonnel] = useState(['OPERADOR_ALPHA', 'ANALISTA_BRAVO', 'TECNICO_GAMMA']);
  const [blockers, setBlockers] = useState([
  { id: 'INF-01', content: 'TIMEOUT EN ENTORNO DE PRE-PRODUCCIÓN', category: 'INFRA', severity: 'HIGH' },
  { id: 'CLI-01', content: 'RETRASO EN FIRMA DE ACCESOS VPN', category: 'CLIENT', severity: 'CRITICAL' }
  ]);
  const [meetings, setMeetings] = useState([]);
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);



  const handleAddTask = (newRow) => {
  const prefix = newRow.type === 'interna' ? 'INT' : 'PRJ';
  const newTask = {
    ...newRow,
    id: `${prefix}-${Math.floor(Math.random() * 900) + 100}`,
    completed: false, 
    archived: false   
  };
  setTasks([...tasks, newTask]);
};

const toggleCompleteTask = (id, notes) => {
  setTasks(tasks.map(t => {
    if (t.id === id) {
      if (t.completed) {
        return { ...t, completed: false, notes: "" }; 
      } 
      return { ...t, completed: true, notes: notes };
    }
    return t;
  }));
};

const reopenTask = (id) => {
  setTasks(tasks.map(t => 
    t.id === id ? { ...t, completed: false } : t
  ));
};

const archiveTask = (id) => {
  setTasks(tasks.map(t => 
    t.id === id ? { ...t, archived: true } : t
  ));
};

  const handleLogin = (u, p) => {
    if (u === 'admin' && p === '1234') setIsLogged(true);
  };

const addStaff = (name) => {
  if (name && !personnel.includes(name.toUpperCase())) {
    setPersonnel([...personnel, name.toUpperCase()]);
  }
};

const removeStaff = (name) => {
  setPersonnel(personnel.filter(p => p !== name));
};

const addNeed = (newNeedData) => {
  const newEntry = {
    ...newNeedData,
    id: newNeedData.type === 'general' ? `REQ-${Date.now().toString().slice(-3)}` : `STF-${Date.now().toString().slice(-3)}`
  };
  setNeeds([...needs, newEntry]);
  setIsNeedModalOpen(false);
};

const deleteNeed = (id) => {
  setNeeds(prevNeeds => {
    return prevNeeds.filter(need => need.id !== id);
  });
};


const deleteBlocker = (id) => {
  setBlockers(prev => prev.filter(b => b.id !== id));
};

const addBlocker = (data) => {
  const newBlocker = {
    ...data,
    id: `${data.category === 'INFRA' ? 'INF' : 'CLI'}-${Math.floor(Math.random() * 900 + 100)}`
  };
  setBlockers(prev => [...prev, newBlocker]);
};

/*reuniones*/

const addMeeting = (data) => {
  const newMtg = {
    id: `MTG-${Date.now().toString().slice(-4)}`,
    title: data.title,
    date: data.date,
    slots: [{ id: Date.now(), point: '', conclusion: '' }],
    notes: "",
  };
  setMeetings(prev => [newMtg, ...prev]);
  setIsMeetingModalOpen(false); 
};

const addSlotToMeeting = (meetingId) => {
  setMeetings(prev => prev.map(m => {
    if (m.id === meetingId) {
      return {
        ...m,
        slots: [...m.slots, { id: Date.now(), point: '', conclusion: '' }]
      };
    }
    return m;
  }));
};

const updateMeetingSlot = (meetingId, slotId, field, value) => {
  setMeetings(prev => prev.map(m => {
    if (m.id === meetingId) {
      const newSlots = m.slots.map(s => 
        s.id === slotId ? { ...s, [field]: value } : s
      );
      return { ...m, slots: newSlots };
    }
    return m;
  }));
};

const updateMeetingData = (id, field, value) => {
  setMeetings(prev => prev.map(m => 
    m.id === id ? { ...m, [field]: value } : m
  ));
};

const updateMeetingPoints = (id, newPoints) => {
  setMeetings(prev => prev.map(m => m.id === id ? { ...m, points: newPoints } : m));
};

const deleteMeeting = (id) => {
  setMeetings(prev => prev.filter(m => m.id !== id));
};

if (!isLogged) return <Login onLogin={handleLogin} />;

  return (
    <div className="app-shell">
      <header className="fixed-header">
        <div className="nav-top">
          <div className="brand" style={{ color: 'var(--accent)', fontWeight: 'bold' }}> ARAL_SYSTEM </div>
          <nav className="nav-links-group">
            {['DASHBOARD', 'NECESIDADES', 'BLOQUEOS', 'REUNIONES'].map(sec => (
              <button 
                key={sec}
                className={`nav-link-global ${activeSection === sec ? 'active' : ''}`}
                onClick={() => setActiveSection(sec)}
              >
                {sec}
              </button>
            ))}
          </nav>
          <button onClick={() => setIsLogged(false)} className="action-btn" style={{ color: '#ff0033' }}>DESCONECTAR</button>
        </div>

        <ActionToolbar section={activeSection} 
        onOpenTaskModal={() => setIsTaskModalOpen(true)}
        onOpenNeedModal={() => setIsNeedModalOpen(true)}
        onOpenBlockerModal={() => setIsBlockerModalOpen(true)}
        onOpenMeetingModal={() => setIsMeetingModalOpen(true)} 
        />

      </header>
      <main className="workspace-body">
        {activeSection === 'DASHBOARD' && (
          <TaskManager 
          tasks={tasks.filter(t => !t.archived)} // Solo enviamos las NO archivadas
          onToggleComplete={toggleCompleteTask}
          onReopen={reopenTask}
          onArchive={archiveTask}
          />
        )}

        {activeSection === 'NECESIDADES' && (
          <NeedsManager 
          needs={needs}
          personnel={personnel}
          onAddStaff={addStaff}
          onRemoveStaff={removeStaff}
          onDeleteNeed={deleteNeed}
          />
        )}

        {activeSection === 'BLOQUEOS' && (
          <BlockerManager 
          blockers={blockers}
          onDeleteBlocker={deleteBlocker}
          />
        )}
        {activeSection === 'REUNIONES' && (
          <MeetingManager 
          meetings={meetings} 
          onUpdatePoints={updateMeetingPoints}
          onAddSlot={addSlotToMeeting}
          onUpdateSlot={updateMeetingSlot}
          onUpdateNotes={(id, val) => updateMeetingData(id, 'notes', val)}
          onDelete={deleteMeeting} 
          />
        )}

      </main>

      <TaskModal 
        isOpen={isTaskModalOpen} 
        onClose={() => setIsTaskModalOpen(false)} 
        onAddTask={handleAddTask} 
      />
      <NeedModal 
      isOpen={isNeedModalOpen}
      onClose={() => setIsNeedModalOpen(false)}
      onSave={addNeed}
      personnel={personnel}
      />
      <BlockerModal 
      isOpen={isBlockerModalOpen} 
      onClose={() => setIsBlockerModalOpen(false)} 
      onSave={addBlocker} 
      />
      <MeetingModal 
      isOpen={isMeetingModalOpen} 
      onClose={() => setIsMeetingModalOpen(false)} 
      onSave={addMeeting} 
      />
    </div>
  );
}

export default App;