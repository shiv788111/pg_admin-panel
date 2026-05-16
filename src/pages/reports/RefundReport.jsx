import React, { useEffect, useState } from "react";

import {
  Wallet,
  Clock3,
  CheckCircle2,
  Search,
  IndianRupee,
} from "lucide-react";

import { getRefundReport } from "../../services/reports";

const RefundReport = () => {
  const [refunds, setRefunds] =
    useState([]);

  const [filteredRefunds, setFilteredRefunds] =
    useState([]);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  /* ===============================
     FETCH REPORT
  ============================== */
  useEffect(() => {
    fetchRefundReport();
  }, []);

  const fetchRefundReport = async () => {
    try {
      setLoading(true);

      const response =
        await getRefundReport();

      if (response.success) {
        setRefunds(response.data || []);

        setFilteredRefunds(
          response.data || [],
        );
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
    const filtered = refunds.filter(
      (item) =>
        item.tenant_name
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase(),
          ),
    );

    setFilteredRefunds(filtered);
  }, [searchTerm, refunds]);

  /* ===============================
     STATS
  ============================== */
  const totalRefunds =
    filteredRefunds.length;

  const pendingRefunds =
    filteredRefunds.filter(
      (item) =>
        item.refund_status ===
        "Refund Pending",
    ).length;

  const activeTenants =
    filteredRefunds.filter(
      (item) =>
        item.refund_status === "Active",
    ).length;

  const totalDeposit =
    filteredRefunds.reduce(
      (sum, item) =>
        sum +
        Number(item.security_deposit),
      0,
    );

  /* ===============================
     FORMAT DATE
  ============================== */
  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      },
    );
  };

  /* ===============================
     LOADING
  ============================== */
  if (loading) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-xl font-semibold text-gray-700">
            Loading Refund Report...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#f5f7fb] min-h-screen">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Refund Report
        </h1>

        <p className="text-gray-500 mt-2">
          Track tenant refund and security
          deposits
        </p>
      </div>

      {/* SEARCH */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="relative w-full md:w-80">
          <Search
            size={18}
            className="absolute left-3 top-3 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search tenant..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
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
              <p className="text-gray-500 text-sm">
                Total Refunds
              </p>

              <h2 className="text-4xl font-bold text-gray-800 mt-3">
                {totalRefunds}
              </h2>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center">
              <Wallet
                size={30}
                className="text-indigo-600"
              />
            </div>
          </div>
        </div>

        {/* PENDING */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">
                Pending Refunds
              </p>

              <h2 className="text-4xl font-bold text-yellow-600 mt-3">
                {pendingRefunds}
              </h2>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-yellow-100 flex items-center justify-center">
              <Clock3
                size={30}
                className="text-yellow-600"
              />
            </div>
          </div>
        </div>

        {/* ACTIVE */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">
                Active Tenants
              </p>

              <h2 className="text-4xl font-bold text-green-600 mt-3">
                {activeTenants}
              </h2>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center">
              <CheckCircle2
                size={30}
                className="text-green-600"
              />
            </div>
          </div>
        </div>

        {/* TOTAL DEPOSIT */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">
                Total Deposit
              </p>

              <h2 className="text-3xl font-bold text-red-500 mt-3">
                ₹
                {totalDeposit.toLocaleString()}
              </h2>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center">
              <IndianRupee
                size={30}
                className="text-red-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                  Tenant
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                  Security Deposit
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                  Vacated Date
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                  Refund Status
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredRefunds.length > 0 ? (
                filteredRefunds.map(
                  (item) => (
                    <tr
                      key={item.tenant_id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition"
                    >
                      {/* TENANT */}
                      <td className="px-6 py-5">
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {
                              item.tenant_name
                            }
                          </h3>

                          <p className="text-sm text-gray-500">
                            Tenant ID #
                            {
                              item.tenant_id
                            }
                          </p>
                        </div>
                      </td>

                      {/* DEPOSIT */}
                      <td className="px-6 py-5">
                        <span className="font-semibold text-indigo-600">
                          ₹
                          {Number(
                            item.security_deposit,
                          ).toLocaleString()}
                        </span>
                      </td>

                      {/* VACATED DATE */}
                      <td className="px-6 py-5 text-gray-700">
                        {formatDate(
                          item.vacated_date,
                        )}
                      </td>

                      {/* STATUS */}
                      <td className="px-6 py-5">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            item.refund_status ===
                            "Refund Pending"
                              ? "bg-yellow-100 text-yellow-600"
                              : "bg-green-100 text-green-600"
                          }`}
                        >
                          {
                            item.refund_status
                          }
                        </span>
                      </td>
                    </tr>
                  ),
                )
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-10 text-gray-500"
                  >
                    No refund records found
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

export default RefundReport;