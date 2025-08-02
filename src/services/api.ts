import axios from "axios";
import generatedJSON from "../data/generated.json";

const BASE_URL = "https://lendsqr-users.free.beeceptor.com/users";

console.log(generatedJSON);

export const fetchUsers = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return generatedJSON; // Back-up incase the end point couldn't be reach
  }
};
