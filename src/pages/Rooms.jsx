import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Home,
  Bed,
  Users,
  DollarSign,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  Upload,
  Wifi,
  Coffee,
  Wind,
  Tv,
  Shield,
  Car,
  Grid,
  MapPin,
  Calendar,
  Clock,
  Activity,
  Power,
  Thermometer,
  X,
} from "lucide-react";
import {
  getRooms,
  createRoom,
  updateRoom,
  deleteRoom,
} from "../services/rooms";

import { getAmenities, assignAmenityToRoom } from "../services/amenities";

function Rooms() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [amenities, setAmenities] = useState([]);
  const [roomAmenities, setRoomAmenities] = useState({}); // Store amenities per room
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [showAmenitiesModal, setShowAmenitiesModal] = useState(false);
  const [stats, setStats] = useState([
    {
      title: "Total Rooms",
      value: "0",
      change: "+0",
      icon: Home,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Occupied Rooms",
      value: "0",
      change: "+0",
      icon: Users,
      color: "from-green-500 to-green-600",
    },
    {
      title: "Vacant Rooms",
      value: "0",
      change: "+0",
      icon: Bed,
      color: "from-yellow-500 to-yellow-600",
    },
    {
      title: "Occupancy Rate",
      value: "0%",
      change: "+0%",
      icon: Activity,
      color: "from-purple-500 to-purple-600",
    },
  ]);

  const [formData, setFormData] = useState({
    branch_id: 1,
    name: "",
    floor: "",
    capacity: "",
    electricity_type: "exclusive",
    room_type: "",
    room_monthly_rent: "",
  });

  // Helper functions
  const getFloorName = (floorNumber) => {
    const floors = {
      0: "Ground Floor",
      1: "First Floor",
      2: "Second Floor",
      3: "Third Floor",
    };
    return floors[floorNumber] || `${floorNumber}th Floor`;
  };

  const getRoomColor = (roomType) => {
    const colors = {
      single: "bg-blue-500",
      double: "bg-green-500",
      triple: "bg-purple-500",
      suite: "bg-pink-500",
    };
    return colors[roomType?.toLowerCase()] || "bg-gray-500";
  };

  // Fetch rooms from API
  const fetchRooms = async () => {
    setLoading(true);
    try {
      const response = await getRooms();
      console.log("Rooms response:", response);

      if (response.success && response.data) {
        const formattedRooms = response.data.map((room) => ({
          id: room.room_id,
          roomNumber: room.name,
          type: room.room_type?.charAt(0).toUpperCase() + room.room_type?.slice(1) || "Unknown",
          floor: getFloorName(room.floor),
          floor_number: room.floor,
          rent: `₹${parseFloat(room.room_monthly_rent || 0).toLocaleString()}`,
          rent_amount: parseFloat(room.room_monthly_rent || 0),
          capacity: `${room.capacity} ${room.capacity === 1 ? "Person" : "Persons"}`,
          capacity_number: room.capacity,
          size: `${(room.capacity || 1) * 80} sq ft`,
          status: room.is_active === 1 ? "vacant" : "maintenance",
          tenant: room.tenant_name || null,
          lastMaintenance: room.last_maintenance || "2024-01-10",
          nextMaintenance: room.next_maintenance || "2024-02-10",
          color: getRoomColor(room.room_type),
          electricity_type: room.electricity_type,
          branch_id: room.branch_id,
          amenities: room.amenities || [] // Use actual amenities from API
        }));

        setRooms(formattedRooms);

        // Store amenities mapping
        const amenitiesMap = {};
        formattedRooms.forEach(room => {
          amenitiesMap[room.id] = room.amenities || [];
        });
        setRoomAmenities(amenitiesMap);

        // Update stats
        const totalRooms = formattedRooms.length;
        const occupiedRooms = formattedRooms.filter(
          (r) => r.status === "occupied",
        ).length;
        const vacantRooms = formattedRooms.filter(
          (r) => r.status === "vacant",
        ).length;
        const occupancyRate =
          totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0;

        setStats([
          {
            title: "Total Rooms",
            value: totalRooms.toString(),
            change: "+0",
            icon: Home,
            color: "from-blue-500 to-blue-600",
          },
          {
            title: "Occupied Rooms",
            value: occupiedRooms.toString(),
            change: "+0",
            icon: Users,
            color: "from-green-500 to-green-600",
          },
          {
            title: "Vacant Rooms",
            value: vacantRooms.toString(),
            change: "+0",
            icon: Bed,
            color: "from-yellow-500 to-yellow-600",
          },
          {
            title: "Occupancy Rate",
            value: `${occupancyRate}%`,
            change: "+0%",
            icon: Activity,
            color: "from-purple-500 to-purple-600",
          },
        ]);
      } else {
        console.error("Failed to fetch rooms:", response.message);
      }
    } catch (error) {
      console.error("Error in fetchRooms:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAmenities = async () => {
    try {
      const response = await getAmenities();
      if (response.success && response.data) {
        setAmenities(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Room type counts
  const [roomTypes, setRoomTypes] = useState([
    { type: "Single", count: 0, icon: Bed, color: "blue" },
    { type: "Double", count: 0, icon: Users, color: "green" },
    { type: "Triple", count: 0, icon: Users, color: "purple" },
    { type: "Suite", count: 0, icon: Home, color: "pink" },
  ]);

  // Update room type counts
  useEffect(() => {
    if (rooms.length > 0) {
      const updatedRoomTypes = roomTypes.map((roomType) => ({
        ...roomType,
        count: rooms.filter((room) => room.type === roomType.type).length,
      }));
      setRoomTypes(updatedRoomTypes);
    }
  }, [rooms]);

  // Create room
  const handleCreateRoom = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const roomData = {
        branch_id: parseInt(formData.branch_id),
        name: formData.name,
        floor: parseInt(formData.floor),
        capacity: parseInt(formData.capacity),
        electricity_type: formData.electricity_type,
        room_type: formData.room_type.toLowerCase(),
        room_monthly_rent: parseFloat(formData.room_monthly_rent),
      };

      const response = await createRoom(roomData);

      if (response.success) {
        const newRoomId = response.data?.room_id || response.data?.id;
        
        // If amenities are selected, assign them
        if (selectedAmenities.length > 0 && newRoomId) {
          await assignAmenityToRoom({
            room_id: newRoomId,
            amenity_ids: selectedAmenities,
          });
        }
        
        alert("Room added successfully!");
        setShowAddModal(false);
        setSelectedAmenities([]); // Reset selected amenities
        resetForm();
        await fetchRooms();
      } else {
        alert(response.message || "Failed to add room");
      }
    } catch (error) {
      console.error("Error creating room:", error);
      alert("An error occurred while adding the room");
    } finally {
      setLoading(false);
    }
  };

  // Update room
  const handleUpdateRoom = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const roomData = {
        branch_id: parseInt(formData.branch_id),
        name: formData.name,
        floor: parseInt(formData.floor),
        capacity: parseInt(formData.capacity),
        electricity_type: formData.electricity_type,
        room_type: formData.room_type.toLowerCase(),
        room_monthly_rent: parseFloat(formData.room_monthly_rent),
      };

      console.log("Updating room with ID:", selectedRoom?.id);
      console.log("Update data:", roomData);

      const response = await updateRoom(selectedRoom.id, roomData);

      if (response.success) {
        alert("Room updated successfully!");
        setShowEditModal(false);
        resetForm();
        await fetchRooms();
      } else {
        alert(response.message || "Failed to update room");
      }
    } catch (error) {
      console.error("Error updating room:", error);
      alert("An error occurred while updating the room");
    } finally {
      setLoading(false);
    }
  };

  // Delete room
  const handleDeleteRoom = async (roomId) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      setLoading(true);
      try {
        console.log("Deleting room with ID:", roomId);
        const response = await deleteRoom(roomId);

        if (response.success) {
          alert("Room deleted successfully!");
          await fetchRooms();
        } else {
          alert(response.message || "Failed to delete room");
        }
      } catch (error) {
        console.error("Error deleting room:", error);
        alert("An error occurred while deleting the room");
      } finally {
        setLoading(false);
      }
    }
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
      branch_id: 1,
      name: "",
      floor: "",
      capacity: "",
      electricity_type: "exclusive",
      room_type: "",
      room_monthly_rent: "",
    });
    setSelectedRoom(null);
    setSelectedAmenities([]);
  };

  const openEditModal = (room) => {
    setSelectedRoom(room);
    setFormData({
      branch_id: room.branch_id || 1,
      name: room.roomNumber,
      floor: room.floor_number?.toString() || "",
      capacity: room.capacity_number?.toString() || "",
      electricity_type: room.electricity_type || "exclusive",
      room_type: room.type?.toLowerCase() || "",
      room_monthly_rent: room.rent_amount?.toString() || "",
    });
    setShowEditModal(true);
  };

  const openViewModal = (room) => {
    setSelectedRoom(room);
    setShowViewModal(true);
  };

  const openAmenitiesModal = (room) => {
    setSelectedRoom(room);
    // Load current amenities for this room
    const currentAmenityIds = (roomAmenities[room.id] || []).map(a => a.amenity_id || a.id).filter(Boolean);
    setSelectedAmenities(currentAmenityIds);
    setShowAmenitiesModal(true);
  };

  const handleAmenityChange = (amenityId) => {
    setSelectedAmenities((prev) => {
      if (prev.includes(amenityId)) {
        return prev.filter((id) => id !== amenityId);
      }
      return [...prev, amenityId];
    });
  };

  const handleAssignAmenities = async () => {
    if (!selectedRoom) return;
    
    try {
      const response = await assignAmenityToRoom({
        room_id: selectedRoom.id,
        amenity_ids: selectedAmenities,
      });

      if (response.success) {
        alert("Amenities assigned successfully!");
        setShowAmenitiesModal(false);
        await fetchRooms(); // Refresh to get updated amenities
      } else {
        alert(response.message || "Failed to assign amenities");
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred while assigning amenities");
    }
  };

  useEffect(() => {
    fetchRooms();
    fetchAmenities();
  }, []);

  // Filter rooms
  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (room.tenant &&
        room.tenant.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType =
      filterType === "all" ||
      room.type.toLowerCase() === filterType.toLowerCase();
    const matchesStatus =
      filterStatus === "all" || room.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  // Pagination
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredRooms.length / itemsPerPage);
  const paginatedRooms = filteredRooms.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case "occupied":
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700 font-medium flex items-center gap-1">
            <CheckCircle className="w-3 h-3" /> Occupied
          </span>
        );
      case "vacant":
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700 font-medium flex items-center gap-1">
            <Bed className="w-3 h-3" /> Vacant
          </span>
        );
      case "maintenance":
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-700 font-medium flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> Maintenance
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700 font-medium">
            {status}
          </span>
        );
    }
  };

  const amenitiesMap = {
    wifi: { icon: Wifi, label: "WiFi", color: "text-blue-600" },
    ac: { icon: Wind, label: "AC", color: "text-indigo-600" },
    tv: { icon: Tv, label: "TV", color: "text-gray-600" },
    attached: { icon: Shield, label: "Attached Bath", color: "text-green-600" },
    balcony: { icon: Grid, label: "Balcony", color: "text-orange-600" },
    kitchen: { icon: Coffee, label: "Kitchen", color: "text-red-600" },
    fan: { icon: Wind, label: "Fan", color: "text-gray-500" },
  };

  if (loading && rooms.length === 0) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading rooms...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Rooms Management
            </h1>
            <p className="text-gray-500 mt-1">
              Manage all rooms, availability, and maintenance
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => {
                setSelectedAmenities([]);
                setShowAddModal(true);
              }}
              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add New Room
            </button>
            <button className="px-4 py-2 border border-gray-200 rounded-xl hover:bg-white transition-all flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-lg transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`bg-gradient-to-r ${stat.color} p-3 rounded-xl text-white group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-sm text-green-600 font-medium">
                  {stat.change}
                </span>
              </div>
              <h3 className="text-gray-500 text-sm font-medium">
                {stat.title}
              </h3>
              <p className="text-2xl font-bold text-gray-800 mt-1">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Room Types Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {roomTypes.map((type, index) => {
          const Icon = type.icon;
          const bgColor = {
            blue: "from-blue-500 to-blue-600",
            green: "from-green-500 to-green-600",
            purple: "from-purple-500 to-purple-600",
            pink: "from-pink-500 to-pink-600",
          }[type.color];

          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`bg-gradient-to-r ${bgColor} p-2 rounded-lg text-white`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-2xl font-bold text-gray-800">
                  {type.count}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-2">{type.type} Rooms</p>
            </div>
          );
        })}
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-2xl shadow-sm p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by room number, type, or tenant name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex gap-3">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Types</option>
              <option value="single">Single</option>
              <option value="double">Double</option>
              <option value="triple">Triple</option>
              <option value="suite">Suite</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Status</option>
              <option value="occupied">Occupied</option>
              <option value="vacant">Vacant</option>
              <option value="maintenance">Maintenance</option>
            </select>
            <button className="px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {paginatedRooms.map((room) => (
          <div
            key={room.id}
            className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
          >
            <div
              className={`h-2 bg-gradient-to-r ${
                room.color === "bg-blue-500"
                  ? "from-blue-500 to-blue-600"
                  : room.color === "bg-green-500"
                    ? "from-green-500 to-green-600"
                    : room.color === "bg-yellow-500"
                      ? "from-yellow-500 to-yellow-600"
                      : room.color === "bg-purple-500"
                        ? "from-purple-500 to-purple-600"
                        : room.color === "bg-red-500"
                          ? "from-red-500 to-red-600"
                          : room.color === "bg-indigo-500"
                            ? "from-indigo-500 to-indigo-600"
                            : room.color === "bg-pink-500"
                              ? "from-pink-500 to-pink-600"
                              : "from-orange-500 to-orange-600"
              }`}
            ></div>

            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Home className="w-5 h-5 text-gray-400" />
                    <h3 className="font-bold text-gray-800 text-xl">
                      {room.roomNumber}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">{room.type}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-sm text-gray-500">{room.floor}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    <span className="font-semibold text-gray-800">
                      {room.rent}
                    </span>
                    <span className="text-gray-400">/ month</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span>{room.capacity}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Grid className="w-4 h-4 text-gray-400" />
                  <span>{room.size}</span>
                </div>

                {room.tenant && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span>
                      Tenant:{" "}
                      <span className="font-medium text-gray-800">
                        {room.tenant}
                      </span>
                    </span>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 pt-2">
                  {(roomAmenities[room.id] || room.amenities || []).map((amenity, idx) => {
                    const amenityName = typeof amenity === 'string' ? amenity : amenity.name?.toLowerCase();
                    const AmenityIcon = amenitiesMap[amenityName]?.icon;
                    const amenityLabel = amenitiesMap[amenityName]?.label || (typeof amenity === 'string' ? amenity : amenity.name);
                    const amenityColor = amenitiesMap[amenityName]?.color;
                    return AmenityIcon ? (
                      <div
                        key={idx}
                        className="flex items-center gap-1 px-2 py-1 bg-gray-50 rounded-lg"
                      >
                        <AmenityIcon className={`w-3 h-3 ${amenityColor}`} />
                        <span className="text-xs text-gray-600">
                          {amenityLabel}
                        </span>
                      </div>
                    ) : null;
                  })}
                </div>

                <div className="flex items-center justify-between pt-2 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>Last: {room.lastMaintenance}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Next: {room.nextMaintenance}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div>{getStatusBadge(room.status)}</div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openAmenitiesModal(room)}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    title="Assign Amenities"
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => openViewModal(room)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="View Room"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => openEditModal(room)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Edit Room"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteRoom(room.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Room"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {filteredRooms.length > 0 && totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                currentPage === i + 1
                  ? "bg-indigo-600 text-white"
                  : "border border-gray-200 hover:bg-white"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}

      {/* Empty State */}
      {filteredRooms.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Home className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            No rooms found
          </h3>
          <p className="text-gray-500 mb-4">
            Try adjusting your search or filter criteria
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Add New Room
          </button>
        </div>
      )}

      {/* Add Room Modal */}
      {showAddModal && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => {
              setShowAddModal(false);
              resetForm();
            }}
          ></div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl z-50 w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Add New Room</h2>
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
            <form onSubmit={handleCreateRoom} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Room Number *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., 101"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Room Type *
                </label>
                <select
                  name="room_type"
                  value={formData.room_type}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select Type</option>
                  <option value="single">Single</option>
                  <option value="double">Double</option>
                  <option value="triple">Triple</option>
                  <option value="suite">Suite</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Floor *
                </label>
                <select
                  name="floor"
                  value={formData.floor}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select Floor</option>
                  <option value="0">Ground Floor</option>
                  <option value="1">First Floor</option>
                  <option value="2">Second Floor</option>
                  <option value="3">Third Floor</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Capacity *
                </label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleInputChange}
                  required
                  placeholder="Number of persons"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Monthly Rent (₹) *
                </label>
                <input
                  type="number"
                  name="room_monthly_rent"
                  value={formData.room_monthly_rent}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., 9000"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Electricity Type
                </label>
                <select
                  name="electricity_type"
                  value={formData.electricity_type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="exclusive">Exclusive</option>
                  <option value="shared">Shared</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Branch ID
                </label>
                <input
                  type="number"
                  name="branch_id"
                  value={formData.branch_id}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Amenities Selection in Add Modal */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assign Amenities (Optional)
                </label>
                <div className="border border-gray-200 rounded-lg p-3 max-h-48 overflow-y-auto">
                  {amenities.map((amenity) => (
                    <label
                      key={amenity.amenity_id}
                      className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedAmenities.includes(amenity.amenity_id)}
                        onChange={() => handleAmenityChange(amenity.amenity_id)}
                        className="w-4 h-4"
                      />
                      <div>
                        <p className="font-medium text-gray-800 text-sm">
                          {amenity.name}
                        </p>
                        {amenity.description && (
                          <p className="text-xs text-gray-500">
                            {amenity.description}
                          </p>
                        )}
                      </div>
                    </label>
                  ))}
                  {amenities.length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-2">
                      No amenities available
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                >
                  {loading ? "Adding..." : "Add Room"}
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

      {/* Edit Room Modal */}
      {showEditModal && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => {
              setShowEditModal(false);
              resetForm();
            }}
          ></div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl z-50 w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Edit Room</h2>
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
            <form onSubmit={handleUpdateRoom} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Room Number *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Room Type *
                </label>
                <select
                  name="room_type"
                  value={formData.room_type}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="single">Single</option>
                  <option value="double">Double</option>
                  <option value="triple">Triple</option>
                  <option value="suite">Suite</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Floor *
                </label>
                <select
                  name="floor"
                  value={formData.floor}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="0">Ground Floor</option>
                  <option value="1">First Floor</option>
                  <option value="2">Second Floor</option>
                  <option value="3">Third Floor</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Capacity *
                </label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Monthly Rent (₹) *
                </label>
                <input
                  type="number"
                  name="room_monthly_rent"
                  value={formData.room_monthly_rent}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                >
                  {loading ? "Updating..." : "Update Room"}
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

      {/* View Room Modal */}
      {showViewModal && selectedRoom && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setShowViewModal(false)}
          ></div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl z-50 w-full max-w-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Room Details</h2>
              <button
                onClick={() => setShowViewModal(false)}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div
                className={`h-1 w-20 rounded-full bg-gradient-to-r ${
                  selectedRoom.color === "bg-blue-500"
                    ? "from-blue-500 to-blue-600"
                    : selectedRoom.color === "bg-green-500"
                      ? "from-green-500 to-green-600"
                      : "from-purple-500 to-purple-600"
                }`}
              ></div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500">Room Number</label>
                  <p className="font-semibold text-gray-800">
                    {selectedRoom.roomNumber}
                  </p>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Room Type</label>
                  <p className="font-semibold text-gray-800">
                    {selectedRoom.type}
                  </p>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Floor</label>
                  <p className="font-semibold text-gray-800">
                    {selectedRoom.floor}
                  </p>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Rent</label>
                  <p className="font-semibold text-gray-800">
                    {selectedRoom.rent}/month
                  </p>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Capacity</label>
                  <p className="font-semibold text-gray-800">
                    {selectedRoom.capacity}
                  </p>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Size</label>
                  <p className="font-semibold text-gray-800">
                    {selectedRoom.size}
                  </p>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Status</label>
                  <div>{getStatusBadge(selectedRoom.status)}</div>
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500">Amenities</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {(roomAmenities[selectedRoom.id] || selectedRoom.amenities || []).map((amenity, idx) => {
                    const amenityName = typeof amenity === 'string' ? amenity : amenity.name?.toLowerCase();
                    const AmenityIcon = amenitiesMap[amenityName]?.icon;
                    const amenityLabel = amenitiesMap[amenityName]?.label || (typeof amenity === 'string' ? amenity : amenity.name);
                    return AmenityIcon ? (
                      <div
                        key={idx}
                        className="flex items-center gap-1 px-2 py-1 bg-gray-50 rounded-lg"
                      >
                        <AmenityIcon className="w-3 h-3" />
                        <span className="text-xs text-gray-600">
                          {amenityLabel}
                        </span>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
            <div className="flex gap-3 pt-6 mt-4 border-t">
              <button
                onClick={() => {
                  setShowViewModal(false);
                  openEditModal(selectedRoom);
                }}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Edit Room
              </button>
              <button
                onClick={() => setShowViewModal(false)}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </>
      )}

      {/* Amenities Modal */}
      {showAmenitiesModal && selectedRoom && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setShowAmenitiesModal(false)}
          ></div>

          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl z-50 w-full max-w-lg p-6">
            {/* HEADER */}
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-2xl font-bold text-gray-800">
                Assign Amenities
              </h2>
              <button
                onClick={() => setShowAmenitiesModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* ROOM */}
            <div className="mb-5">
              <p className="text-sm text-gray-500">Room</p>
              <h3 className="text-lg font-semibold text-gray-800">
                {selectedRoom.roomNumber}
              </h3>
            </div>

            {/* AMENITIES */}
            <div className="grid grid-cols-2 gap-4 max-h-[300px] overflow-y-auto">
              {amenities.map((amenity) => (
                <label
                  key={amenity.amenity_id}
                  className="flex items-center gap-3 border border-gray-200 rounded-xl p-3 cursor-pointer hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    checked={selectedAmenities.includes(amenity.amenity_id)}
                    onChange={() => handleAmenityChange(amenity.amenity_id)}
                    className="w-4 h-4"
                  />
                  <div>
                    <p className="font-medium text-gray-800">{amenity.name}</p>
                    {amenity.description && (
                      <p className="text-xs text-gray-500">
                        {amenity.description}
                      </p>
                    )}
                  </div>
                </label>
              ))}
            </div>

            {/* FOOTER */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAmenitiesModal(false)}
                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAssignAmenities}
                className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
              >
                Save Amenities
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Rooms;