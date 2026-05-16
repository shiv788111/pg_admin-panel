const API_URL = "http://localhost:5000/api";

/* ===============================
   GET AUTH TOKEN
================================ */
const getAuthToken = () => {
  return localStorage.getItem("token") || localStorage.getItem("authToken");
};

/* ===============================
   COMMON FETCH FUNCTION
================================ */
const fetchReport = async (endpoint) => {
  try {
    const response = await fetch(`${API_URL}/reports/${endpoint}`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    return await response.json();
  } catch (error) {
    console.error(error);

    return {
      success: false,
      data: [],
    };
  }
};

/* ===============================
   DOWNLOAD FILE FUNCTION
================================ */
const downloadReportFile = (endpoint) => {
  window.open(`${API_URL}/reports/${endpoint}`, "_blank");
};

/* ===============================
   DUE RENT REPORT
================================ */
export const getDueRentReport = () => fetchReport("due-rent");

/* ===============================
   DUE RENT PDF EXPORT
================================ */
export const downloadDueRentPDF = () => downloadReportFile("due-rent/pdf");

/* ===============================
   DUE RENT EXCEL EXPORT
================================ */
export const downloadDueRentExcel = () => downloadReportFile("due-rent/excel");

/* ===============================
   TENANT REPORT
================================ */
export const getTenantReport = () => fetchReport("tenant");

/* ===============================
   AGREEMENT REPORT
================================ */
export const getAgreementReport = () => fetchReport("agreements");

/* ===============================
   OCCUPANCY REPORT
================================ */
export const getOccupancyReport = () => fetchReport("occupancy");

/* ===============================
   REFUND REPORT
================================ */
export const getRefundReport = () => fetchReport("refund");
