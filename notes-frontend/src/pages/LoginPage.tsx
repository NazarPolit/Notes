// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { loginUser } from '../api/apiService';
import { useNavigate, Link } from 'react-router-dom'

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    try {
      const response = await loginUser({ email, password });
      
      localStorage.setItem('token', response.data.token);
      
      navigate('/notes');

    } catch (error) {
      console.error('Login error:', error);
      alert('Incorrect login or password');
    }
  };

  return (
    <div>
      <h2>Log in</h2>
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
          <label>Пароль:</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <button type="submit">Увійти</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};