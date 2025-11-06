// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { NotesPage } from './pages/NotesPage'; // <--- Імпортуємо
import { ProtectedRoute } from './components/ProtectedRoute'; // <--- Імпортуємо
import { RegisterPage } from './pages/RegisterPage';
import { NoteDetailPage } from './pages/NoteDetailPage'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<Navigate to="/login" />} />
        
        <Route element={<ProtectedRoute />}>
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/notes/:id" element={<NoteDetailPage />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;