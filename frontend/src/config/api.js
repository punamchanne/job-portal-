import axios from 'axios'

// Reads VITE_API_URL from .env / Vercel environment variables
// Falls back to localhost for local dev
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({
    baseURL: API_BASE_URL,
})

export default api
export { API_BASE_URL }
