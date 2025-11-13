// /src/services/canteenService.ts

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://localhost:8080/admin/canteens";

// --- Types (Co-locating them here is good practice) ---
export interface Canteen {
  id: number;
  canteenName: string;
  info: string;
  fssaiCertificateUrl: string;
  imageUrl: string;
}

export type CanteenFormData = Omit<Canteen, "id">;

// --- Helper: Get Auth Header ---
/**
 * Gets the Authorization header with the token.
 * @param includeContentType - Whether to include 'Content-Type: application/json'
 */
const getAuthHeader = (includeContentType = true) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No authentication token found. Please log in.");
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
  };

  if (includeContentType) {
    headers["Content-Type"] = "application/json";
  }
  return headers;
};

// --- Helper: Handle API Responses ---
/**
 * A generic response handler.
 * Throws an error for 401/403 or non-ok responses.
 * Tries to parse JSON, falls back to text.
 */
const handleResponse = async (response: Response) => {
  if (response.status === 401 || response.status === 403) {
    // Let the UI component handle the logout logic
    throw new Error("Unauthorized or Forbidden. Please log in again.");
  }

  // Get text first, as your backend returns strings for success
  const responseText = await response.text();

  if (!response.ok) {
    throw new Error(responseText || "An unknown API error occurred.");
  }

  try {
    // Try to parse as JSON (for GET list)
    return JSON.parse(responseText);
  } catch (e) {
    // Not JSON, return the plain text (for POST, PUT, DELETE success messages)
    return responseText;
  }
};

// --- API Functions ---

/**
 * Fetches all canteens
 * @returns A promise that resolves to an array of Canteen objects
 */
export const getAllCanteens = async (): Promise<Canteen[]> => {
  const response = await fetch(API_BASE_URL, {
    method: "GET",
    headers: getAuthHeader(false), // No 'Content-Type' needed for GET
  });
  return handleResponse(response);
};

/**
 * Adds a new canteen
 * @param data - The data for the new canteen
 * @returns A promise that resolves to the success message (string)
 */
export const addCanteen = async (data: CanteenFormData): Promise<string> => {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: getAuthHeader(true),
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

/**
 * Updates an existing canteen
 * @param id - The ID of the canteen to update
 * @param data - The new data for the canteen
 * @returns A promise that resolves to the success message (string)
 */
export const updateCanteen = async (
  id: number,
  data: CanteenFormData
): Promise<string> => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: getAuthHeader(true),
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

/**
 * Deletes a canteen
 * @param id - The ID of the canteen to delete
 * @returns A promise that resolves to the success message (string)
 */
export const deleteCanteen = async (id: number): Promise<string> => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeader(false), // No 'Content-Type' or body needed
  });
  return handleResponse(response);
};
