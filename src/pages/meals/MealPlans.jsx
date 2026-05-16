import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, UtensilsCrossed } from "lucide-react";

import {
  getMealPlans,
  createMealPlan,
  updateMealPlan,
  deleteMealPlan,
} from "../../services/meals";

const MealPlans = () => {
  const [mealPlans, setMealPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [toast, setToast] = useState({
    show: false,
    message: "",
  });

  const [formData, setFormData] = useState({
    branch_id: "",
    name: "",
    breakfast: 0,
    lunch: 0,
    dinner: 0,
    is_active: 1,
  });

  useEffect(() => {
    fetchMealPlans();
  }, []);

  const fetchMealPlans = async () => {
    setLoading(true);

    const response = await getMealPlans();

    console.log("Meal Plans Response:", response);

    if (response.success) {
      setMealPlans(response.data || []);
    }

    setLoading(false);
  };

  const showToastMessage = (message) => {
    setToast({
      show: true,
      message,
    });

    setTimeout(() => {
      setToast({
        show: false,
        message: "",
      });
    }, 3000);
  };

  const resetForm = () => {
    setFormData({
      branch_id: "",
      name: "",
      breakfast: 0,
      lunch: 0,
      dinner: 0,
      is_active: 1,
    });

    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let response;

    if (editingId) {
      response = await updateMealPlan(editingId, formData);
    } else {
      response = await createMealPlan(formData);
    }

    if (response.success) {
      fetchMealPlans();

      setShowModal(false);

      resetForm();

      showToastMessage(
        editingId
          ? "Meal Plan Updated Successfully"
          : "Meal Plan Created Successfully",
      );
    } else {
      alert(response.message);
    }
  };

  const handleEdit = (meal) => {
    setEditingId(meal.meal_plan_id);

    setFormData({
      branch_id: meal.branch_id || "",
      name: meal.name || "",
      breakfast: meal.breakfast || 0,
      lunch: meal.lunch || 0,
      dinner: meal.dinner || 0,
      is_active: meal.is_active || 1,
    });

    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this meal plan?",
    );

    if (!confirmDelete) return;

    const response = await deleteMealPlan(id);

    if (response.success) {
      fetchMealPlans();

      showToastMessage("Meal Plan Deleted Successfully");
    } else {
      alert(response.message);
    }
  };

  return (
    <div className="p-6">
      {/* Toast */}
      {toast.show && (
        <div className="fixed top-5 right-5 z-50 animate-slideIn">
          <div className="bg-white shadow-2xl rounded-xl overflow-hidden min-w-[320px] border border-green-100">
            <div className="px-5 py-4">
              <p className="font-semibold text-gray-800">{toast.message}</p>
            </div>

            <div className="h-1 bg-green-500 animate-progress" />
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Meal Plans</h1>

          <p className="text-gray-500 mt-1">Manage hostel meal plans</p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl transition shadow"
        >
          <Plus size={18} />
          Add Meal Plan
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left">Plan Name</th>

                <th className="px-6 py-4 text-left">Branch</th>

                <th className="px-6 py-4 text-center">Breakfast</th>

                <th className="px-6 py-4 text-center">Lunch</th>

                <th className="px-6 py-4 text-center">Dinner</th>

                <th className="px-6 py-4 text-left">Status</th>

                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center py-10 text-gray-500">
                    Loading meal plans...
                  </td>
                </tr>
              ) : mealPlans.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-10">
                    <UtensilsCrossed
                      size={50}
                      className="mx-auto text-gray-300 mb-3"
                    />

                    <p className="text-gray-500">No Meal Plans Found</p>
                  </td>
                </tr>
              ) : (
                mealPlans.map((meal) => (
                  <tr
                    key={meal.meal_plan_id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 font-semibold text-gray-800">
                      {meal.name}
                    </td>

                    <td className="px-6 py-4 text-gray-700">
                      {meal.branch_name}
                    </td>

                    <td className="px-6 py-4 text-center">
                      {meal.breakfast ? "✅" : "❌"}
                    </td>

                    <td className="px-6 py-4 text-center">
                      {meal.lunch ? "✅" : "❌"}
                    </td>

                    <td className="px-6 py-4 text-center">
                      {meal.dinner ? "✅" : "❌"}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          meal.is_active
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {meal.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleEdit(meal)}
                          className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() => handleDelete(meal.meal_plan_id)}
                          className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                {editingId ? "Update Meal Plan" : "Add Meal Plan"}
              </h2>

              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Plan Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter meal plan name"
                  className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">
                  Branch ID
                </label>

                <input
                  type="number"
                  name="branch_id"
                  value={formData.branch_id}
                  onChange={handleChange}
                  placeholder="Enter branch id"
                  className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="breakfast"
                    checked={formData.breakfast}
                    onChange={handleChange}
                  />
                  Breakfast
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="lunch"
                    checked={formData.lunch}
                    onChange={handleChange}
                  />
                  Lunch
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="dinner"
                    checked={formData.dinner}
                    onChange={handleChange}
                  />
                  Dinner
                </label>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="px-5 py-3 rounded-xl border hover:bg-gray-100 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl transition"
                >
                  {editingId ? "Update Meal Plan" : "Create Meal Plan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealPlans;
