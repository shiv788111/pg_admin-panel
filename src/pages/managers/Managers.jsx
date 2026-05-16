import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, UserCog } from "lucide-react";

import {
  getManagers,
  createManager,
  updateManager,
  deleteManager,
} from "../../services/managers";

const Managers = () => {
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    manager_name: "",
    branch_id: "",
    phone: "",
    salary: "",
    joining_date: "",
  });

  useEffect(() => {
    fetchManagers();
  }, []);

  const fetchManagers = async () => {
    setLoading(true);

    const response = await getManagers();

    if (response.success) {
      setManagers(response.data || []);
    }

    setLoading(false);
  };

  const resetForm = () => {
    setFormData({
      manager_name: "",
      branch_id: "",
      phone: "",
      salary: "",
      joining_date: "",
    });

    setEditingId(null);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let response;

    if (editingId) {
      response = await updateManager(editingId, formData);
    } else {
      response = await createManager(formData);
    }

    if (response.success) {
      fetchManagers();
      setShowModal(false);
      resetForm();
    } else {
      alert(response.message);
    }
  };

  const handleEdit = (manager) => {
    setEditingId(manager.manager_id);

    setFormData({
      manager_name: manager.manager_name || "",
      branch_id: manager.branch_id || "",
      phone: manager.phone || "",
      salary: manager.salary || "",
      joining_date: manager.joining_date?.split("T")[0] || "",
    });

    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this manager?",
    );

    if (!confirmDelete) return;

    const response = await deleteManager(id);

    if (response.success) {
      fetchManagers();
    } else {
      alert(response.message);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Managers</h1>

          <p className="text-gray-500 mt-1">Manage all branch managers here</p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl transition shadow"
        >
          <Plus size={18} />
          Add Manager
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left">Manager Name</th>

                <th className="px-6 py-4 text-left">Branch</th>

                <th className="px-6 py-4 text-left">Phone</th>

                <th className="px-6 py-4 text-left">Salary</th>

                <th className="px-6 py-4 text-left">Joining Date</th>

                <th className="px-6 py-4 text-left">Status</th>

                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center py-10 text-gray-500">
                    Loading managers...
                  </td>
                </tr>
              ) : managers.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-10">
                    <UserCog size={50} className="mx-auto text-gray-300 mb-3" />

                    <p className="text-gray-500">No Managers Found</p>
                  </td>
                </tr>
              ) : (
                managers.map((manager) => (
                  <tr
                    key={manager.manager_id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <h2 className="font-semibold text-gray-800">
                          {manager.manager_name}
                        </h2>

                        <p className="text-sm text-gray-500">
                          ID #{manager.manager_id}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-4">{manager.branch_name}</td>

                    <td className="px-6 py-4">{manager.phone}</td>

                    <td className="px-6 py-4">
                      ₹{Number(manager.salary).toLocaleString()}
                    </td>

                    <td className="px-6 py-4">
                      {new Date(manager.joining_date).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          manager.is_active
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {manager.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleEdit(manager)}
                          className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() => handleDelete(manager.manager_id)}
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
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                {editingId ? "Update Manager" : "Add Manager"}
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
                  Manager Name
                </label>

                <input
                  type="text"
                  name="manager_name"
                  value={formData.manager_name}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter manager name"
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
                  className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter branch id"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">Phone</label>

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter phone number"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">Salary</label>

                <input
                  type="number"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter salary"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">
                  Joining Date
                </label>

                <input
                  type="date"
                  name="joining_date"
                  value={formData.joining_date}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
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
                  {editingId ? "Update Manager" : "Create Manager"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Managers;
