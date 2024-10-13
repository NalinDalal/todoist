import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // Adjust based on your backend URL

export const registerUser = async (data: { name: string; email: string; password: string }) => {
  const response = await axios.post(`${API_URL}/auth/register`, data);
  return response.data;
};

export const loginUser = async (data: { email: string; password: string }) => {
  const response = await axios.post(`${API_URL}/auth/login`, data);
  return response.data;
};

export const fetchTasks = async (token: string) => {
  const response = await axios.get(`${API_URL}/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const addTask = async (task: { title: string; description: string; dueDate: string; priority: string; status: string }, token: string) => {
  const response = await axios.post(`${API_URL}/tasks`, task, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateTask = async (id: number, task: { title: string; description: string; dueDate: string; priority: string; status: string }, token: string) => {
  const response = await axios.put(`${API_URL}/tasks/${id}`, task, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteTask = async (id: number, token: string) => {
  const response = await axios.delete(`${API_URL}/tasks/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

