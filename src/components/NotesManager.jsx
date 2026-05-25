import React, { useState } from 'react';
import NotebookIllustration from '../assets//NotebookIllustration'
import '../index.css'

const NotesManager = ({ notes, onAddNote, onUpdateNote, onDeleteNote }) => {
  const [selectedNote, setSelectedNote] = useState(null);
  const [noteToDelete, setNoteToDelete] = useState(null);

  const handleOpenModal = (note) => {
    setSelectedNote({ ...note }); 
  };

  const handleCloseAndSave = () => {
    if (selectedNote) {
      onUpdateNote(selectedNote);
      setSelectedNote(null);
    }
  };

  const triggerDeleteConfirmation = (id) => {
    setNoteToDelete(id); // Abre el modal de confirmación
  };

  const confirmDelete = () => {
    onDeleteNote(noteToDelete);
    setNoteToDelete(null); // Cierra el modal de confirmación
  };

  return (
    <div className="notes-section-container">
      <div className="notes-header-flex">
        <h3 className="task-section-title">BLOC DE NOTAS </h3>
        <button className="btn-add-slot" onClick={onAddNote}>+ NUEVA NOTA</button>
      </div>

      {notes.length === 0 && (
        <p className="notes-empty-state">SIN NOTAS</p>
      )}

      {/* Grid de Post-its */}
      <div className="notes-grid">
        {notes.map((note) => (
          <div key={note.id} className="post-it-card" onClick={() => handleOpenModal(note)}>
            <div className="post-it-header">
              <input
                className="post-it-title-input"
                value={note.title}
                onClick={(e) => e.stopPropagation()} 
                onChange={(e) => onUpdateNote({ ...note, title: e.target.value })} 
                placeholder="Título de la nota..."
              />
              <button 
                className="btn-delete-mtg btn-delete-note-padding" 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  triggerDeleteConfirmation(note.id);
                }}
              >
                ✕
              </button>
            </div>
            <div className="post-it-preview">
              {note.content || <span style={{ opacity: 0.25, fontStyle: 'italic' }}>Escribe algo...</span>}
            </div>
          </div>
        ))}
      </div>

      {selectedNote && (
        <div className="modal-overlay" onClick={handleCloseAndSave}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-gap">
              <input 
                className="modal-title-input" 
                value={selectedNote.title}
                onChange={(e) => setSelectedNote({ ...selectedNote, title: e.target.value })}
                placeholder="Introduce un título..."
              />
              <NotebookIllustration className="modal-vector-art" />
            </div>
            
            <textarea
              className="modal-textarea"
              placeholder="Empieza a escribir aquí tus apuntes libres..."
              value={selectedNote.content}
              onChange={(e) => setSelectedNote({ ...selectedNote, content: e.target.value })}
              autoFocus
            />
          </div>
        </div>
      )}

      {noteToDelete && (
        <div className="modal-overlay" onClick={() => setNoteToDelete(null)}>
          <div className="confirm-modal-content" onClick={(e) => e.stopPropagation()}>
            <p className="confirm-modal-text">¿Eliminar esta nota?</p>
            <div className="confirm-modal-actions">
              <button 
                className="btn-delete-mtg" 
                style={{ borderColor: '#ff4444', color: '#ff4444' }} 
                onClick={confirmDelete}
              >
                SÍ, ELIMINAR
              </button>
              <button 
                className="action-btn" 
                onClick={() => setNoteToDelete(null)}
              >
                CANCELAR
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesManager;