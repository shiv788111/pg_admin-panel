const API_URL = "http://localhost:5000/api";

const getAuthToken = () => {
  return localStorage.getItem("token") || localStorage.getItem("authToken");
};

export const getUserBranches = async () => {
  try {
    const response = await fetch(`${API_URL}/user-branches`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    return await response.json();
  } catch (error) {
    console.error("Error fetching user branches:", error);

    return {
      success: false,
      data: [],
    };
  }
};

export const assignUserBranch = async (data) => {
  try {
    const response = await fetch(`${API_URL}/user-branches/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (error) {
    console.error("Error assigning user branch:", error);

    return {
      success: false,
    };
  }
};

export const deleteUserBranch = async (id) => {
  try {
    const response = await fetch(`${API_URL}/user-branches/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    return await response.json();
  } catch (error) {
    console.error("Error deleting user branch:", error);

    return {
      success: false,
    };
  }
};
