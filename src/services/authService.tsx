interface AuthResponse {
  user: {
    studentId: string;
    name: string;
    emailId: string;
    mobileNumber: string;
  };
  token: string;
}

export const loginUser = async (credentials: object): Promise<AuthResponse> => {
  const response = await fetch(`${process.env.API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Login failed. Please check your credentials.");
  }

  return response.json();
};

export const registerUser = async (userData: object) => {
  const response = await fetch(`${process.env.API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Registration Failed");
  }

  return response.json();
};
