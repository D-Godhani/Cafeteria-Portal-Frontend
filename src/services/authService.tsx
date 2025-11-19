// This is the new service file that calls your backend.

// This is your Spring Boot backend URL
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

/**
 * The data structure returned from your backend's /auth/login endpoint.
 */
interface AuthResponse {
  token: string;
  studentId: string;
  role: "ROLE_USER" | "ROLE_ADMIN";
}

/**
 * Calls your backend /auth/login endpoint.
 * @param credentials - { emailId (or studentId), password }
 * @returns The { token, studentId, role } object
 */
export const loginUser = async (credentials: object): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      errorText || "Login failed. Please check your credentials."
    );
  }

  return response.json();
};

/**
 * Calls your backend /auth/register endpoint.
 * @param userData - The user object for registration
 */
export const registerUser = async (userData: object) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Registration Failed");
  }

  return response.text(); // Your backend returns a string
};
