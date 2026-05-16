import React, { useEffect, useState } from "react";

import {
  CalendarDays,
  IndianRupee,
  CreditCard,
  Search,
  Wallet,
} from "lucide-react";

const DaywiseReport = () => {
  const [payments, setPayments] =
    useState([]);

  const [filteredPayments, setFilteredPayments] =
    useState([]);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  /* ===============================
     FETCH PAYMENTS
  ============================== */
  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);

      const token =
        localStorage.getItem("token") ||
        localStorage.getItem(
          "authToken",
        );

      const response = await fetch(
        "http://localhost:5000/api/payments",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data =
        await response.json();

      if (data.success) {
        setPayments(data.data || []);
        setFilteredPayments(
          data.data || [],
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
    const filtered =
      payments.filter((item) =>
        item.payment_mode
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase(),
          ),
      );

    setFilteredPayments(filtered);
  }, [searchTerm, payments]);

  /* ===============================
     STATS
  ============================== */
  const totalCollection =
    filteredPayments.reduce(
      (sum, item) =>
        sum + Number(item.amount),
      0,
    );

  const totalTransactions =
    filteredPayments.length;

  const paidTransactions =
    filteredPayments.filter(
      (item) =>
        item.status === "paid",
    ).length;

  const pendingTransactions =
    filteredPayments.filter(
      (item) =>
        item.status !== "paid",
    ).length;

  /* ===============================
     FORMAT DATE
  ============================== */
  const formatDate = (date) => {
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
            Loading Daywise Report...
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
          Daywise Report
        </h1>

        <p className="text-gray-500 mt-2">
          Track daily payment
          transactions
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
            placeholder="Search payment mode..."
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
        {/* TOTAL COLLECTION */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">
                Total Collection
              </p>

              <h2 className="text-3xl font-bold text-green-600 mt-3">
                ₹
                {totalCollection.toLocaleString()}
              </h2>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center">
              <IndianRupee
                size={30}
                className="text-green-600"
              />
            </div>
          </div>
        </div>

        {/* TRANSACTIONS */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">
                Transactions
              </p>

              <h2 className="text-4xl font-bold text-indigo-600 mt-3">
                {totalTransactions}
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

        {/* PAID */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">
                Paid
              </p>

              <h2 className="text-4xl font-bold text-green-600 mt-3">
                {paidTransactions}
              </h2>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center">
              <CreditCard
                size={30}
                className="text-green-600"
              />
            </div>
          </div>
        </div>

        {/* PENDING */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">
                Pending
              </p>

              <h2 className="text-4xl font-bold text-red-500 mt-3">
                {pendingTransactions}
              </h2>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center">
              <CalendarDays
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
          <table className="w-full min-w-[1000px]">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                  Payment ID
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                  Amount
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                  Payment Mode
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                  Payment Date
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                  Billing Month
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                  Status
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                  Reference
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredPayments.length >
              0 ? (
                filteredPayments.map(
                  (item) => (
                    <tr
                      key={
                        item.payment_id
                      }
                      className="border-b border-gray-100 hover:bg-gray-50 transition"
                    >
                      {/* ID */}
                      <td className="px-6 py-5 font-semibold text-gray-800">
                        #
                        {
                          item.payment_id
                        }
                      </td>

                      {/* AMOUNT */}
                      <td className="px-6 py-5">
                        <span className="font-semibold text-green-600">
                          ₹
                          {Number(
                            item.amount,
                          ).toLocaleString()}
                        </span>
                      </td>

                      {/* MODE */}
                      <td className="px-6 py-5 text-gray-700 capitalize">
                        {
                          item.payment_mode
                        }
                      </td>

                      {/* DATE */}
                      <td className="px-6 py-5 text-gray-700">
                        {formatDate(
                          item.payment_date,
                        )}
                      </td>

                      {/* BILLING */}
                      <td className="px-6 py-5 text-gray-700">
                        {formatDate(
                          item.billing_month,
                        )}
                      </td>

                      {/* STATUS */}
                      <td className="px-6 py-5">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            item.status ===
                            "paid"
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-500"
                          }`}
                        >
                          {
                            item.status
                          }
                        </span>
                      </td>

                      {/* REF */}
                      <td className="px-6 py-5 text-gray-700">
                        {
                          item.transaction_ref
                        }
                      </td>
                    </tr>
                  ),
                )
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-10 text-gray-500"
                  >
                    No payment records found
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

export default DaywiseReport;