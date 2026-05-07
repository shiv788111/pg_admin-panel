import React, { useState } from 'react';
import {
  Search,
  Download,
  Filter,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit,
  Trash2,
  Plus,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Building,
  Zap,
  Droplet,
  Wifi,
  Shovel,
  Shield,
  Brush,
  Car,
  Coffee,
  ShoppingBag,
  AlertCircle,
  CheckCircle,
  Clock,
  FileText,
  Printer,
  PieChart,
  BarChart3,
  Receipt,
  Landmark,
  CreditCard,
  Smartphone,
  Banknote
} from 'lucide-react';

const Expenses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'
  const itemsPerPage = 10;

  // Mock data for expenses
  const expenses = [
    {
      id: 1,
      title: 'Monthly Electricity Bill',
      category: 'utilities',
      subCategory: 'Electricity',
      amount: 12500,
      date: '2024-10-05',
      paymentMode: 'Bank Transfer',
      status: 'paid',
      vendor: 'Tata Power',
      billNumber: 'EP-2024-1001',
      description: 'Electricity bill for September 2024',
      receipt: true,
      recurring: true,
      frequency: 'monthly'
    },
    {
      id: 2,
      title: 'Water Supply Charges',
      category: 'utilities',
      subCategory: 'Water',
      amount: 3500,
      date: '2024-10-03',
      paymentMode: 'UPI',
      status: 'paid',
      vendor: 'Municipal Corporation',
      billNumber: 'WS-2024-045',
      description: 'Water supply bill',
      receipt: true,
      recurring: true,
      frequency: 'monthly'
    },
    {
      id: 3,
      title: 'WiFi/Internet Bill',
      category: 'utilities',
      subCategory: 'Internet',
      amount: 1500,
      date: '2024-10-01',
      paymentMode: 'UPI',
      status: 'paid',
      vendor: 'Jio Fiber',
      billNumber: 'JIO-100234',
      description: 'Internet connection',
      receipt: true,
      recurring: true,
      frequency: 'monthly'
    },
    {
      id: 4,
      title: 'Security Guard Salary',
      category: 'staff',
      subCategory: 'Security',
      amount: 18000,
      date: '2024-10-01',
      paymentMode: 'Bank Transfer',
      status: 'paid',
      vendor: 'Ramesh (Guard)',
      billNumber: null,
      description: 'Monthly salary for security guard',
      receipt: false,
      recurring: true,
      frequency: 'monthly'
    },
    {
      id: 5,
      title: 'Cleaning Staff Salary',
      category: 'staff',
      subCategory: 'Cleaning',
      amount: 12000,
      date: '2024-10-01',
      paymentMode: 'Cash',
      status: 'paid',
      vendor: 'Lakshmi (Cleaner)',
      billNumber: null,
      description: 'Monthly salary for cleaning staff',
      receipt: false,
      recurring: true,
      frequency: 'monthly'
    },
    {
      id: 6,
      title: 'Building Maintenance',
      category: 'maintenance',
      subCategory: 'Repairs',
      amount: 8500,
      date: '2024-10-08',
      paymentMode: 'Bank Transfer',
      status: 'paid',
      vendor: 'Sharma Repairs',
      billNumber: 'MR-2024-089',
      description: 'Common area painting and repairs',
      receipt: true,
      recurring: false,
      frequency: null
    },
    {
      id: 7,
      title: 'Gardening Service',
      category: 'maintenance',
      subCategory: 'Gardening',
      amount: 3000,
      date: '2024-10-10',
      paymentMode: 'UPI',
      status: 'paid',
      vendor: 'Green Gardens',
      billNumber: 'GG-456',
      description: 'Monthly gardening service',
      receipt: true,
      recurring: true,
      frequency: 'monthly'
    },
    {
      id: 8,
      title: 'Pest Control',
      category: 'maintenance',
      subCategory: 'Pest Control',
      amount: 2500,
      date: '2024-10-12',
      paymentMode: 'Cash',
      status: 'pending',
      vendor: 'PestKill',
      billNumber: 'PC-789',
      description: 'Quarterly pest control service',
      receipt: false,
      recurring: false,
      frequency: null
    },
    {
      id: 9,
      title: 'Lift/Elevator Maintenance',
      category: 'maintenance',
      subCategory: 'Lift',
      amount: 4500,
      date: '2024-10-15',
      paymentMode: 'Bank Transfer',
      status: 'pending',
      vendor: 'Otis Elevators',
      billNumber: 'OT-2024-567',
      description: 'Annual maintenance contract',
      receipt: false,
      recurring: false,
      frequency: null
    },
    {
      id: 10,
      title: 'Office Supplies',
      category: 'miscellaneous',
      subCategory: 'Stationery',
      amount: 1200,
      date: '2024-10-07',
      paymentMode: 'Cash',
      status: 'paid',
      vendor: 'Local Stationery',
      billNumber: null,
      description: 'Notebooks, pens, register',
      receipt: true,
      recurring: false,
      frequency: null
    },
    {
      id: 11,
      title: 'Garbage Collection',
      category: 'utilities',
      subCategory: 'Waste',
      amount: 2000,
      date: '2024-10-05',
      paymentMode: 'UPI',
      status: 'paid',
      vendor: 'Municipal Corp',
      billNumber: 'GC-2024-123',
      description: 'Monthly garbage collection fee',
      receipt: true,
      recurring: true,
      frequency: 'monthly'
    },
    {
      id: 12,
      title: 'Fire Safety Equipment',
      category: 'safety',
      subCategory: 'Fire Safety',
      amount: 6500,
      date: '2024-10-09',
      paymentMode: 'Bank Transfer',
      status: 'paid',
      vendor: 'FireSafe India',
      billNumber: 'FS-890',
      description: 'Fire extinguisher refill and maintenance',
      receipt: true,
      recurring: false,
      frequency: null
    },
    {
      id: 13,
      title: 'Water Tank Cleaning',
      category: 'maintenance',
      subCategory: 'Cleaning',
      amount: 4000,
      date: '2024-10-14',
      paymentMode: 'Cash',
      status: 'pending',
      vendor: 'Clean Water Services',
      billNumber: 'CWS-345',
      description: 'Quarterly water tank cleaning',
      receipt: false,
      recurring: false,
      frequency: null
    }
  ];

  // Calculate statistics
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const paidExpenses = expenses.filter(e => e.status === 'paid').reduce((sum, e) => sum + e.amount, 0);
  const pendingExpenses = expenses.filter(e => e.status === 'pending').reduce((sum, e) => sum + e.amount, 0);
  const paidCount = expenses.filter(e => e.status === 'paid').length;
  const pendingCount = expenses.filter(e => e.status === 'pending').length;
  
  // Category-wise totals
  const categoryTotals = {
    utilities: expenses.filter(e => e.category === 'utilities').reduce((sum, e) => sum + e.amount, 0),
    staff: expenses.filter(e => e.category === 'staff').reduce((sum, e) => sum + e.amount, 0),
    maintenance: expenses.filter(e => e.category === 'maintenance').reduce((sum, e) => sum + e.amount, 0),
    safety: expenses.filter(e => e.category === 'safety').reduce((sum, e) => sum + e.amount, 0),
    miscellaneous: expenses.filter(e => e.category === 'miscellaneous').reduce((sum, e) => sum + e.amount, 0)
  };

  // Month-wise trends (last 6 months)
  const monthlyTrend = [
    { month: 'May', amount: 48500 },
    { month: 'Jun', amount: 52300 },
    { month: 'Jul', amount: 49800 },
    { month: 'Aug', amount: 51200 },
    { month: 'Sep', amount: 53600 },
    { month: 'Oct', amount: 46200 }
  ];

  // Category icons
  const getCategoryIcon = (category) => {
    switch(category) {
      case 'utilities':
        return <Zap className="w-4 h-4" />;
      case 'staff':
        return <Shield className="w-4 h-4" />;
      case 'maintenance':
        return <Brush className="w-4 h-4" />;
      case 'safety':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <ShoppingBag className="w-4 h-4" />;
    }
  };

  const getCategoryName = (category) => {
    switch(category) {
      case 'utilities':
        return 'Utilities';
      case 'staff':
        return 'Staff';
      case 'maintenance':
        return 'Maintenance';
      case 'safety':
        return 'Safety';
      case 'miscellaneous':
        return 'Miscellaneous';
      default:
        return category;
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'paid':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700 flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Paid</span>;
      case 'pending':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700 flex items-center gap-1"><Clock className="w-3 h-3" /> Pending</span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">{status}</span>;
    }
  };

  const getPaymentModeIcon = (mode) => {
    switch(mode) {
      case 'Cash':
        return <Banknote className="w-3 h-3" />;
      case 'Bank Transfer':
        return <Landmark className="w-3 h-3" />;
      case 'UPI':
        return <Smartphone className="w-3 h-3" />;
      case 'Cheque':
        return <CreditCard className="w-3 h-3" />;
      default:
        return <DollarSign className="w-3 h-3" />;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  // Filter expenses
  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = expense.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          expense.vendor?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          expense.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || expense.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || expense.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedExpenses = filteredExpenses.slice(startIndex, startIndex + itemsPerPage);

  // Add Expense Modal
  const AddExpenseModal = ({ onClose }) => {
    const [formData, setFormData] = useState({
      title: '',
      category: 'utilities',
      subCategory: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      paymentMode: 'Cash',
      vendor: '',
      billNumber: '',
      description: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      // Here you would typically make an API call
      alert('Expense added successfully!');
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
          <div className="p-6 border-b border-gray-200 sticky top-0 bg-white">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">Add New Expense</h2>
              <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg">✕</button>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="text-sm font-medium text-gray-700 mb-1 block">Expense Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Monthly Electricity Bill"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Category *</label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="utilities">Utilities</option>
                  <option value="staff">Staff</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="safety">Safety</option>
                  <option value="miscellaneous">Miscellaneous</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Sub Category</label>
                <input
                  type="text"
                  value={formData.subCategory}
                  onChange={(e) => setFormData({...formData, subCategory: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Electricity, Water"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Amount *</label>
                <input
                  type="number"
                  required
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Date *</label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Payment Mode</label>
                <select
                  value={formData.paymentMode}
                  onChange={(e) => setFormData({...formData, paymentMode: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Cash</option>
                  <option>Bank Transfer</option>
                  <option>UPI</option>
                  <option>Cheque</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Vendor/Provider</label>
                <input
                  type="text"
                  value={formData.vendor}
                  onChange={(e) => setFormData({...formData, vendor: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Vendor name"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Bill/Invoice Number</label>
                <input
                  type="text"
                  value={formData.billNumber}
                  onChange={(e) => setFormData({...formData, billNumber: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Optional"
                />
              </div>
              <div className="col-span-2">
                <label className="text-sm font-medium text-gray-700 mb-1 block">Description</label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Additional details..."
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t">
              <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add Expense</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Expense Details Modal
  const ExpenseDetailsModal = ({ expense, onClose }) => {
    if (!expense) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div className="bg-white rounded-xl shadow-xl max-w-md w-full" onClick={e => e.stopPropagation()}>
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">Expense Details</h2>
              <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg">✕</button>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-xs text-gray-500">Amount</p>
                <p className="text-2xl font-bold text-gray-800">{formatCurrency(expense.amount)}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Date</p>
                <p className="font-medium text-gray-700">{formatDate(expense.date)}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="text-xs text-gray-500">Expense Title</label>
                <p className="font-medium text-gray-800">{expense.title}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500">Category</label>
                <div className="flex items-center gap-1 mt-1">
                  {getCategoryIcon(expense.category)}
                  <span>{getCategoryName(expense.category)}</span>
                </div>
              </div>
              {expense.subCategory && (
                <div>
                  <label className="text-xs text-gray-500">Sub Category</label>
                  <p className="text-gray-700">{expense.subCategory}</p>
                </div>
              )}
              <div>
                <label className="text-xs text-gray-500">Status</label>
                <div className="mt-1">{getStatusBadge(expense.status)}</div>
              </div>
              <div>
                <label className="text-xs text-gray-500">Payment Mode</label>
                <div className="flex items-center gap-1 mt-1">
                  {getPaymentModeIcon(expense.paymentMode)}
                  <span>{expense.paymentMode}</span>
                </div>
              </div>
              {expense.vendor && (
                <div>
                  <label className="text-xs text-gray-500">Vendor</label>
                  <p className="text-gray-700">{expense.vendor}</p>
                </div>
              )}
              {expense.billNumber && (
                <div>
                  <label className="text-xs text-gray-500">Bill Number</label>
                  <p className="text-gray-700 text-sm">{expense.billNumber}</p>
                </div>
              )}
              {expense.recurring && (
                <div>
                  <label className="text-xs text-gray-500">Recurring</label>
                  <p className="text-gray-700 capitalize">{expense.frequency}</p>
                </div>
              )}
            </div>
            <div className="border-t pt-4">
              <label className="text-xs text-gray-500">Description</label>
              <p className="text-gray-700 bg-gray-50 p-3 rounded-lg mt-1">{expense.description}</p>
            </div>
            {expense.receipt && (
              <div className="bg-blue-50 p-3 rounded-lg">
                <label className="text-xs text-blue-600">Receipt Available</label>
                <p className="text-blue-800 text-sm">Receipt/Invoice uploaded</p>
              </div>
            )}
          </div>
          <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">
              <Edit className="w-4 h-4" />
              Edit
            </button>
            <button onClick={onClose} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Close</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Expenses</h1>
          <p className="text-gray-500 mt-1">Track and manage all property expenses</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Expense
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Total Expenses</p>
              <p className="text-2xl font-bold text-gray-800">{formatCurrency(totalExpenses)}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Paid Expenses</p>
              <p className="text-xl font-bold text-green-600">{formatCurrency(paidExpenses)}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Pending Expenses</p>
              <p className="text-xl font-bold text-yellow-600">{formatCurrency(pendingExpenses)}</p>
            </div>
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">This Month</p>
              <p className="text-xl font-bold text-purple-600">{formatCurrency(monthlyTrend[monthlyTrend.length-1].amount)}</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Total Transactions</p>
              <p className="text-xl font-bold text-gray-800">{expenses.length}</p>
              <p className="text-xs text-gray-400">{paidCount} paid, {pendingCount} pending</p>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Receipt className="w-5 h-5 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Category Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
        {Object.entries(categoryTotals).map(([category, amount]) => (
          <div key={category} className="bg-white rounded-xl shadow-sm border border-gray-100 p-3">
            <div className="flex items-center gap-2 mb-1">
              {getCategoryIcon(category)}
              <span className="text-xs text-gray-600">{getCategoryName(category)}</span>
            </div>
            <p className="text-sm font-bold text-gray-800">{formatCurrency(amount)}</p>
          </div>
        ))}
      </div>

      {/* Monthly Trend Bar Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          Monthly Expense Trend
        </h3>
        <div className="flex items-end gap-3 h-32">
          {monthlyTrend.map((item, index) => {
            const maxAmount = Math.max(...monthlyTrend.map(m => m.amount));
            const height = (item.amount / maxAmount) * 100;
            return (
              <div key={index} className="flex-1 text-center">
                <div className="bg-blue-100 rounded-t-lg transition-all duration-300" style={{ height: `${height}px`, minHeight: '4px' }}>
                  <div className="bg-blue-500 h-full rounded-t-lg" style={{ height: `${height}%` }}></div>
                </div>
                <p className="text-xs text-gray-600 mt-2">{item.month}</p>
                <p className="text-xs font-semibold text-gray-800">{formatCurrency(item.amount)}</p>
              </div>
            );
          })}
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
                placeholder="Search expenses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64 text-sm"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
            >
              <option value="all">All Categories</option>
              <option value="utilities">Utilities</option>
              <option value="staff">Staff</option>
              <option value="maintenance">Maintenance</option>
              <option value="safety">Safety</option>
              <option value="miscellaneous">Miscellaneous</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'table' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
            >
              <FileText className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
              <Printer className="w-4 h-4" />
              Print
            </button>
          </div>
        </div>
      </div>

      {/* Expenses Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Mode</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedExpenses.map((expense) => (
                <tr key={expense.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-800 text-sm">{expense.title}</p>
                    {expense.description && (
                      <p className="text-xs text-gray-400 truncate max-w-[200px]">{expense.description}</p>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      {getCategoryIcon(expense.category)}
                      <span className="text-sm text-gray-700">{getCategoryName(expense.category)}</span>
                    </div>
                    {expense.subCategory && (
                      <p className="text-xs text-gray-400">{expense.subCategory}</p>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-800">{formatCurrency(expense.amount)}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{formatDate(expense.date)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      {getPaymentModeIcon(expense.paymentMode)}
                      <span className="text-sm text-gray-700">{expense.paymentMode}</span>
                    </div>
                   </td>
                  <td className="px-4 py-3">{getStatusBadge(expense.status)}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{expense.vendor || '—'}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => setSelectedExpense(expense)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
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

        {/* Empty State */}
        {paginatedExpenses.length === 0 && (
          <div className="text-center py-12">
            <Receipt className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No expenses found</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
            <p className="text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredExpenses.length)} of {filteredExpenses.length} expenses
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
      {showAddModal && <AddExpenseModal onClose={() => setShowAddModal(false)} />}
      {selectedExpense && <ExpenseDetailsModal expense={selectedExpense} onClose={() => setSelectedExpense(null)} />}
    </div>
  );
};

export default Expenses;