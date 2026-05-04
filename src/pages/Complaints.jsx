import { useState } from "react";
import { 
  Search, 
  Plus, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
  MessageSquare,
  User,
  Home,
  Calendar,

  Flag,
  Wrench,
  Zap,
  Droplet,
  Thermometer,
  Bug,
  Lock,
  Volume2,
  Download,
  Send,
  Phone,
  Mail,
  Star,
  ThumbsUp,
  ThumbsDown,
  Wifi  
} from "lucide-react";

function Complaints() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const complaints = [
    {
      id: 1,
      tenant: "Rahul Sharma",
      room: "A-101",
      category: "Plumbing",
      title: "Water leakage in bathroom",
      description: "Water is leaking from the bathroom pipe since morning. Please fix urgently.",
      priority: "high",
      status: "pending",
      date: "2024-01-15",
      time: "09:30 AM",
      assignedTo: "Maintenance Team",
      resolvedDate: null,
      feedback: null,
      rating: null,
      images: [],
      avatar: "R",
      color: "bg-blue-500"
    },
    {
      id: 2,
      tenant: "Priya Patel",
      room: "B-202",
      category: "Electrical",
      title: "AC not working",
      description: "AC is not cooling properly. Making strange noise.",
      priority: "high",
      status: "in-progress",
      date: "2024-01-14",
      time: "02:15 PM",
      assignedTo: "Electrician",
      resolvedDate: null,
      feedback: null,
      rating: null,
      images: [],
      avatar: "P",
      color: "bg-pink-500"
    },
    {
      id: 3,
      tenant: "Amit Kumar",
      room: "C-303",
      category: "Furniture",
      title: "Broken chair",
      description: "Chair in the room is broken. Need replacement.",
      priority: "medium",
      status: "resolved",
      date: "2024-01-13",
      time: "11:00 AM",
      assignedTo: "Furniture Team",
      resolvedDate: "2024-01-14",
      feedback: "Good service, resolved quickly",
      rating: 5,
      images: [],
      avatar: "A",
      color: "bg-green-500"
    },
    {
      id: 4,
      tenant: "Neha Singh",
      room: "A-104",
      category: "Plumbing",
      title: "No hot water",
      description: "Geyser is not working. No hot water since yesterday.",
      priority: "medium",
      status: "pending",
      date: "2024-01-14",
      time: "08:00 AM",
      assignedTo: "Plumber",
      resolvedDate: null,
      feedback: null,
      rating: null,
      images: [],
      avatar: "N",
      color: "bg-yellow-500"
    },
    {
      id: 5,
      tenant: "Vikram Mehta",
      room: "B-205",
      category: "Electrical",
      title: "Light bulb fused",
      description: "Bedroom light bulb is fused. Need replacement.",
      priority: "low",
      status: "resolved",
      date: "2024-01-12",
      time: "06:30 PM",
      assignedTo: "Electrician",
      resolvedDate: "2024-01-13",
      feedback: "Quick response, very satisfied",
      rating: 4,
      images: [],
      avatar: "V",
      color: "bg-purple-500"
    },
    {
      id: 6,
      tenant: "Anjali Desai",
      room: "D-101",
      category: "Pest Control",
      title: "Mosquito problem",
      description: "Too many mosquitoes in the room. Need pest control.",
      priority: "high",
      status: "in-progress",
      date: "2024-01-14",
      time: "10:00 AM",
      assignedTo: "Pest Control",
      resolvedDate: null,
      feedback: null,
      rating: null,
      images: [],
      avatar: "A",
      color: "bg-red-500"
    },
    {
      id: 7,
      tenant: "Suresh Kumar",
      room: "C-106",
      category: "Noise",
      title: "Loud music from next room",
      description: "Neighbor playing loud music late at night.",
      priority: "medium",
      status: "pending",
      date: "2024-01-15",
      time: "11:30 PM",
      assignedTo: "Security",
      resolvedDate: null,
      feedback: null,
      rating: null,
      images: [],
      avatar: "S",
      color: "bg-indigo-500"
    },
    {
      id: 8,
      tenant: "Meera Joshi",
      room: "A-205",
      category: "Internet",
      title: "WiFi not working",
      description: "Internet connection is very slow and disconnecting frequently.",
      priority: "high",
      status: "in-progress",
      date: "2024-01-15",
      time: "09:00 AM",
      assignedTo: "IT Support",
      resolvedDate: null,
      feedback: null,
      rating: null,
      images: [],
      avatar: "M",
      color: "bg-teal-500"
    }
  ];

  const categories = [
    { name: "Plumbing", count: 2, icon: Droplet, color: "blue" },
    { name: "Electrical", count: 2, icon: Zap, color: "yellow" },
    { name: "Furniture", count: 1, icon: Home, color: "green" },
    { name: "Pest Control", count: 1, icon: Bug, color: "orange" },
    { name: "Noise", count: 1, icon: Volume2, color: "purple" },
    { name: "Internet", count: 1, icon: Wifi, color: "indigo" },
  ];

  const stats = [
    { title: "Total Complaints", value: "8", change: "+2", icon: AlertCircle, color: "from-blue-500 to-blue-600" },
    { title: "Pending", value: "3", change: "0", icon: Clock, color: "from-yellow-500 to-yellow-600" },
    { title: "In Progress", value: "3", change: "+1", icon: Wrench, color: "from-orange-500 to-orange-600" },
    { title: "Resolved", value: "2", change: "+2", icon: CheckCircle, color: "from-green-500 to-green-600" },
  ];

  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = complaint.tenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || complaint.status === filterStatus;
    const matchesPriority = filterPriority === "all" || complaint.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusBadge = (status) => {
    switch(status) {
      case 'pending':
        return <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700 font-medium flex items-center gap-1"><Clock className="w-3 h-3" /> Pending</span>;
      case 'in-progress':
        return <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700 font-medium flex items-center gap-1"><Wrench className="w-3 h-3" /> In Progress</span>;
      case 'resolved':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700 font-medium flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Resolved</span>;
      default:
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700 font-medium">{status}</span>;
    }
  };

  const getPriorityBadge = (priority) => {
    switch(priority) {
      case 'high':
        return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-700 font-medium flex items-center gap-1"><Flag className="w-3 h-3" /> High</span>;
      case 'medium':
        return <span className="px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-700 font-medium flex items-center gap-1"><Flag className="w-3 h-3" /> Medium</span>;
      case 'low':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700 font-medium flex items-center gap-1"><Flag className="w-3 h-3" /> Low</span>;
      default:
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700 font-medium">{priority}</span>;
    }
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Plumbing': return <Droplet className="w-4 h-4" />;
      case 'Electrical': return <Zap className="w-4 h-4" />;
      case 'Furniture': return <Home className="w-4 h-4" />;
      case 'Pest Control': return <Bug className="w-4 h-4" />;
      case 'Noise': return <Volume2 className="w-4 h-4" />;
      case 'Internet': return <Wifi className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const handleViewDetails = (complaint) => {
    setSelectedComplaint(complaint);
    setShowDetailsModal(true);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Complaints Management
            </h1>
            <p className="text-gray-500 mt-1">Track and manage all tenant complaints and maintenance requests</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              New Complaint
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
                <span className={`text-sm font-medium ${stat.change.includes('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Categories Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {categories.map((category, index) => {
          const Icon = category.icon;
          const bgColor = {
            blue: "from-blue-500 to-blue-600",
            yellow: "from-yellow-500 to-yellow-600",
            green: "from-green-500 to-green-600",
            orange: "from-orange-500 to-orange-600",
            purple: "from-purple-500 to-purple-600",
            indigo: "from-indigo-500 to-indigo-600"
          }[category.color];
          
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm p-3 hover:shadow-md transition-all cursor-pointer text-center">
              <div className={`bg-gradient-to-r ${bgColor} w-10 h-10 rounded-lg flex items-center justify-center text-white mx-auto mb-2`}>
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium text-gray-800">{category.name}</p>
              <p className="text-lg font-bold text-gray-600">{category.count}</p>
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
              placeholder="Search by tenant name, room number, or complaint title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex gap-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <button className="px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* Complaints Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredComplaints.map((complaint) => (
          <div key={complaint.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
            <div className={`h-1 bg-gradient-to-r ${
              complaint.priority === 'high' ? 'from-red-500 to-red-600' :
              complaint.priority === 'medium' ? 'from-orange-500 to-orange-600' :
              'from-green-500 to-green-600'
            }`}></div>
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`${complaint.color} w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm`}>
                    {complaint.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{complaint.tenant}</h3>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Home className="w-3 h-3" />
                      <span>Room {complaint.room}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-1">
                  {getPriorityBadge(complaint.priority)}
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2">
                  {getCategoryIcon(complaint.category)}
                  <span className="text-xs font-medium text-gray-600">{complaint.category}</span>
                </div>
                
                <h4 className="font-semibold text-gray-800 text-base">{complaint.title}</h4>
                <p className="text-sm text-gray-600 line-clamp-2">{complaint.description}</p>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{complaint.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{complaint.time}</span>
                  </div>
                </div>

                {complaint.assignedTo && (
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <User className="w-3 h-3" />
                    <span>Assigned to: {complaint.assignedTo}</span>
                  </div>
                )}

                {complaint.resolvedDate && (
                  <div className="flex items-center gap-1 text-xs text-green-600">
                    <CheckCircle className="w-3 h-3" />
                    <span>Resolved on: {complaint.resolvedDate}</span>
                  </div>
                )}

                {complaint.feedback && (
                  <div className="bg-gray-50 rounded-lg p-2">
                    <div className="flex items-center gap-1 mb-1">
                      <MessageSquare className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500">Feedback:</span>
                    </div>
                    <p className="text-xs text-gray-600">{complaint.feedback}</p>
                    {complaint.rating && (
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < complaint.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  {getStatusBadge(complaint.status)}
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleViewDetails(complaint)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
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
      {filteredComplaints.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No complaints found</h3>
          <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            New Complaint
          </button>
        </div>
      )}

      {/* Complaint Details Modal */}
      {showDetailsModal && selectedComplaint && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowDetailsModal(false)}></div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl z-50 w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Complaint Details</h2>
              <button onClick={() => setShowDetailsModal(false)} className="text-gray-400 hover:text-gray-600">
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b">
                <div className={`${selectedComplaint.color} w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg`}>
                  {selectedComplaint.avatar}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">{selectedComplaint.tenant}</h3>
                  <p className="text-sm text-gray-500">Room {selectedComplaint.room}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500">Category</label>
                  <div className="flex items-center gap-1 mt-1">
                    {getCategoryIcon(selectedComplaint.category)}
                    <span className="text-sm font-medium text-gray-700">{selectedComplaint.category}</span>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Priority</label>
                  <div className="mt-1">{getPriorityBadge(selectedComplaint.priority)}</div>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Status</label>
                  <div className="mt-1">{getStatusBadge(selectedComplaint.status)}</div>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Date & Time</label>
                  <p className="text-sm text-gray-700 mt-1">{selectedComplaint.date} at {selectedComplaint.time}</p>
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-500">Title</label>
                <p className="text-sm font-medium text-gray-800 mt-1">{selectedComplaint.title}</p>
              </div>

              <div>
                <label className="text-xs text-gray-500">Description</label>
                <p className="text-sm text-gray-700 mt-1">{selectedComplaint.description}</p>
              </div>

              {selectedComplaint.assignedTo && (
                <div>
                  <label className="text-xs text-gray-500">Assigned To</label>
                  <p className="text-sm text-gray-700 mt-1">{selectedComplaint.assignedTo}</p>
                </div>
              )}

              {selectedComplaint.resolvedDate && (
                <div>
                  <label className="text-xs text-gray-500">Resolved Date</label>
                  <p className="text-sm text-green-700 mt-1">{selectedComplaint.resolvedDate}</p>
                </div>
              )}

              {selectedComplaint.feedback && (
                <div>
                  <label className="text-xs text-gray-500">Tenant Feedback</label>
                  <p className="text-sm text-gray-700 mt-1 italic">"{selectedComplaint.feedback}"</p>
                  {selectedComplaint.rating && (
                    <div className="flex items-center gap-1 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < selectedComplaint.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  Update Status
                </button>
                <button className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  Contact Tenant
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Add Complaint Modal */}
      {showAddModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowAddModal(false)}></div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl z-50 w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">New Complaint</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tenant Name</label>
                <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>Rahul Sharma - A-101</option>
                  <option>Priya Patel - B-202</option>
                  <option>Amit Kumar - C-303</option>
                  <option>Neha Singh - A-104</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>Plumbing</option>
                  <option>Electrical</option>
                  <option>Furniture</option>
                  <option>Pest Control</option>
                  <option>Noise</option>
                  <option>Internet</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input type="text" placeholder="Brief title of the complaint" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea rows="3" placeholder="Detailed description of the issue" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  Submit Complaint
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

export default Complaints;