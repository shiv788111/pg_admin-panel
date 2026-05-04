import { useState } from "react";
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
  Thermometer
} from "lucide-react";

function Rooms() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const rooms = [
    { 
      id: 1, 
      roomNumber: "A-101", 
      type: "Single",
      floor: "Ground Floor",
      rent: "₹8,500",
      capacity: "1 Person",
      size: "180 sq ft",
      status: "occupied",
      tenant: "Rahul Sharma",
      amenities: ["wifi", "ac", "tv"],
      lastMaintenance: "2024-01-10",
      nextMaintenance: "2024-02-10",
      color: "bg-blue-500"
    },
    { 
      id: 2, 
      roomNumber: "B-202", 
      type: "Double",
      floor: "First Floor",
      rent: "₹12,000",
      capacity: "2 Persons",
      size: "250 sq ft",
      status: "occupied",
      tenant: "Priya Patel",
      amenities: ["wifi", "ac", "tv", "attached"],
      lastMaintenance: "2024-01-05",
      nextMaintenance: "2024-02-05",
      color: "bg-green-500"
    },
    { 
      id: 3, 
      roomNumber: "C-303", 
      type: "Single",
      floor: "Second Floor",
      rent: "₹7,500",
      capacity: "1 Person",
      size: "160 sq ft",
      status: "vacant",
      tenant: null,
      amenities: ["wifi", "fan"],
      lastMaintenance: "2024-01-08",
      nextMaintenance: "2024-02-08",
      color: "bg-yellow-500"
    },
    { 
      id: 4, 
      roomNumber: "A-104", 
      type: "Triple",
      floor: "Ground Floor",
      rent: "₹15,000",
      capacity: "3 Persons",
      size: "320 sq ft",
      status: "occupied",
      tenant: "Neha Singh",
      amenities: ["wifi", "ac", "tv", "attached", "balcony"],
      lastMaintenance: "2024-01-12",
      nextMaintenance: "2024-02-12",
      color: "bg-purple-500"
    },
    { 
      id: 5, 
      roomNumber: "B-205", 
      type: "Double",
      floor: "First Floor",
      rent: "₹11,000",
      capacity: "2 Persons",
      size: "230 sq ft",
      status: "maintenance",
      tenant: null,
      amenities: ["wifi", "ac", "tv"],
      lastMaintenance: "2024-01-15",
      nextMaintenance: "2024-01-25",
      color: "bg-red-500"
    },
    { 
      id: 6, 
      roomNumber: "D-101", 
      type: "Single",
      floor: "Ground Floor",
      rent: "₹9,000",
      capacity: "1 Person",
      size: "175 sq ft",
      status: "vacant",
      tenant: null,
      amenities: ["wifi", "ac", "tv"],
      lastMaintenance: "2024-01-03",
      nextMaintenance: "2024-02-03",
      color: "bg-indigo-500"
    },
    { 
      id: 7, 
      roomNumber: "A-201", 
      type: "Suite",
      floor: "First Floor",
      rent: "₹20,000",
      capacity: "2 Persons",
      size: "400 sq ft",
      status: "occupied",
      tenant: "Vikram Mehta",
      amenities: ["wifi", "ac", "tv", "attached", "balcony", "kitchen"],
      lastMaintenance: "2024-01-07",
      nextMaintenance: "2024-02-07",
      color: "bg-pink-500"
    },
    { 
      id: 8, 
      roomNumber: "C-102", 
      type: "Double",
      floor: "Second Floor",
      rent: "₹10,500",
      capacity: "2 Persons",
      size: "220 sq ft",
      status: "vacant",
      tenant: null,
      amenities: ["wifi", "fan", "tv"],
      lastMaintenance: "2024-01-09",
      nextMaintenance: "2024-02-09",
      color: "bg-orange-500"
    },
  ];

  const stats = [
    { title: "Total Rooms", value: "50", change: "+5", icon: Home, color: "from-blue-500 to-blue-600" },
    { title: "Occupied Rooms", value: "42", change: "+3", icon: Users, color: "from-green-500 to-green-600" },
    { title: "Vacant Rooms", value: "6", change: "-2", icon: Bed, color: "from-yellow-500 to-yellow-600" },
    { title: "Occupancy Rate", value: "84%", change: "+8%", icon: Activity, color: "from-purple-500 to-purple-600" },
  ];

  const roomTypes = [
    { type: "Single", count: 25, icon: Bed, color: "blue" },
    { type: "Double", count: 18, icon: Users, color: "green" },
    { type: "Triple", count: 5, icon: Users, color: "purple" },
    { type: "Suite", count: 2, icon: Home, color: "pink" },
  ];

  const amenitiesMap = {
    wifi: { icon: Wifi, label: "WiFi", color: "text-blue-600" },
    ac: { icon: Wind, label: "AC", color: "text-indigo-600" },
    tv: { icon: Tv, label: "TV", color: "text-gray-600" },
    attached: { icon: Shield, label: "Attached Bath", color: "text-green-600" },
    balcony: { icon: Grid, label: "Balcony", color: "text-orange-600" },
    kitchen: { icon: Coffee, label: "Kitchen", color: "text-red-600" },
    fan: { icon: Wind, label: "Fan", color: "text-gray-500" },
  };

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (room.tenant && room.tenant.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === "all" || room.type.toLowerCase() === filterType.toLowerCase();
    const matchesStatus = filterStatus === "all" || room.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch(status) {
      case 'occupied':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700 font-medium flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Occupied</span>;
      case 'vacant':
        return <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700 font-medium flex items-center gap-1"><Bed className="w-3 h-3" /> Vacant</span>;
      case 'maintenance':
        return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-700 font-medium flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Maintenance</span>;
      default:
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700 font-medium">{status}</span>;
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Rooms Management
            </h1>
            <p className="text-gray-500 mt-1">Manage all rooms, availability, and maintenance</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setShowAddModal(true)}
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
            <div key={index} className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-lg transition-all group">
              <div className="flex items-center justify-between mb-4">
                <div className={`bg-gradient-to-r ${stat.color} p-3 rounded-xl text-white group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-sm text-green-600 font-medium">{stat.change}</span>
              </div>
              <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
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
            pink: "from-pink-500 to-pink-600"
          }[type.color];
          
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-center justify-between">
                <div className={`bg-gradient-to-r ${bgColor} p-2 rounded-lg text-white`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-2xl font-bold text-gray-800">{type.count}</span>
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
        {filteredRooms.map((room) => (
          <div key={room.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
            <div className={`h-2 bg-gradient-to-r ${room.color === 'bg-blue-500' ? 'from-blue-500 to-blue-600' : 
              room.color === 'bg-green-500' ? 'from-green-500 to-green-600' :
              room.color === 'bg-yellow-500' ? 'from-yellow-500 to-yellow-600' :
              room.color === 'bg-purple-500' ? 'from-purple-500 to-purple-600' :
              room.color === 'bg-red-500' ? 'from-red-500 to-red-600' :
              room.color === 'bg-indigo-500' ? 'from-indigo-500 to-indigo-600' :
              room.color === 'bg-pink-500' ? 'from-pink-500 to-pink-600' :
              'from-orange-500 to-orange-600'}`}></div>
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Home className="w-5 h-5 text-gray-400" />
                    <h3 className="font-bold text-gray-800 text-xl">{room.roomNumber}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">{room.type}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-sm text-gray-500">{room.floor}</span>
                  </div>
                </div>
                <div className="relative">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreVertical className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    <span className="font-semibold text-gray-800">{room.rent}</span>
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
                    <span>Tenant: <span className="font-medium text-gray-800">{room.tenant}</span></span>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 pt-2">
                  {room.amenities.map((amenity, idx) => {
                    const AmenityIcon = amenitiesMap[amenity]?.icon;
                    const amenityLabel = amenitiesMap[amenity]?.label;
                    const amenityColor = amenitiesMap[amenity]?.color;
                    return AmenityIcon ? (
                      <div key={idx} className="flex items-center gap-1 px-2 py-1 bg-gray-50 rounded-lg">
                        <AmenityIcon className={`w-3 h-3 ${amenityColor}`} />
                        <span className="text-xs text-gray-600">{amenityLabel}</span>
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
                <div>
                  {getStatusBadge(room.status)}
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredRooms.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Home className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No rooms found</h3>
          <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            Add New Room
          </button>
        </div>
      )}

      {/* Add Room Modal */}
      {showAddModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowAddModal(false)}></div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl z-50 w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Room</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Room Number</label>
                <input type="text" placeholder="e.g., A-101" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
                <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>Single</option>
                  <option>Double</option>
                  <option>Triple</option>
                  <option>Suite</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Floor</label>
                <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>Ground Floor</option>
                  <option>First Floor</option>
                  <option>Second Floor</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rent Amount</label>
                <input type="text" placeholder="e.g., ₹8,500" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                <input type="text" placeholder="e.g., 1 Person" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
                <input type="text" placeholder="e.g., 180 sq ft" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  Add Room
                </button>
                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
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

export default Rooms;