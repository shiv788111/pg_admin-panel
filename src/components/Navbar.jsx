import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Add this import
import { 
  Bell, 
  Search, 
  User, 
  Menu, 
  LogOut, 
  Settings,
  Moon,
  Sun,
  ChevronDown,
  Grid,
  MessageSquare,
  Calendar as CalendarIcon,
  CreditCard,
  Users,
  DoorOpen,
  DollarSign
} from "lucide-react";

function Navbar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate(); // Add this hook
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Add logout handler function
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the auth token
    navigate("/login"); // Redirect to login page
  };

  const notifications = [
    { id: 1, title: "New tenant registered", message: "Rahul Sharma booked Room A-101", time: "5 min ago", read: false, icon: Users, color: "bg-blue-500" },
    { id: 2, title: "Payment received", message: "₹8,500 from Priya Patel", time: "1 hour ago", read: false, icon: DollarSign, color: "bg-green-500" },
    { id: 3, title: "Maintenance request", message: "Room B-202 needs AC repair", time: "3 hours ago", read: true, icon: Settings, color: "bg-yellow-500" },
    { id: 4, title: "Contract renewal", message: "Amit Kumar's contract expires soon", time: "1 day ago", read: true, icon: CalendarIcon, color: "bg-purple-500" },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const formatTime = () => {
    return currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = () => {
    return currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <>
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left Section - Menu & Brand */}
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-xl text-gray-600 hover:bg-gray-100 lg:hidden transition-all duration-200 hover:scale-105"
              >
                <Menu className="w-5 h-5" />
              </button>
              
              {/* Brand Logo */}
              <div className="hidden md:flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">PG</span>
                </div>
                <div>
                  <h2 className="text-lg font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    PG Manager ERP
                  </h2>
                  <p className="text-xs text-gray-500">Property Management System</p>
                </div>
              </div>
            </div>

            {/* Right Section - Actions */}
            <div className="flex items-center gap-2">
              {/* Search Bar */}
              <div className="hidden md:flex items-center bg-gray-50 rounded-xl px-4 py-2 min-w-[300px] focus-within:ring-2 focus-within:ring-indigo-500 focus-within:bg-white transition-all">
                <Search className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tenants, rooms, payments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none px-2 w-full text-sm"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="text-gray-400 hover:text-gray-600">
                    ✕
                  </button>
                )}
              </div>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className="p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-all duration-200 hover:scale-105 relative"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {isNotificationsOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsNotificationsOpen(false)}></div>
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden">
                      <div className="p-4 border-b border-gray-100">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-800">Notifications</h3>
                          <button className="text-xs text-indigo-600 hover:text-indigo-700">Mark all as read</button>
                        </div>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map((notif) => (
                          <div key={notif.id} className={`p-3 hover:bg-gray-50 transition-colors cursor-pointer ${!notif.read ? 'bg-indigo-50/30' : ''}`}>
                            <div className="flex items-start gap-3">
                              <div className={`w-8 h-8 ${notif.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                                <notif.icon className="w-4 h-4 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-800">{notif.title}</p>
                                <p className="text-xs text-gray-600 mt-0.5">{notif.message}</p>
                                <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                              </div>
                              {!notif.read && <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></div>}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-3 border-t border-gray-100 bg-gray-50">
                        <button className="w-full text-center text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                          View all notifications
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Profile Section */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-1 rounded-xl hover:bg-gray-100 transition-all duration-200 group"
                >
                  <div className="w-9 h-9 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-semibold shadow-md group-hover:shadow-lg transition-all">
                    A
                  </div>
                  <div className="hidden lg:block text-left">
                    <p className="text-sm font-semibold text-gray-700">Admin User</p>
                    <p className="text-xs text-gray-500">Administrator</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-500 hidden lg:block" />
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)}></div>
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden">
                      <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                            A
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">Admin User</p>
                            <p className="text-xs text-gray-500">admin@pgmanager.com</p>
                          </div>
                        </div>
                      </div>
                      <div className="py-2">
                        <button className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                          <User className="w-4 h-4 text-gray-400" />
                          My Profile
                        </button>
                        <button className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                          <Settings className="w-4 h-4 text-gray-400" />
                          Account Settings
                        </button>
                        <button className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                          <CreditCard className="w-4 h-4 text-gray-400" />
                          Billing
                        </button>
                        <hr className="my-2" />
                        {/* Updated Sign Out button with handleLogout function */}
                        <button 
                          onClick={handleLogout}
                          className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden px-4 pb-3">
          <div className="flex items-center bg-gray-50 rounded-xl px-4 py-2 focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none px-2 flex-1 text-sm"
            />
          </div>
        </div>
      </nav>

      {/* Floating Quick Actions - Mobile */}
      <div className="lg:hidden fixed bottom-6 right-6 z-40">
        <button className="w-14 h-14 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-all hover:scale-105">
          <Grid className="w-6 h-6" />
        </button>
      </div>
    </>
  );
}

export default Navbar;