// import axios from "axios";
import mockUsers from "../data/mockUsers.json"; // Adjust path

// const BASE_URL = "https://lendsqr-users.free.beeceptor.com/users";

// export const fetchUsers = async () => {
//   try {
//     const response = await axios.get(BASE_URL);
//     return response.data;
//   } catch (error) {
//     console.error("Failed to fetch users:", error);
//     return mockUsers;
//   }
// };

// export const fetchUsers = async () => {
//   try {
//     const response = await fetch(mockUsers);
//     if (!response.ok) throw new Error("Failed to fetch from API");

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.warn("Using mock data due to error:", error);
//     return mockUsers; // 👈 fallback to local JSON
//   }
// };

export const fetchUsers = async () => {
  console.warn("🔁 Using local mock data for now");
  return mockUsers;
};
