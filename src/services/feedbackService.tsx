import axios from "axios";

// --- Base URL ---
// Using the localhost URL you provided.
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

// --- Types ---

/**
 * Represents a single feedback question from the backend.
 * Based on: GET /user/feedback/canteen/2/questions
 */
export interface FeedbackQuestion {
  id: number;
  questionText: string;
}

/**
 * Represents the rating scale you mentioned:
 * VERY_GOOD(5), GOOD(4), AVERAGE(3), POOR(2), VERY_POOR(1)
 */
export type FeedbackRating = 1 | 2 | 3 | 4 | 5;

/**
 * Represents the payload for a single feedback answer
 * to be sent to the backend via POST /user/feedback/submit
 */
export interface FeedbackSubmission {
  questionId: number;
  rating: FeedbackRating;
  reason: string; // The "reason" you mentioned in the comments
}

// --- Auth Helper ---

/**
 * Retrieves the auth token from localStorage.
 * You MUST adapt this if you store your token differently.
 */
const getAuthToken = (): string | null => {
  if (typeof window === "undefined") {
    // Cannot access localStorage on server
    return null;
  }
  // This assumes you store the token with the key "token"
  // This matches the "logout" logic (which removes "token")
  return localStorage.getItem("token");
};

/**
 * Creates the authorization header for API requests.
 * Throws an error if the user is not logged in.
 */
const getAuthHeaders = () => {
  const token = getAuthToken();
  if (!token) {
    throw new Error("No authentication token found. Please log in.");
  }
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

// --- API Functions ---

/**
 * Fetches the list of feedback questions for a specific canteen.
 * Corresponds to: GET /user/feedback/canteen/{canteenId}/questions
 */
export const getFeedbackQuestions = async (
  canteenId: string | number
): Promise<FeedbackQuestion[]> => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get(
      `${API_BASE_URL}/canteen/${canteenId}/questions`,
      // We only need the Authorization header for a GET request
      { headers: { Authorization: headers.Authorization } }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch feedback questions:", error);
    // Re-throw to be handled by the component's try/catch block
    throw new Error("Could not fetch feedback questions.");
  }
};

/**
 * Submits a list of feedback answers.
 * Corresponds to: POST /user/feedback/submit
 * The body is expected to be a list of FeedbackSubmission objects.
 */
export const submitFeedback = async (
  submissions: FeedbackSubmission[]
): Promise<any> => {
  try {
    const headers = getAuthHeaders();
    // The body is the array of submission objects
    const response = await axios.post(
      `${API_BASE_URL}/feedback/submit`,
      submissions,
      {
        headers,
      }
    );
    return response.data; // Return the success response
  } catch (error) {
    console.error("Failed to submit feedback:", error);
    throw new Error("Could not submit feedback.");
  }
};
