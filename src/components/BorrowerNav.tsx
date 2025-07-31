import { NavLink } from "react-router-dom";
import {
  Users,
  Briefcase,
  ChartBar,
  Coins, // Replacement for Sack
  Handshake,
  PiggyBank,
  UserCheck,
  UserX, // Replacement for UserTimes
  Scroll,
  Rocket, // Replacement for Galaxy
  UserCog,
  Sliders,
  BadgePercent,
  ClipboardList,
  Settings, // Replacement for Tire
  ChevronDown,
  LayoutDashboard,
} from "lucide-react";
import styles from "./BorrowerNav.module.scss";

const BorrowerNav = () => {
  return (
    <nav className={styles.sidebarNav}>
      <div className={styles.organization}>
        <Briefcase className={styles.orgIcon} />
        <span>Switch Organization</span>
        <ChevronDown className={styles.chevron} />
      </div>

      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          `${styles.navItem} ${isActive ? styles.active : ""}`
        }
      >
        <LayoutDashboard className={styles.icon} />
        <span>Dashboard</span>
      </NavLink>

      <p className={styles.sectionTitle}>CUSTOMERS</p>
      <SidebarItem
        icon={<Users className={styles.icon} />}
        text="Users"
        to="/dashboard/users"
      />
      <SidebarItem
        icon={<UserCheck className={styles.icon} />}
        text="Guarantors"
      />
      <SidebarItem icon={<Coins className={styles.icon} />} text="Loans" />
      <SidebarItem
        icon={<Handshake className={styles.icon} />}
        text="Decision Models"
      />
      <SidebarItem
        icon={<PiggyBank className={styles.icon} />}
        text="Savings"
      />
      <SidebarItem
        icon={<Rocket className={styles.icon} />}
        text="Loan Requests"
      />
      <SidebarItem icon={<UserX className={styles.icon} />} text="Whitelist" />
      <SidebarItem icon={<UserCog className={styles.icon} />} text="Karma" />

      <p className={styles.sectionTitle}>BUSINESSES</p>
      <SidebarItem
        icon={<Briefcase className={styles.icon} />}
        text="Organization"
      />
      <SidebarItem
        icon={<Handshake className={styles.icon} />}
        text="Loan Products"
      />
      <SidebarItem
        icon={<Coins className={styles.icon} />}
        text="Savings Products"
      />
      <SidebarItem
        icon={<BadgePercent className={styles.icon} />}
        text="Fees and Charges"
      />
      <SidebarItem
        icon={<Scroll className={styles.icon} />}
        text="Transactions"
      />
      <SidebarItem
        icon={<Settings className={styles.icon} />}
        text="Services"
      />
      <SidebarItem
        icon={<UserCog className={styles.icon} />}
        text="Service Account"
      />
      <SidebarItem
        icon={<ClipboardList className={styles.icon} />}
        text="Settlements"
      />
      <SidebarItem icon={<ChartBar className={styles.icon} />} text="Reports" />

      <p className={styles.sectionTitle}>SETTINGS</p>
      <SidebarItem
        icon={<Sliders className={styles.icon} />}
        text="Preferences"
      />
      <SidebarItem
        icon={<BadgePercent className={styles.icon} />}
        text="Fees and Pricing"
      />
      <SidebarItem
        icon={<ClipboardList className={styles.icon} />}
        text="Audit Logs"
      />
    </nav>
  );
};

const SidebarItem = ({
  icon,
  text,
  to = "#",
}: {
  icon: React.ReactNode;
  text: string;
  to?: string;
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${styles.navItem} ${isActive ? styles.active : ""}`
      }
    >
      {icon}
      <span>{text}</span>
    </NavLink>
  );
};

export default BorrowerNav;
