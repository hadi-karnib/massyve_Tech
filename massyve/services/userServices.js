import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_NODE_API_URL;

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${baseUrl}/api/user/login`, {
      username,
      password,
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Failed to login");
    } else if (error.request) {
      throw new Error("No response from server");
    } else {
      throw new Error(error.message);
    }
  }
};

export const registerUser = async ({
  username,
  password,
  fullName,
  birthdate,
  hobbies,
}) => {
  try {
    const response = await axios.post(`${baseUrl}/api/user/register`, {
      username,
      password,
      fullName,
      birthdate,
      hobbies,
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Registration failed");
    } else if (error.request) {
      throw new Error("No response from server");
    } else {
      throw new Error(error.message);
    }
  }
};

export const getSelf = async (token) => {
  try {
    const response = await axios.get(`${baseUrl}/api/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch user data";
  }
};
