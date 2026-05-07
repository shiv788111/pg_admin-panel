import React, { useState } from 'react';
import {
  Search,
  Download,
  Filter,
  ChevronLeft,
  ChevronRight,
  Eye,
  Receipt,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Clock,
  Users,
  DollarSign,
  Banknote,
  FileText,
  Calendar,
  Home,
  User,
  MessageCircle
} from 'lucide-react';

const RefundReport = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRefund, setSelectedRefund] = useState(null);
  const itemsPerPage = 8;

  // Mock data for refund records
  const refundRecords = [
    {
      id: 1,
      tenantName: 'Rajesh Kumar',
      roomNo: 'A-101',
      moveInDate: '2024-01-01',
      moveOutDate: '2024-06-30',
      depositSubmitted: 30000,
      refundAmount: 28000,
      deductionAmount: 2000,
      deductionReason: 'Paint damage (₹1500), Key replacement (₹500)',
      refundDate: '2024-07-15',
      status: 'completed',
      paymentMode: 'Bank Transfer',
      transactionId: 'TXNHDFC123456',
      remarks: 'Full refund minus minor damages'
    },
    {
      id: 2,
      tenantName: 'Priya Sharma',
      roomNo: 'B-202',
      moveInDate: '2024-02-15',
      moveOutDate: '2024-08-20',
      depositSubmitted: 36000,
      refundAmount: 36000,
      deductionAmount: 0,
      deductionReason: 'No damages',
      refundDate: '2024-08-28',
      status: 'completed',
      paymentMode: 'Cheque',
      transactionId: 'CHQ002345',
      remarks: 'Property in excellent condition'
    },
    {
      id: 3,
      tenantName: 'Amit Verma',
      roomNo: 'C-303',
      moveInDate: '2023-11-01',
      moveOutDate: '2024-07-31',
      depositSubmitted: 24000,
      refundAmount: 18000,
      deductionAmount: 6000,
      deductionReason: 'Broken window (₹3000), Plumbing issue (₹2000), Cleaning (₹1000)',
      refundDate: '2024-08-10',
      status: 'completed',
      paymentMode: 'Bank Transfer',
      transactionId: 'TXNSBI789012',
      remarks: 'Multiple damages reported'
    },
    {
      id: 4,
      tenantName: 'Suresh Reddy',
      roomNo: 'B-205',
      moveInDate: '2023-08-01',
      moveOutDate: '2024-07-31',
      depositSubmitted: 32000,
      refundAmount: 0,
      deductionAmount: 32000,
      deductionReason: 'Outstanding rent (₹15000), Electricity bill (₹5000), Major repairs (₹12000)',
      refundDate: null,
      status: 'pending',
      paymentMode: null,
      transactionId: null,
      remarks: 'Under review - dispute raised'
    },
    {
      id: 5,
      tenantName: 'Divya Singh',
      roomNo: 'D-401',
      moveInDate: '2024-04-01',
      moveOutDate: '2024-09-15',
      depositSubmitted: 44000,
      refundAmount: 41000,
      deductionAmount: 3000,
      deductionReason: 'Paint touch-up (₹2000), Deep cleaning (₹1000)',
      refundDate: '2024-09-25',
      status: 'completed',
      paymentMode: 'UPI',
      transactionId: 'UPI9988776655',
      remarks: 'Minor wear and tear'
    },
    {
      id: 6,
      tenantName: 'Manish Joshi',
      roomNo: 'C-307',
      moveInDate: '2024-01-20',
      moveOutDate: '2024-08-25',
      depositSubmitted: 28000,
      refundAmount: 26000,
      deductionAmount: 2000,
      deductionReason: 'Missing furniture (₹1500), Cleaning (₹500)',
      refundDate: '2024-09-05',
      status: 'completed',
      paymentMode: 'Bank Transfer',
      transactionId: 'TXNCAN123789',
      remarks: 'Some items missing'
    },
    {
      id: 7,
      tenantName: 'Kavita Nair',
      roomNo: 'A-110',
      moveInDate: '2023-12-15',
      moveOutDate: '2024-10-10',
      depositSubmitted: 34000,
      refundAmount: null,
      deductionAmount: null,
      deductionReason: 'Processing - Final inspection pending',
      refundDate: null,
      status: 'processing',
      paymentMode: null,
      transactionId: null,
      remarks: 'Awaiting inspection report'
    },
    {
      id: 8,
      tenantName: 'Rohit Mehta',
      roomNo: 'B-208',
      moveInDate: '2024-05-01',
      moveOutDate: '2024-10-05',
      depositSubmitted: 38000,
      refundAmount: 35000,
      deductionAmount: 3000,
      deductionReason: 'AC service (₹1500), Painting (₹1500)',
      refundDate: '2024-10-18',
      status: 'completed',
      paymentMode: 'Cheque',
      transactionId: 'CHQ005678',
      remarks: 'Good condition overall'
    },
    {
      id: 9,
      tenantName: 'Anjali Desai',
      roomNo: 'D-405',
      moveInDate: '2023-09-10',
      moveOutDate: '2024-09-09',
      depositSubmitted: 42000,
      refundAmount: 40000,
      deductionAmount: 2000,
      deductionReason: 'Cleaning charges',
      refundDate: '2024-09-20',
      status: 'completed',
      paymentMode: 'UPI',
      transactionId: 'UPI5566778899',
      remarks: 'Well maintained'
    },
    {
      id: 10,
      tenantName: 'Neha Gupta',
      roomNo: 'A-104',
      moveInDate: '2024-03-10',
      moveOutDate: '2024-10-30',
      depositSubmitted: 40000,
      refundAmount: null,
      deductionAmount: null,
      deductionReason: 'Pending approval',
      refundDate: null,
      status: 'pending',
      paymentMode: null,
      transactionId: null,
      remarks: 'Waiting for manager approval'
    },
  ];

  // Filter refund records
  const filteredRecords = refundRecords.filter(record => {
    const matchesSearch = record.tenantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          record.roomNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          record.transactionId?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    
    let matchesDate = true;
    if (dateFilter === 'last30') {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      matchesDate = record.refundDate && new Date(record.refundDate) >= thirtyDaysAgo;
    } else if (dateFilter === 'last90') {
      const ninetyDaysAgo = new Date();
      ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
      matchesDate = record.refundDate && new Date(record.refundDate) >= ninetyDaysAgo;
    }
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  // Pagination
  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRecords = filteredRecords.slice(startIndex, startIndex + itemsPerPage);

  // Statistics
  const totalDeposits = refundRecords.reduce((sum, r) => sum + r.depositSubmitted, 0);
  const totalRefunded = refundRecords.filter(r => r.refundAmount).reduce((sum, r) => sum + (r.refundAmount || 0), 0);
  const totalDeductions = refundRecords.filter(r => r.deductionAmount).reduce((sum, r) => sum + (r.deductionAmount || 0), 0);
  const pendingRefunds = refundRecords.filter(r => r.status === 'pending' || r.status === 'processing').length;
  const pendingAmount = refundRecords
    .filter(r => r.status === 'pending' || r.status === 'processing')
    .reduce((sum, r) => sum + r.depositSubmitted, 0);
  const completedCount = refundRecords.filter(r => r.status === 'completed').length;
  const avgRefundPercentage = totalRefunded > 0 ? (totalRefunded / totalDeposits) * 100 : 0;

  const getStatusBadge = (status) => {
    switch(status) {
      case 'completed':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700 flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Completed</span>;
      case 'pending':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Pending</span>;
      case 'processing':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700 flex items-center gap-1"><Clock className="w-3 h-3" /> Processing</span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">{status}</span>;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const formatCurrency = (amount) => {
    if (amount === null || amount === undefined) return '—';
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  // Modal for refund details
  const RefundDetailsModal = ({ record, onClose }) => {
    if (!record) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">Refund Details</h2>
              <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg">✕</button>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500">Tenant Name</label>
                <p className="font-medium text-gray-800">{record.tenantName}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500">Room No</label>
                <p className="font-medium text-gray-800">{record.roomNo}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500">Move In Date</label>
                <p className="text-gray-700">{formatDate(record.moveInDate)}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500">Move Out Date</label>
                <p className="text-gray-700">{formatDate(record.moveOutDate)}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500">Deposit Submitted</label>
                <p className="text-lg font-semibold text-green-600">{formatCurrency(record.depositSubmitted)}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500">Refund Amount</label>
                <p className="text-lg font-semibold text-blue-600">{formatCurrency(record.refundAmount)}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500">Deduction Amount</label>
                <p className="text-lg font-semibold text-red-600">{formatCurrency(record.deductionAmount)}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500">Status</label>
                <div>{getStatusBadge(record.status)}</div>
              </div>
            </div>
            <div className="border-t pt-4">
              <label className="text-xs text-gray-500">Deduction Reason</label>
              <p className="text-gray-700 bg-gray-50 p-3 rounded-lg mt-1">{record.deductionReason || '—'}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500">Refund Date</label>
                <p className="text-gray-700">{formatDate(record.refundDate)}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500">Payment Mode</label>
                <p className="text-gray-700">{record.paymentMode || '—'}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500">Transaction ID</label>
                <p className="text-gray-700">{record.transactionId || '—'}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500">Remarks</label>
                <p className="text-gray-700">{record.remarks || '—'}</p>
              </div>
            </div>
          </div>
          <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end">
            <button onClick={onClose} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Close</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Refund Report</h1>
        <p className="text-gray-500 mt-1">Track security deposit refunds, deductions, and pending amounts</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Total Deposits</p>
              <p className="text-xl font-bold text-gray-800">{formatCurrency(totalDeposits)}</p>
            </div>
            <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center">
              <Banknote className="w-4 h-4 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Total Refunded</p>
              <p className="text-xl font-bold text-green-600">{formatCurrency(totalRefunded)}</p>
            </div>
            <div className="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Total Deductions</p>
              <p className="text-xl font-bold text-red-600">{formatCurrency(totalDeductions)}</p>
            </div>
            <div className="w-9 h-9 bg-red-100 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-4 h-4 text-red-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Pending Refunds</p>
              <p className="text-xl font-bold text-orange-600">{pendingRefunds}</p>
            </div>
            <div className="w-9 h-9 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-4 h-4 text-orange-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Pending Amount</p>
              <p className="text-xl font-bold text-purple-600">{formatCurrency(pendingAmount)}</p>
            </div>
            <div className="w-9 h-9 bg-purple-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-4 h-4 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Refund Rate</p>
              <p className="text-xl font-bold text-indigo-600">{avgRefundPercentage.toFixed(1)}%</p>
            </div>
            <div className="w-9 h-9 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Receipt className="w-4 h-4 text-indigo-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by tenant, room, transaction..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-72 text-sm"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
            </select>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
            >
              <option value="all">All Time</option>
              <option value="last30">Last 30 Days</option>
              <option value="last90">Last 90 Days</option>
            </select>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Refunds Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tenant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deposit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Refund</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deduction</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Refund Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-medium text-sm">
                        {record.tenantName.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-gray-800">{record.tenantName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{record.roomNo}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-green-600">{formatCurrency(record.depositSubmitted)}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-blue-600">{formatCurrency(record.refundAmount)}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-red-600">{formatCurrency(record.deductionAmount)}</td>
                  <td className="px-6 py-4">{getStatusBadge(record.status)}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{formatDate(record.refundDate)}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedRefund(record)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {paginatedRecords.length === 0 && (
          <div className="text-center py-12">
            <Receipt className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No refund records found</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
            <p className="text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredRecords.length)} of {filteredRecords.length} records
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

      {/* Details Modal */}
      {selectedRefund && (
        <RefundDetailsModal record={selectedRefund} onClose={() => setSelectedRefund(null)} />
      )}
    </div>
  );
};

export default RefundReport;