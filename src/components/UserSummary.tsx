import { useEffect, useState, type JSX } from "react";
import styles from "./UserSummary.module.scss";
import { fetchUsers } from "../services/api";

// Import icons for each summary card
import userIcon from "../assets/users_summary/UserIcon.svg";
import activeUserIcon from "../assets/users_summary/ActiveIcon.svg";
import loanIcon from "../assets/users_summary/LoanIcon.svg";
import savingIcon from "../assets/users_summary/SavingIcon.svg";

// Define expected user status values
type UserStatus = "Active" | "Inactive" | "Pending" | "Blacklisted";

// Define the structure of a User object
interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  date: string;
  dateJoined: string;
  status: UserStatus;
  organization: string;
  hasLoan: boolean;
  hasSavings: boolean;
}

// Structure for each summary card data
interface SummaryCardProps {
  icon: JSX.Element;
  title: string;
  value: string | number;
}

const UserSummary = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const data = await fetchUsers();

        // ✅ Ensure data is an array before setting
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error("User data is not an array:", data);
          setUsers([]); // fallback to empty array
        }
      } catch (error) {
        console.error("Error fetching user summary:", error);
        setUsers([]); // fallback to empty array
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  // ✅ Safeguard against unexpected data types
  const safeUsers = Array.isArray(users) ? users : [];

  // Count stats based on safe user data
  const totalUsers = safeUsers.length;
  const activeUsers = safeUsers.filter((u) => u.status === "Active").length;
  const usersWithLoans = safeUsers.filter((u) => u.hasLoan).length;
  const usersWithSavings = safeUsers.filter((u) => u.hasSavings).length;

  const summaryData: SummaryCardProps[] = [
    {
      icon: <img src={userIcon} alt="" className={styles.icon} />,
      title: "Users",
      value: totalUsers,
    },
    {
      icon: <img src={activeUserIcon} alt="" className={styles.icon} />,
      title: "Active Users",
      value: activeUsers,
    },
    {
      icon: <img src={loanIcon} alt="" className={styles.icon} />,
      title: "Users with Loans",
      value: usersWithLoans,
    },
    {
      icon: <img src={savingIcon} alt="" className={styles.icon} />,
      title: "Users with Savings",
      value: usersWithSavings,
    },
  ];

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <div className={styles.loader} />
      </div>
    );
  }

  return (
    <section className={styles.container}>
      <h2 className={styles.sectionTitle}>Users</h2>
      <div className={styles.grid}>
        {summaryData.map((item, index) => (
          <article key={index} className={styles.card}>
            <div className={styles.iconContainer}>{item.icon}</div>
            <h3 className={styles.cardTitle}>{item.title}</h3>
            <p className={styles.cardValue}>
              {Number(item.value).toLocaleString()}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default UserSummary;
