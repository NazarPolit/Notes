import React, { useState } from 'react';
import { registerUser } from '../api/apiService';
import { useNavigate, Link } from 'react-router-dom'; 

export const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await registerUser({ email, password });
      
      alert('Registration successful! You can now log in.');
      
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
      
      <p>
        Already have account? <Link to="/login">Sign in</Link>
      </p>
    </div>
  );
};