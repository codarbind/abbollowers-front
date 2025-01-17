import axios from "axios";
import { LoginUser, RegisterUser, UpdateAccount } from "./interfaces";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials:true
});

export const registerUser = async (data:RegisterUser) => {
  try {
    const response = await api.post("/auth/register", data);
    return response.data;
  } catch (error:any) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

export const loginUser = async (data:LoginUser) => {
  try {
    const response = await api.post("/auth/login", data);
    return response.data;
  } catch (error:any) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const getAccountDetails = async (userId:string) => {
  try {
    const response = await api.get(`/account/${userId}`);
    return response.data;
  } catch (error:any) {
    throw new Error(error.response?.data?.message || "Failed to get account details");
  }
};

export const updateAccountDetails = async (userId:string, data:UpdateAccount) => {
  try {
    const response = await api.patch(`/account/${userId}`, data);
    return response.data;
  } catch (error:any) {
    throw new Error(error.response?.data?.message || "Failed to update account details");
  }
};

export const getFollowers = async (userId:string) => {
  try {
    const response = await api.get(`/relation/${userId}/followers`);
    return response.data;
  } catch (error:any) {
    throw new Error(error.response?.data?.message || "Failed to get followers");
  }
};

export const getFollowings = async (userId:string) => {
  try {
    const response = await api.get(`/relation/${userId}/followings`);
    return response.data;
  } catch (error:any) {
    throw new Error(error.response?.data?.message || "Failed to get followings");
  }
};

export const followUser = async (userId:string, followingId:string) => {
  try {
    const response = await api.post(`/relation/${userId}/follow`, { followingId });
    return response.data;
  } catch (error:any) {
    throw new Error(error.response?.data?.message || "Failed to follow user");
  }
};

export const unfollowUser = async (userId:string, followingId:string) => {
  try {
    const response = await api.post(`/relation/${userId}/unfollow`, { followingId });
    return response.data;
  } catch (error:any) {
    throw new Error(error.response?.data?.message || "Failed to unfollow user");
  }
};
