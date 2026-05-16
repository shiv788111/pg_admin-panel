import React, { useEffect, useState } from "react";

import {
  FileText,
  Clock3,
  CheckCircle2,
  XCircle,
  Search,
  CalendarDays,
} from "lucide-react";

import { getAgreementReport } from "../../services/reports";

const AgreementReport = () => {
  const [agreements, setAgreements] = useState([]);

  const [filteredAgreements, setFilteredAgreements] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(true);

  /* ===============================
     FETCH REPORT
  ============================== */
  useEffect(() => {
    fetchAgreementReport();
  }, []);

  const fetchAgreementReport = async () => {
    try {
      setLoading(true);

      const response = await getAgreementReport();

      if (response.success) {
        setAgreements(response.data || []);

        setFilteredAgreements(response.data || []);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /* ===============================
     SEARCH
  ============================== */
  useEffect(() => {
    const filtered = agreements.filter((item) =>
      item.tenant_name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    setFilteredAgreements(filtered);
  }, [searchTerm, agreements]);

  /* ===============================
     STATUS
  ============================== */
  const getStatus = (daysLeft) => {
    if (daysLeft < 0) {
      return {
        label: "Expired",
        className: "bg-red-100 text-red-500",
      };
    }

    if (daysLeft <= 30) {
      return {
        label: "Expiring Soon",
        className: "bg-yellow-100 text-yellow-600",
      };
    }

    return {
      label: "Active",
      className: "bg-green-100 text-green-600",
    };
  };

  /* ===============================
     STATS
  ============================== */
  const totalAgreements = filteredAgreements.length;

  const activeAgreements = filteredAgreements.filter(
    (item) => item.days_left > 30,
  ).length;

  const expiringSoon = filteredAgreements.filter(
    (item) => item.days_left <= 30 && item.days_left >= 0,
  ).length;

  const expiredAgreements = filteredAgreements.filter(
    (item) => item.days_left < 0,
  ).length;

  /* ===============================
     FORMAT DATE
  ============================== */
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  /* ===============================
     LOADING
  ============================== */
  if (loading) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-xl font-semibold text-gray-700">
            Loading Agreement Report...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#f5f7fb] min-h-screen">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Agreement Report</h1>

        <p className="text-gray-500 mt-2">Track tenant agreements and expiry</p>
      </div>

      {/* SEARCH */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="relative w-full md:w-80">
          <Search size={18} className="absolute left-3 top-3 text-gray-400" />

          <input
            type="text"
            placeholder="Search tenant..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {/* TOTAL */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Agreements</p>

              <h2 className="text-4xl font-bold text-gray-800 mt-3">
                {totalAgreements}
              </h2>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center">
              <FileText size={30} className="text-indigo-600" />
            </div>
          </div>
        </div>

        {/* ACTIVE */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Active</p>

              <h2 className="text-4xl font-bold text-green-600 mt-3">
                {activeAgreements}
              </h2>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center">
              <CheckCircle2 size={30} className="text-green-600" />
            </div>
          </div>
        </div>

        {/* EXPIRING */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Expiring Soon</p>

              <h2 className="text-4xl font-bold text-yellow-600 mt-3">
                {expiringSoon}
              </h2>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-yellow-100 flex items-center justify-center">
              <Clock3 size={30} className="text-yellow-600" />
            </div>
          </div>
        </div>

        {/* EXPIRED */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Expired</p>

              <h2 className="text-4xl font-bold text-red-500 mt-3">
                {expiredAgreements}
              </h2>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center">
              <XCircle size={30} className="text-red-500" />
            </div>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                  Tenant
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                  Check In
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                  Exit Date
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                  Days Left
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredAgreements.length > 0 ? (
                filteredAgreements.map((item) => {
                  const status = getStatus(item.days_left);

                  return (
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

                      {/* CHECK IN */}
                      <td className="px-6 py-5 text-gray-700">
                        <div className="flex items-center gap-2">
                          <CalendarDays size={16} className="text-indigo-500" />

                          {formatDate(item.check_in_date)}
                        </div>
                      </td>

                      {/* EXIT */}
                      <td className="px-6 py-5 text-gray-700">
                        {formatDate(item.expected_exit_date)}
                      </td>

                      {/* DAYS LEFT */}
                      <td className="px-6 py-5">
                        <span className="font-semibold text-gray-800">
                          {item.days_left} Days
                        </span>
                      </td>

                      {/* STATUS */}
                      <td className="px-6 py-5">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${status.className}`}
                        >
                          {status.label}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-10 text-gray-500">
                    No agreements found
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

export default AgreementReport;
