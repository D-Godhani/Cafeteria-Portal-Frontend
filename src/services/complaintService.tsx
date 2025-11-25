import axios from "axios";

// Base URL (Matches your other services)
const BASE_URL = "http://localhost:8080";

// Helper for Auth Header
const getAuthHeader = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
  }
  return { headers: {} };
};

// --- INTERFACES ---

export interface ComplaintRequest {
  canteenId: string | number; // ✅ Added this
  title: string;
  description: string;
}

export interface Complaint {
  complainId: number; // ✅ Matches backend
  canteenId: number;
  canteenName?: string;
  title: string;
  description: string;
  complaintStatus: "PENDING" | "RESOLVED"; // ✅ Matches backend
  createdAt: string;
}

// --- API FUNCTIONS ---

/**
 * Creates a new complaint
 */
export const createComplaint = async (data: ComplaintRequest) => {
  const response = await axios.post(
    `${BASE_URL}/user/complaints`,
    data,
    getAuthHeader()
  );
  return response.data;
};

/**
 * Fetches the current user's past complaints
 */
export const getMyComplaints = async (): Promise<Complaint[]> => {
  const response = await axios.get(
    `${BASE_URL}/user/complaints/mycomplaints`,
    getAuthHeader()
  );
  return response.data;
};

/**
 * Fetches a single complaint details (Optional, if needed)
 */
export const getComplaintById = async (
  id: number | string
): Promise<Complaint> => {
  const response = await axios.get(
    `${BASE_URL}/user/complaint/${id}`,
    getAuthHeader()
  );
  return response.data;
};
