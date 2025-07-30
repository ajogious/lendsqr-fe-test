import axios from "axios";

const BASE_URL = "https://lendsqr-users.free.beeceptor.com/users";

export const fetchUsers = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return [];
  }
};
