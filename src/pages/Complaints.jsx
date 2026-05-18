import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Eye,
  Trash2,
  AlertCircle,
  CheckCircle,
  Clock,
  Wrench,
  Home,
  Calendar,
  Flag,
  Droplet,
  Zap,
  Bug,
  Volume2,
  Wifi,
  X,
} from "lucide-react";
import {
  getComplaints,
  resolveComplaint,
  deleteComplaint,
} from "../services/complaints";

function Complaints() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showResolveModal, setShowResolveModal] = useState(false);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Stats state
  const [totalComplaints, setTotalComplaints] = useState(0);
  const [pendingComplaints, setPendingComplaints] = useState(0);
  const [resolvedComplaints, setResolvedComplaints] = useState(0);

  // Fetch complaints from API
  const fetchComplaints = async () => {
    setLoading(true);
    const response = await getComplaints();
    console.log("Complaints response:", response);

    if (response.success) {
      const formattedComplaints = response.data.map((complaint) => ({
        id: complaint.complaint_id,
        tenant_id: complaint.tenant_id,
        tenant: complaint.tenant_name,
        room_no: complaint.room_no,
        branch_name: complaint.branch_name,
        title: complaint.title,
        
        description: complaint.description,
        category:
          complaint.category?.charAt(0).toUpperCase() +
            complaint.category?.slice(1) || "Maintenance",
        status: complaint.status,
        date: complaint.created_at?.split("T")[0],
        time: complaint.created_at?.split("T")[1]?.slice(0, 5),
        resolvedDate: complaint.updated_at?.split("T")[0] || null,
        color: getColorForCategory(complaint.category),
      }));

      setComplaints(formattedComplaints);

      // Update stats
      const total = formattedComplaints.length;
      const pending = formattedComplaints.filter(
        (c) => c.status === "pending",
      ).length;
      const resolved = formattedComplaints.filter(
        (c) => c.status === "resolved",
      ).length;

      setTotalComplaints(total);
      setPendingComplaints(pending);
      setResolvedComplaints(resolved);
    } else {
      alert(response.message || "Failed to fetch complaints");
    }
    setLoading(false);
  };

  const getColorForCategory = (category) => {
    const colors = {
      maintenance: "bg-blue-500",
      plumbing: "bg-cyan-500",
      electrical: "bg-yellow-500",
      furniture: "bg-green-500",
      "pest control": "bg-orange-500",
      noise: "bg-purple-500",
      internet: "bg-indigo-500",
    };
    return colors[category?.toLowerCase()] || "bg-gray-500";
  };

  const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
      case "plumbing":
        return <Droplet className="w-4 h-4" />;
      case "electrical":
        return <Zap className="w-4 h-4" />;
      case "furniture":
        return <Home className="w-4 h-4" />;
      case "pest control":
        return <Bug className="w-4 h-4" />;
      case "noise":
        return <Volume2 className="w-4 h-4" />;
      case "internet":
        return <Wifi className="w-4 h-4" />;
      default:
        return <Wrench className="w-4 h-4" />;
    }
  };

  // Resolve complaint
  const handleResolveComplaint = async () => {
    if (!selectedComplaint) return;

    setLoading(true);
    const response = await resolveComplaint(selectedComplaint.id);

    if (response.success) {
      alert("Complaint resolved successfully!");
      setShowResolveModal(false);
      setShowDetailsModal(false);
      fetchComplaints();
    } else {
      alert(response.message || "Failed to resolve complaint");
    }
    setLoading(false);
  };

  // Delete complaint
  const handleDeleteComplaint = async (complaintId) => {
    if (window.confirm("Are you sure you want to delete this complaint?")) {
      setLoading(true);
      const response = await deleteComplaint(complaintId);

      if (response.success) {
        alert("Complaint deleted successfully!");
        fetchComplaints();
      } else {
        alert(response.message || "Failed to delete complaint");
      }
      setLoading(false);
    }
  };

  const openDetailsModal = (complaint) => {
    setSelectedComplaint(complaint);
    setShowDetailsModal(true);
  };

  const openResolveModal = (complaint) => {
    setSelectedComplaint(complaint);
    setShowResolveModal(true);
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // Filter complaints
  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch =
      complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.tenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.room_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.branch_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || complaint.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredComplaints.length / itemsPerPage);
  const paginatedComplaints = filteredComplaints.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700 font-medium flex items-center gap-1">
            <Clock className="w-3 h-3" /> Pending
          </span>
        );
      case "resolved":
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700 font-medium flex items-center gap-1">
            <CheckCircle className="w-3 h-3" /> Resolved
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

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return "N/A";
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  if (loading && complaints.length === 0) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading complaints...</p>
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
              Complaints Management
            </h1>
            <p className="text-gray-500 mt-1">
              View and manage all tenant complaints
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Complaints Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-lg transition-all group">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-xl text-white group-hover:scale-110 transition-transform">
              <AlertCircle className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-gray-500 text-sm font-medium">
            Total Complaints
          </h3>
          <p className="text-2xl font-bold text-gray-800 mt-1">
            {totalComplaints}
          </p>
        </div>

        {/* Pending Complaints Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-lg transition-all group">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-3 rounded-xl text-white group-hover:scale-110 transition-transform">
              <Clock className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-gray-500 text-sm font-medium">
            Pending Complaints
          </h3>
          <p className="text-2xl font-bold text-gray-800 mt-1">
            {pendingComplaints}
          </p>
        </div>

        {/* Resolved Complaints Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-lg transition-all group">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-xl text-white group-hover:scale-110 transition-transform">
              <CheckCircle className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-gray-500 text-sm font-medium">
            Resolved Complaints
          </h3>
          <p className="text-2xl font-bold text-gray-800 mt-1">
            {resolvedComplaints}
          </p>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-2xl shadow-sm p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by tenant name, room, branch, title or category..."
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
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>

      {/* Complaints Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tenant Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Room & Branch
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Complaint
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedComplaints.map((complaint) => (
                <tr
                  key={complaint.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">
                      #{complaint.id}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div
                        className={`${complaint.color} w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md`}
                      >
                        {complaint.tenant?.charAt(0)?.toUpperCase() || "T"}
                      </div>
                      <span className="text-sm font-semibold text-gray-800">
                        {complaint.tenant}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <p className="text-sm text-gray-700 flex items-center gap-1">
                        <Home className="w-3 h-3 text-gray-400" />
                        Room {complaint.room_no}
                      </p>
                      <p className="text-xs text-gray-500">
                        {complaint.branch_name}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {complaint.title}
                      </p>
                      <p className="text-xs text-gray-500 line-clamp-1 max-w-xs">
                        {complaint.description}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div
                        className={`${complaint.color} w-6 h-6 rounded-full flex items-center justify-center text-white`}
                      >
                        {getCategoryIcon(complaint.category)}
                      </div>
                      <span className="text-sm text-gray-700">
                        {complaint.category}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm text-gray-700">
                        {formatDate(complaint.date)}
                      </p>
                      <p className="text-xs text-gray-400">
                        {formatTime(complaint.time)}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(complaint.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openDetailsModal(complaint)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {complaint.status !== "resolved" && (
                        <button
                          onClick={() => openResolveModal(complaint)}
                          className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Mark as Resolved"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteComplaint(complaint.id)}
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

        {/* Pagination */}
        {filteredComplaints.length > 0 && totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="text-sm text-gray-500">
                Showing {paginatedComplaints.length} of{" "}
                {filteredComplaints.length} complaints
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-sm border border-gray-200 rounded-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
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
                      className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                        currentPage === pageNum
                          ? "bg-indigo-600 text-white"
                          : "border border-gray-200 hover:bg-white"
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
                  className="px-3 py-1 text-sm border border-gray-200 rounded-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Empty State */}
      {filteredComplaints.length === 0 && !loading && (
        <div className="bg-white rounded-2xl shadow-sm text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            No complaints found
          </h3>
          <p className="text-gray-500 mb-4">
            {searchTerm || filterStatus !== "all"
              ? "Try adjusting your search or filter criteria"
              : "No complaints have been submitted yet"}
          </p>
        </div>
      )}

      {/* Complaint Details Modal */}
      {showDetailsModal && selectedComplaint && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setShowDetailsModal(false)}
          ></div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl z-50 w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Complaint Details
              </h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b">
                <div
                  className={`${selectedComplaint.color} w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md`}
                >
                  {selectedComplaint.tenant?.charAt(0)?.toUpperCase() || "T"}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">
                    {selectedComplaint.tenant}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Complaint #{selectedComplaint.id}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wider">
                    Category
                  </label>
                  <div className="flex items-center gap-2 mt-1">
                    <div
                      className={`${selectedComplaint.color} w-7 h-7 rounded-lg flex items-center justify-center text-white`}
                    >
                      {getCategoryIcon(selectedComplaint.category)}
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {selectedComplaint.category}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wider">
                    Status
                  </label>
                  <div className="mt-1">
                    {getStatusBadge(selectedComplaint.status)}
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wider">
                    Room & Branch
                  </label>
                  <p className="text-sm text-gray-700 mt-1">
                    Room {selectedComplaint.room_no} •{" "}
                    {selectedComplaint.branch_name}
                  </p>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </label>
                  <p className="text-sm text-gray-700 mt-1">
                    {formatDate(selectedComplaint.date)} at{" "}
                    {formatTime(selectedComplaint.time)}
                  </p>
                </div>
                {selectedComplaint.resolvedDate && (
                  <div className="col-span-2">
                    <label className="text-xs text-gray-500 uppercase tracking-wider">
                      Resolved Date
                    </label>
                    <p className="text-sm text-green-700 mt-1 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      {formatDate(selectedComplaint.resolvedDate)}
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider">
                  Title
                </label>
                <p className="text-sm font-medium text-gray-800 mt-1 bg-gray-50 p-2 rounded-lg">
                  {selectedComplaint.title}
                </p>
              </div>

              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider">
                  Description
                </label>
                <p className="text-sm text-gray-700 mt-1 bg-gray-50 p-3 rounded-lg leading-relaxed">
                  {selectedComplaint.description}
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                {selectedComplaint.status !== "resolved" && (
                  <button
                    onClick={() => {
                      setShowDetailsModal(false);
                      openResolveModal(selectedComplaint);
                    }}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all shadow-md"
                  >
                    Mark as Resolved
                  </button>
                )}
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Resolve Confirmation Modal */}
      {showResolveModal && selectedComplaint && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setShowResolveModal(false)}
          ></div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl z-50 w-full max-w-md p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Resolve Complaint
              </h2>
              <p className="text-gray-600 mb-4">
                Are you sure you want to mark this complaint as resolved?
              </p>
              <div className="bg-gray-50 p-3 rounded-lg mb-6">
                <p className="text-sm text-gray-500">Complaint</p>
                <p className="font-medium text-gray-800">
                  {selectedComplaint.title}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  #{selectedComplaint.id} • {selectedComplaint.tenant}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleResolveComplaint}
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {loading ? "Processing..." : "Yes, Resolve"}
                </button>
                <button
                  onClick={() => setShowResolveModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Complaints;
