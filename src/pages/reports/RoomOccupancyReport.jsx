import React, { useState } from 'react';
import {
  Search,
  Download,
  Filter,
  ChevronLeft,
  ChevronRight,
  Eye,
  Home,
  Users,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  Building,
  PieChart as PieChartIcon,
  BarChart3,
  DoorOpen,
  UserCheck,
  UserX,
  Percent,
  MapPin
} from 'lucide-react';

const RoomOccupancyReport = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [blockFilter, setBlockFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const itemsPerPage = 10;

  // Mock data for rooms with occupancy details
  const rooms = [
    { id: 1, roomNo: 'A-101', block: 'A', floor: 1, type: 'Standard', capacity: 2, currentOccupants: 2, status: 'occupied', tenantName: 'Rajesh Kumar', rentAmount: 15000, lastMaintenance: '2024-09-15', nextDue: '2024-11-01' },
    { id: 2, roomNo: 'A-102', block: 'A', floor: 1, type: 'Standard', capacity: 2, currentOccupants: 1, status: 'occupied', tenantName: 'Neha Sharma', rentAmount: 15000, lastMaintenance: '2024-09-20', nextDue: '2024-11-01' },
    { id: 3, roomNo: 'A-103', block: 'A', floor: 1, type: 'Standard', capacity: 2, currentOccupants: 0, status: 'vacant', tenantName: null, rentAmount: 15000, lastMaintenance: '2024-10-01', nextDue: null },
    { id: 4, roomNo: 'A-104', block: 'A', floor: 1, type: 'Deluxe', capacity: 3, currentOccupants: 3, status: 'occupied', tenantName: 'Amit Verma', rentAmount: 20000, lastMaintenance: '2024-09-10', nextDue: '2024-11-01' },
    { id: 5, roomNo: 'B-201', block: 'B', floor: 2, type: 'Standard', capacity: 2, currentOccupants: 2, status: 'occupied', tenantName: 'Priya Singh', rentAmount: 16000, lastMaintenance: '2024-09-18', nextDue: '2024-11-01' },
    { id: 6, roomNo: 'B-202', block: 'B', floor: 2, type: 'Standard', capacity: 2, currentOccupants: 0, status: 'vacant', tenantName: null, rentAmount: 16000, lastMaintenance: '2024-10-05', nextDue: null },
    { id: 7, roomNo: 'B-203', block: 'B', floor: 2, type: 'Standard', capacity: 2, currentOccupants: 2, status: 'occupied', tenantName: 'Suresh Kumar', rentAmount: 16000, lastMaintenance: '2024-09-12', nextDue: '2024-11-01' },
    { id: 8, roomNo: 'B-204', block: 'B', floor: 2, type: 'Deluxe', capacity: 3, currentOccupants: 2, status: 'partial', tenantName: 'Divya Gupta, Rohan Mehta', rentAmount: 21000, lastMaintenance: '2024-09-25', nextDue: '2024-11-01' },
    { id: 9, roomNo: 'C-301', block: 'C', floor: 3, type: 'Standard', capacity: 2, currentOccupants: 2, status: 'occupied', tenantName: 'Manish Joshi', rentAmount: 14000, lastMaintenance: '2024-09-14', nextDue: '2024-11-01' },
    { id: 10, roomNo: 'C-302', block: 'C', floor: 3, type: 'Standard', capacity: 2, currentOccupants: 1, status: 'occupied', tenantName: 'Kavita Nair', rentAmount: 14000, lastMaintenance: '2024-09-22', nextDue: '2024-11-01' },
    { id: 11, roomNo: 'C-303', block: 'C', floor: 3, type: 'Standard', capacity: 2, currentOccupants: 0, status: 'vacant', tenantName: null, rentAmount: 14000, lastMaintenance: '2024-10-08', nextDue: null },
    { id: 12, roomNo: 'C-304', block: 'C', floor: 3, type: 'Deluxe', capacity: 3, currentOccupants: 3, status: 'occupied', tenantName: 'Rohit Sharma', rentAmount: 19000, lastMaintenance: '2024-09-08', nextDue: '2024-11-01' },
    { id: 13, roomNo: 'D-401', block: 'D', floor: 4, type: 'Standard', capacity: 2, currentOccupants: 2, status: 'occupied', tenantName: 'Anjali Desai', rentAmount: 17000, lastMaintenance: '2024-09-16', nextDue: '2024-11-01' },
    { id: 14, roomNo: 'D-402', block: 'D', floor: 4, type: 'Standard', capacity: 2, currentOccupants: 0, status: 'vacant', tenantName: null, rentAmount: 17000, lastMaintenance: '2024-10-10', nextDue: null },
    { id: 15, roomNo: 'D-403', block: 'D', floor: 4, type: 'Standard', capacity: 2, currentOccupants: 2, status: 'occupied', tenantName: 'Vikram Singh', rentAmount: 17000, lastMaintenance: '2024-09-19', nextDue: '2024-11-01' },
    { id: 16, roomNo: 'D-404', block: 'D', floor: 4, type: 'Deluxe', capacity: 3, currentOccupants: 2, status: 'partial', tenantName: 'Pooja Mehta, Ravi Kumar', rentAmount: 22000, lastMaintenance: '2024-09-21', nextDue: '2024-11-01' },
    { id: 17, roomNo: 'E-501', block: 'E', floor: 5, type: 'Premium', capacity: 4, currentOccupants: 4, status: 'occupied', tenantName: 'Family - Sharma', rentAmount: 35000, lastMaintenance: '2024-09-05', nextDue: '2024-11-01' },
    { id: 18, roomNo: 'E-502', block: 'E', floor: 5, type: 'Premium', capacity: 4, currentOccupants: 2, status: 'partial', tenantName: 'Singh Family', rentAmount: 35000, lastMaintenance: '2024-09-28', nextDue: '2024-11-01' },
    { id: 19, roomNo: 'E-503', block: 'E', floor: 5, type: 'Premium', capacity: 4, currentOccupants: 0, status: 'vacant', tenantName: null, rentAmount: 35000, lastMaintenance: '2024-10-12', nextDue: null },
    { id: 20, roomNo: 'E-504', block: 'E', floor: 5, type: 'Premium', capacity: 4, currentOccupants: 3, status: 'partial', tenantName: 'Verma Family', rentAmount: 35000, lastMaintenance: '2024-09-24', nextDue: '2024-11-01' },
  ];

  // Calculate statistics
  const totalRooms = rooms.length;
  const occupiedRooms = rooms.filter(r => r.status === 'occupied').length;
  const vacantRooms = rooms.filter(r => r.status === 'vacant').length;
  const partialRooms = rooms.filter(r => r.status === 'partial').length;
  const totalCapacity = rooms.reduce((sum, r) => sum + r.capacity, 0);
  const totalOccupants = rooms.reduce((sum, r) => sum + r.currentOccupants, 0);
  const occupancyRate = (totalOccupants / totalCapacity) * 100;
  
  // Block-wise statistics
  const blockStats = ['A', 'B', 'C', 'D', 'E'].map(block => {
    const blockRooms = rooms.filter(r => r.block === block);
    const totalCap = blockRooms.reduce((sum, r) => sum + r.capacity, 0);
    const totalOcc = blockRooms.reduce((sum, r) => sum + r.currentOccupants, 0);
    return {
      block,
      totalRooms: blockRooms.length,
      occupied: blockRooms.filter(r => r.status === 'occupied').length,
      vacant: blockRooms.filter(r => r.status === 'vacant').length,
      partial: blockRooms.filter(r => r.status === 'partial').length,
      occupancyRate: (totalOcc / totalCap) * 100,
      totalRent: blockRooms.reduce((sum, r) => sum + (r.status !== 'vacant' ? r.rentAmount : 0), 0)
    };
  });

  // Filter rooms
  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.roomNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (room.tenantName && room.tenantName.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesBlock = blockFilter === 'all' || room.block === blockFilter;
    const matchesStatus = statusFilter === 'all' || room.status === statusFilter;
    return matchesSearch && matchesBlock && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredRooms.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRooms = filteredRooms.slice(startIndex, startIndex + itemsPerPage);

  const getStatusBadge = (status) => {
    switch(status) {
      case 'occupied':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700 flex items-center gap-1"><UserCheck className="w-3 h-3" /> Occupied</span>;
      case 'vacant':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700 flex items-center gap-1"><UserX className="w-3 h-3" /> Vacant</span>;
      case 'partial':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700 flex items-center gap-1"><Clock className="w-3 h-3" /> Partial</span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">{status}</span>;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  // Room Details Modal
  const RoomDetailsModal = ({ room, onClose }) => {
    if (!room) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div className="bg-white rounded-xl shadow-xl max-w-lg w-full" onClick={e => e.stopPropagation()}>
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">Room Details - {room.roomNo}</h2>
              <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg">✕</button>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500">Block</label>
                <p className="font-medium text-gray-800">Block {room.block}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500">Floor</label>
                <p className="font-medium text-gray-800">{room.floor}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500">Room Type</label>
                <p className="text-gray-700">{room.type}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500">Capacity</label>
                <p className="text-gray-700">{room.capacity} persons</p>
              </div>
              <div>
                <label className="text-xs text-gray-500">Current Occupants</label>
                <p className="text-gray-700">{room.currentOccupants} / {room.capacity}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500">Status</label>
                <div>{getStatusBadge(room.status)}</div>
              </div>
              <div>
                <label className="text-xs text-gray-500">Monthly Rent</label>
                <p className="text-lg font-semibold text-green-600">{formatCurrency(room.rentAmount)}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500">Last Maintenance</label>
                <p className="text-gray-700">{formatDate(room.lastMaintenance)}</p>
              </div>
            </div>
            <div className="border-t pt-4">
              <label className="text-xs text-gray-500">Tenant(s)</label>
              <p className="text-gray-700 bg-gray-50 p-3 rounded-lg mt-1">{room.tenantName || 'No tenant assigned'}</p>
            </div>
            {room.nextDue && (
              <div className="bg-blue-50 p-3 rounded-lg">
                <label className="text-xs text-blue-600">Next Rent Due</label>
                <p className="text-blue-800 font-medium">{formatDate(room.nextDue)}</p>
              </div>
            )}
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
        <h1 className="text-2xl font-bold text-gray-800">Room Occupancy Report</h1>
        <p className="text-gray-500 mt-1">Track room occupancy, vacancy status, and utilization metrics</p>
      </div>

      {/* Main Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Total Rooms</p>
              <p className="text-2xl font-bold text-gray-800">{totalRooms}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Total Capacity</p>
              <p className="text-2xl font-bold text-gray-800">{totalCapacity}</p>
            </div>
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-indigo-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Current Occupants</p>
              <p className="text-2xl font-bold text-green-600">{totalOccupants}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Occupancy Rate</p>
              <p className="text-2xl font-bold text-purple-600">{occupancyRate.toFixed(1)}%</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Percent className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Vacant Rooms</p>
              <p className="text-2xl font-bold text-orange-600">{vacantRooms}</p>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <DoorOpen className="w-5 h-5 text-orange-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Partial Occupancy</p>
              <p className="text-2xl font-bold text-yellow-600">{partialRooms}</p>
            </div>
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Block-wise Statistics */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <Building className="w-5 h-5 text-gray-600" />
          Block-wise Occupancy
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {blockStats.map(stat => (
            <div key={stat.block} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-800 text-lg">Block {stat.block}</h3>
                <span className="text-sm font-medium text-blue-600">{stat.occupancyRate.toFixed(0)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${stat.occupancyRate}%` }}></div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="text-gray-500">Rooms:</div>
                <div className="font-medium">{stat.totalRooms}</div>
                <div className="text-gray-500">Occupied:</div>
                <div className="font-medium text-green-600">{stat.occupied}</div>
                <div className="text-gray-500">Vacant:</div>
                <div className="font-medium text-orange-600">{stat.vacant}</div>
                <div className="text-gray-500">Partial:</div>
                <div className="font-medium text-yellow-600">{stat.partial}</div>
                <div className="text-gray-500">Monthly Rent:</div>
                <div className="font-medium">{formatCurrency(stat.totalRent)}</div>
              </div>
            </div>
          ))}
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
                placeholder="Search by room or tenant..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64 text-sm"
              />
            </div>
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
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
            >
              <option value="all">All Status</option>
              <option value="occupied">Occupied</option>
              <option value="vacant">Vacant</option>
              <option value="partial">Partial</option>
            </select>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Rooms Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Block/Floor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Occupancy</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tenant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedRooms.map((room) => (
                <tr key={room.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-800 text-sm">{room.roomNo}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    <div className="flex items-center gap-1">
                      <span className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">Blk {room.block}</span>
                      <span className="text-gray-400">/</span>
                      <span>Floor {room.floor}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{room.type}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{room.currentOccupants}</span>
                      <span className="text-gray-400">/</span>
                      <span>{room.capacity}</span>
                      <div className="w-16 bg-gray-200 rounded-full h-1.5 ml-2">
                        <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${(room.currentOccupants / room.capacity) * 100}%` }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(room.status)}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 max-w-[150px] truncate">{room.tenantName || '—'}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-green-600">{room.status !== 'vacant' ? formatCurrency(room.rentAmount) : '—'}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedRoom(room)}
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
        {paginatedRooms.length === 0 && (
          <div className="text-center py-12">
            <Home className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No rooms found</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
            <p className="text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredRooms.length)} of {filteredRooms.length} rooms
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

      {/* Room Details Modal */}
      {selectedRoom && (
        <RoomDetailsModal room={selectedRoom} onClose={() => setSelectedRoom(null)} />
      )}
    </div>
  );
};

export default RoomOccupancyReport;