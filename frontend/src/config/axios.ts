import axios from "axios"

const apiFetch = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

export default apiFetch
