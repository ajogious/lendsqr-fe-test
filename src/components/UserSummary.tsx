import { useEffect, useState } from "react";
import type { JSX } from "react";
import styles from "./UserSummary.module.scss";
import { Users, UserCheck, Handshake, PiggyBank } from "lucide-react";
import { fetchUsers } from "../services/api";

type UserStatus = "Active" | "Inactive" | "Pending" | "Blacklisted";

// Define your User type
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

interface SummaryCardProps {
  icon: JSX.Element;
  title: string;
  value: string | number;
}

const UserSummary = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchUsers();
      setUsers(data as User[]);
    };
    getData();
  }, []);

  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.status === "Active").length;
  const usersWithLoans = users.filter((u) => u.hasLoan).length;
  const usersWithSavings = users.filter((u) => u.hasSavings).length;

  const summaryData: SummaryCardProps[] = [
    {
      icon: <Users className={styles.icon} />,
      title: "Users",
      value: totalUsers,
    },
    {
      icon: <UserCheck className={styles.icon} />,
      title: "Active Users",
      value: activeUsers,
    },
    {
      icon: <Handshake className={styles.icon} />,
      title: "Users with Loans",
      value: usersWithLoans,
    },
    {
      icon: <PiggyBank className={styles.icon} />,
      title: "Users with Savings",
      value: usersWithSavings,
    },
  ];

  return (
    <section className={styles.container}>
      <h2 className={styles.sectionTitle}>Users</h2>
      <div className={styles.grid}>
        {summaryData.map((item, index) => (
          <article key={index} className={styles.card}>
            <div className={styles.iconContainer}>{item.icon}</div>
            <h3 className={styles.cardTitle}>{item.title}</h3>
            <p className={styles.cardValue}>{item.value}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default UserSummary;
