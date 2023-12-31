import axios from "axios";

export const backendAPIInstance = axios.create({
  baseURL: process.env.REACT_APP_HEALTHBOT_AI_API_BASE_URL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    accept: "application/json",
  },
});
