import axios from "axios";


const api = axios.create({
    baseURL: "http://127.0.0.1:5000",
    headers: { "Content-Type": "application/json" },
    withCredentials: true
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;

export const getAllBikes = async () => api.get("/bike");
export const addBike = async (bikeData) => api.post("/bike", bikeData);
export const updateBike = async (id, bikeData) => api.put(`/bike/${id}`, bikeData);
export const deleteBike = async (id) => api.delete(`/bike/${id}`);