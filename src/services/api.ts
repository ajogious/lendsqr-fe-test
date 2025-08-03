import axios from "axios";
import generatedJSON from "../data/generated.json";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchUsers = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return generatedJSON; // Fallback data
  }
};
