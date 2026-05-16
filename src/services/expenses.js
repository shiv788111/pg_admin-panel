import axios from "axios";

const API_URL = "http://localhost:5000/api/expenses";

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

// Get all expenses
export const getExpenses = async () => {
  try {
    const response = await apiClient.get("/expenses");
    return response.data;
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch expenses",
    };
  }
};

// Get expense by ID
export const getExpenseById = async (id) => {
  try {
    const response = await apiClient.get(`/expenses/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching expense:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch expense",
    };
  }
};

// Create new expense
export const createExpense = async (expenseData) => {
  try {
    const response = await apiClient.post("/expenses/create", expenseData);
    return response.data;
  } catch (error) {
    console.error("Error creating expense:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to create expense",
    };
  }
};

// Update expense
export const updateExpense = async (id, expenseData) => {
  try {
    const response = await apiClient.put(`/expenses/${id}`, expenseData);
    return response.data;
  } catch (error) {
    console.error("Error updating expense:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to update expense",
    };
  }
};

// Delete expense
export const deleteExpense = async (id) => {
  try {
    const response = await apiClient.delete(`/expenses/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting expense:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to delete expense",
    };
  }
};

// Get expense categories
export const getExpenseCategories = async () => {
  try {
    const response = await apiClient.get("/expenses/categories");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch categories",
    };
  }
};

// Create expense category
export const createExpenseCategory = async (categoryData) => {
  try {
    const response = await apiClient.post(
      "/expenses/category/create",
      categoryData,
    );
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to create category",
    };
  }
};
