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

export const getBranches = async () => {
  try {
    const response = await apiClient.get("/branches");
    return response.data;
  } catch (error) {
    console.error("Error fetching branches:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch branches",
      data: [],
    };
  }
};

export const getBranchById = async (id) => {
  try {
    const response = await apiClient.get(`/branches/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching branch:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch branch",
    };
  }
};

export const createBranch = async (branchData) => {
  try {
    const response = await apiClient.post("/branches/create", branchData);
    return response.data;
  } catch (error) {
    console.error("Error creating branch:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to create branch",
    };
  }
};

export const updateBranch = async (id, branchData) => {
  try {
    // Matches backend route: /branches/update/:id
    const response = await apiClient.put(`/branches/update/${id}`, branchData);
    return response.data;
  } catch (error) {
    console.error("Error updating branch:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to update branch",
    };
  }
};

export const deleteBranch = async (id) => {
  try {
    // Matches backend route: /branches/delete/:id
    const response = await apiClient.delete(`/branches/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting branch:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to delete branch",
    };
  }
};
