// src/pages/RegisterPage.tsx
import React, { useState } from 'react';
import { registerUser } from '../api/apiService';
import { useNavigate, Link } from 'react-router-dom'; // <--- Додаємо Link

export const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 1. Викликаємо registerUser замість loginUser
      await registerUser({ email, password });
      
      // 2. Повідомляємо про успіх
      alert('Registration successful! You can now log in.');
      
      // 3. Перенаправляємо на сторінку логіну
      navigate('/login');

    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration error. This user may already exist.');
    }
  };

  return (
    <div>
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
      
      {/* Додаємо посилання назад на логін */}
      <p>
        Already have account? <Link to="/login">Sign in</Link>
      </p>
    </div>
  );
};