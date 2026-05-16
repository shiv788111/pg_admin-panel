const BASE_URL = "http://localhost:5000/api/dashboard";

/* =========================================
   Get Dashboard Stats
========================================= */
export const getDashboardStats = async () => {
  const response = await fetch(`${BASE_URL}/stats`);

  return await response.json();
};

/* =========================================
   Get Monthly Revenue
========================================= */
export const getMonthlyRevenue = async () => {
  const response = await fetch(`${BASE_URL}/monthly-revenue`);

  return await response.json();
};

/* =========================================
   Get Occupancy Stats
========================================= */
export const getOccupancyStats = async () => {
  const response = await fetch(`${BASE_URL}/occupancy-stats`);

  return await response.json();
};

/* =========================================
   Get Recent Payments
========================================= */
export const getRecentPayments = async () => {
  const response = await fetch(`${BASE_URL}/recent-payments`);

  return await response.json();
};

/* =========================================
   Get Recent Tenants
========================================= */
export const getRecentTenants = async () => {
  const response = await fetch(`${BASE_URL}/recent-tenants`);

  return await response.json();
};

/* =========================================
   Get Branch Analytics
========================================= */
export const getBranchAnalytics = async () => {
  const response = await fetch(`${BASE_URL}/branch-analytics`);

  return await response.json();
};
