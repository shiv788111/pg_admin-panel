import React, { useState } from 'react';
import {
  Search,
  Download,
  ChevronLeft,
  ChevronRight,
  Eye,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar as CalendarIcon,
  Banknote,
  CreditCard,
  Smartphone,
  Landmark,
  Receipt,
  Users,
  Home,
  Clock,
  Filter,
  ChevronDown,
  FileText,
  Printer
} from 'lucide-react';

const DaywiseReport = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [paymentModeFilter, setPaymentModeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const itemsPerPage = 10;

  // Mock data for daywise transactions
  const generateTransactionsForDate = (date) => {
    // Different data for different dates to show variety
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    
    const baseTransactions = {
      '2024-10-01': [
        { id: 1, time: '09:30 AM', tenantName: 'Rajesh Kumar', roomNo: 'A-101', type: 'rent', amount: 15000, mode: 'Bank Transfer', status: 'completed', reference: 'TXNHDFC001', notes: 'October rent' },
        { id: 2, time: '10:15 AM', tenantName: 'Priya Sharma', roomNo: 'B-202', type: 'rent', amount: 18000, mode: 'UPI', status: 'completed', reference: 'UPI123456', notes: 'Monthly rent' },
        { id: 3, time: '11:00 AM', tenantName: 'Amit Verma', roomNo: 'C-303', type: 'late_fee', amount: 500, mode: 'Cash', status: 'completed', reference: 'CASH001', notes: 'Late fee for September' },
        { id: 4, time: '02:30 PM', tenantName: 'Neha Gupta', roomNo: 'A-104', type: 'rent', amount: 20000, mode: 'Cheque', status: 'pending', reference: 'CHQ1234', notes: 'October rent' },
        { id: 5, time: '03:45 PM', tenantName: 'Suresh Reddy', roomNo: 'B-205', type: 'security_deposit', amount: 32000, mode: 'Bank Transfer', status: 'completed', reference: 'TXNSBI002', notes: 'Security deposit refund' },
        { id: 6, time: '04:00 PM', tenantName: 'Divya Singh', roomNo: 'D-401', type: 'rent', amount: 22000, mode: 'UPI', status: 'completed', reference: 'UPI789012', notes: 'October rent' },
        { id: 7, time: '05:30 PM', tenantName: 'Manish Joshi', roomNo: 'C-307', type: 'maintenance', amount: 1500, mode: 'Cash', status: 'completed', reference: 'CASH002', notes: 'AC repair' }
      ],
      '2024-10-02': [
        { id: 8, time: '10:00 AM', tenantName: 'Kavita Nair', roomNo: 'A-110', type: 'rent', amount: 17000, mode: 'Bank Transfer', status: 'completed', reference: 'TXNCAN003', notes: 'October rent' },
        { id: 9, time: '11:30 AM', tenantName: 'Rohit Mehta', roomNo: 'B-208', type: 'rent', amount: 19000, mode: 'UPI', status: 'completed', reference: 'UPI345678', notes: 'Monthly rent' },
        { id: 10, time: '01:00 PM', tenantName: 'Anjali Desai', roomNo: 'D-405', type: 'rent', amount: 21000, mode: 'Cheque', status: 'completed', reference: 'CHQ5678', notes: 'October rent' },
        { id: 11, time: '03:00 PM', tenantName: 'Vikram Singh', roomNo: 'E-501', type: 'electricity', amount: 2500, mode: 'UPI', status: 'completed', reference: 'UPI901234', notes: 'Electricity bill' },
        { id: 12, time: '04:30 PM', tenantName: 'Pooja Mehta', roomNo: 'C-310', type: 'rent', amount: 13000, mode: 'Cash', status: 'pending', reference: 'CASH003', notes: 'October rent' }
      ],
      '2024-10-03': [
        { id: 13, time: '09:00 AM', tenantName: 'Rajesh Kumar', roomNo: 'A-101', type: 'maintenance', amount: 2000, mode: 'UPI', status: 'completed', reference: 'UPI567890', notes: 'Plumbing repair' },
        { id: 14, time: '11:00 AM', tenantName: 'Priya Sharma', roomNo: 'B-202', type: 'late_fee', amount: 500, mode: 'Bank Transfer', status: 'completed', reference: 'TXNHDFC004', notes: 'Late fee' },
        { id: 15, time: '02:00 PM', tenantName: 'Amit Verma', roomNo: 'C-303', type: 'rent', amount: 12000, mode: 'Cash', status: 'completed', reference: 'CASH004', notes: 'Partial payment' },
        { id: 16, time: '05:00 PM', tenantName: 'New Tenant', roomNo: 'B-206', type: 'security_deposit', amount: 30000, mode: 'Bank Transfer', status: 'completed', reference: 'TXNSBI005', notes: 'New tenant deposit' }
      ]
    };
    
    return baseTransactions[date] || [
      { id: 1, time: '10:00 AM', tenantName: 'Sample Tenant', roomNo: 'A-101', type: 'rent', amount: 15000, mode: 'Cash', status: 'completed', reference: 'SAMPLE001', notes: 'Sample transaction' }
    ];
  };

  const transactions = generateTransactionsForDate(selectedDate);
  
  // Get unique dates for calendar view (last 30 days)
  const getLast30Days = () => {
    const dates = [];
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  const availableDates = getLast30Days();

  // Calculate statistics for selected date
  const totalCollections = transactions
    .filter(t => t.type === 'rent' || t.type === 'late_fee' || t.type === 'maintenance' || t.type === 'electricity')
    .reduce((sum, t) => sum + (t.status === 'completed' ? t.amount : 0), 0);
  
  const totalRefunds = transactions
    .filter(t => t.type === 'security_deposit')
    .reduce((sum, t) => sum + (t.status === 'completed' ? t.amount : 0), 0);
  
  const pendingAmount = transactions
    .filter(t => t.status === 'pending')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const completedCount = transactions.filter(t => t.status === 'completed').length;
  const pendingCount = transactions.filter(t => t.status === 'pending').length;
  
  // Payment mode wise totals
  const cashTotal = transactions.filter(t => t.mode === 'Cash' && t.status === 'completed').reduce((sum, t) => sum + t.amount, 0);
  const bankTotal = transactions.filter(t => t.mode === 'Bank Transfer' && t.status === 'completed').reduce((sum, t) => sum + t.amount, 0);
  const upiTotal = transactions.filter(t => t.mode === 'UPI' && t.status === 'completed').reduce((sum, t) => sum + t.amount, 0);
  const chequeTotal = transactions.filter(t => t.mode === 'Cheque' && t.status === 'completed').reduce((sum, t) => sum + t.amount, 0);

  // Filter transactions
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.tenantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          transaction.roomNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          transaction.reference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMode = paymentModeFilter === 'all' || transaction.mode === paymentModeFilter;
    return matchesSearch && matchesMode;
  });

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage);

  const getTransactionTypeBadge = (type) => {
    switch(type) {
      case 'rent':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">Rent</span>;
      case 'late_fee':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-700">Late Fee</span>;
      case 'maintenance':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">Maintenance</span>;
      case 'electricity':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700">Electricity</span>;
      case 'security_deposit':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-700">Security Deposit</span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">{type}</span>;
    }
  };

  const getPaymentModeIcon = (mode) => {
    switch(mode) {
      case 'Cash':
        return <Banknote className="w-4 h-4" />;
      case 'Bank Transfer':
        return <Landmark className="w-4 h-4" />;
      case 'UPI':
        return <Smartphone className="w-4 h-4" />;
      case 'Cheque':
        return <CreditCard className="w-4 h-4" />;
      default:
        return <DollarSign className="w-4 h-4" />;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  const formatDateDisplay = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  const getDayName = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', { weekday: 'long' });
  };

  // Transaction Details Modal
  const TransactionModal = ({ transaction, onClose }) => {
    if (!transaction) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div className="bg-white rounded-xl shadow-xl max-w-md w-full" onClick={e => e.stopPropagation()}>
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">Transaction Details</h2>
              <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg">✕</button>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-xs text-gray-500">Amount</p>
                <p className="text-2xl font-bold text-gray-800">{formatCurrency(transaction.amount)}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Time</p>
                <p className="font-medium text-gray-700">{transaction.time}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500">Tenant Name</label>
                <p className="font-medium text-gray-800">{transaction.tenantName}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500">Room Number</label>
                <p className="font-medium text-gray-800">{transaction.roomNo}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500">Transaction Type</label>
                <div>{getTransactionTypeBadge(transaction.type)}</div>
              </div>
              <div>
                <label className="text-xs text-gray-500">Payment Mode</label>
                <div className="flex items-center gap-2 mt-1">
                  {getPaymentModeIcon(transaction.mode)}
                  <span className="text-gray-700">{transaction.mode}</span>
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500">Status</label>
                <p className="text-green-600 font-medium">{transaction.status}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500">Reference</label>
                <p className="text-gray-700 text-sm">{transaction.reference}</p>
              </div>
            </div>
            <div className="border-t pt-4">
              <label className="text-xs text-gray-500">Notes</label>
              <p className="text-gray-700 bg-gray-50 p-3 rounded-lg mt-1">{transaction.notes || 'No notes'}</p>
            </div>
          </div>
          <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end">
            <button onClick={onClose} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Close</button>
          </div>
        </div>
      </div>
    );
  };

  // Date selector component
  const DateSelector = () => {
    const [showCalendar, setShowCalendar] = useState(false);
    
    return (
      <div className="relative">
        <button
          onClick={() => setShowCalendar(!showCalendar)}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <CalendarIcon className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium">{formatDateDisplay(selectedDate)}</span>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </button>
        
        {showCalendar && (
          <div className="absolute top-full mt-2 left-0 bg-white rounded-xl shadow-lg border border-gray-200 z-20 w-72">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <button className="p-1 hover:bg-gray-100 rounded">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="font-medium">October 2024</span>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-3">
              <div className="grid grid-cols-7 gap-1 text-center mb-2">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                  <div key={day} className="text-xs text-gray-500 py-1">{day}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {availableDates.slice(0, 30).map((date, index) => {
                  const dateNum = new Date(date).getDate();
                  const isSelected = date === selectedDate;
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedDate(date);
                        setShowCalendar(false);
                      }}
                      className={`py-1.5 text-sm rounded-lg transition-colors ${
                        isSelected
                          ? 'bg-blue-600 text-white'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      {dateNum}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="p-3 border-t border-gray-200">
              <button
                onClick={() => {
                  setSelectedDate(new Date().toISOString().split('T')[0]);
                  setShowCalendar(false);
                }}
                className="w-full text-center text-sm text-blue-600 hover:text-blue-700"
              >
                Today
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Daywise Report</h1>
        <p className="text-gray-500 mt-1">Track daily transactions, collections, and financial activity</p>
      </div>

      {/* Date Selector and Summary */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
          <DateSelector />
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
              <Download className="w-4 h-4" />
              Export Report
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 bg-white rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
              <Printer className="w-4 h-4" />
              Print
            </button>
          </div>
        </div>
        
        {/* Day Info */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-4 text-white mb-4">
          <p className="text-sm opacity-90">{getDayName(selectedDate)}</p>
          <p className="text-2xl font-bold">{formatDateDisplay(selectedDate)}</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Total Collection</p>
                <p className="text-xl font-bold text-green-600">{formatCurrency(totalCollections)}</p>
              </div>
              <div className="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Total Refunds</p>
                <p className="text-xl font-bold text-red-600">{formatCurrency(totalRefunds)}</p>
              </div>
              <div className="w-9 h-9 bg-red-100 rounded-lg flex items-center justify-center">
                <TrendingDown className="w-4 h-4 text-red-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Net Collection</p>
                <p className="text-xl font-bold text-blue-600">{formatCurrency(totalCollections - totalRefunds)}</p>
              </div>
              <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center">
                <Receipt className="w-4 h-4 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Pending Amount</p>
                <p className="text-xl font-bold text-orange-600">{formatCurrency(pendingAmount)}</p>
              </div>
              <div className="w-9 h-9 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-orange-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Transactions</p>
                <p className="text-xl font-bold text-gray-800">{completedCount + pendingCount}</p>
                <p className="text-xs text-gray-400">{completedCount} completed, {pendingCount} pending</p>
              </div>
              <div className="w-9 h-9 bg-purple-100 rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Mode Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3">
          <div className="flex items-center gap-2">
            <Banknote className="w-4 h-4 text-green-600" />
            <span className="text-xs text-gray-500">Cash</span>
          </div>
          <p className="text-lg font-bold text-gray-800">{formatCurrency(cashTotal)}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3">
          <div className="flex items-center gap-2">
            <Landmark className="w-4 h-4 text-blue-600" />
            <span className="text-xs text-gray-500">Bank Transfer</span>
          </div>
          <p className="text-lg font-bold text-gray-800">{formatCurrency(bankTotal)}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-purple-600" />
            <span className="text-xs text-gray-500">UPI</span>
          </div>
          <p className="text-lg font-bold text-gray-800">{formatCurrency(upiTotal)}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-orange-600" />
            <span className="text-xs text-gray-500">Cheque</span>
          </div>
          <p className="text-lg font-bold text-gray-800">{formatCurrency(chequeTotal)}</p>
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
                placeholder="Search by tenant, room, reference..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-72 text-sm"
              />
            </div>
            <select
              value={paymentModeFilter}
              onChange={(e) => setPaymentModeFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
            >
              <option value="all">All Payment Modes</option>
              <option value="Cash">Cash</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="UPI">UPI</option>
              <option value="Cheque">Cheque</option>
            </select>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
            <Filter className="w-4 h-4" />
            More Filters
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tenant</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Mode</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm text-gray-700">{transaction.time}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-800 text-sm">{transaction.tenantName}</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">{transaction.roomNo}</td>
                  <td className="px-4 py-3">{getTransactionTypeBadge(transaction.type)}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-800">{formatCurrency(transaction.amount)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      {getPaymentModeIcon(transaction.mode)}
                      <span className="text-sm text-gray-700">{transaction.mode}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 font-mono">{transaction.reference}</td>
                  <td className="px-4 py-3">
                    {transaction.status === 'completed' ? (
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">Completed</span>
                    ) : (
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700">Pending</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => setSelectedTransaction(transaction)}
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
        {paginatedTransactions.length === 0 && (
          <div className="text-center py-12">
            <Receipt className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No transactions found for this date</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
            <p className="text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredTransactions.length)} of {filteredTransactions.length} transactions
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

      {/* Transaction Details Modal */}
      {selectedTransaction && (
        <TransactionModal transaction={selectedTransaction} onClose={() => setSelectedTransaction(null)} />
      )}
    </div>
  );
};

export default DaywiseReport;