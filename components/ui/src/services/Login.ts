import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

interface LoginResponse {
  token: string;
}

export const login = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(`${API_URL}/users/login`, {
      email: username,
      password: password,
    });

    return response.data;
  } catch (error: any) {
    console.log("error");
    if (error.response) {
      // The request was made and the server responded with a status code
      return error.response;
    } else if (error.request) {
      // The request was made but no response was received
      return error.request;
    } else {
      // Something happened in setting up the request that triggered an Error
      return error.message;
    }
  }
};
