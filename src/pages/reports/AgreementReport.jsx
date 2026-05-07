import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Calendar, 
  FileText, 
  User, 
  Home, 
  Clock,
  ChevronLeft,
  ChevronRight,
  Eye,
  Printer
} from 'lucide-react';

const AgreementReport = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [dateRange, setDateRange] = useState('last30');
  const itemsPerPage = 8;

  // Mock data for agreements
  const agreements = [
    { id: 1, tenantName: 'Rajesh Kumar', roomNo: 'A-101', agreementStart: '2024-01-01', agreementEnd: '2024-12-31', rent: 15000, deposit: 30000, status: 'active', signedDate: '2024-01-01' },
    { id: 2, tenantName: 'Priya Sharma', roomNo: 'B-202', agreementStart: '2024-02-15', agreementEnd: '2025-02-14', rent: 18000, deposit: 36000, status: 'active', signedDate: '2024-02-15' },
    { id: 3, tenantName: 'Amit Verma', roomNo: 'C-303', agreementStart: '2023-11-01', agreementEnd: '2024-10-31', rent: 12000, deposit: 24000, status: 'expiring_soon', signedDate: '2023-11-01' },
    { id: 4, tenantName: 'Neha Gupta', roomNo: 'A-104', agreementStart: '2024-03-10', agreementEnd: '2025-03-09', rent: 20000, deposit: 40000, status: 'active', signedDate: '2024-03-10' },
    { id: 5, tenantName: 'Suresh Reddy', roomNo: 'B-205', agreementStart: '2023-08-01', agreementEnd: '2024-07-31', rent: 16000, deposit: 32000, status: 'expired', signedDate: '2023-08-01' },
    { id: 6, tenantName: 'Divya Singh', roomNo: 'D-401', agreementStart: '2024-04-01', agreementEnd: '2025-03-31', rent: 22000, deposit: 44000, status: 'active', signedDate: '2024-04-01' },
    { id: 7, tenantName: 'Manish Joshi', roomNo: 'C-307', agreementStart: '2024-01-20', agreementEnd: '2025-01-19', rent: 14000, deposit: 28000, status: 'active', signedDate: '2024-01-20' },
    { id: 8, tenantName: 'Kavita Nair', roomNo: 'A-110', agreementStart: '2023-12-15', agreementEnd: '2024-12-14', rent: 17000, deposit: 34000, status: 'active', signedDate: '2023-12-15' },
    { id: 9, tenantName: 'Rohit Mehta', roomNo: 'B-208', agreementStart: '2024-05-01', agreementEnd: '2025-04-30', rent: 19000, deposit: 38000, status: 'active', signedDate: '2024-05-01' },
    { id: 10, tenantName: 'Anjali Desai', roomNo: 'D-405', agreementStart: '2023-09-10', agreementEnd: '2024-09-09', rent: 21000, deposit: 42000, status: 'expiring_soon', signedDate: '2023-09-10' },
  ];

  // Filter agreements based on search, status, and date range
  const filteredAgreements = agreements.filter(agreement => {
    const matchesSearch = agreement.tenantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          agreement.roomNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          agreement.id.toString().includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || agreement.status === statusFilter;
    
    let matchesDateRange = true;
    const today = new Date();
    const agreementStart = new Date(agreement.agreementStart);
    
    if (dateRange === 'last30') {
      const thirtyDaysAgo = new Date(today.setDate(today.getDate() - 30));
      matchesDateRange = agreementStart >= thirtyDaysAgo;
    } else if (dateRange === 'last90') {
      const ninetyDaysAgo = new Date(today.setDate(today.getDate() - 90));
      matchesDateRange = agreementStart >= ninetyDaysAgo;
    } else if (dateRange === 'thisYear') {
      matchesDateRange = agreementStart.getFullYear() === new Date().getFullYear();
    }
    
    return matchesSearch && matchesStatus && matchesDateRange;
  });

  // Pagination
  const totalPages = Math.ceil(filteredAgreements.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAgreements = filteredAgreements.slice(startIndex, startIndex + itemsPerPage);

  const getStatusBadge = (status) => {
    switch(status) {
      case 'active':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">Active</span>;
      case 'expiring_soon':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700">Expiring Soon</span>;
      case 'expired':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700">Expired</span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">{status}</span>;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  // Summary stats
  const totalActive = agreements.filter(a => a.status === 'active').length;
  const totalExpiringSoon = agreements.filter(a => a.status === 'expiring_soon').length;
  const totalExpired = agreements.filter(a => a.status === 'expired').length;
  const totalRentValue = agreements.filter(a => a.status === 'active').reduce((sum, a) => sum + a.rent, 0);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Agreement Report</h1>
        <p className="text-gray-500 mt-1">Manage and track all tenant agreements</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Agreements</p>
              <p className="text-2xl font-bold text-gray-800">{agreements.length}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Agreements</p>
              <p className="text-2xl font-bold text-green-600">{totalActive}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Expiring Soon</p>
              <p className="text-2xl font-bold text-yellow-600">{totalExpiringSoon}</p>
            </div>
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Monthly Rent (Active)</p>
              <p className="text-2xl font-bold text-purple-600">{formatCurrency(totalRentValue)}</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 text-purple-600" />
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
                placeholder="Search by tenant, room..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64 text-sm"
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
              <option value="expiring_soon">Expiring Soon</option>
              <option value="expired">Expired</option>
            </select>

            {/* Date Range */}
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
            >
              <option value="all">All Time</option>
              <option value="last30">Last 30 Days</option>
              <option value="last90">Last 90 Days</option>
              <option value="thisYear">This Year</option>
            </select>
          </div>

          {/* Export Button */}
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Agreements Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agreement ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tenant Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monthly Rent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deposit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedAgreements.map((agreement) => (
                <tr key={agreement.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{agreement.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{agreement.tenantName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{agreement.roomNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatDate(agreement.agreementStart)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatDate(agreement.agreementEnd)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{formatCurrency(agreement.rent)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatCurrency(agreement.deposit)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(agreement.status)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex gap-2">
                      <button className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="View Agreement">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-600 hover:bg-gray-100 rounded transition-colors" title="Print">
                        <Printer className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {paginatedAgreements.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No agreements found</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
            <p className="text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredAgreements.length)} of {filteredAgreements.length} agreements
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
    </div>
  );
};

export default AgreementReport;