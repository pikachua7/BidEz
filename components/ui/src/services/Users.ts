import axios from "axios";
import { User } from "../custom-types/CustomTypes";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const users = async (): Promise<User[]> => {
  try {
    const response = await axios.get<User[]>(`${BASE_URL}/users`);
    return response.data;
  } catch (error: any) {
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
