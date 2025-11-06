import axios from "axios";

const API_URL = 'http://localhost:5297/api';

const api = axios.create({
    baseURL: API_URL
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginUser = (data: any) => api.post('/auth/login', data);
export const registerUser = (data: any) => api.post('/auth/register', data);

export const getNotes = () => api.get('/note'); 
export const createNote = (data: any) => api.post('/note', data);
export const updateNote = (data: any) => api.put('/note', data);
export const deleteNote = (id: string) => api.delete(`/note/${id}`);
export const getNoteById = (id: string) => api.get(`/note/${id}`);