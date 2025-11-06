// src/pages/NoteDetailPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getNoteById } from '../api/apiService';
import type { Note } from '../interfaces'; // <-- Імпортуємо тип

// Функція для форматування дати (можна винести в окремий файл)
const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleString();
};

export const NoteDetailPage = () => {
  // 1. Отримуємо 'id' з URL (наприклад, /notes/123-abc)
  const { id } = useParams<{ id: string }>(); 
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return; // Перевірка, чи 'id' існує

    const fetchNote = async () => {
      try {
        setLoading(true);
        const response = await getNoteById(id);
        setNote(response.data); // Ваш C# Get(id) повертає NoteDetailsVm
      } catch (error) {
        console.error('Failed to load notes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]); // Цей ефект спрацює, коли 'id' зміниться

  // 3. Поки йде завантаження
  if (loading) {
    return <div>Loading...</div>;
  }

  // 4. Якщо нотатку не знайдено
  if (!note) {
    return (
      <div>
        <h2>Note not found</h2>
        <Link to="/notes">Back to list</Link>
      </div>
    );
  }

  // 5. Відображаємо всі деталі
  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', maxWidth: '600px' }}>
      <h1>{note.title}</h1>
      <p style={{ fontSize: '1.2em' }}>{note.details}</p>
      
      <hr />
      
      <div style={{ fontSize: '0.9em', color: '#999' }}>
        <p style={{ margin: 0 }}>
          Created at: {formatDateTime(note.creationDate)}
        </p>
        {note.editDate && (
          <p style={{ margin: 0 }}>
            Updated at: {formatDateTime(note.editDate)}
          </p>
        )}
      </div>

      <Link to="/notes" style={{ display: 'inline-block', marginTop: '20px' }}>
        &larr; Back to list
      </Link>
    </div>
  );
};