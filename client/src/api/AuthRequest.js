import axios from 'axios';
const API = axios.create({ baseURL: "localhost:3000/" })

export const signUp = (formData) => API.post('/auth/register', formData)

export const logIn = (formData) => API.post('/auth/login', formData)