// src/services/complaintService.ts

// --- INTERFACES ---

/**
 * Defines the shape of the data required to create a complaint.
 */
interface ComplaintData {
  title: string;
  description: string;
}

/**
 * Defines the shape of a single complaint object returned by the API.
 */
interface Complaint {
  id: number;
  title: string;
  status: "Pending" | "Resolved";
  createdAt: string;
}

// --- DUMMY API FUNCTIONS ---

/**
 * A dummy service function that simulates creating a new complaint.
 * It introduces a 1-second delay to mimic a real network request.
 *
 * @param complaintData - The complaint details { title, description }.
 * @returns A promise that resolves on success or rejects on failure.
 */
export const createComplaint = async (
  complaintData: ComplaintData
): Promise<{ success: boolean; message: string }> => {
  console.log(
    "Dummy Service: Attempting to submit complaint...",
    complaintData
  );

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // For testing, if the description includes "fail", we simulate an error.
      if (complaintData.description.toLowerCase().includes("fail")) {
        console.error("Dummy Service: Simulated API failure.");
        reject(new Error("Network Error: Could not submit the complaint."));
      } else {
        console.log("Dummy Service: Complaint submitted successfully.");
        resolve({
          success: true,
          message: "Complaint successfully received!",
        });
      }
    }, 1000); // 1-second delay
  });
};

/**
 * A dummy service function that simulates fetching a user's past complaints.
 * It introduces a 1.5-second delay to mimic a real network request.
 *
 * @returns A promise that resolves with an array of complaint objects.
 */
export const getUserComplaints = async (): Promise<Complaint[]> => {
  console.log("Dummy Service: Fetching user complaints...");

  const mockComplaints: Complaint[] = [
    {
      id: 1,
      title: "[Service] Incorrect order received",
      status: "Pending",
      createdAt: "2025-10-28T10:00:00Z",
    },
    {
      id: 2,
      title: "[Food Quality] Samosas were cold",
      status: "Resolved",
      createdAt: "2025-10-26T14:30:00Z",
    },
    {
      id: 3,
      title: "[Cleanliness] Water cooler area is untidy",
      status: "Pending",
      createdAt: "2025-10-29T09:15:00Z",
    },
  ];

  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Dummy Service: Successfully fetched complaints.");
      // To test the "empty state", you can temporarily return an empty array:
      // resolve([]);
      resolve(mockComplaints);
    }, 1500); // 1.5-second delay
  });
};
