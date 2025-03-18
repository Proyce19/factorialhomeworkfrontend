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

export const login = async (credentials) => api.post("/auth/login", credentials);
export const logout = () => localStorage.removeItem("token");

export const getAllBikes = async () => api.get("/bike");
export const getBikeById = async (id) => api.get(`/bike/${id}`);
export const addBike = async (bikeData) => api.post("/bike", bikeData);
export const updateBike = async (id, bikeData) => api.put(`/bike/${id}`, bikeData);
export const deleteBike = async (id) => api.delete(`/bike/${id}`);

export const getCart = async () => api.get("/cart");
export const addToCart = async (productId) => api.post("/cart", { productId });
export const updateCart = async (cartData) => api.post("/cart/update", { cart: cartData });
export const purchaseCart = async () => api.post("/cart/purchase");

export const getAllProducts = async () => api.get("/products");
export const getProductById = async (id) => api.get(`/products/${id}`);
export const addProduct = async (productData) => api.post("/products", productData);
export const updateProduct = async (id, productData) => api.put(`/products/${id}`, productData);
export const deleteProduct = async (id) => api.delete(`/products/${id}`);


export const getAllProductTypes = async () => api.get("/product-type");
export const addProductType = async (type) => api.post("/product-type", { type });
export const updateProductType = async (id, type) => api.put(`/product-type/${id}`, { type });
export const deleteProductType = async (id) => api.delete(`/product-type/${id}`);

export const getAllFrameTypes = async () => api.get("/frame-types");
export const addFrameType = async (type) => api.post("/frame-types", { type });
export const updateFrameType = async (id, type) => api.put(`/frame-types/${id}`, { type });
export const deleteFrameType = async (id) => api.delete(`/frame-types/${id}`);

export const getAllFrameFinishes = async () => api.get("/frame-finishes");
export const addFrameFinish = async (finish) => api.post("/frame-finishes", { finish });
export const updateFrameFinish = async (id, finish) => api.put(`/frame-finishes/${id}`, { finish });
export const deleteFrameFinish = async (id) => api.delete(`/frame-finishes/${id}`);

// Frames
export const getAllFrames = async () => api.get("/frames");
export const addFrame = async (frameData) => api.post("/frames", frameData);
export const updateFrame = async (id, frameData) => api.put(`/frames/${id}`, frameData);
export const deleteFrame = async (id) => api.delete(`/frames/${id}`);

export const getAllChains = async () => api.get("/chains");
export const addChain = async (chainData) => api.post("/chains", chainData);
export const updateChain = async (id, chainData) => api.put(`/chains/${id}`, chainData);
export const deleteChain = async (id) => api.delete(`/chains/${id}`);

// Rims
export const getAllRims = async () => api.get("/rims");
export const addRim = async (rimData) => api.post("/rims", rimData);
export const updateRim = async (id, rimData) => api.put(`/rims/${id}`, rimData);
export const deleteRim = async (id) => api.delete(`/rims/${id}`);

// Wheels
export const getAllWheels = async () => api.get("/wheels");
export const addWheel = async (wheelData) => api.post("/wheels", wheelData);
export const updateWheel = async (id, wheelData) => api.put(`/wheels/${id}`, wheelData);
export const deleteWheel = async (id) => api.delete(`/wheels/${id}`);

// Valid Combinations
export const getAllValidCombinations = async () => api.get("/valid-combinations");
export const addValidCombination = async (combinationData) => api.post("/valid-combinations", combinationData);
export const updateValidCombination = async (id, combinationData) => api.put(`/valid-combinations/${id}`, combinationData);
export const deleteValidCombination = async (id) => api.delete(`/valid-combinations/${id}`);
