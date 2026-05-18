const BASE_URL = "http://localhost:5000/api/beds";

// ================= GET ALL BEDS =================

export const getBeds = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(BASE_URL, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

// ================= CREATE BED =================

export const createBed = async (data) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${BASE_URL}/create`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

// ================= DELETE BED =================

export const deleteBed = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${BASE_URL}/delete/${id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

// ================= UPDATE BED =================

export const updateBed = async (id, data) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${BASE_URL}/update/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
