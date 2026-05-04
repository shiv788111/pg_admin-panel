import {
  Users,
  DoorOpen,
  DollarSign,
  TrendingUp,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
  Calendar,
  ChevronRight,
  Bell,
  Search,
  Download,
  MoreVertical,
  CreditCard,
  Home,
  UserPlus,
  Settings,
} from "lucide-react";
import { useState } from "react";

function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");

  const statsCards = [
    {
      title: "Total Tenants",
      value: "48",
      icon: Users,
      change: "+12%",
      changeType: "up",
      bgGradient: "from-blue-500 to-blue-600",
      iconBg: "bg-blue-500/20",
      textColor: "text-blue-600",
    },
    {
      title: "Total Rooms",
      value: "124",
      icon: DoorOpen,
      change: "+8.2%",
      changeType: "up",
      bgGradient: "from-emerald-500 to-emerald-600",
      iconBg: "bg-emerald-500/20",
      textColor: "text-emerald-600",
    },
    {
      title: "Monthly Revenue",
      value: "₹72,000",
      icon: DollarSign,
      change: "+23%",
      changeType: "up",
      bgGradient: "from-purple-500 to-purple-600",
      iconBg: "bg-purple-500/20",
      textColor: "text-purple-600",
    },
    {
      title: "Occupancy Rate",
      value: "84%",
      icon: TrendingUp,
      change: "+5%",
      changeType: "up",
      bgGradient: "from-orange-500 to-orange-600",
      iconBg: "bg-orange-500/20",
      textColor: "text-orange-600",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      tenant: "Rahul Sharma",
      action: "Paid rent",
      amount: "₹8,500",
      time: "2 hours ago",
      avatar: "R",
      color: "bg-indigo-500",
    },
    {
      id: 2,
      tenant: "Priya Patel",
      action: "Booked room",
      room: "B-202",
      time: "5 hours ago",
      avatar: "P",
      color: "bg-pink-500",
    },
    {
      id: 3,
      tenant: "Amit Kumar",
      action: "Maintenance request",
      room: "C-303",
      time: "Yesterday",
      avatar: "A",
      color: "bg-green-500",
    },
    {
      id: 4,
      tenant: "Neha Singh",
      action: "Renewed contract",
      amount: "₹9,000",
      time: "Yesterday",
      avatar: "N",
      color: "bg-yellow-500",
    },
  ];

  const upcomingTasks = [
    {
      id: 1,
      task: "Electricity Bill Payment",
      date: "Tomorrow",
      priority: "high",
      icon: "⚡",
    },
    {
      id: 2,
      task: "Room Maintenance - Block A",
      date: "Jan 20, 2024",
      priority: "medium",
      icon: "🔧",
    },
    {
      id: 3,
      task: "Tenant Meeting",
      date: "Jan 22, 2024",
      priority: "low",
      icon: "👥",
    },
  ];

  const recentPayments = [
    {
      id: 1,
      tenant: "Rahul Sharma",
      room: "A-101",
      amount: "₹8,500",
      status: "completed",
      date: "2024-01-15",
      method: "UPI",
    },
    {
      id: 2,
      tenant: "Priya Patel",
      room: "B-202",
      amount: "₹12,000",
      status: "pending",
      date: "2024-01-14",
      method: "Cash",
    },
    {
      id: 3,
      tenant: "Amit Kumar",
      room: "C-303",
      amount: "₹7,500",
      status: "completed",
      date: "2024-01-14",
      method: "Card",
    },
    {
      id: 4,
      tenant: "Neha Singh",
      room: "A-104",
      amount: "₹9,000",
      status: "overdue",
      date: "2024-01-13",
      method: "Bank Transfer",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "overdue":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700";
      case "medium":
        return "bg-yellow-100 text-yellow-700";
      case "low":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-6">
      {/* Page Header - Simplified without duplicate navbar */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">
          Welcome back! Here's your PG business overview
        </p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Card 1 - Total Tenants - Royal Blue */}
        <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-700"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

          {/* Animated Circle on Hover */}
          <div className="absolute -top-20 -right-20 w-48 h-48 bg-white/10 rounded-full group-hover:scale-[3] transition-transform duration-700 ease-out"></div>
          <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-white/5 rounded-full group-hover:scale-[2.5] transition-transform duration-700 delay-100 ease-out"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/0 rounded-full group-hover:bg-white/5 group-hover:scale-[8] transition-all duration-700"></div>

          <div className="relative p-6 z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-white/80 text-sm font-medium uppercase tracking-wide">
              Total Tenants
            </h3>
            <p className="text-4xl font-extrabold text-white mt-2">48</p>
            <div className="mt-4"></div>
          </div>
        </div>

        {/* Card 2 - Total Rooms - Emerald Green */}
        <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-emerald-700"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

          <div className="absolute -top-20 -right-20 w-48 h-48 bg-white/10 rounded-full group-hover:scale-[3] transition-transform duration-700 ease-out"></div>
          <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-white/5 rounded-full group-hover:scale-[2.5] transition-transform duration-700 delay-100 ease-out"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/0 rounded-full group-hover:bg-white/5 group-hover:scale-[8] transition-all duration-700"></div>

          <div className="relative p-6 z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <DoorOpen className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-1 px-2.5 py-1 bg-white/20 backdrop-blur-sm rounded-full group-hover:bg-white/30 transition-all">
                <ArrowUpRight className="w-3 h-3 text-white" />
                <span className="text-xs font-bold text-white">+8.2%</span>
              </div>
            </div>
            <h3 className="text-white/80 text-sm font-medium uppercase tracking-wide">
              Total Rooms
            </h3>
            <p className="text-4xl font-extrabold text-white mt-2">124</p>
            <div className="mt-4"></div>
          </div>
        </div>

        {/* Card 3 - Monthly Revenue - Purple */}
        <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-indigo-600"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

          <div className="absolute -top-20 -right-20 w-48 h-48 bg-white/10 rounded-full group-hover:scale-[3] transition-transform duration-700 ease-out"></div>
          <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-white/5 rounded-full group-hover:scale-[2.5] transition-transform duration-700 delay-100 ease-out"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/0 rounded-full group-hover:bg-white/5 group-hover:scale-[8] transition-all duration-700"></div>

          <div className="relative p-6 z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-1 px-2.5 py-1 bg-white/20 backdrop-blur-sm rounded-full group-hover:bg-white/30 transition-all">
                <ArrowUpRight className="w-3 h-3 text-white" />
                <span className="text-xs font-bold text-white">+23%</span>
              </div>
            </div>
            <h3 className="text-white/80 text-sm font-medium uppercase tracking-wide">
              Monthly Revenue
            </h3>
            <p className="text-4xl font-extrabold text-white mt-2">₹72K</p>
          </div>
        </div>

        {/* Card 4 - Occupancy Rate - Rose/Red */}
        <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

          <div className="absolute -top-20 -right-20 w-48 h-48 bg-white/10 rounded-full group-hover:scale-[3] transition-transform duration-700 ease-out"></div>
          <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-white/5 rounded-full group-hover:scale-[2.5] transition-transform duration-700 delay-100 ease-out"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/0 rounded-full group-hover:bg-white/5 group-hover:scale-[8] transition-all duration-700"></div>

          <div className="relative p-6 z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-1 px-2.5 py-1 bg-white/20 backdrop-blur-sm rounded-full group-hover:bg-white/30 transition-all">
                <ArrowUpRight className="w-3 h-3 text-white" />
                <span className="text-xs font-bold text-white">+5%</span>
              </div>
            </div>
            <h3 className="text-white/80 text-sm font-medium uppercase tracking-wide">
              Occupancy Rate
            </h3>
            <p className="text-4xl font-extrabold text-white mt-2">84%</p>
          </div>
        </div>
      </div>
      

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Revenue Chart */}
     <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6">
  <div className="flex items-center justify-between mb-8">
    <div>
      <h2 className="text-xl font-bold text-gray-800">Revenue Overview</h2>
      <p className="text-sm text-gray-500 mt-1">Revenue vs Expenses breakdown</p>
    </div>
    <div className="flex gap-2 bg-gray-50 p-1 rounded-lg border border-gray-200">
      <button
        onClick={() => setSelectedPeriod("weekly")}
        className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
          selectedPeriod === "weekly" 
            ? "bg-gray-900 text-white shadow-sm" 
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        }`}
      >
        Weekly
      </button>
      <button
        onClick={() => setSelectedPeriod("monthly")}
        className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
          selectedPeriod === "monthly" 
            ? "bg-gray-900 text-white shadow-sm" 
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        }`}
      >
        Monthly
      </button>
      <button
        onClick={() => setSelectedPeriod("yearly")}
        className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
          selectedPeriod === "yearly" 
            ? "bg-gray-900 text-white shadow-sm" 
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        }`}
      >
        Yearly
      </button>
    </div>
  </div>

  {/* Circle Chart and Stats */}
  <div className="flex flex-col lg:flex-row items-center gap-8">
    {/* Circle Chart */}
    <div className="relative w-64 h-64">
      <svg className="w-full h-full transform -rotate-90">
        {/* Background circle */}
        <circle 
          cx="128" 
          cy="128" 
          r="110" 
          fill="none" 
          stroke="#F3F4F6" 
          strokeWidth="20"
        />
        {/* Revenue circle (63.6% of total) - Blue Gradient */}
        <defs>
          <linearGradient id="revenueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
          <linearGradient id="expensesGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="100%" stopColor="#F97316" />
          </linearGradient>
        </defs>
        <circle 
          cx="128" 
          cy="128" 
          r="110" 
          fill="none" 
          stroke="url(#revenueGradient)" 
          strokeWidth="20"
          strokeDasharray={`${63.6 * 6.91} ${100 * 6.91}`}
          strokeLinecap="round"
          className="transition-all duration-1000"
        />
        {/* Expenses circle (36.4% of total) - Red/Orange Gradient */}
        <circle 
          cx="128" 
          cy="128" 
          r="110" 
          fill="none" 
          stroke="url(#expensesGradient)" 
          strokeWidth="20"
          strokeDasharray={`${36.4 * 6.91} ${100 * 6.91}`}
          strokeLinecap="round"
          strokeDashoffset="0"
          className="transition-all duration-1000"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-gray-800">₹5.59L</span>
        <span className="text-sm text-gray-500 mt-1">Total</span>
      </div>
    </div>

    {/* Stats Legend */}
    <div className="flex-1 space-y-4">
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-700">Revenue</span>
          </div>
          <span className="text-xl font-bold text-gray-800">₹3.56L</span>
        </div>
        <div className="w-full bg-blue-200 rounded-full h-2">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" style={{ width: '63.6%' }}></div>
        </div>
        <p className="text-xs text-blue-600 mt-2">↑ 23% from last period</p>
      </div>

      <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-4 border border-red-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-700">Expenses</span>
          </div>
          <span className="text-xl font-bold text-gray-800">₹2.03L</span>
        </div>
        <div className="w-full bg-red-200 rounded-full h-2">
          <div className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full" style={{ width: '36.4%' }}></div>
        </div>
        <p className="text-xs text-red-600 mt-2">↑ 12% from last period</p>
      </div>

      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-4 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-emerald-100 uppercase tracking-wide">Net Profit</p>
            <p className="text-2xl font-bold mt-1">₹1.53L</p>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-xs text-emerald-200">↑ 28%</span>
          <span className="text-xs text-emerald-100">profit margin</span>
        </div>
      </div>
    </div>
  </div>

  {/* Monthly Data Grid */}
  <div className="mt-8 pt-6 border-t border-gray-200">
    <h3 className="text-sm font-semibold text-gray-700 mb-4">Monthly Breakdown</h3>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {[
        { month: "Jan", revenue: 45, expenses: 28, profit: 17 },
        { month: "Feb", revenue: 52, expenses: 30, profit: 22 },
        { month: "Mar", revenue: 58, expenses: 32, profit: 26 },
        { month: "Apr", revenue: 62, expenses: 35, profit: 27 },
        { month: "May", revenue: 67, expenses: 38, profit: 29 },
        { month: "Jun", revenue: 72, expenses: 40, profit: 32 },
      ].map((item, idx) => (
        <div key={idx} className="bg-gray-50 rounded-lg p-3 text-center border border-gray-200 hover:shadow-lg hover:scale-105 transition-all duration-300">
          <p className="text-sm font-bold text-gray-700">{item.month}</p>
          <p className="text-xs text-blue-600 font-semibold mt-1">₹{item.revenue}K</p>
          <p className="text-xs text-red-500">₹{item.expenses}K</p>
          <div className="mt-2 pt-2 border-t border-gray-200">
            <p className="text-xs font-semibold text-emerald-600">+₹{item.profit}K</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

        {/* Right Side Widgets */}
        <div className="space-y-6">
          {/* Occupancy Widget */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Room Occupancy
              </h2>
              <Home className="w-5 h-5 text-gray-400" />
            </div>
            <div className="flex flex-col items-center">
              <div className="relative w-40 h-40 mb-4">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="12"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="12"
                    strokeDasharray={`${84 * 4.4} ${100 * 4.4}`}
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient
                      id="gradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#4F46E5" />
                      <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-gray-800">84%</span>
                  <span className="text-sm text-gray-500">Occupied</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full mt-2">
                <div className="text-center p-3 bg-indigo-50 rounded-xl">
                  <div className="text-2xl font-bold text-indigo-600">42</div>
                  <div className="text-sm text-gray-600">Occupied</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <div className="text-2xl font-bold text-gray-600">8</div>
                  <div className="text-sm text-gray-600">Vacant</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-sm p-6 text-white">
            <h3 className="font-semibold mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full bg-white/20 hover:bg-white/30 rounded-lg p-2 text-sm flex items-center justify-between transition-all">
                <span>Add New Tenant</span>
                <UserPlus className="w-4 h-4" />
              </button>
              <button className="w-full bg-white/20 hover:bg-white/30 rounded-lg p-2 text-sm flex items-center justify-between transition-all">
                <span>Record Payment</span>
                <CreditCard className="w-4 h-4" />
              </button>
              <button className="w-full bg-white/20 hover:bg-white/30 rounded-lg p-2 text-sm flex items-center justify-between transition-all">
                <span>Settings</span>
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities & Payments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">
              Recent Activities
            </h2>
            <button className="text-indigo-600 text-sm font-medium hover:text-indigo-700 flex items-center gap-1">
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`${activity.color} w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold`}
                  >
                    {activity.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      {activity.tenant}
                    </p>
                    <p className="text-sm text-gray-500">
                      {activity.action}{" "}
                      {activity.amount && `• ${activity.amount}`}{" "}
                      {activity.room && `• ${activity.room}`}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">
              Upcoming Tasks
            </h2>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {upcomingTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:border-indigo-200 transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{task.icon}</span>
                  <div>
                    <p className="font-medium text-gray-800">{task.task}</p>
                    <p className="text-sm text-gray-500">{task.date}</p>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-full font-medium ${getPriorityColor(task.priority)}`}
                >
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Payments Table */}
      <div className="mt-8 bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Recent Payments
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Latest transactions from tenants
              </p>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                Add Payment
              </button>
              <button className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1">
                <Download className="w-4 h-4" /> Export
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tenant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Room
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentPayments.map((payment) => (
                <tr
                  key={payment.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                        {payment.tenant.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {payment.tenant}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">
                      {payment.room}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-gray-900">
                      {payment.amount}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">
                      {payment.method}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">
                      {payment.date}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full font-medium border ${getStatusColor(payment.status)}`}
                    >
                      {payment.status.charAt(0).toUpperCase() +
                        payment.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;
