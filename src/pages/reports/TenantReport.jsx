import React, { useState } from 'react';
import {
  Search,
  Filter,
  Download,
  User,
  Home,
  Phone,
  Mail,
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit,
  MoreVertical,
  Users,
  UserCheck,
  UserX,
  TrendingUp,
  MapPin,
  DollarSign
} from 'lucide-react';

const TenantReport = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roomTypeFilter, setRoomTypeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const itemsPerPage = 8;

  // Mock data for tenants
  const tenants = [
    { 
      id: 1, 
      name: 'Rajesh Kumar', 
      roomNo: 'A-101', 
      phone: '+91 98765 43210', 
      email: 'rajesh.kumar@email.com',
      moveInDate: '2024-01-01',
      rentAmount: 15000,
      depositAmount: 30000,
      status: 'active',
      emergencyContact: '+91 99887 66554',
      occupation: 'Software Engineer',
      aadharNumber: 'XXXX-XXXX-1234',
      leaseEndDate: '2024-12-31',
      paymentHistory: 'good'
    },
    { 
      id: 2, 
      name: 'Priya Sharma', 
      roomNo: 'B-202', 
      phone: '+91 87654 32109', 
      email: 'priya.sharma@email.com',
      moveInDate: '2024-02-15',
      rentAmount: 18000,
      depositAmount: 36000,
      status: 'active',
      emergencyContact: '+91 98765 43211',
      occupation: 'Marketing Manager',
      aadharNumber: 'XXXX-XXXX-5678',
      leaseEndDate: '2025-02-14',
      paymentHistory: 'good'
    },
    { 
      id: 3, 
      name: 'Amit Verma', 
      roomNo: 'C-303', 
      phone: '+91 76543 21098', 
      email: 'amit.verma@email.com',
      moveInDate: '2023-11-01',
      rentAmount: 12000,
      depositAmount: 24000,
      status: 'active',
      emergencyContact: '+91 87654 32198',
      occupation: 'Student',
      aadharNumber: 'XXXX-XXXX-9012',
      leaseEndDate: '2024-10-31',
      paymentHistory: 'late'
    },
    { 
      id: 4, 
      name: 'Neha Gupta', 
      roomNo: 'A-104', 
      phone: '+91 65432 10987', 
      email: 'neha.gupta@email.com',
      moveInDate: '2024-03-10',
      rentAmount: 20000,
      depositAmount: 40000,
      status: 'active',
      emergencyContact: '+91 76543 21087',
      occupation: 'Doctor',
      aadharNumber: 'XXXX-XXXX-3456',
      leaseEndDate: '2025-03-09',
      paymentHistory: 'good'
    },
    { 
      id: 5, 
      name: 'Suresh Reddy', 
      roomNo: 'B-205', 
      phone: '+91 54321 09876', 
      email: 'suresh.reddy@email.com',
      moveInDate: '2023-08-01',
      rentAmount: 16000,
      depositAmount: 32000,
      status: 'inactive',
      emergencyContact: '+91 65432 10976',
      occupation: 'Business Owner',
      aadharNumber: 'XXXX-XXXX-7890',
      leaseEndDate: '2024-07-31',
      paymentHistory: 'poor'
    },
    { 
      id: 6, 
      name: 'Divya Singh', 
      roomNo: 'D-401', 
      phone: '+91 43210 98765', 
      email: 'divya.singh@email.com',
      moveInDate: '2024-04-01',
      rentAmount: 22000,
      depositAmount: 44000,
      status: 'active',
      emergencyContact: '+91 54321 09865',
      occupation: 'Architect',
      aadharNumber: 'XXXX-XXXX-2345',
      leaseEndDate: '2025-03-31',
      paymentHistory: 'good'
    },
    { 
      id: 7, 
      name: 'Manish Joshi', 
      roomNo: 'C-307', 
      phone: '+91 32109 87654', 
      email: 'manish.joshi@email.com',
      moveInDate: '2024-01-20',
      rentAmount: 14000,
      depositAmount: 28000,
      status: 'active',
      emergencyContact: '+91 43210 98754',
      occupation: 'Teacher',
      aadharNumber: 'XXXX-XXXX-6789',
      leaseEndDate: '2025-01-19',
      paymentHistory: 'good'
    },
    { 
      id: 8, 
      name: 'Kavita Nair', 
      roomNo: 'A-110', 
      phone: '+91 21098 76543', 
      email: 'kavita.nair@email.com',
      moveInDate: '2023-12-15',
      rentAmount: 17000,
      depositAmount: 34000,
      status: 'active',
      emergencyContact: '+91 32109 87643',
      occupation: 'HR Professional',
      aadharNumber: 'XXXX-XXXX-0123',
      leaseEndDate: '2024-12-14',
      paymentHistory: 'good'
    },
    { 
      id: 9, 
      name: 'Rohit Mehta', 
      roomNo: 'B-208', 
      phone: '+91 10987 65432', 
      email: 'rohit.mehta@email.com',
      moveInDate: '2024-05-01',
      rentAmount: 19000,
      depositAmount: 38000,
      status: 'active',
      emergencyContact: '+91 21098 76532',
      occupation: 'CA',
      aadharNumber: 'XXXX-XXXX-4567',
      leaseEndDate: '2025-04-30',
      paymentHistory: 'good'
    },
    { 
      id: 10, 
      name: 'Anjali Desai', 
      roomNo: 'D-405', 
      phone: '+91 09876 54321', 
      email: 'anjali.desai@email.com',
      moveInDate: '2023-09-10',
      rentAmount: 21000,
      depositAmount: 42000,
      status: 'pending',
      emergencyContact: '+91 10987 65421',
      occupation: 'Designer',
      aadharNumber: 'XXXX-XXXX-8901',
      leaseEndDate: '2024-09-09',
      paymentHistory: 'late'
    },
  ];

  // Filter tenants
  const filteredTenants = tenants.filter(tenant => {
    const matchesSearch = tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tenant.roomNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tenant.phone.includes(searchTerm) ||
                          tenant.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || tenant.status === statusFilter;
    
    const matchesRoomType = roomTypeFilter === 'all' || 
                            (roomTypeFilter === 'A' && tenant.roomNo.startsWith('A')) ||
                            (roomTypeFilter === 'B' && tenant.roomNo.startsWith('B')) ||
                            (roomTypeFilter === 'C' && tenant.roomNo.startsWith('C')) ||
                            (roomTypeFilter === 'D' && tenant.roomNo.startsWith('D'));
    
    return matchesSearch && matchesStatus && matchesRoomType;
  });

  // Pagination
  const totalPages = Math.ceil(filteredTenants.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTenants = filteredTenants.slice(startIndex, startIndex + itemsPerPage);

  // Statistics
  const totalTenants = tenants.length;
  const activeTenants = tenants.filter(t => t.status === 'active').length;
  const inactiveTenants = tenants.filter(t => t.status === 'inactive').length;
  const pendingTenants = tenants.filter(t => t.status === 'pending').length;
  const totalMonthlyRent = tenants.filter(t => t.status === 'active').reduce((sum, t) => sum + t.rentAmount, 0);
  const avgRent = totalMonthlyRent / activeTenants || 0;

  const getStatusBadge = (status) => {
    switch(status) {
      case 'active':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">Active</span>;
      case 'inactive':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700">Inactive</span>;
      case 'pending':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700">Pending</span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">{status}</span>;
    }
  };

  const getPaymentBadge = (history) => {
    switch(history) {
      case 'good':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-700">On Time</span>;
      case 'late':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-700">Late Payments</span>;
      case 'poor':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700">Poor</span>;
      default:
        return null;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  // Calculate days until lease end
  const getDaysUntilEnd = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return 'Expired';
    if (diffDays === 0) return 'Today';
    return `${diffDays} days left`;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Tenant Report</h1>
        <p className="text-gray-500 mt-1">Manage and track all tenant information</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Tenants</p>
              <p className="text-2xl font-bold text-gray-800">{totalTenants}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Tenants</p>
              <p className="text-2xl font-bold text-green-600">{activeTenants}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Inactive</p>
              <p className="text-2xl font-bold text-red-600">{inactiveTenants}</p>
            </div>
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <UserX className="w-5 h-5 text-red-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Monthly Rent</p>
              <p className="text-2xl font-bold text-purple-600">{formatCurrency(totalMonthlyRent)}</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg. Rent</p>
              <p className="text-2xl font-bold text-orange-600">{formatCurrency(avgRent)}</p>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4 items-center">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, room, phone, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-72 text-sm"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>

            {/* Room Block Filter */}
            <select
              value={roomTypeFilter}
              onChange={(e) => setRoomTypeFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
            >
              <option value="all">All Blocks</option>
              <option value="A">Block A</option>
              <option value="B">Block B</option>
              <option value="C">Block C</option>
              <option value="D">Block D</option>
            </select>
          </div>

          {/* Export Button */}
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Tenants Grid/Card View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {paginatedTenants.map((tenant) => (
          <div key={tenant.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                    {tenant.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg">{tenant.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Home className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-sm text-gray-600">Room {tenant.roomNo}</span>
                      {getStatusBadge(tenant.status)}
                      {getPaymentBadge(tenant.paymentHistory)}
                    </div>
                  </div>
                </div>
                <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreVertical className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-700">{tenant.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-700 truncate">{tenant.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-700">Move in: {formatDate(tenant.moveInDate)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-700">{getDaysUntilEnd(tenant.leaseEndDate)}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-500">Monthly Rent</p>
                  <p className="font-semibold text-gray-800">{formatCurrency(tenant.rentAmount)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Security Deposit</p>
                  <p className="font-semibold text-gray-800">{formatCurrency(tenant.depositAmount)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Occupation</p>
                  <p className="text-sm text-gray-700">{tenant.occupation}</p>
                </div>
                <button className="flex items-center gap-1 px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium">
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {paginatedTenants.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 text-center py-12">
          <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No tenants found</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between bg-white rounded-xl shadow-sm border border-gray-100 px-6 py-4">
          <p className="text-sm text-gray-600">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredTenants.length)} of {filteredTenants.length} tenants
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-1">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                    currentPage === i + 1
                      ? 'bg-blue-600 text-white'
                      : 'border border-gray-300 hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TenantReport;