import type { JSX } from "react";
import styles from "./UserSummary.module.scss";
import { Users, UserCheck, Banknote, PiggyBank } from "lucide-react"; // Import needed icons

interface SummaryCardProps {
  icon: JSX.Element;
  title: string;
  value: string;
}

const summaryData: SummaryCardProps[] = [
  {
    icon: <Users size={20} />,
    title: "Users",
    value: "2,453",
  },
  {
    icon: <UserCheck size={20} />,
    title: "Active Users",
    value: "1,235",
  },
  {
    icon: <Banknote size={20} />,
    title: "Users with Loans",
    value: "1,024",
  },
  {
    icon: <PiggyBank size={20} />,
    title: "Users with Savings",
    value: "904",
  },
];

const UserSummary = () => {
  return (
    <div className={styles.summaryWrapper}>
      {summaryData.map((item, index) => (
        <div key={index} className={styles.card}>
          <div className={styles.iconWrapper}>{item.icon}</div>
          <p className={styles.title}>{item.title}</p>
          <p className={styles.value}>{item.value}</p>
        </div>
      ))}
    </div>
  );
};

export default UserSummary;
