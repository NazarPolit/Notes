import React, { useState, useEffect } from 'react';
import { getNotes, createNote, deleteNote, updateNote } from '../api/apiService';
import { useNavigate, Link } from 'react-router-dom'
import type { Note } from '../interfaces';

export const NotesPage = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const navigate = useNavigate();

  const [currentId, setCurrentId] = useState<string | null>(null); 
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');

  const fetchNotes = async () => {
    try {
      const response = await getNotes();
      setNotes(response.data.notes); 
    } catch (error) {
      console.error('Failed to load notes:', error);
      navigate('/login');
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await deleteNote(id);
        await fetchNotes(); 
      } catch (error) {
        console.error('Delete error:', error);
      }
    }
  };

  const handleEditClick = (note: Note) => {
    setCurrentId(note.id);
    setTitle(note.title);
    setDetails(note.details);
  };

  const clearForm = () => {
    setCurrentId(null);
    setTitle('');
    setDetails('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (currentId) {
      try {
        await updateNote({ id: currentId, title, details });
      } catch (error) {
        console.error('Update error:', error);
      }
    } else {
      try {
        await createNote({ title, details });
      } catch (error) {
        console.error('Creation error:', error);
      }
    }

    clearForm();
    await fetchNotes();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <h2>My notes</h2>
      <button onClick={handleLogout}>Exit</button>

      <hr />

      <h3>{currentId ? 'Edit note' : 'Create new note'}</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Header:</label>
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Details:</label>
          <textarea 
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>
        <button type="submit">{currentId ? 'Update' : 'Create'}</button>
        {currentId && (
          <button type="button" onClick={clearForm}>Cancel</button>
        )}
      </form>

      <hr />

      <h3>Your list</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {notes.map(note => (
          <li key={note.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Link 
              to={`/notes/${note.id}`}
              style={{ fontSize: '1.2em', color: 'white' }}
            >
              <strong>{note.title}</strong>
            </Link>
            <div>
              <button onClick={() => handleEditClick(note)}>Update</button>
              <button onClick={() => handleDelete(note.id)} style={{ marginLeft: '10px' }}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};