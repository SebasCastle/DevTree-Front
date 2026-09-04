import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL
})

api.interceptors.request.use((config)=>{
    const toekn = localStorage.getItem('AUTH_TOKEN')
    if(toekn){
        config.headers.Authorization = `Bearer ${toekn}`
    }
    return config
})

export default api