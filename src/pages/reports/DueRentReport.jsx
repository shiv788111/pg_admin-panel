import React, { useEffect, useState } from "react";

import {
  Search,
  IndianRupee,
  Users,
  CreditCard,
  FileText,
  FileSpreadsheet,
} from "lucide-react";
import {
  getDueRentReport,
  downloadDueRentPDF,
  downloadDueRentExcel,
} from "../../services/reports";

const DueRentReport = () => {
  const [dueRentRecords, setDueRentRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  /* ===============================
     FETCH REPORT
  ============================== */
  useEffect(() => {
    fetchDueRentReport();
  }, []);

  const fetchDueRentReport = async () => {
    try {
      setLoading(true);

      const response = await getDueRentReport();

      if (response.success) {
        setDueRentRecords(response.data || []);
        setFilteredRecords(response.data || []);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /* ===============================
     SEARCH FILTER
  ============================== */
  useEffect(() => {
    const filtered = dueRentRecords.filter((item) =>
      item.tenant_name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    setFilteredRecords(filtered);
  }, [searchTerm, dueRentRecords]);

  /* ===============================
     SUMMARY CARDS
  ============================== */
  const totalDue = filteredRecords.reduce(
    (sum, item) => sum + Number(item.due_amount),
    0,
  );

  const totalPaid = filteredRecords.reduce(
    (sum, item) => sum + Number(item.paid_amount),
    0,
  );

  const totalRent = filteredRecords.reduce(
    (sum, item) => sum + Number(item.bed_monthly_rent),
    0,
  );

  const totalPendingTenants = filteredRecords.length;

  /* ===============================
     LOADING
  ============================== */
  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-700">
          Loading Due Rent Report...
        </h2>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* ===============================
          HEADER
      ============================== */}
      {/* ===============================
    HEADER
============================== */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        {/* TITLE */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Due Rent Report</h1>

          <p className="text-gray-500 mt-1">Track pending rent payments</p>
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          {/* SEARCH */}
          <div className="relative w-full sm:w-80">
            <Search size={18} className="absolute left-3 top-3 text-gray-400" />

            <input
              type="text"
              placeholder="Search tenant..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* PDF BUTTON */}
          <button
            onClick={downloadDueRentPDF}
            className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl font-medium transition"
          >
            <FileText size={18} />
            PDF
          </button>

          {/* EXCEL BUTTON */}
          <button
            onClick={downloadDueRentExcel}
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-medium transition"
          >
            <FileSpreadsheet size={18} />
            Excel
          </button>
        </div>
      </div>

      {/* ===============================
          SUMMARY CARDS
      ============================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {/* TOTAL DUE */}
        <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Due</p>

              <h2 className="text-2xl font-bold mt-2 text-red-500">
                ₹{totalDue.toLocaleString()}
              </h2>
            </div>

            <div className="bg-red-100 p-3 rounded-xl">
              <IndianRupee size={24} className="text-red-500" />
            </div>
          </div>
        </div>

        {/* TOTAL PAID */}
        <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Paid</p>

              <h2 className="text-2xl font-bold mt-2 text-green-600">
                ₹{totalPaid.toLocaleString()}
              </h2>
            </div>

            <div className="bg-green-100 p-3 rounded-xl">
              <CreditCard size={24} className="text-green-600" />
            </div>
          </div>
        </div>

        {/* TOTAL RENT */}
        <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Monthly Rent</p>

              <h2 className="text-2xl font-bold mt-2 text-indigo-600">
                ₹{totalRent.toLocaleString()}
              </h2>
            </div>

            <div className="bg-indigo-100 p-3 rounded-xl">
              <IndianRupee size={24} className="text-indigo-600" />
            </div>
          </div>
        </div>

        {/* PENDING TENANTS */}
        <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending Tenants</p>

              <h2 className="text-2xl font-bold mt-2 text-orange-500">
                {totalPendingTenants}
              </h2>
            </div>

            <div className="bg-orange-100 p-3 rounded-xl">
              <Users size={24} className="text-orange-500" />
            </div>
          </div>
        </div>
      </div>

      {/* ===============================
          TABLE
      ============================== */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                  Tenant
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                  Branch
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                  Room
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                  Bed
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                  Monthly Rent
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                  Paid
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                  Due
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map((item) => (
                  <tr
                    key={item.tenant_id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition"
                  >
                    {/* TENANT */}
                    <td className="px-6 py-5">
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {item.tenant_name}
                        </h3>

                        <p className="text-sm text-gray-500">
                          Tenant ID #{item.tenant_id}
                        </p>
                      </div>
                    </td>

                    {/* BRANCH */}
                    <td className="px-6 py-5 text-gray-700">
                      {item.branch_name}
                    </td>

                    {/* ROOM */}
                    <td className="px-6 py-5 text-gray-700">
                      {item.room_name}
                    </td>

                    {/* BED */}
                    <td className="px-6 py-5 text-gray-700">{item.bed_name}</td>

                    {/* RENT */}
                    <td className="px-6 py-5 font-medium text-gray-800">
                      ₹{Number(item.bed_monthly_rent).toLocaleString()}
                    </td>

                    {/* PAID */}
                    <td className="px-6 py-5">
                      <span className="text-green-600 font-semibold">
                        ₹{Number(item.paid_amount).toLocaleString()}
                      </span>
                    </td>

                    {/* DUE */}
                    <td className="px-6 py-5">
                      <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                        ₹{Number(item.due_amount).toLocaleString()}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-10 text-gray-500">
                    No due rent records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DueRentReport;
