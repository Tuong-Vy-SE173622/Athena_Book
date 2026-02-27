import { env } from "@/config/env";
import axios from "axios";

export const axiosClient = axios.create({
  baseURL: env.API_SERVER + env.API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "text/plain",
  },
});
