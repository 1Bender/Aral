import './index.css'
import React, { useState, useEffect } from 'react';
import AralLogo from './assets/AralLogo';
import Login from './components/Login';
import TaskManager from './components/TaskManager';
import TaskModal from './action_components/TaskModal';
import NeedsManager from './components/NeedsManager';
import NeedModal from './action_components/NeedModal';
import MeetingModal from './action_components/MeetingModal';
import BlockerModal from './action_components/BlockerModal';
import BlockerManager from './components/BlockerManager';
import MeetingManager from './components/MeetingManager';
import NotesManager from './components/NotesManager';


const ActionToolbar = ({ section, onOpenTaskModal, onOpenNeedModal, onOpenBlockerModal, onOpenMeetingModal}) => {
  const renderActions = () => {
    switch (section) {
      case 'DASHBOARD':
        return (
          <button className="action-btn btn-accent" onClick={onOpenTaskModal}>
            + NUEVA TAREA
          </button>
        );
      case 'NECESIDADES':
        return (
          <button className="action-btn btn-accent" onClick={onOpenNeedModal}>
            + NUEVO ITEM
          </button>
        );
      case 'BLOQUEOS':
        return (
          <button className="action-btn btn-danger" onClick={onOpenBlockerModal}>
            ! REGISTRAR BLOQUEO
          </button>
        );
      case 'REUNIONES':
        return (
          <button className="action-btn btn-accent" onClick={onOpenMeetingModal}>
            + NUEVA REUNIÓN
          </button>
        );
      default:
        return null;
    }
  };

  return <div className="nav-actions">{renderActions()}</div>;
};

function App() {
  /*Esquema de datos*/
const TASK_SCHEMA = { id: '', desc: '', notes: '', date: '', priority: '', type: '', completed: false };
const NEED_SCHEMA = { id: '', desc: '', category: '', type: '' };
const BLOCKER_SCHEMA = { id: '', desc: '', category: '', severity: '', owner: '', status: 'open' };
const MEETING_SCHEMA = { id: '', title: '', date: '', notes: '', slots: [] };
const NOTE_SCHEMA = { id: '', title: '', content: '' };

  const [currentUser, setCurrentUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [activeSection, setActiveSection] = useState('DASHBOARD');
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [isNeedModalOpen, setIsNeedModalOpen] = useState(false);
  const [isBlockerModalOpen, setIsBlockerModalOpen] = useState(false);
  const [needs, setNeeds] = useState([]);
  const [personnel, setPersonnel] = useState([]);
  const [blockers, setBlockers] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  const [notes, setNotes] = useState([]);



  const handleAddTask = (newRow) => {
  const prefix = newRow.type === 'interna' ? 'INT' : 'PRJ';
  const newTask = {
    ...newRow,
    id: `${prefix}-${Math.floor(Math.random() * 900) + 100}`,
    userId: currentUser.id, 
    completed: false, 
    archived: false   
  };

  setTasks(prev => [...prev, newTask]);
  setIsTaskModalOpen(false);

  fetch('/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newTask),
  }).catch(error => console.error(error));
};

const archiveTask = (id) => {
  if (!window.confirm("¿Seguro que quieres archivar esta tarea?")) return;
  setTasks(prev => prev.map(t => t.id === id ? { ...t, archived: true } : t));

  fetch('/api/tasks', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, userId: currentUser.id, archived: true }), 
  });
};

const toggleCompleteTask = (id, notes = "") => {
  const task = tasks.find(t => t.id === id);
  if (!task) return;

  const newCompletedStatus = !task.completed;
  const finalNotes = newCompletedStatus ? notes : "";

  setTasks(prev => prev.map(t => 
    t.id === id ? { ...t, completed: newCompletedStatus, notes: finalNotes } : t
  ));

  fetch('/api/tasks', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      id, 
      completed: newCompletedStatus, 
      notes: finalNotes 
    }),
  }).catch(error => {
    console.error("Error al actualizar estado en Frankfurt:", error);
  });
};

const reopenTask = (id) => {
  setTasks(tasks.map(t => 
    t.id === id ? { ...t, completed: false } : t
  ));
};

const handleLogin = (userId, username) => {
  setCurrentUser({ id: userId, name: username });
  setIsLogged(true);
  
  localStorage.setItem('aral_session', JSON.stringify({ id: userId, name: username }));
};

const addStaff = (name) => {
  const upperName = name.toUpperCase();
  if (upperName && !personnel.includes(upperName)) {
    setPersonnel(prev => [...prev, upperName]);

    fetch('/api/manage-staff', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: upperName, userId: currentUser.id, action: 'ADD' }),
    });
  }
};

const removeStaff = (name) => {
  setPersonnel(prev => prev.filter(p => p !== name));

  fetch('/api/manage-staff', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, action: 'DELETE' }),
  }).catch(error => {
    console.error("Error al eliminar personal en Frankfurt:", error);
  });
};

const addNeed = (newNeedData) => {
  const newId = `${newNeedData.type === 'general' ? 'REQ' : 'STF'}-${Date.now().toString().slice(-3)}`;
  const fullNeed = { ...newNeedData, id: newId, userId: currentUser.id };

  setNeeds(prev => [...prev, fullNeed]);
  setIsNeedModalOpen(false);

  fetch('/api/needs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(fullNeed),
  });
};

const deleteNeed = (id) => {
  setNeeds(prev => prev.filter(need => need.id !== id));

  fetch('/api/needs', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });
};

const addBlocker = (newBlockerData) => {
  const newId = `BLK-${Date.now().toString().slice(-3)}`;
  const fullBlocker = { ...newBlockerData, id: newId, userId: currentUser.id};

  setBlockers(prev => [...prev, fullBlocker]);
  setIsBlockerModalOpen(false);

  fetch('/api/blockers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(fullBlocker),
  }).catch(error => {
    console.error("Error en el guardado de fondo:", error);
  });
};

const deleteBlocker = (id) => {
  setBlockers(prev => prev.filter(b => b.id !== id));

  fetch('/api/blockers', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  }).catch(error => {
    console.error("Error al borrar de fondo:", error);
  });
};

/*reuniones*/

const addMeeting = (newMtg) => {
  const fullMtg = { 
    ...newMtg, 
    id: `MTG-${Date.now().toString().slice(-3)}`, 
    userId: currentUser.id, 
    slots: [] 
  };

  setMeetings(prev => [...prev, fullMtg]);
  fetch('/api/meetings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(fullMtg),
  }).catch(error => {
    console.error("Error al guardar reunión en Frankfurt:", error);
  });
};

const deleteMeeting = (id) => {
  setMeetings(prev => prev.filter(m => m.id !== id));
  fetch('/api/meetings', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, userId: currentUser.id }),
  });
};

const syncMeetingState = async (updatedMeetings, meetingId) => {
  const meetingToSync = updatedMeetings.find(m => m.id === meetingId);
  if (meetingToSync) {
    try {
      await fetch('/api/meetings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...meetingToSync, userId: currentUser.id }), 
      });
    } catch (error) { console.error(error); }
  }
};

const syncMeeting = async (meetingId) => {
  const meetingToSync = meetings.find(m => m.id === meetingId);
  if (!meetingToSync) return;

  try {
    await fetch('/api/meetings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(meetingToSync),
    });
    console.log(`Reunión ${meetingId} sincronizada.`);
  } catch (error) {
    console.error("Error al sincronizar:", error);
  }
};

const addSlotToMeeting = (meetingId) => {
  setMeetings(prev => {
    const newState = prev.map(m => {
      if (m.id === meetingId) {
        return {
          ...m,
          slots: [...(m.slots || []), { id: Date.now(), point: '', conclusion: '' }]
        };
      }
      return m;
    });
    syncMeetingState(newState, meetingId);
    return newState;
  });
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
  setMeetings(prev => {
    const newState = prev.map(m => m.id === id ? { ...m, [field]: value } : m);
    return newState;
  });
};

const updateMeetingPoints = (id, newPoints) => {
  setMeetings(prev => prev.map(m => m.id === id ? { ...m, points: newPoints } : m));
};

/* Notas */

const addNote = async () => {
  const newNoteData = {
    id: `NTE-${Date.now().toString().slice(-3)}`,
    userId: currentUser.id,
    title: 'Nueva Nota',
    content: ''
  };

  // Actualización optimista en local
  setNotes(prev => [newNoteData, ...prev]);

  try {
    const res = await fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newNoteData),
    });
    const savedNote = await res.json();
    // Reemplazamos por el objeto real de la base de datos (con su ID incremental real si aplica)
    setNotes(prev => prev.map(n => n.id === newNoteData.id ? savedNote : n));
  } catch (error) {
    console.error("Error al crear nota en Frankfurt:", error);
  }
};

const updateNote = async (updatedNote) => {
  // Sincronización optimista instantánea
  setNotes(prev => prev.map(n => n.id === updatedNote.id ? updatedNote : n));

  try {
    await fetch('/api/notes', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...updatedNote, userId: currentUser.id }),
    });
  } catch (error) {
    console.error("Error al actualizar la nota:", error);
  }
};

const deleteNote = async (id) => {
  setNotes(prev => prev.filter(n => n.id !== id));

  try {
    await fetch(`/api/notes?id=${id}&userId=${currentUser.id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error("Error al borrar nota de Frankfurt:", error);
  }
};

useEffect(() => {
  if (isLogged && currentUser?.id) {
    const fetchData = async () => {
      try {

        const response = await fetch(`/api/get-data?userId=${currentUser.id}`);
        
        if (!response.ok) throw new Error("Error en la API");
        
        const data = await response.json();
        
        setTasks(data.tasks || []);
        setNeeds(data.needs || []);
        setPersonnel(data.personnel || []); 
        setBlockers(data.blockers || []);
        setMeetings(data.meetings || []);
        setNotes(data.notes || []);
        
      } catch (error) {
        console.error("Fallo al conectar con Frankfurt:", error);
        
        setTasks([]); setNeeds([]); setPersonnel([]); setBlockers([]); setMeetings([]);
      }
    };
    fetchData();
  }
}, [isLogged, currentUser]);

if (!isLogged) return <Login onLogin={handleLogin} />;

  return (
    <div className="app-shell">
      <header className="fixed-header unifed-layout">
  
  {/* Columna Izquierda: Identidad única (Abarcará todo el alto de la cabecera) */}
  <div className="brand-aside-panel">
    <div className="brand">
      <AralLogo className="aral-system-logo" />
      <span>ARAL_SYSTEM</span>
    </div>
  </div>

  {/* Columna Derecha: Contenedor del Panel de Control (Tus dos filas originales) */}
  <div className="header-control-hub">
    
    {/* Fila Alta (Tu nav-top original intacto) */}
    <div className="nav-top">
      <nav className="nav-links-group">
        {['DASHBOARD', 'NECESIDADES', 'BLOQUEOS', 'REUNIONES', 'NOTAS'].map(sec => (
          <button 
            key={sec}
            className={`nav-link-global ${activeSection === sec ? 'active' : ''}`}
            onClick={() => setActiveSection(sec)}
          >
            {sec}
          </button>
        ))}
      </nav>
      <button onClick={() => setIsLogged(false)} className="action-btn-logout btn-power" title="DESCONECTAR">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="power-icon">
    <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
    <line x1="12" y1="2" x2="12" y2="12"></line>
  </svg>
</button>
    </div>

    {/* Fila Baja (Tu ActionToolbar original intacto) */}
    <ActionToolbar 
      section={activeSection} 
      onOpenTaskModal={() => setIsTaskModalOpen(true)}
      onOpenNeedModal={() => setIsNeedModalOpen(true)}
      onOpenBlockerModal={() => setIsBlockerModalOpen(true)}
      onOpenMeetingModal={() => setIsMeetingModalOpen(true)} 
    />

  </div>
</header>
      <main className="workspace-body">
        {activeSection === 'DASHBOARD' && (
          <TaskManager 
          tasks={tasks.filter(t => !t.archived)}
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
          onSync={syncMeeting}
          />
        )}
        {activeSection === 'NOTAS' && (
          <NotesManager 
            notes={notes}
            onAddNote={addNote}
            onUpdateNote={updateNote}
            onDeleteNote={deleteNote}
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