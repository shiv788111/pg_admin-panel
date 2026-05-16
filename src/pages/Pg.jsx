import { useState, useEffect } from "react";
import {
  Building,
  MapPin,
  Phone,
  Mail,
  Globe,
  Users,
  Home,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  X,
  CheckCircle,
  AlertCircle,
  Clock,
  DollarSign,
  Calendar,
  Upload,
  Download,
  ChevronLeft,
  ChevronRight,
  Star,
  Shield,
  Wifi,
  Coffee,
  Wind,
  Tv,
  Zap,
  Droplet,
  Activity,
} from "lucide-react";
import {
  getProperties,
  createProperty,
  deleteProperty,
  updateProperty,
} from "../services/pg";
import {
  getBranches,
  createBranch,
  deleteBranch,
  updateBranch,
} from "../services/branches";

function Pg() {
  const [properties, setProperties] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("properties");
  const [searchTerm, setSearchTerm] = useState("");
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [showBranchModal, setShowBranchModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [propertyForm, setPropertyForm] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    email: "",
  });

  const [branchForm, setBranchForm] = useState({
    property_id: "",
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });

  const [stats, setStats] = useState({
    totalProperties: 0,
    totalBranches: 0,
    activeProperties: 0,
    activeBranches: 0,
  });

  const fetchProperties = async () => {
    try {
      const response = await getProperties();
      console.log("Properties response:", response);

      if (response.success && response.data) {
        const formattedProperties = response.data.map((prop) => ({
          id: prop.property_id,
          name: prop.name,
          address: prop.address,
          city: prop.city,
          state: prop.state,
          pincode: prop.pincode,
          phone: prop.phone,
          email: prop.email,
          is_active: prop.is_active === 1,
          created_at: prop.created_at,
          updated_at: prop.updated_at,
        }));
        setProperties(formattedProperties);

        setStats((prev) => ({
          ...prev,
          totalProperties: formattedProperties.length,
          activeProperties: formattedProperties.filter((p) => p.is_active)
            .length,
        }));
      } else {
        console.error("Failed to fetch properties:", response.message);
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  const fetchBranches = async () => {
    try {
      const response = await getBranches();
      console.log("Branches response:", response);

      if (response.success && response.data) {
        const formattedBranches = response.data.map((branch) => ({
          id: branch.branch_id,
          property_id: branch.property_id,
          property_name:
            properties.find((p) => p.id === branch.property_id)?.name ||
            "Unknown",
          name: branch.name,
          address: branch.address,
          city: branch.city,
          state: branch.state,
          pincode: branch.pincode,
          phone: branch.phone,
          manager_id: branch.manager_id,
          total_rooms: branch.total_rooms || 0,
          is_active: branch.is_active === 1,
          created_at: branch.created_at,
          updated_at: branch.updated_at,
        }));
        setBranches(formattedBranches);

        setStats((prev) => ({
          ...prev,
          totalBranches: formattedBranches.length,
          activeBranches: formattedBranches.filter((b) => b.is_active).length,
        }));
      } else {
        console.warn("No branches found or error:", response.message);
        setBranches([]);
      }
    } catch (error) {
      console.error("Error fetching branches:", error);
      setBranches([]);
    }
  };

  const handleCreateProperty = async (e) => {
    e.preventDefault();
    setLoading(true);

    const propertyData = {
      name: propertyForm.name,
      address: propertyForm.address,
      city: propertyForm.city,
      state: propertyForm.state,
      pincode: propertyForm.pincode,
      phone: propertyForm.phone,
      email: propertyForm.email,
    };

    const response = await createProperty(propertyData);

    if (response.success) {
      alert("Property added successfully!");
      setShowPropertyModal(false);
      resetPropertyForm();
      await fetchProperties();
    } else {
      alert(response.message || "Failed to add property");
    }
    setLoading(false);
  };

  const handleUpdateProperty = async (e) => {
    e.preventDefault();
    setLoading(true);

    const propertyData = {
      name: propertyForm.name,
      address: propertyForm.address,
      city: propertyForm.city,
      state: propertyForm.state,
      pincode: propertyForm.pincode,
      phone: propertyForm.phone,
      email: propertyForm.email,
    };

    const response = await updateProperty(selectedItem.id, propertyData);

    if (response.success) {
      alert("Property updated successfully!");
      setShowPropertyModal(false);
      resetPropertyForm();
      await fetchProperties();
    } else {
      alert(response.message || "Failed to update property");
    }
    setLoading(false);
  };

  const handleCreateBranch = async (e) => {
    e.preventDefault();

    if (!branchForm.property_id) {
      alert("Please select a property");
      return;
    }

    setLoading(true);

    const branchData = {
      property_id: parseInt(branchForm.property_id),
      name: branchForm.name,
      address: branchForm.address,
      city: branchForm.city,
      state: branchForm.state,
      pincode: branchForm.pincode,
      phone: branchForm.phone,
    };

    console.log("Sending branch data:", branchData);

    const response = await createBranch(branchData);

    console.log("Create branch response:", response);

    if (response.success) {
      alert("Branch added successfully!");
      setShowBranchModal(false);
      resetBranchForm();
      await fetchBranches();
    } else {
      alert(response.message || "Failed to add branch");
    }
    setLoading(false);
  };

  const handleUpdateBranch = async (e) => {
    e.preventDefault();

    if (!branchForm.property_id) {
      alert("Please select a property");
      return;
    }

    setLoading(true);

    const branchData = {
      property_id: parseInt(branchForm.property_id),
      name: branchForm.name,
      address: branchForm.address,
      city: branchForm.city,
      state: branchForm.state,
      pincode: branchForm.pincode,
      phone: branchForm.phone,
    };

    console.log("Updating branch data:", branchData);
    console.log("Branch ID:", selectedItem.id);

    const response = await updateBranch(selectedItem.id, branchData);

    console.log("Update branch response:", response);

    if (response.success) {
      alert("Branch updated successfully!");
      setShowBranchModal(false);
      resetBranchForm();
      await fetchBranches();
    } else {
      alert(response.message || "Failed to update branch");
    }
    setLoading(false);
  };

  const handleDeleteProperty = async (propertyId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this property? This will also delete all associated branches!",
      )
    ) {
      setLoading(true);
      const response = await deleteProperty(propertyId);

      if (response.success) {
        alert("Property deleted successfully!");
        await fetchProperties();
        await fetchBranches();
      } else {
        alert(response.message || "Failed to delete property");
      }
      setLoading(false);
    }
  };

  const handleDeleteBranch = async (branchId) => {
    if (window.confirm("Are you sure you want to delete this branch?")) {
      setLoading(true);
      const response = await deleteBranch(branchId);

      if (response.success) {
        alert("Branch deleted successfully!");
        await fetchBranches();
      } else {
        alert(response.message || "Failed to delete branch");
      }
      setLoading(false);
    }
  };

  const handlePropertyInputChange = (e) => {
    setPropertyForm({
      ...propertyForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleBranchInputChange = (e) => {
    setBranchForm({
      ...branchForm,
      [e.target.name]: e.target.value,
    });
  };

  const resetPropertyForm = () => {
    setPropertyForm({
      name: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      phone: "",
      email: "",
    });
    setIsEditing(false);
    setSelectedItem(null);
  };

  const resetBranchForm = () => {
    setBranchForm({
      property_id: "",
      name: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      phone: "",
    });
    setIsEditing(false);
    setSelectedItem(null);
  };

  const openPropertyDetails = (property) => {
    setSelectedItem(property);
    setShowDetailsModal(true);
  };

  const openBranchDetails = (branch) => {
    setSelectedItem(branch);
    setShowDetailsModal(true);
  };

  const openEditProperty = (property) => {
    setSelectedItem(property);
    setPropertyForm({
      name: property.name,
      address: property.address,
      city: property.city,
      state: property.state,
      pincode: property.pincode,
      phone: property.phone,
      email: property.email,
    });
    setIsEditing(true);
    setShowPropertyModal(true);
  };

  const openEditBranch = (branch) => {
    setSelectedItem(branch);
    setBranchForm({
      property_id: branch.property_id,
      name: branch.name,
      address: branch.address,
      city: branch.city,
      state: branch.state,
      pincode: branch.pincode,
      phone: branch.phone,
    });
    setIsEditing(true);
    setShowBranchModal(true);
  };

  useEffect(() => {
    const init = async () => {
      await fetchProperties();
      await fetchBranches();
      setLoading(false);
    };
    init();
  }, []);

  // Update branches when properties change
  useEffect(() => {
    if (properties.length > 0) {
      fetchBranches();
    }
  }, [properties]);

  const filteredProperties = properties.filter(
    (prop) =>
      prop.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prop.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prop.address?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const filteredBranches = branches.filter(
    (branch) =>
      branch.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (branch.property_name &&
        branch.property_name.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  const currentItems =
    activeTab === "properties" ? filteredProperties : filteredBranches;
  const totalPages = Math.ceil(currentItems.length / itemsPerPage);
  const paginatedItems = currentItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading && properties.length === 0) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              PG Management
            </h1>
            <p className="text-gray-500 mt-1">
              Manage your properties and branches
            </p>
          </div>
          <div className="flex gap-3">
            {activeTab === "properties" ? (
              <button
                onClick={() => {
                  setIsEditing(false);
                  resetPropertyForm();
                  setShowPropertyModal(true);
                }}
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Property
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsEditing(false);
                  resetBranchForm();
                  setShowBranchModal(true);
                }}
                disabled={properties.length === 0}
                className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
                  properties.length === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg"
                }`}
              >
                <Plus className="w-4 h-4" />
                Add Branch
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-500 p-3 rounded-xl text-white">
              <Building className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-gray-500 text-sm font-medium">
            Total Properties
          </h3>
          <p className="text-2xl font-bold text-gray-800 mt-1">
            {stats.totalProperties}
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-500 p-3 rounded-xl text-white">
              <Home className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-gray-500 text-sm font-medium">Total Branches</h3>
          <p className="text-2xl font-bold text-gray-800 mt-1">
            {stats.totalBranches}
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-500 p-3 rounded-xl text-white">
              <CheckCircle className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-gray-500 text-sm font-medium">
            Active Properties
          </h3>
          <p className="text-2xl font-bold text-gray-800 mt-1">
            {stats.activeProperties}
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-orange-500 p-3 rounded-xl text-white">
              <Activity className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-gray-500 text-sm font-medium">Active Branches</h3>
          <p className="text-2xl font-bold text-gray-800 mt-1">
            {stats.activeBranches}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-sm mb-6">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => {
              setActiveTab("properties");
              setCurrentPage(1);
              setSearchTerm("");
            }}
            className={`px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === "properties"
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Building className="w-4 h-4 inline mr-2" />
            Properties
          </button>
          <button
            onClick={() => {
              setActiveTab("branches");
              setCurrentPage(1);
              setSearchTerm("");
            }}
            className={`px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === "branches"
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Home className="w-4 h-4 inline mr-2" />
            Branches
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder={`Search ${activeTab === "properties" ? "properties" : "branches"} by name, city, or address...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Properties List */}
      {activeTab === "properties" && (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedItems.map((property) => (
                  <tr
                    key={property.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold">
                          {property.name?.charAt(0) || "?"}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {property.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            ID: #{property.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>
                          {property.city}, {property.state}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        {property.address}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span>{property.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span>{property.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatDate(property.created_at)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => openPropertyDetails(property)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openEditProperty(property)}
                          className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProperty(property.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {paginatedItems.length === 0 && (
            <div className="text-center py-12">
              <Building className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No properties found</p>
              <button
                onClick={() => {
                  setIsEditing(false);
                  resetPropertyForm();
                  setShowPropertyModal(true);
                }}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Add Your First Property
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, currentItems.length)} of{" "}
                {currentItems.length} properties
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-white disabled:opacity-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  return (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-1 rounded-lg text-sm ${
                        currentPage === pageNum
                          ? "bg-indigo-600 text-white"
                          : "border border-gray-300 hover:bg-white"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-white disabled:opacity-50"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Branches List */}
      {activeTab === "branches" && (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Branch Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Property
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedItems.map((branch) => (
                  <tr
                    key={branch.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center text-white font-bold">
                          {branch.name?.charAt(0) || "?"}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {branch.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            ID: #{branch.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-700">
                        {branch.property_name}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>
                          {branch.city}, {branch.state}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        {branch.address}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span>{branch.phone}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => openBranchDetails(branch)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openEditBranch(branch)}
                          className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteBranch(branch.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {paginatedItems.length === 0 && (
            <div className="text-center py-12">
              <Home className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No branches found</p>
              {properties.length > 0 && (
                <button
                  onClick={() => {
                    setIsEditing(false);
                    resetBranchForm();
                    setShowBranchModal(true);
                  }}
                  className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Add Your First Branch
                </button>
              )}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, currentItems.length)} of{" "}
                {currentItems.length} branches
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-white disabled:opacity-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  return (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-1 rounded-lg text-sm ${
                        currentPage === pageNum
                          ? "bg-indigo-600 text-white"
                          : "border border-gray-300 hover:bg-white"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-white disabled:opacity-50"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Add/Edit Property Modal */}
      {showPropertyModal && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => {
              setShowPropertyModal(false);
              resetPropertyForm();
            }}
          ></div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl z-50 w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                {isEditing ? "Edit Property" : "Add New Property"}
              </h2>
              <button
                onClick={() => {
                  setShowPropertyModal(false);
                  resetPropertyForm();
                }}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form
              onSubmit={isEditing ? handleUpdateProperty : handleCreateProperty}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={propertyForm.name}
                  onChange={handlePropertyInputChange}
                  required
                  placeholder="e.g., Satyam PG"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={propertyForm.address}
                  onChange={handlePropertyInputChange}
                  required
                  placeholder="Street address"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={propertyForm.city}
                    onChange={handlePropertyInputChange}
                    required
                    placeholder="City"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={propertyForm.state}
                    onChange={handlePropertyInputChange}
                    required
                    placeholder="State"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pincode *
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={propertyForm.pincode}
                  onChange={handlePropertyInputChange}
                  required
                  placeholder="Pincode"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={propertyForm.phone}
                  onChange={handlePropertyInputChange}
                  required
                  placeholder="Contact number"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={propertyForm.email}
                  onChange={handlePropertyInputChange}
                  required
                  placeholder="Email address"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                >
                  {loading
                    ? isEditing
                      ? "Updating..."
                      : "Adding..."
                    : isEditing
                      ? "Update Property"
                      : "Add Property"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowPropertyModal(false);
                    resetPropertyForm();
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

      {/* Add/Edit Branch Modal */}
      {showBranchModal && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => {
              setShowBranchModal(false);
              resetBranchForm();
            }}
          ></div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl z-50 w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                {isEditing ? "Edit Branch" : "Add New Branch"}
              </h2>
              <button
                onClick={() => {
                  setShowBranchModal(false);
                  resetBranchForm();
                }}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form
              onSubmit={isEditing ? handleUpdateBranch : handleCreateBranch}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property *
                </label>
                <select
                  name="property_id"
                  value={branchForm.property_id}
                  onChange={handleBranchInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select Property</option>
                  {properties.map((prop) => (
                    <option key={prop.id} value={prop.id}>
                      {prop.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Branch Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={branchForm.name}
                  onChange={handleBranchInputChange}
                  required
                  placeholder="e.g., Noida Branch"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={branchForm.address}
                  onChange={handleBranchInputChange}
                  required
                  placeholder="Branch address"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={branchForm.city}
                    onChange={handleBranchInputChange}
                    required
                    placeholder="City"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={branchForm.state}
                    onChange={handleBranchInputChange}
                    required
                    placeholder="State"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pincode *
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={branchForm.pincode}
                  onChange={handleBranchInputChange}
                  required
                  placeholder="Pincode"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={branchForm.phone}
                  onChange={handleBranchInputChange}
                  required
                  placeholder="Branch contact number"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                >
                  {loading
                    ? isEditing
                      ? "Updating..."
                      : "Adding..."
                    : isEditing
                      ? "Update Branch"
                      : "Add Branch"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowBranchModal(false);
                    resetBranchForm();
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

      {/* Details Modal */}
      {showDetailsModal && selectedItem && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setShowDetailsModal(false)}
          ></div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl z-50 w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                {activeTab === "properties"
                  ? "Property Details"
                  : "Branch Details"}
              </h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold">
                  {selectedItem.name?.charAt(0) || "?"}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">
                    {selectedItem.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    ID: #{selectedItem.id}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-700">
                      {selectedItem.address}
                    </p>
                    <p className="text-sm text-gray-500">
                      {selectedItem.city}, {selectedItem.state} -{" "}
                      {selectedItem.pincode}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <p className="text-sm text-gray-700">{selectedItem.phone}</p>
                </div>

                {selectedItem.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <p className="text-sm text-gray-700">
                      {selectedItem.email}
                    </p>
                  </div>
                )}

                {activeTab === "branches" && selectedItem.property_name && (
                  <div className="flex items-center gap-3">
                    <Building className="w-4 h-4 text-gray-400" />
                    <p className="text-sm text-gray-700">
                      Property: {selectedItem.property_name}
                    </p>
                  </div>
                )}

                {activeTab === "branches" && selectedItem.total_rooms > 0 && (
                  <div className="flex items-center gap-3">
                    <Home className="w-4 h-4 text-gray-400" />
                    <p className="text-sm text-gray-700">
                      Total Rooms: {selectedItem.total_rooms}
                    </p>
                  </div>
                )}

                <div className="flex items-center gap-3 pt-2 border-t">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <p className="text-xs text-gray-500">
                    Created: {formatDate(selectedItem.created_at)}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 pt-6 mt-4 border-t">
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  if (activeTab === "properties") {
                    openEditProperty(selectedItem);
                  } else {
                    openEditBranch(selectedItem);
                  }
                }}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Edit
              </button>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Close
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Pg;
