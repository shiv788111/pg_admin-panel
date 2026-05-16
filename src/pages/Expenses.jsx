import React, { useState, useEffect } from 'react';
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
  Banknote,
  X
} from 'lucide-react';
import { 
  getExpenses, 
  createExpense, 
  updateExpense, 
  deleteExpense,
  getExpenseCategories,
  createExpenseCategory
} from '../services/expenses';

const Expenses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCategory, setNewCategory] = useState('');
  const itemsPerPage = 10;

  // Stats state
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [paidExpenses, setPaidExpenses] = useState(0);
  const [pendingExpenses, setPendingExpenses] = useState(0);
  const [paidCount, setPaidCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [categoryTotals, setCategoryTotals] = useState({});

  // Form state
  const [formData, setFormData] = useState({
    branch_id: 1,
    expense_category_id: '',
    amount: '',
    expense_date: new Date().toISOString().split('T')[0],
    description: '',
    receipt_url: ''
  });

  // Fetch expenses from API
  const fetchExpenses = async () => {
    setLoading(true);
    const response = await getExpenses();
    console.log("Expenses response:", response);

    if (response.success) {
      const formattedExpenses = response.data.map((expense) => {
        const category = categories.find(c => c.expense_category_id === expense.expense_category_id);
        return {
          id: expense.expense_id,
          branch_id: expense.branch_id,
          expense_category_id: expense.expense_category_id,
          title: expense.description || expense.expense_category_name,
          category: getCategoryType(expense.expense_category_name),
          subCategory: expense.expense_category_name,
          amount: parseFloat(expense.amount),
          date: expense.expense_date?.split('T')[0],
          paymentMode: getPaymentMode(expense),
          status: getStatus(expense),
          vendor: expense.vendor || '-',
          billNumber: expense.bill_number || null,
          description: expense.description,
          receipt: expense.receipt_url ? true : false,
          receipt_url: expense.receipt_url,
          recurring: false,
          frequency: null,
          expense_category_name: expense.expense_category_name,
          created_at: expense.created_at
        };
      });
      
      setExpenses(formattedExpenses);
      calculateStats(formattedExpenses);
    } else {
      alert(response.message || "Failed to fetch expenses");
    }
    setLoading(false);
  };

  // Fetch categories
  const fetchCategories = async () => {
    const response = await getExpenseCategories();
    if (response.success) {
      setCategories(response.data);
    }
  };

  // Calculate statistics
  const calculateStats = (expensesList) => {
    const total = expensesList.reduce((sum, e) => sum + e.amount, 0);
    const paid = expensesList.filter(e => e.status === 'paid').reduce((sum, e) => sum + e.amount, 0);
    const pending = expensesList.filter(e => e.status === 'pending').reduce((sum, e) => sum + e.amount, 0);
    const paidCnt = expensesList.filter(e => e.status === 'paid').length;
    const pendingCnt = expensesList.filter(e => e.status === 'pending').length;
    
    setTotalExpenses(total);
    setPaidExpenses(paid);
    setPendingExpenses(pending);
    setPaidCount(paidCnt);
    setPendingCount(pendingCnt);

    // Calculate category totals
    const categoryTotalsMap = {};
    expensesList.forEach(expense => {
      const cat = expense.category;
      if (!categoryTotalsMap[cat]) categoryTotalsMap[cat] = 0;
      categoryTotalsMap[cat] += expense.amount;
    });
    setCategoryTotals(categoryTotalsMap);
  };

  // Helper functions
  const getCategoryType = (categoryName) => {
    const name = categoryName?.toLowerCase() || '';
    if (name.includes('electricity') || name.includes('water') || name.includes('internet') || name.includes('utilities')) return 'utilities';
    if (name.includes('salary') || name.includes('staff')) return 'staff';
    if (name.includes('cleaning') || name.includes('repair') || name.includes('maintenance')) return 'maintenance';
    if(name.includes('safety') || name.includes('security')) return 'safety';
    return 'miscellaneous';
  };

  const getPaymentMode = (expense) => {
    // Default to Cash if not specified
    return 'Cash';
  };

  const getStatus = (expense) => {
    // Default to paid if status is active or null
    return expense.deleted_at ? 'pending' : 'paid';
  };

  // Create expense
  const handleCreateExpense = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const expenseData = {
      branch_id: parseInt(formData.branch_id),
      expense_category_id: parseInt(formData.expense_category_id),
      amount: parseFloat(formData.amount),
      expense_date: formData.expense_date,
      description: formData.description,
      receipt_url: formData.receipt_url || null
    };
    
    const response = await createExpense(expenseData);
    
    if (response.success) {
      alert("Expense added successfully!");
      setShowAddModal(false);
      resetForm();
      fetchExpenses();
    } else {
      alert(response.message || "Failed to add expense");
    }
    setLoading(false);
  };

  // Create category
  const handleCreateCategory = async () => {
    if (!newCategory.trim()) {
      alert("Please enter category name");
      return;
    }
    
    setLoading(true);
    const response = await createExpenseCategory({ name: newCategory });
    
    if (response.success) {
      alert("Category added successfully!");
      setShowCategoryModal(false);
      setNewCategory('');
      fetchCategories();
    } else {
      alert(response.message || "Failed to add category");
    }
    setLoading(false);
  };

  // Delete expense
  const handleDeleteExpense = async (expenseId) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      setLoading(true);
      const response = await deleteExpense(expenseId);
      
      if (response.success) {
        alert("Expense deleted successfully!");
        fetchExpenses();
      } else {
        alert(response.message || "Failed to delete expense");
      }
      setLoading(false);
    }
  };

  // Form handling
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setFormData({
      branch_id: 1,
      expense_category_id: '',
      amount: '',
      expense_date: new Date().toISOString().split('T')[0],
      description: '',
      receipt_url: ''
    });
  };

  const openDetailsModal = (expense) => {
    setSelectedExpense(expense);
    setShowDetailsModal(true);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      fetchExpenses();
    }
  }, [categories]);

  // Filter expenses
  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = 
      expense.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.vendor?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || expense.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || expense.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedExpenses = filteredExpenses.slice(startIndex, startIndex + itemsPerPage);

  // Monthly trend (last 6 months)
  const getMonthlyTrend = () => {
    const months = {};
    expenses.forEach(expense => {
      const month = new Date(expense.date).toLocaleString('default', { month: 'short' });
      if (!months[month]) months[month] = 0;
      months[month] += expense.amount;
    });
    return Object.entries(months).slice(-6).map(([month, amount]) => ({ month, amount }));
  };

  const monthlyTrend = getMonthlyTrend();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount || 0);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

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
        return category || 'Other';
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

  if (loading && expenses.length === 0) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading expenses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Expenses</h1>
          <p className="text-gray-500 mt-1">Track and manage all property expenses</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowCategoryModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Category
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Expense
          </button>
        </div>
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
              <p className="text-xl font-bold text-purple-600">{monthlyTrend.length > 0 ? formatCurrency(monthlyTrend[monthlyTrend.length-1]?.amount) : formatCurrency(0)}</p>
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
      {monthlyTrend.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Monthly Expense Trend
          </h3>
          <div className="flex items-end gap-3 h-32">
            {monthlyTrend.map((item, index) => {
              const maxAmount = Math.max(...monthlyTrend.map(m => m.amount), 1);
              const height = (item.amount / maxAmount) * 100;
              return (
                <div key={index} className="flex-1 text-center">
                  <div className="bg-blue-100 rounded-t-lg" style={{ height: `${height}px`, minHeight: '4px' }}>
                    <div className="bg-blue-500 h-full rounded-t-lg" style={{ height: `${height}%` }}></div>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">{item.month}</p>
                  <p className="text-xs font-semibold text-gray-800">{formatCurrency(item.amount)}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

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
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
              <Download className="w-4 h-4" />
              Export
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
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedExpenses.map((expense) => (
                <tr key={expense.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-800 text-sm">{expense.subCategory}</p>
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
                  <td className="px-4 py-3">{getStatusBadge(expense.status)}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => openDetailsModal(expense)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteExpense(expense.id)}
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
        {paginatedExpenses.length === 0 && !loading && (
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
                      className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                        currentPage === pageNum
                          ? 'bg-blue-600 text-white'
                          : 'border border-gray-300 hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
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

      {/* Add Expense Modal */}
      {showAddModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => {setShowAddModal(false); resetForm();}}></div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl z-50 w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Add New Expense</h2>
              <button onClick={() => {setShowAddModal(false); resetForm();}} className="p-1 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateExpense} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Branch ID *</label>
                <input
                  type="number"
                  name="branch_id"
                  value={formData.branch_id}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expense Category *</label>
                <select
                  name="expense_category_id"
                  value={formData.expense_category_id}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat.expense_category_id} value={cat.expense_category_id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹) *</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  required
                  placeholder="0.00"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expense Date *</label>
                <input
                  type="date"
                  name="expense_date"
                  value={formData.expense_date}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Additional details..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Receipt URL (Optional)</label>
                <input
                  type="text"
                  name="receipt_url"
                  value={formData.receipt_url}
                  onChange={handleInputChange}
                  placeholder="https://..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {loading ? "Adding..." : "Add Expense"}
                </button>
                <button
                  type="button"
                  onClick={() => {setShowAddModal(false); resetForm();}}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </>
      )}

      {/* Add Category Modal */}
      {showCategoryModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => {setShowCategoryModal(false); setNewCategory('');}}></div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl z-50 w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Add Expense Category</h2>
              <button onClick={() => {setShowCategoryModal(false); setNewCategory('');}} className="p-1 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category Name *</label>
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="e.g., Electricity, Water Bill, Staff Salary"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleCreateCategory}
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {loading ? "Adding..." : "Add Category"}
                </button>
                <button
                  onClick={() => {setShowCategoryModal(false); setNewCategory('');}}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Expense Details Modal */}
      {showDetailsModal && selectedExpense && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowDetailsModal(false)}></div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl z-50 w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Expense Details</h2>
              <button onClick={() => setShowDetailsModal(false)} className="p-1 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-xs text-gray-500">Amount</p>
                  <p className="text-2xl font-bold text-gray-800">{formatCurrency(selectedExpense.amount)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Date</p>
                  <p className="font-medium text-gray-700">{formatDate(selectedExpense.date)}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-xs text-gray-500">Category</label>
                  <div className="flex items-center gap-1 mt-1">
                    {getCategoryIcon(selectedExpense.category)}
                    <span>{getCategoryName(selectedExpense.category)}</span>
                    <span className="text-gray-400">({selectedExpense.subCategory})</span>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Status</label>
                  <div className="mt-1">{getStatusBadge(selectedExpense.status)}</div>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Transaction ID</label>
                  <p className="text-sm text-gray-700">#{selectedExpense.id}</p>
                </div>
              </div>
              {selectedExpense.description && (
                <div>
                  <label className="text-xs text-gray-500">Description</label>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-lg mt-1">{selectedExpense.description}</p>
                </div>
              )}
              {selectedExpense.receipt_url && (
                <div className="bg-blue-50 p-3 rounded-lg">
                  <label className="text-xs text-blue-600">Receipt</label>
                  <a href={selectedExpense.receipt_url} target="_blank" rel="noopener noreferrer" className="text-blue-800 text-sm block mt-1 break-all">
                    View Receipt
                  </a>
                </div>
              )}
            </div>
            <div className="flex gap-3 pt-6 mt-4 border-t">
              <button onClick={() => setShowDetailsModal(false)} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Close
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Expenses;