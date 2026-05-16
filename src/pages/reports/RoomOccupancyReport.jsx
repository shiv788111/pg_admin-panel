import React, { useEffect, useState } from "react";
import { Building2, BedDouble, BedSingle, Percent } from "lucide-react";

import { getOccupancyReport } from "../../services/reports";

const RoomOccupancyReport = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ===============================
     FETCH REPORT
  ============================== */
  useEffect(() => {
    fetchOccupancyReport();
  }, []);

  const fetchOccupancyReport = async () => {
    try {
      setLoading(true);

      const response = await getOccupancyReport();

      if (response.success) {
        setReport(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /* ===============================
     LOADING
  ============================== */
  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-700">
          Loading Occupancy Report...
        </h2>
      </div>
    );
  }

  /* ===============================
     DATA
  ============================== */
  const totalRooms = Number(report?.total_rooms || 0);

  const occupiedRooms = Number(report?.occupied_rooms || 0);

  const vacantRooms = Number(report?.vacant_rooms || 0);

  const occupancyRate =
    totalRooms > 0 ? ((occupiedRooms / totalRooms) * 100).toFixed(0) : 0;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Room Occupancy Report
        </h1>

        <p className="text-gray-500 mt-2">
          Track room occupancy and vacancy status
        </p>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {/* TOTAL ROOMS */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Rooms</p>

              <h2 className="text-3xl font-bold text-gray-800 mt-2">
                {totalRooms}
              </h2>
            </div>

            <div className="bg-indigo-100 p-3 rounded-xl">
              <Building2 size={26} className="text-indigo-600" />
            </div>
          </div>
        </div>

        {/* OCCUPIED */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Occupied Rooms</p>

              <h2 className="text-3xl font-bold text-green-600 mt-2">
                {occupiedRooms}
              </h2>
            </div>

            <div className="bg-green-100 p-3 rounded-xl">
              <BedDouble size={26} className="text-green-600" />
            </div>
          </div>
        </div>

        {/* VACANT */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Vacant Rooms</p>

              <h2 className="text-3xl font-bold text-red-500 mt-2">
                {vacantRooms}
              </h2>
            </div>

            <div className="bg-red-100 p-3 rounded-xl">
              <BedSingle size={26} className="text-red-500" />
            </div>
          </div>
        </div>

        {/* OCCUPANCY RATE */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Occupancy Rate</p>

              <h2 className="text-3xl font-bold text-orange-500 mt-2">
                {occupancyRate}%
              </h2>
            </div>

            <div className="bg-orange-100 p-3 rounded-xl">
              <Percent size={26} className="text-orange-500" />
            </div>
          </div>
        </div>
      </div>

      {/* OVERVIEW */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Occupancy Overview
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              Overall room occupancy status
            </p>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-500">Current Occupancy</p>

            <h2 className="text-2xl font-bold text-indigo-600">
              {occupancyRate}%
            </h2>
          </div>
        </div>

        {/* PROGRESS */}
        <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden">
          <div
            className="bg-indigo-600 h-5 rounded-full transition-all duration-500"
            style={{
              width: `${occupancyRate}%`,
            }}
          />
        </div>

        {/* LABELS */}
        <div className="flex items-center justify-between mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-indigo-600" />

            <span className="text-gray-600">Occupied ({occupiedRooms})</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-300" />

            <span className="text-gray-600">Vacant ({vacantRooms})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomOccupancyReport;
