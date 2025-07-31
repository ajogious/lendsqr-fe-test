import type { JSX } from "react";
import styles from "./UserSummary.module.scss";
import {
  Users,
  UserCheck, // For Active Users
  Handshake, // For Users with Loans
  PiggyBank, // For Users with Savings
} from "lucide-react";

interface SummaryCardProps {
  icon: JSX.Element;
  title: string;
  value: string;
}

const summaryData: SummaryCardProps[] = [
  {
    icon: <Users className={styles.icon} />,
    title: "Users",
    value: "2,453",
  },
  {
    icon: <UserCheck className={styles.icon} />,
    title: "Active Users",
    value: "2,453",
  },
  {
    icon: <Handshake className={styles.icon} />,
    title: "Users with Loans",
    value: "12,453",
  },
  {
    icon: <PiggyBank className={styles.icon} />,
    title: "Users with Savings",
    value: "102,453",
  },
];

const UserSummary = () => {
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
