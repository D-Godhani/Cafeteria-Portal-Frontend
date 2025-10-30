// src/services/complaintService.ts

// --- INTERFACES ---

interface ComplaintData {
  title: string;
  description: string;
}

interface Complaint {
  id: number;
  title: string;
  status: "Pending" | "Resolved";
  createdAt: string;
  // Add any other fields your API returns for a complaint
}

// --- API FUNCTIONS ---

/**
 * Creates a new complaint by sending a POST request to the backend.
 * @param complaintData - The complaint details { title, description }.
 * @returns The server's response.
 */
export const createComplaint = async (complaintData: ComplaintData) => {
  // 1. Get the token from localStorage
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Authentication Error: No token found.");
  }

  // 2. Make the real API call
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/complaints`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 3. Add the Authorization header
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(complaintData),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create complaint.");
  }

  return response.json();
};

/**
 * Fetches the current user's past complaints from the backend.
 * @returns A promise that resolves with an array of complaint objects.
 */
export const getUserComplaints = async (): Promise<Complaint[]> => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.warn("No token found, returning empty complaints list.");
    return []; // Return empty array if not authenticated
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/complaints`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch complaints.");
  }

  return response.json();
};

/**
 * Fetches the details of a single complaint by its ID.
 * @param complaintId - The ID of the complaint to fetch.
 * @returns A promise that resolves with the detailed complaint object.
 */
export const getComplaintDetails = async (
  complaintId: string | number
): Promise<Complaint> => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Authentication Error: No token found.");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/complaints/${complaintId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch complaint details.");
  }

  return response.json();
};
