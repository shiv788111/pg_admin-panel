import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  DoorOpen,
  DollarSign,
  Calendar,
  Settings,
  FileText,
  HelpCircle,
  LogOut,
  Home,
  UserCog,
  ClipboardList,
  TrendingUp,
  ChevronDown,
  ChevronRight,
  PieChart,
  UserCheck,
  FileSignature,
  CalendarRange,
  RefreshCw,
  BedDouble,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";

function Sidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState({});

  const toggleSubmenu = (path) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  const navItems = [
    { path: "/", name: "Dashboard", icon: LayoutDashboard },
    { path: "/tenants", name: "Tenants", icon: Users },
    { path: "/rooms", name: "Rooms", icon: DoorOpen },
    { path: "/amenities", name: "Amenities", icon: Home },
    {
      path: "/reports",
      name: "Reports",
      icon: FileText,
      hasSubmenu: true,
      subItems: [
       
        { path: "/reports/tenants", name: "Tenant Report", icon: UserCheck },
        {
          path: "/reports/agreements",
          name: "Agreement Report",
          icon: FileSignature,
        },
        {
          path: "/reports/daywise",
          name: "Daywise Report",
          icon: CalendarRange,
        },
        { path: "/reports/refund", name: "Refund Report", icon: RefreshCw },
        {
          path: "/reports/room-occupancy",
          name: "Room Occupancy Report",
          icon: BedDouble,
        },
        {
          path: "/reports/due-rent",
          name: "Due Rent Report",
          icon: AlertCircle,
        },
      ],
    },
    { path: "/payments", name: "Payments", icon: DollarSign },
    { path: "/maintenance", name: "Maintenance", icon: Settings },
    { path: "/attendance", name: "Attendance", icon: Calendar },
    { path: "/expenses", name: "Expenses", icon: TrendingUp },
    { path: "/complaints", name: "Complaints", icon: ClipboardList },

    { path: "/settings", name: "Settings", icon: UserCog },
  ];

  return (
    <aside
      className={`h-full bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-2xl transition-all duration-300 flex flex-col
        ${isCollapsed ? "w-20" : "w-64"}`}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-between p-5 border-b border-gray-700/50">
        <Link to="/" className="flex items-center gap-3 overflow-hidden">
          <div className="bg-indigo-500 p-2 rounded-xl">
            <Home className="w-5 h-5" />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="font-bold text-xl tracking-tight">PG Manager</h1>
              <p className="text-xs text-gray-400">ERP System</p>
            </div>
          )}
        </Link>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-gray-700/50 transition-colors hidden lg:block"
        >
          {isCollapsed ? "→" : "←"}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-3">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            const isSubmenuOpen = openSubmenus[item.path];

            return (
              <li key={item.path}>
                {item.hasSubmenu ? (
                  <>
                    <button
                      onClick={() => !isCollapsed && toggleSubmenu(item.path)}
                      className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                        ${
                          isActive || location.pathname.startsWith("/reports/")
                            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                            : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          className={`w-5 h-5 ${isActive || location.pathname.startsWith("/reports/") ? "text-white" : "text-gray-400 group-hover:text-white"}`}
                        />
                        {!isCollapsed && (
                          <span className="font-medium">{item.name}</span>
                        )}
                      </div>
                      {!isCollapsed && (
                        <div className="transition-transform duration-200">
                          {isSubmenuOpen ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </div>
                      )}
                      {isCollapsed && (
                        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                          {item.name}
                        </div>
                      )}
                    </button>

                    {/* Submenu Items with Animation */}
                    {!isCollapsed && (
                      <div
                        className={`
                        overflow-hidden transition-all duration-300 ease-in-out
                        ${isSubmenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
                      `}
                      >
                        <ul className="mt-1 ml-4 space-y-1">
                          {item.subItems.map((subItem) => {
                            const SubIcon = subItem.icon;
                            const isSubActive =
                              location.pathname === subItem.path;

                            return (
                              <li key={subItem.path}>
                                <Link
                                  to={subItem.path}
                                  className={`
                                    flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-200
                                    transform hover:translate-x-1
                                    ${
                                      isSubActive
                                        ? "bg-indigo-500/50 text-white"
                                        : "text-gray-400 hover:bg-gray-700/50 hover:text-white"
                                    }
                                  `}
                                >
                                  <SubIcon className="w-4 h-4" />
                                  <span className="text-sm">
                                    {subItem.name}
                                  </span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative
                      ${
                        isActive
                          ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                          : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
                      }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-400 group-hover:text-white"}`}
                    />
                    {!isCollapsed && (
                      <span className="font-medium">{item.name}</span>
                    )}
                    {isCollapsed && (
                      <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                        {item.name}
                      </div>
                    )}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-gray-700/50 p-3 mt-auto">
        <div className="space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200 group relative">
            <LogOut className="w-5 h-5" />
            {!isCollapsed && <span className="font-medium">Logout</span>}
            {isCollapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                Logout
              </div>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
