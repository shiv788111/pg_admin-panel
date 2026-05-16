import React, { useEffect, useState } from "react";

import {
  Users,
  UserCheck,
  UserX,
  Search,
  Building2,
} from "lucide-react";

import { getTenantReport } from "../../services/reports";

const TenantReport = () => {
  const [tenants, setTenants] = useState([]);
  const [filteredTenants, setFilteredTenants] =
    useState([]);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  /* ===============================
     FETCH REPORT
  ============================== */
  useEffect(() => {
    fetchTenantReport();
  }, []);

  const fetchTenantReport = async () => {
    try {
      setLoading(true);

      const response =
        await getTenantReport();

      if (response.success) {
        setTenants(response.data || []);

        setFilteredTenants(
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
    const filtered = tenants.filter(
      (item) =>
        item.tenant_name
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase(),
          ) ||
        item.phone.includes(searchTerm),
    );

    setFilteredTenants(filtered);
  }, [searchTerm, tenants]);

  /* ===============================
     STATS
  ============================== */
  const totalTenants =
    filteredTenants.length;

  const activeTenants =
    filteredTenants.filter(
      (item) => item.status === "active",
    ).length;

  const inactiveTenants =
    filteredTenants.filter(
      (item) => item.status !== "active",
    ).length;

  const totalBranches = [
    ...new Set(
      filteredTenants.map(
        (item) => item.branch_name,
      ),
    ),
  ].length;

  /* ===============================
     LOADING
  ============================== */
  if (loading) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-xl font-semibold text-gray-700">
            Loading Tenant Report...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#f5f7fb] min-h-screen">
      {/* ===============================
          HEADER
      ============================== */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Tenant Report
        </h1>

        <p className="text-gray-500 mt-2">
          Manage and monitor all tenants
        </p>
      </div>

      {/* ===============================
          SEARCH BAR
      ============================== */}
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

      {/* ===============================
          STATS CARDS
      ============================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {/* TOTAL */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">
                Total Tenants
              </p>

              <h2 className="text-4xl font-bold text-gray-800 mt-3">
                {totalTenants}
              </h2>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center">
              <Users
                size={30}
                className="text-indigo-600"
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
              <UserCheck
                size={30}
                className="text-green-600"
              />
            </div>
          </div>
        </div>

        {/* INACTIVE */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">
                Inactive Tenants
              </p>

              <h2 className="text-4xl font-bold text-red-500 mt-3">
                {inactiveTenants}
              </h2>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center">
              <UserX
                size={30}
                className="text-red-500"
              />
            </div>
          </div>
        </div>

        {/* BRANCHES */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">
                Branches
              </p>

              <h2 className="text-4xl font-bold text-orange-500 mt-3">
                {totalBranches}
              </h2>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center">
              <Building2
                size={30}
                className="text-orange-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ===============================
          TABLE
      ============================== */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                  Tenant
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                  Phone
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                  Email
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
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredTenants.length > 0 ? (
                filteredTenants.map((item) => (
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
                          ID #{item.tenant_id}
                        </p>
                      </div>
                    </td>

                    {/* PHONE */}
                    <td className="px-6 py-5 text-gray-700">
                      {item.phone}
                    </td>

                    {/* EMAIL */}
                    <td className="px-6 py-5 text-gray-700">
                      {item.email}
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
                    <td className="px-6 py-5 text-gray-700">
                      {item.bed_name}
                    </td>

                    {/* STATUS */}
                    <td className="px-6 py-5">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          item.status ===
                          "active"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-500"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-10 text-gray-500"
                  >
                    No tenants found
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

export default TenantReport;