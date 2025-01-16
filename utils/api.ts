import axios from "axios";
import { LoginUser, RegisterUser, UpdateAccount } from "./interfaces";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const registerUser = async (data:RegisterUser) => {
  try {
    const response = await api.post("/auth/register", data);
    return response.data;
  } catch (error:any) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};
