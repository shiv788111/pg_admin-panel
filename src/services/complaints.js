import axios from "axios";

const API_URL = "http://localhost:5000/api/complaints";

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

// Get all complaints
export const getComplaints = async () => {
  try {
    const response = await apiClient.get("/complaints");
    return response.data;
  } catch (error) {
    console.error("Error fetching complaints:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch complaints",
    };
  }
};

// Get complaint by ID
export const getComplaintById = async (id) => {
  try {
    const response = await apiClient.get(`/complaints/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching complaint:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch complaint",
    };
  }
};

// Create new complaint
export const createComplaint = async (complaintData) => {
  try {
    const response = await apiClient.post("/complaints/create", complaintData);
    return response.data;
  } catch (error) {
    console.error("Error creating complaint:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to create complaint",
    };
  }
};

// Resolve complaint
export const resolveComplaint = async (id) => {
  try {
    const response = await apiClient.put(`/complaints/resolve/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error resolving complaint:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to resolve complaint",
    };
  }
};

// Delete complaint
export const deleteComplaint = async (id) => {
  try {
    const response = await apiClient.delete(`/complaints/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting complaint:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to delete complaint",
    };
  }
};
