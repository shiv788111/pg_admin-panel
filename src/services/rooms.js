import axios from "axios";

const API_URL = "http://localhost:5000/api/rooms";

// Helper function to get auth token
const getAuthToken = () => {
  const token =
    localStorage.getItem("token") || localStorage.getItem("authToken");
  return token;
};

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to attach token to every request
apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const getRooms = async () => {
  try {
    const response = await apiClient.get("/rooms");
    return response.data;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch rooms",
      data: [],
    };
  }
};

export const getRoomById = async (id) => {
  try {
    const response = await apiClient.get(`/rooms/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching room:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch room",
    };
  }
};

export const createRoom = async (roomData) => {
  try {
    const response = await apiClient.post("/rooms/create", roomData);
    return response.data;
  } catch (error) {
    console.error("Error creating room:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to create room",
    };
  }
};

export const updateRoom = async (id, roomData) => {
  try {
    // Fixed: Changed from /rooms/${id} to /rooms/update/${id} to match backend route
    const response = await apiClient.put(`/rooms/update/${id}`, roomData);
    return response.data;
  } catch (error) {
    console.error("Error updating room:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to update room",
    };
  }
};

export const deleteRoom = async (id) => {
  try {
    // Fixed: Changed from /rooms/${id} to /rooms/delete/${id} to match backend route
    const response = await apiClient.delete(`/rooms/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting room:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to delete room",
    };
  }
};
