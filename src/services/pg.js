import axios from "axios";

const getAuthToken = () => {
  const token =
    localStorage.getItem("token") || localStorage.getItem("authToken");
  return token;
};

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

export const getProperties = async () => {
  try {
    const response = await apiClient.get("/pg");
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch properties",
      data: [],
    };
  }
};

export const getPropertyById = async (id) => {
  try {
    const response = await apiClient.get(`/pg/${id}`);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch property",
    };
  }
};

export const createProperty = async (propertyData) => {
  try {
    const response = await apiClient.post("/pg/create", propertyData);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to create property",
    };
  }
};

export const updateProperty = async (id, propertyData) => {
  try {
    // Fixed: Use the correct endpoint /pg/update/:id
    const response = await apiClient.put(`/pg/update/${id}`, propertyData);
    return response.data;
  } catch (error) {
    console.error("Error updating property:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to update property",
    };
  }
};

export const deleteProperty = async (id) => {
  try {
    // Fixed: Use the correct endpoint /pg/delete/:id
    const response = await apiClient.delete(`/pg/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting property:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to delete property",
    };
  }
};
