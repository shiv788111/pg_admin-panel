import { useState } from "react";
import { 
  Search, 
  Plus, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye,
  DollarSign,
  Download,
  Upload,
  CreditCard,
  Banknote,
  Wallet,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Printer,
  Send,
  Receipt,
  TrendingUp,
  TrendingDown,
  Users,
  Home,
  FileText,
  MessageSquare,
  Smartphone,
  Landmark
} from "lucide-react";

function Payments() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterMethod, setFilterMethod] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [showAddModal, setShowAddModal] = useState(false);

  const payments = [
    { 
      id: 1, 
      tenant: "Rahul Sharma", 
      room: "A-101",
      amount: "₹8,500",
      date: "2024-01-15",
      dueDate: "2024-01-10",
      status: "completed",
      method: "UPI",
      transactionId: "TXN123456",
      avatar: "R",
      color: "bg-blue-500",
      lateFee: "₹0",
      paidOn: "2024-01-15"
    },
    { 
      id: 2, 
      tenant: "Priya Patel", 
      room: "B-202",
      amount: "₹12,000",
      date: "2024-01-14",
      dueDate: "2024-01-10",
      status: "completed",
      method: "Bank Transfer",
      transactionId: "TXN123457",
      avatar: "P",
      color: "bg-pink-500",
      lateFee: "₹0",
      paidOn: "2024-01-14"
    },
    { 
      id: 3, 
      tenant: "Amit Kumar", 
      room: "C-303",
      amount: "₹7,500",
      date: "2024-01-14",
      dueDate: "2024-01-10",
      status: "pending",
      method: "Cash",
      transactionId: null,
      avatar: "A",
      color: "bg-green-500",
      lateFee: "₹225",
      paidOn: null
    },
    { 
      id: 4, 
      tenant: "Neha Singh", 
      room: "A-104",
      amount: "₹9,000",
      date: "2024-01-13",
      dueDate: "2024-01-10",
      status: "overdue",
      method: "Card",
      transactionId: null,
      avatar: "N",
      color: "bg-yellow-500",
      lateFee: "₹540",
      paidOn: null
    },
    { 
      id: 5, 
      tenant: "Vikram Mehta", 
      room: "B-205",
      amount: "₹11,000",
      date: "2024-01-13",
      dueDate: "2024-01-10",
      status: "completed",
      method: "UPI",
      transactionId: "TXN123458",
      avatar: "V",
      color: "bg-purple-500",
      lateFee: "₹0",
      paidOn: "2024-01-13"
    },
    { 
      id: 6, 
      tenant: "Anjali Desai", 
      room: "D-101",
      amount: "₹10,500",
      date: "2024-01-12",
      dueDate: "2024-01-10",
      status: "pending",
      method: "Bank Transfer",
      transactionId: null,
      avatar: "A",
      color: "bg-red-500",
      lateFee: "₹315",
      paidOn: null
    },
  ];

  const stats = [
    { title: "Total Collections", value: "₹72,000", change: "+12%", icon: DollarSign, color: "from-blue-500 to-blue-600" },
    { title: "Pending Amount", value: "₹18,000", change: "-5%", icon: Clock, color: "from-yellow-500 to-yellow-600" },
    { title: "Overdue Amount", value: "₹9,000", change: "+8%", icon: AlertCircle, color: "from-red-500 to-red-600" },
    { title: "Collection Rate", value: "94%", change: "+3%", icon: TrendingUp, color: "from-green-500 to-green-600" },
  ];

  const paymentMethods = [
    { method: "UPI", count: 2, amount: "₹19,500", icon: Smartphone, color: "blue" },
    { method: "Bank Transfer", count: 2, amount: "₹22,500", icon: Landmark, color: "purple" },
    { method: "Cash", count: 1, amount: "₹7,500", icon: Banknote, color: "green" },
    { method: "Card", count: 1, amount: "₹9,000", icon: CreditCard, color: "orange" },
  ];

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.tenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (payment.transactionId && payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = filterStatus === "all" || payment.status === filterStatus;
    const matchesMethod = filterMethod === "all" || payment.method === filterMethod;
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const getStatusBadge = (status) => {
    switch(status) {
      case 'completed':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700 font-medium flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Completed</span>;
      case 'pending':
        return <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700 font-medium flex items-center gap-1"><Clock className="w-3 h-3" /> Pending</span>;
      case 'overdue':
        return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-700 font-medium flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Overdue</span>;
      default:
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700 font-medium">{status}</span>;
    }
  };

  const getMethodIcon = (method) => {
    switch(method) {
      case 'UPI': return <Smartphone className="w-4 h-4" />;
      case 'Bank Transfer': return <Landmark className="w-4 h-4" />;
      case 'Cash': return <Banknote className="w-4 h-4" />;
      case 'Card': return <CreditCard className="w-4 h-4" />;
      default: return <Wallet className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Payments Management
            </h1>
            <p className="text-gray-500 mt-1">Track all payment transactions and collections</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Record Payment
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

      {/* Payment Methods Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {paymentMethods.map((method, index) => {
          const Icon = method.icon;
          const bgColor = {
            blue: "from-blue-500 to-blue-600",
            purple: "from-purple-500 to-purple-600",
            green: "from-green-500 to-green-600",
            orange: "from-orange-500 to-orange-600"
          }[method.color];
          
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-center justify-between mb-3">
                <div className={`bg-gradient-to-r ${bgColor} p-2 rounded-lg text-white`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-lg font-bold text-gray-800">{method.count}</span>
              </div>
              <p className="text-sm font-medium text-gray-800">{method.method}</p>
              <p className="text-xs text-gray-500 mt-1">{method.amount}</p>
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
              placeholder="Search by tenant name, room number, or transaction ID..."
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
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
            </select>
            <select
              value={filterMethod}
              onChange={(e) => setFilterMethod(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Methods</option>
              <option value="UPI">UPI</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
            </select>
            <button className="px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* Period Filter */}
      <div className="flex justify-end mb-6">
        <div className="bg-white rounded-xl shadow-sm p-1 flex gap-1">
          <button 
            onClick={() => setSelectedPeriod("weekly")}
            className={`px-4 py-2 text-sm rounded-lg transition-all ${selectedPeriod === 'weekly' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            Weekly
          </button>
          <button 
            onClick={() => setSelectedPeriod("monthly")}
            className={`px-4 py-2 text-sm rounded-lg transition-all ${selectedPeriod === 'monthly' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            Monthly
          </button>
          <button 
            onClick={() => setSelectedPeriod("yearly")}
            className={`px-4 py-2 text-sm rounded-lg transition-all ${selectedPeriod === 'yearly' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            Yearly
          </button>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tenant</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className={`${payment.color} w-8 h-8 rounded-full flex items-center justify-center text-white font-medium text-sm`}>
                        {payment.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{payment.tenant}</p>
                        <p className="text-xs text-gray-500">ID: {payment.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Home className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{payment.room}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm font-bold text-gray-900">{payment.amount}</p>
                      {payment.lateFee !== "₹0" && (
                        <p className="text-xs text-red-500">Late Fee: {payment.lateFee}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm text-gray-600">{payment.dueDate}</p>
                      {payment.paidOn && (
                        <p className="text-xs text-green-600">Paid: {payment.paidOn}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {getMethodIcon(payment.method)}
                      <span className="text-sm text-gray-600">{payment.method}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(payment.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {payment.transactionId ? (
                      <span className="text-xs font-mono text-gray-500">{payment.transactionId}</span>
                    ) : (
                      <span className="text-xs text-gray-400">Not available</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                        <Receipt className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                        <Printer className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-green-600 transition-colors">
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredPayments.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <DollarSign className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No payments found</h3>
          <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            Record Payment
          </button>
        </div>
      )}

   

      {/* Record Payment Modal */}
      {showAddModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowAddModal(false)}></div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl z-50 w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Record Payment</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Tenant</label>
                <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>Rahul Sharma - A-101</option>
                  <option>Priya Patel - B-202</option>
                  <option>Amit Kumar - C-303</option>
                  <option>Neha Singh - A-104</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <input type="text" placeholder="₹" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>Cash</option>
                  <option>UPI</option>
                  <option>Bank Transfer</option>
                  <option>Card</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Transaction ID (Optional)</label>
                <input type="text" placeholder="Enter transaction ID" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Date</label>
                <input type="date" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  Record Payment
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

export default Payments;