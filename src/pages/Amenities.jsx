import { useState, useEffect } from "react";
import {
  Wifi,
  Dumbbell,
  Car,
  Shield,
  Tv,
  Utensils,
  Wind,
  Battery,
  Sparkles,
  Coffee,
  Snowflake,
  Mic,
  Book,
  Music,
  Heart,
  ShoppingBag,
  Droplets,
  Sun,
  Moon,
  Zap,
  CheckCircle,
  XCircle,
  Plus,
  X,
  Edit,
  Trash2,
  Search,
  Filter,
  Download,
} from "lucide-react";
import {
  getAmenities,
  createAmenity,
  updateAmenity,
  deleteAmenity,
  assignAmenityToRoom,
  getRoomAmenities,
} from "../services/amenities";

function Amenities() {
  const [amenities, setAmenities] = useState([]);
  const [filteredAmenities, setFilteredAmenities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedAmenity, setSelectedAmenity] = useState(null);
  const [roomId, setRoomId] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const categories = {
    basic: {
      name: "Basic Amenities",
      color: "border-blue-200 bg-blue-50",
      icon: "Wifi",
    },
    premium: {
      name: "Premium Facilities",
      color: "border-purple-200 bg-purple-50",
      icon: "Sparkles",
    },
    security: {
      name: "Security Features",
      color: "border-green-200 bg-green-50",
      icon: "Shield",
    },
    entertainment: {
      name: "Entertainment",
      color: "border-pink-200 bg-pink-50",
      icon: "Tv",
    },
    dining: {
      name: "Dining Services",
      color: "border-orange-200 bg-orange-50",
      icon: "Utensils",
    },
  };

  // Auto-categorize amenities based on name
  const getCategoryFromName = (name) => {
    const name_lower = name.toLowerCase();
    if (
      name_lower.includes("wifi") ||
      name_lower.includes("internet") ||
      name_lower.includes("ac") ||
      name_lower.includes("cooler") ||
      name_lower.includes("fan") ||
      name_lower.includes("light") ||
      name_lower.includes("water") ||
      name_lower.includes("geyser") ||
      name_lower.includes("bed")
    ) {
      return "basic";
    }
    if (
      name_lower.includes("gym") ||
      name_lower.includes("parking") ||
      name_lower.includes("pool") ||
      name_lower.includes("terrace") ||
      name_lower.includes("garden") ||
      name_lower.includes("rooftop") ||
      name_lower.includes("lounge") ||
      name_lower.includes("club")
    ) {
      return "premium";
    }
    if (
      name_lower.includes("cctv") ||
      name_lower.includes("security") ||
      name_lower.includes("safety") ||
      name_lower.includes("guard") ||
      name_lower.includes("locker") ||
      name_lower.includes("safe")
    ) {
      return "security";
    }
    if (
      name_lower.includes("tv") ||
      name_lower.includes("music") ||
      name_lower.includes("game") ||
      name_lower.includes("movie") ||
      name_lower.includes("sports") ||
      name_lower.includes("play")
    ) {
      return "entertainment";
    }
    if (
      name_lower.includes("food") ||
      name_lower.includes("tiffin") ||
      name_lower.includes("meal") ||
      name_lower.includes("kitchen") ||
      name_lower.includes("cooking") ||
      name_lower.includes("dining") ||
      name_lower.includes("coffee") ||
      name_lower.includes("tea")
    ) {
      return "dining";
    }
    return "basic";
  };

  const getIconFromName = (name) => {
    const name_lower = name.toLowerCase();
    if (name_lower.includes("wifi")) return "Wifi";
    if (name_lower.includes("ac") || name_lower.includes("cooler"))
      return "Wind";
    if (name_lower.includes("gym")) return "Dumbbell";
    if (name_lower.includes("parking")) return "Car";
    if (name_lower.includes("cctv") || name_lower.includes("security"))
      return "Shield";
    if (name_lower.includes("tv")) return "Tv";
    if (name_lower.includes("food") || name_lower.includes("tiffin"))
      return "Utensils";
    if (name_lower.includes("coffee") || name_lower.includes("tea"))
      return "Coffee";
    if (name_lower.includes("water")) return "Droplets";
    if (name_lower.includes("power") || name_lower.includes("backup"))
      return "Battery";
    if (name_lower.includes("music") || name_lower.includes("game"))
      return "Music";
    if (name_lower.includes("book") || name_lower.includes("study"))
      return "Book";
    if (name_lower.includes("laundry")) return "Zap";
    return "Sparkles";
  };

  const iconMap = {
    Wifi,
    Dumbbell,
    Car,
    Shield,
    Tv,
    Utensils,
    Wind,
    Battery,
    Sparkles,
    Coffee,
    Snowflake,
    Mic,
    Book,
    Music,
    Heart,
    ShoppingBag,
    Droplets,
    Sun,
    Moon,
    Zap,
  };

  // Fetch amenities from API
  const fetchAmenities = async () => {
    setLoading(true);
    const response = await getAmenities();
    console.log("Amenities response:", response);

    if (response.success) {
      const formattedAmenities = response.data.map((amenity) => ({
        id: amenity.amenity_id,
        name: amenity.name,
        description: amenity.description || "",
        icon: getIconFromName(amenity.name),
        category: getCategoryFromName(amenity.name),
        checked: true,
        created_at: amenity.created_at,
        updated_at: amenity.updated_at,
      }));
      setAmenities(formattedAmenities);
      setFilteredAmenities(formattedAmenities);
    } else {
      alert(response.message || "Failed to fetch amenities");
    }
    setLoading(false);
  };

  // Create amenity
  const handleCreateAmenity = async (e) => {
    e.preventDefault();
    setLoading(true);

    const amenityData = {
      name: formData.name,
      description: formData.description,
    };

    const response = await createAmenity(amenityData);

    if (response.success) {
      alert("Amenity added successfully!");
      setShowAddModal(false);
      resetForm();
      fetchAmenities();
    } else {
      alert(response.message || "Failed to add amenity");
    }
    setLoading(false);
  };

  // Update amenity
  const handleUpdateAmenity = async (e) => {
    e.preventDefault();
    setLoading(true);

    const amenityData = {
      name: formData.name,
      description: formData.description,
    };

    const response = await updateAmenity(selectedAmenity.id, amenityData);

    if (response.success) {
      alert("Amenity updated successfully!");
      setShowEditModal(false);
      resetForm();
      fetchAmenities();
    } else {
      alert(response.message || "Failed to update amenity");
    }
    setLoading(false);
  };

  // Delete amenity
  const handleDeleteAmenity = async (amenityId) => {
    if (window.confirm("Are you sure you want to delete this amenity?")) {
      setLoading(true);
      const response = await deleteAmenity(amenityId);

      if (response.success) {
        alert("Amenity deleted successfully!");
        fetchAmenities();
      } else {
        alert(response.message || "Failed to delete amenity");
      }
      setLoading(false);
    }
  };

  // Assign amenity to room
  const handleAssignToRoom = async (e) => {
    e.preventDefault();
    if (!roomId || !selectedAmenity) {
      alert("Please select a room");
      return;
    }

    setLoading(true);
    const assignData = {
      room_id: parseInt(roomId),
      amenity_id: selectedAmenity.id,
    };

    const response = await assignAmenityToRoom(assignData);

    if (response.success) {
      alert("Amenity assigned to room successfully!");
      setShowAssignModal(false);
      setRoomId("");
      setSelectedAmenity(null);
    } else {
      alert(response.message || "Failed to assign amenity");
    }
    setLoading(false);
  };

  // Form handling
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
    });
    setSelectedAmenity(null);
    setRoomId("");
  };

  const openEditModal = (amenity) => {
    setSelectedAmenity(amenity);
    setFormData({
      name: amenity.name,
      description: amenity.description,
    });
    setShowEditModal(true);
  };

  const openAssignModal = (amenity) => {
    setSelectedAmenity(amenity);
    setShowAssignModal(true);
  };

  // Search and filter
  useEffect(() => {
    let filtered = amenities;

    if (searchTerm) {
      filtered = filtered.filter(
        (amenity) =>
          amenity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          amenity.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (amenity) => amenity.category === selectedCategory,
      );
    }

    setFilteredAmenities(filtered);
  }, [searchTerm, selectedCategory, amenities]);

  useEffect(() => {
    fetchAmenities();
  }, []);

  const checkedCount = amenities.filter((a) => a.checked).length;

  // Group amenities by category
  const amenitiesByCategory = {
    basic: filteredAmenities.filter((a) => a.category === "basic"),
    premium: filteredAmenities.filter((a) => a.category === "premium"),
    security: filteredAmenities.filter((a) => a.category === "security"),
    entertainment: filteredAmenities.filter(
      (a) => a.category === "entertainment",
    ),
    dining: filteredAmenities.filter((a) => a.category === "dining"),
  };

  if (loading && amenities.length === 0) {
    return (
      <div className="p-6 bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading amenities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Amenities Management
            </h1>
            <p className="text-gray-500 mt-1">
              Manage all PG amenities and assign them to rooms
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all flex items-center gap-2 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Add New Amenity
            </button>
            <button className="px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all">
          <p className="text-sm text-gray-500">Total Amenities</p>
          <p className="text-2xl font-bold text-gray-800">{amenities.length}</p>
        </div>
        <div className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all">
          <p className="text-sm text-gray-500">Categories</p>
          <p className="text-2xl font-bold text-gray-800">5</p>
        </div>
        <div className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all">
          <p className="text-sm text-gray-500">Total Rooms</p>
          <p className="text-2xl font-bold text-gray-800">-</p>
        </div>
        <div className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all">
          <p className="text-sm text-gray-500">Assignments</p>
          <p className="text-2xl font-bold text-gray-800">-</p>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="border border-gray-200 rounded-xl p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search amenities by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>
          <div className="flex gap-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
            >
              <option value="all">All Categories</option>
              <option value="basic">Basic Amenities</option>
              <option value="premium">Premium Facilities</option>
              <option value="security">Security Features</option>
              <option value="entertainment">Entertainment</option>
              <option value="dining">Dining Services</option>
            </select>
            <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* Amenities List - Category Wise */}
    {/* Amenities List - Category Wise */}
<div className="space-y-6">
  {Object.entries(amenitiesByCategory).map(([catKey, catAmenities]) => {
    if (catAmenities.length === 0) return null;
    const cat = categories[catKey];

    return (
      <div
        key={catKey}
        className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all"
      >
        <div className={`px-4 py-3 ${cat.color} border-b`}>
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-800">{cat.name}</h2>
            <span className="text-sm text-gray-500">
              {catAmenities.length} amenities
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Amenity
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Description
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Category
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Created
                </th>

                <th className="text-center px-6 py-4 text-sm font-semibold text-gray-600">
                  Status
                </th>

                <th className="text-center px-6 py-4 text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {catAmenities.map((amenity) => {
                const IconComponent =
                  iconMap[amenity.icon] || Sparkles;

                return (
                  <tr
                    key={amenity.id}
                    className="border-b hover:bg-gray-50 transition-all"
                  >
                    {/* Amenity */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-gray-700" />
                        </div>

                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {amenity.name}
                          </h3>

                          <p className="text-xs text-gray-400">
                            ID: {amenity.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Description */}
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600 max-w-xs">
                        {amenity.description || "No description"}
                      </p>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700 capitalize">
                        {amenity.category}
                      </span>
                    </td>

                    {/* Created */}
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-500">
                        {new Date(
                          amenity.created_at
                        ).toLocaleDateString()}
                      </p>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        <CheckCircle className="w-3 h-3" />
                        Active
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => openAssignModal(amenity)}
                          className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-all"
                          title="Assign"
                        >
                          <Plus className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => openEditModal(amenity)}
                          className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() =>
                            handleDeleteAmenity(amenity.id)
                          }
                          className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-all"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  })}
</div>

      {/* Empty State */}
      {filteredAmenities.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            No amenities found
          </h3>
          <p className="text-gray-500 mb-4">
            Try adjusting your search or add a new amenity
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Add New Amenity
          </button>
        </div>
      )}

      {/* Add Amenity Modal */}
      {showAddModal && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => {
              setShowAddModal(false);
              resetForm();
            }}
          ></div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl z-50 w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Add New Amenity
              </h2>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  resetForm();
                }}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateAmenity} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amenity Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., WiFi, AC, Gym, Parking"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Brief description of the amenity..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
                >
                  {loading ? "Adding..." : "Add Amenity"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    resetForm();
                  }}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </>
      )}

      {/* Edit Amenity Modal */}
      {showEditModal && selectedAmenity && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => {
              setShowEditModal(false);
              resetForm();
            }}
          ></div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl z-50 w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Edit Amenity</h2>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  resetForm();
                }}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleUpdateAmenity} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amenity Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
                >
                  {loading ? "Updating..." : "Update Amenity"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    resetForm();
                  }}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </>
      )}

      {/* Assign to Room Modal */}
      {showAssignModal && selectedAmenity && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => {
              setShowAssignModal(false);
              resetForm();
            }}
          ></div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl z-50 w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Assign Amenity to Room
              </h2>
              <button
                onClick={() => {
                  setShowAssignModal(false);
                  resetForm();
                }}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAssignToRoom} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amenity
                </label>
                <div className="px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-2">
                    {selectedAmenity &&
                      (() => {
                        const IconComp =
                          iconMap[selectedAmenity.icon] || Sparkles;
                        return <IconComp className="w-4 h-4 text-gray-600" />;
                      })()}
                    <span className="font-medium">{selectedAmenity.name}</span>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Room ID *
                </label>
                <input
                  type="number"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  required
                  placeholder="Enter room ID"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter the room ID to assign this amenity
                </p>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
                >
                  {loading ? "Assigning..." : "Assign to Room"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAssignModal(false);
                    resetForm();
                  }}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default Amenities;
