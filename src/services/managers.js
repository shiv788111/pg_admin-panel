const API_URL = "http://localhost:5000/api";

const getAuthToken = () => {
  return localStorage.getItem("token") || localStorage.getItem("authToken");
};

export const getManagers = async () => {
  try {
    const response = await fetch(`${API_URL}/managers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    return await response.json();
  } catch (error) {
    console.error("Error fetching managers:", error);

    return {
      success: false,
      message: "Failed to fetch managers",
      data: [],
    };
  }
};

export const createManager = async (managerData) => {
  try {
    const response = await fetch(`${API_URL}/managers/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify(managerData),
    });

    return await response.json();
  } catch (error) {
    console.error("Error creating manager:", error);

    return {
      success: false,
      message: "Failed to create manager",
    };
  }
};

export const updateManager = async (id, managerData) => {
  try {
    const response = await fetch(`${API_URL}/managers/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify(managerData),
    });

    return await response.json();
  } catch (error) {
    console.error("Error updating manager:", error);

    return {
      success: false,
      message: "Failed to update manager",
    };
  }
};

export const deleteManager = async (id) => {
  try {
    const response = await fetch(`${API_URL}/managers/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    return await response.json();
  } catch (error) {
    console.error("Error deleting manager:", error);

    return {
      success: false,
      message: "Failed to delete manager",
    };
  }
};
