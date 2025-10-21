import axios from 'axios';

const api = axios.create({
    baseURL: "https://seu-backend.onrender.com"
})

export default api