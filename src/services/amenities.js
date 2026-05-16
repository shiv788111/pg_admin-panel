import axios from "axios";

const API_URL = "http://localhost:5000/api/amenities";

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

// Get all amenities - CORRECTED ENDPOINT
export const getAmenities = async () => {
  try {
    const response = await apiClient.get("/amenities/list");
    return response.data;
  } catch (error) {
    console.error("Error fetching amenities:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch amenities",
    };
  }
};

// Get single amenity by ID - CORRECTED ENDPOINT
export const getAmenityById = async (id) => {
  try {
    const response = await apiClient.get(`/amenities/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching amenity:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch amenity",
    };
  }
};

// Create new amenity - CORRECTED ENDPOINT
export const createAmenity = async (amenityData) => {
  try {
    const response = await apiClient.post("/amenities/create", amenityData);
    return response.data;
  } catch (error) {
    console.error("Error creating amenity:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to create amenity",
    };
  }
};

// Update amenity - CORRECTED ENDPOINT
export const updateAmenity = async (id, amenityData) => {
  try {
    const response = await apiClient.put(
      `/amenities/update/${id}`,
      amenityData,
    );
    return response.data;
  } catch (error) {
    console.error("Error updating amenity:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to update amenity",
    };
  }
};

// Delete amenity - CORRECTED ENDPOINT
export const deleteAmenity = async (id) => {
  try {
    const response = await apiClient.delete(`/amenities/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting amenity:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to delete amenity",
    };
  }
};

// Assign amenity to room
export const assignAmenityToRoom = async (assignData) => {
  try {
    const response = await apiClient.post("/amenities/assign-room", assignData);
    return response.data;
  } catch (error) {
    console.error("Error assigning amenity to room:", error);
    return {
      success: false,
      message:
        error.response?.data?.message || "Failed to assign amenity to room",
    };
  }
};

// Get amenities for a specific room
export const getRoomAmenities = async (roomId) => {
  try {
    const response = await apiClient.get(`/amenities/room/${roomId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching room amenities:", error);
    return {
      success: false,
      message:
        error.response?.data?.message || "Failed to fetch room amenities",
    };
  }
};
