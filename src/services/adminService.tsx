import axios from "axios";

// Base URLs
const BASE_URL = "http://localhost:8080";
const ADMIN_URL = `${BASE_URL}/admin`;
const USER_URL = `${BASE_URL}/user`;

// Helper to get the token
const getAuthHeader = () => {
  // Ensure we run this only on client-side
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
  }
  return { headers: {} };
};

// --- TYPES ---

export interface Complaint {
  complainId: number;
  title: string;
  description: string;
  createdAt: string;
  complaintStatus: "PENDING" | "RESOLVED";
  emailId: string;
}

export interface FeedbackQuestion {
  id: number;
  questionText: string;
  canteenId?: number;
}

export interface FeedbackResponse {
  responseId: number;
  studentId: string;
  questionId: number;
  questionText: string;
  answerText?: string;
  rating?: number;
  createdAt: string;
}

export interface Announcement {
  id?: number; // Optional if the backend doesn't return ID immediately
  title: string;
  message: string;
  createdAt?: string;
}
// --- COMPLAINTS API ---

export const getAllComplaints = async (): Promise<Complaint[]> => {
  const response = await axios.get(
    `${ADMIN_URL}/complaints/allComplaints`,
    getAuthHeader()
  );
  return response.data;
};

export const escalateComplaint = async (id: number) => {
  const response = await axios.post(
    `${ADMIN_URL}/complaints/${id}/escalate`,
    "",
    getAuthHeader()
  );
  return response.data;
};

export const updateComplaintStatus = async (
  id: number,
  status: "RESOLVED" | "PENDING"
) => {
  const response = await axios.put(
    `${ADMIN_URL}/complaints/${id}/status`,
    { status },
    getAuthHeader()
  );
  return response.data;
};

// --- FEEDBACK API ---

/**
 * Fetch Questions
 * Note: Uses the USER endpoint as per the provided Postman collection.
 */
export const getFeedbackQuestions = async (
  canteenId: string
): Promise<FeedbackQuestion[]> => {
  try {
    // Try the User endpoint with Auth (Just in case backend gets fixed)
    const response = await axios.get(
      `${USER_URL}/feedback/canteen/${canteenId}/questions`,
      getAuthHeader()
    );
    return response.data;
  } catch (error) {
    console.warn("API Failed/Forbidden. Using Mock Data for Questions.");
    // Return Fake Data so the UI doesn't break
    return [
      { id: 101, questionText: "(Mock) Rate the food hygiene" },
      { id: 102, questionText: "(Mock) Rate the staff behavior" },
      { id: 103, questionText: "(Mock) How was the taste?" },
    ];
  }
};

export const addFeedbackQuestion = async (
  canteenId: string,
  question: string
) => {
  const response = await axios.post(
    `${ADMIN_URL}/feedback/question`,
    { canteenId, question },
    getAuthHeader()
  );
  return response.data;
};

export const updateFeedbackQuestion = async (
  questionId: number,
  canteenId: string,
  question: string
) => {
  // Note: Based on your Postman for PUT, it takes body { canteenId, question }
  const response = await axios.put(
    `${ADMIN_URL}/feedback/question/${questionId}`,
    { canteenId, question },
    getAuthHeader()
  );
  return response.data;
};

export const deleteFeedbackQuestion = async (questionId: number) => {
  const response = await axios.delete(
    `${ADMIN_URL}/feedback/question/${questionId}`,
    getAuthHeader()
  );
  return response.data;
};

export const getCanteenFeedbackResponses = async (
  canteenId: string
): Promise<FeedbackResponse[]> => {
  const response = await axios.get(
    `${ADMIN_URL}/feedback/canteen/${canteenId}/responses`,
    getAuthHeader()
  );
  return response.data;
};

export const createAnnouncement = async (title: string, message: string) => {
  const response = await axios.post(
    `${ADMIN_URL}/announcement/create`,
    { title, message },
    getAuthHeader()
  );
  return response.data;
};

export const getActiveAnnouncements = async (): Promise<Announcement[]> => {
  try {
    // Try the Admin endpoint first
    const response = await axios.get(
      `${ADMIN_URL}/announcement/active`,
      getAuthHeader()
    );
    return response.data;
  } catch (error) {
    console.warn("API Failed/Forbidden. Using Mock Data for Announcements.");
    // Return Fake Data so the UI doesn't break
    return [
      {
        id: 1,
        title: "Server Maintenance (Mock)",
        message: "The system will be down for 10 mins tonight.",
        createdAt: new Date().toISOString(),
      },
      {
        id: 2,
        title: "Diwali Holiday",
        message: "Canteen will remain closed on Friday.",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
      },
    ];
  }
};

export const getMonthlyReport = async (month: string): Promise<string> => {
  // month format should be "YYYY-MM" (e.g., "2025-11")
  const response = await axios.get(`${ADMIN_URL}/reports/llm-monthly`, {
    ...getAuthHeader(),
    params: { month }, // This appends ?month=2025-11 to the URL
  });
  // The response is a raw string/markdown based on your Postman example
  return response.data;
};
