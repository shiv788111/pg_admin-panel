const API_URL = "http://localhost:5000/api";

const getAuthToken = () => {
  return localStorage.getItem("token") || localStorage.getItem("authToken");
};

export const getMealPlans = async () => {
  try {
    const response = await fetch(`${API_URL}/meal-plans`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    return await response.json();
  } catch (error) {
    console.error("Error fetching meal plans:", error);

    return {
      success: false,
      message: "Failed to fetch meal plans",
      data: [],
    };
  }
};

export const createMealPlan = async (mealData) => {
  try {
    const response = await fetch(`${API_URL}/meal-plans/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify(mealData),
    });

    return await response.json();
  } catch (error) {
    console.error("Error creating meal plan:", error);

    return {
      success: false,
      message: "Failed to create meal plan",
    };
  }
};

export const updateMealPlan = async (id, mealData) => {
  try {
    const response = await fetch(`${API_URL}/meal-plans/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify(mealData),
    });

    return await response.json();
  } catch (error) {
    console.error("Error updating meal plan:", error);

    return {
      success: false,
      message: "Failed to update meal plan",
    };
  }
};

export const deleteMealPlan = async (id) => {
  try {
    const response = await fetch(`${API_URL}/meal-plans/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    return await response.json();
  } catch (error) {
    console.error("Error deleting meal plan:", error);

    return {
      success: false,
      message: "Failed to delete meal plan",
    };
  }
};
