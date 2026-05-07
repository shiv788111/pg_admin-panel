import React, { useState } from 'react';
import {
  Search,
  Download,
  Filter,
  ChevronLeft,
  ChevronRight,
  Eye,
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign,
  Users,
  TrendingUp,
  TrendingDown,
  Calendar,
  Home,
  User,
  Send,
  MessageCircle,
  Phone,
  Mail,
  Receipt
} from 'lucide-react';

const DueRentReport = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [blockFilter, setBlockFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDue, setSelectedDue] = useState(null);
  const itemsPerPage = 10;

  // Mock data for due rent records
  const dueRentRecords = [
    {
      id: 1,
      tenantName: 'Rajesh Kumar',
      roomNo: 'A-101',
      block: 'A',
      phone: '+91 98765 43210',
      email: 'rajesh.kumar@email.com',
      monthlyRent: 15000,
      dueAmount: 15000,
      dueMonths: 1,
      dueDate: '2024-10-01',
      lastPaidDate: '2024-09-01',
      status: 'overdue',
      paymentHistory: 'good',
      lateFee: 500,
      totalDue: 15500
    },
    {
      id: 2,
      tenantName: 'Priya Sharma',
      roomNo: 'B-202',
      block: 'B',
      phone: '+91 87654 32109',
      email: 'priya.sharma@email.com',
      monthlyRent: 18000,
      dueAmount: 18000,
      dueMonths: 1,
      dueDate: '2024-10-01',
      lastPaidDate: '2024-09-01',
      status: 'overdue',
      paymentHistory: 'good',
      lateFee: 500,
      totalDue: 18500
    },
    {
      id: 3,
      tenantName: 'Amit Verma',
      roomNo: 'C-303',
      block: 'C',
      phone: '+91 76543 21098',
      email: 'amit.verma@email.com',
      monthlyRent: 12000,
      dueAmount: 36000,
      dueMonths: 3,
      dueDate: '2024-08-01',
      lastPaidDate: '2024-07-01',
      status: 'critical',
      paymentHistory: 'poor',
      lateFee: 2500,
      totalDue: 38500
    },
    {
      id: 4,
      tenantName: 'Neha Gupta',
      roomNo: 'A-104',
      block: 'A',
      phone: '+91 65432 10987',
      email: 'neha.gupta@email.com',
      monthlyRent: 20000,
      dueAmount: 0,
      dueMonths: 0,
      dueDate: null,
      lastPaidDate: '2024-10-01',
      status: 'paid',
      paymentHistory: 'excellent',
      lateFee: 0,
      totalDue: 0
    },
    {
      id: 5,
      tenantName: 'Suresh Reddy',
      roomNo: 'B-205',
      block: 'B',
      phone: '+91 54321 09876',
      email: 'suresh.reddy@email.com',
      monthlyRent: 16000,
      dueAmount: 32000,
      dueMonths: 2,
      dueDate: '2024-09-01',
      lastPaidDate: '2024-08-01',
      status: 'critical',
      paymentHistory: 'poor',
      lateFee: 2000,
      totalDue: 34000
    },
    {
      id: 6,
      tenantName: 'Divya Singh',
      roomNo: 'D-401',
      block: 'D',
      phone: '+91 43210 98765',
      email: 'divya.singh@email.com',
      monthlyRent: 22000,
      dueAmount: 22000,
      dueMonths: 1,
      dueDate: '2024-10-01',
      lastPaidDate: '2024-09-01',
      status: 'overdue',
      paymentHistory: 'good',
      lateFee: 500,
      totalDue: 22500
    },
    {
      id: 7,
      tenantName: 'Manish Joshi',
      roomNo: 'C-307',
      block: 'C',
      phone: '+91 32109 87654',
      email: 'manish.joshi@email.com',
      monthlyRent: 14000,
      dueAmount: 14000,
      dueMonths: 1,
      dueDate: '2024-10-05',
      lastPaidDate: '2024-09-05',
      status: 'upcoming',
      paymentHistory: 'good',
      lateFee: 0,
      totalDue: 14000
    },
    {
      id: 8,
      tenantName: 'Kavita Nair',
      roomNo: 'A-110',
      block: 'A',
      phone: '+91 21098 76543',
      email: 'kavita.nair@email.com',
      monthlyRent: 17000,
      dueAmount: 0,
      dueMonths: 0,
      dueDate: null,
      lastPaidDate: '2024-10-01',
      status: 'paid',
      paymentHistory: 'excellent',
      lateFee: 0,
      totalDue: 0
    },
    {
      id: 9,
      tenantName: 'Rohit Mehta',
      roomNo: 'B-208',
      block: 'B',
      phone: '+91 10987 65432',
      email: 'rohit.mehta@email.com',
      monthlyRent: 19000,
      dueAmount: 19000,
      dueMonths: 1,
      dueDate: '2024-10-01',
      lastPaidDate: '2024-09-01',
      status: 'overdue',
      paymentHistory: 'good',
      lateFee: 500,
      totalDue: 19500
    },
    {
      id: 10,
      tenantName: 'Anjali Desai',
      roomNo: 'D-405',
      block: 'D',
      phone: '+91 09876 54321',
      email: 'anjali.desai@email.com',
      monthlyRent: 21000,
      dueAmount: 42000,
      dueMonths: 2,
      dueDate: '2024-09-01',
      lastPaidDate: '2024-08-01',
      status: 'critical',
      paymentHistory: 'late',
      lateFee: 2000,
      totalDue: 44000
    },
    {
      id: 11,
      tenantName: 'Vikram Singh',
      roomNo: 'E-501',
      block: 'E',
      phone: '+91 98765 12345',
      email: 'vikram.singh@email.com',
      monthlyRent: 35000,
      dueAmount: 35000,
      dueMonths: 1,
      dueDate: '2024-10-01',
      lastPaidDate: '2024-09-01',
      status: 'overdue',
      paymentHistory: 'good',
      lateFee: 500,
      totalDue: 35500
    },
    {
      id: 12,
      tenantName: 'Pooja Mehta',
      roomNo: 'C-310',
      block: 'C',
      phone: '+91 87654 98765',
      email: 'pooja.mehta@email.com',
      monthlyRent: 13000,
      dueAmount: 13000,
      dueMonths: 1,
      dueDate: '2024-10-10',
      lastPaidDate: '2024-09-10',
      status: 'upcoming',
      paymentHistory: 'excellent',
      lateFee: 0,
      totalDue: 13000
    }
  ];

  // Calculate statistics
  const totalDueAmount = dueRentRecords.reduce((sum, r) => sum + r.dueAmount, 0);
  const totalWithLateFee = dueRentRecords.reduce((sum, r) => sum + r.totalDue, 0);
  const totalOverdue = dueRentRecords.filter(r => r.status === 'overdue').length;
  const totalCritical = dueRentRecords.filter(r => r.status === 'critical').length;
  const totalUpcoming = dueRentRecords.filter(r => r.status === 'upcoming').length;
  const totalPaid = dueRentRecords.filter(r => r.status === 'paid').length;
  const overdueAmount = dueRentRecords.filter(r => r.status === 'overdue' || r.status === 'critical').reduce((sum, r) => sum + r.totalDue, 0);
  
  // Filter records
  const filteredRecords = dueRentRecords.filter(record => {
    const matchesSearch = record.tenantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          record.roomNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          record.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    const matchesBlock = blockFilter === 'all' || record.block === blockFilter;
    return matchesSearch && matchesStatus && matchesBlock;
  });

  // Pagination
  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRecords = filteredRecords.slice(startIndex, startIndex + itemsPerPage);

  const getStatusBadge = (status) => {
    switch(status) {
      case 'critical':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Critical</span>;
      case 'overdue':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-700 flex items-center gap-1"><Clock className="w-3 h-3" /> Overdue</span>;
      case 'upcoming':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700 flex items-center gap-1"><Calendar className="w-3 h-3" /> Upcoming</span>;
      case 'paid':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700 flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Paid</span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">{status}</span>;
    }
  };

  const getPaymentHistoryBadge = (history) => {
    switch(history) {
      case 'excellent':
        return <span className="text-xs text-green-600">Excellent</span>;
      case 'good':
        return <span className="text-xs text-blue-600">Good</span>;
      case 'late':
        return <span className="text-xs text-orange-600">Late Payments</span>;
      case 'poor':
        return <span className="text-xs text-red-600">Poor</span>;
      default:
        return <span className="text-xs text-gray-600">{history}</span>;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const getDaysOverdue = (dueDate) => {
    if (!dueDate) return 0;
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = today - due;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  // Reminder Modal
  const ReminderModal = ({ record, onClose }) => {
    const [message, setMessage] = useState(`Dear ${record.tenantName},\n\nThis is a reminder that your rent of ${formatCurrency(record.monthlyRent)} for room ${record.roomNo} is due. Current outstanding: ${formatCurrency(record.totalDue)}\n\nPlease make the payment at your earliest convenience.\n\nThank you.`);
    
    if (!record) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div className="bg-white rounded-xl shadow-xl max-w-lg w-full" onClick={e => e.stopPropagation()}>
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">Send Reminder</h2>
              <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg">✕</button>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">{record.tenantName}</p>
                <p className="text-sm text-gray-500">{record.roomNo} | {record.phone}</p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>
          <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
            <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">Cancel</button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Send className="w-4 h-4" />
              Send Reminder
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Payment Modal
  const PaymentModal = ({ record, onClose }) => {
    const [amount, setAmount] = useState(record.totalDue);
    const [mode, setMode] = useState('Cash');
    
    if (!record) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div className="bg-white rounded-xl shadow-xl max-w-md w-full" onClick={e => e.stopPropagation()}>
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">Record Payment</h2>
              <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg">✕</button>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500">Tenant</label>
                <p className="font-medium text-gray-800">{record.tenantName}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500">Room</label>
                <p className="font-medium text-gray-800">{record.roomNo}</p>
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500">Total Due</label>
              <p className="text-xl font-bold text-red-600">{formatCurrency(record.totalDue)}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Payment Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Payment Mode</label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Cash</option>
                <option>Bank Transfer</option>
                <option>Cheque</option>
                <option>UPI</option>
                <option>Credit Card</option>
              </select>
            </div>
          </div>
          <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
            <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">Cancel</button>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <CheckCircle className="w-4 h-4" />
              Record Payment
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Due Rent Report</h1>
        <p className="text-gray-500 mt-1">Track pending rents, overdue payments, and manage collections</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Total Due Amount</p>
              <p className="text-xl font-bold text-red-600">{formatCurrency(totalDueAmount)}</p>
            </div>
            <div className="w-9 h-9 bg-red-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-red-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">With Late Fee</p>
              <p className="text-xl font-bold text-orange-600">{formatCurrency(totalWithLateFee)}</p>
            </div>
            <div className="w-9 h-9 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-orange-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Overdue/Critical</p>
              <p className="text-xl font-bold text-red-700">{totalOverdue + totalCritical}</p>
            </div>
            <div className="w-9 h-9 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-4 h-4 text-red-700" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Upcoming</p>
              <p className="text-xl font-bold text-yellow-600">{totalUpcoming}</p>
            </div>
            <div className="w-9 h-9 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-4 h-4 text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Paid</p>
              <p className="text-xl font-bold text-green-600">{totalPaid}</p>
            </div>
            <div className="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Collection Rate</p>
              <p className="text-xl font-bold text-purple-600">
                {((dueRentRecords.filter(r => r.status === 'paid').length / dueRentRecords.length) * 100).toFixed(0)}%
              </p>
            </div>
            <div className="w-9 h-9 bg-purple-100 rounded-lg flex items-center justify-center">
              <Receipt className="w-4 h-4 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by tenant, room, phone..."
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
              <option value="critical">Critical</option>
              <option value="overdue">Overdue</option>
              <option value="upcoming">Upcoming</option>
              <option value="paid">Paid</option>
            </select>
            <select
              value={blockFilter}
              onChange={(e) => setBlockFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
            >
              <option value="all">All Blocks</option>
              <option value="A">Block A</option>
              <option value="B">Block B</option>
              <option value="C">Block C</option>
              <option value="D">Block D</option>
              <option value="E">Block E</option>
            </select>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Due Rent Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tenant</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monthly Rent</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Months</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Late Fee</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Due</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Paid</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-gray-800 text-sm">{record.tenantName}</p>
                      <p className="text-xs text-gray-500">{record.phone}</p>
                    </div>
                   </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-gray-700">{record.roomNo}</p>
                    <p className="text-xs text-gray-400">Block {record.block}</p>
                   </td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-800">{formatCurrency(record.monthlyRent)}</td>
                  <td className="px-4 py-3">
                    {record.dueMonths > 0 ? (
                      <span className="text-sm font-medium text-red-600">{record.dueMonths} month(s)</span>
                    ) : (
                      <span className="text-sm text-green-600">—</span>
                    )}
                   </td>
                  <td className="px-4 py-3 text-sm font-semibold text-red-600">{formatCurrency(record.dueAmount)}</td>
                  <td className="px-4 py-3 text-sm text-orange-600">{record.lateFee > 0 ? formatCurrency(record.lateFee) : '—'}</td>
                  <td className="px-4 py-3 text-sm font-bold text-red-700">{formatCurrency(record.totalDue)}</td>
                  <td className="px-4 py-3">{getStatusBadge(record.status)}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{formatDate(record.lastPaidDate)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => setSelectedDue(record)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {record.status !== 'paid' && (
                        <>
                          <button
                            onClick={() => setSelectedDue({...record, action: 'reminder'})}
                            className="p-1.5 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                            title="Send Reminder"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setSelectedDue({...record, action: 'payment'})}
                            className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Record Payment"
                          >
                            <DollarSign className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
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
            <p className="text-gray-500">No records found</p>
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

      {/* Modals */}
      {selectedDue && selectedDue.action === 'reminder' && (
        <ReminderModal record={selectedDue} onClose={() => setSelectedDue(null)} />
      )}
      {selectedDue && selectedDue.action === 'payment' && (
        <PaymentModal record={selectedDue} onClose={() => setSelectedDue(null)} />
      )}
      {selectedDue && !selectedDue.action && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedDue(null)}>
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-200 sticky top-0 bg-white">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">Due Rent Details</h2>
                <button onClick={() => setSelectedDue(null)} className="p-1 hover:bg-gray-100 rounded-lg">✕</button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500">Tenant Name</label>
                  <p className="font-medium text-gray-800">{selectedDue.tenantName}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Room Number</label>
                  <p className="font-medium text-gray-800">{selectedDue.roomNo}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Phone</label>
                  <p className="text-gray-700">{selectedDue.phone}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Email</label>
                  <p className="text-gray-700">{selectedDue.email}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Monthly Rent</label>
                  <p className="text-lg font-semibold text-gray-800">{formatCurrency(selectedDue.monthlyRent)}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Due Amount</label>
                  <p className="text-lg font-semibold text-red-600">{formatCurrency(selectedDue.dueAmount)}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Late Fee</label>
                  <p className="text-lg font-semibold text-orange-600">{formatCurrency(selectedDue.lateFee)}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Total Due</label>
                  <p className="text-lg font-bold text-red-700">{formatCurrency(selectedDue.totalDue)}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Due Date</label>
                  <p className="text-gray-700">{formatDate(selectedDue.dueDate)}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Days Overdue</label>
                  <p className="text-gray-700">{getDaysOverdue(selectedDue.dueDate)} days</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Last Paid Date</label>
                  <p className="text-gray-700">{formatDate(selectedDue.lastPaidDate)}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Payment History</label>
                  <p>{getPaymentHistoryBadge(selectedDue.paymentHistory)}</p>
                </div>
              </div>
              <div className="border-t pt-4">
                <label className="text-xs text-gray-500">Status</label>
                <div className="mt-1">{getStatusBadge(selectedDue.status)}</div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end gap-3 sticky bottom-0">
              <button onClick={() => setSelectedDue({...selectedDue, action: 'reminder'})} className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                <Send className="w-4 h-4" />
                Send Reminder
              </button>
              <button onClick={() => setSelectedDue({...selectedDue, action: 'payment'})} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                <DollarSign className="w-4 h-4" />
                Record Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DueRentReport;