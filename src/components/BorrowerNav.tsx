import { NavLink, useLocation } from "react-router-dom";
import {
  Users,
  Briefcase,
  ChartBar,
  Coins,
  Handshake,
  PiggyBank,
  UserCheck,
  UserX,
  Scroll,
  Rocket,
  UserCog,
  Sliders,
  BadgePercent,
  ClipboardList,
  Settings,
  ChevronDown,
  LayoutDashboard,
  MessageSquare,
  LogOut,
} from "lucide-react";
import styles from "./BorrowerNav.module.scss";
import { useState } from "react";

const BorrowerNav = () => {
  const location = useLocation(); // Used to determine active link
  const [activePlaceholder, setActivePlaceholder] = useState<string | null>(
    null
  ); // For handling non-route items

  const handlePlaceholderClick = (text: string) => {
    setActivePlaceholder(text); // Update current active placeholder
  };

  const isActive = (to: string, text: string) => {
    // Determines whether an item is active based on route or placeholder
    if (to !== "#") return location.pathname === to;
    return activePlaceholder === text;
  };

  const handleLogout = () => {
    // Clear user data and redirect to login page
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("selectedUser");
    window.location.href = "/login";
  };

  return (
    <nav className={styles.sidebarNav}>
      {/* Organization Selector */}
      <div className={styles.organization}>
        <Briefcase className={styles.orgIcon} />
        <span>Switch Organization</span>
        <ChevronDown className={styles.chevron} />
      </div>

      {/* Static Dashboard Link */}
      <SidebarItem
        icon={<Users className={styles.icon} />}
        text="Dashboard"
        to="/dashboard"
      />

      {/* Customers Section */}
      <p className={styles.sectionTitle}>CUSTOMERS</p>
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          `${styles.navItem} ${isActive ? styles.active : ""}`
        }
      >
        <LayoutDashboard className={styles.icon} />
        <span>Users</span>
      </NavLink>
      <SidebarItem
        icon={<UserCheck className={styles.icon} />}
        text="Guarantors"
        onActivate={handlePlaceholderClick}
        isActive={isActive("#", "Guarantors")}
      />
      <SidebarItem
        icon={<Coins className={styles.icon} />}
        text="Loans"
        onActivate={handlePlaceholderClick}
        isActive={isActive("#", "Loans")}
      />
      <SidebarItem
        icon={<Handshake className={styles.icon} />}
        text="Decision Models"
        onActivate={handlePlaceholderClick}
        isActive={isActive("#", "Decision Models")}
      />
      <SidebarItem
        icon={<PiggyBank className={styles.icon} />}
        text="Savings"
        onActivate={handlePlaceholderClick}
        isActive={isActive("#", "Savings")}
      />
      <SidebarItem
        icon={<Rocket className={styles.icon} />}
        text="Loan Requests"
        onActivate={handlePlaceholderClick}
        isActive={isActive("#", "Loan Requests")}
      />
      <SidebarItem
        icon={<UserX className={styles.icon} />}
        text="Whitelist"
        onActivate={handlePlaceholderClick}
        isActive={isActive("#", "Whitelist")}
      />
      <SidebarItem
        icon={<UserCog className={styles.icon} />}
        text="Karma"
        onActivate={handlePlaceholderClick}
        isActive={isActive("#", "Karma")}
      />

      {/* Businesses Section */}
      <p className={styles.sectionTitle}>BUSINESSES</p>
      <SidebarItem
        icon={<Briefcase className={styles.icon} />}
        text="Organization"
        onActivate={handlePlaceholderClick}
        isActive={isActive("#", "Organization")}
      />
      <SidebarItem
        icon={<Handshake className={styles.icon} />}
        text="Loan Products"
        onActivate={handlePlaceholderClick}
        isActive={isActive("#", "Loan Products")}
      />
      <SidebarItem
        icon={<Coins className={styles.icon} />}
        text="Savings Products"
        onActivate={handlePlaceholderClick}
        isActive={isActive("#", "Savings Products")}
      />
      <SidebarItem
        icon={<BadgePercent className={styles.icon} />}
        text="Fees and Charges"
        onActivate={handlePlaceholderClick}
        isActive={isActive("#", "Fees and Charges")}
      />
      <SidebarItem
        icon={<Scroll className={styles.icon} />}
        text="Transactions"
        onActivate={handlePlaceholderClick}
        isActive={isActive("#", "Transactions")}
      />
      <SidebarItem
        icon={<Settings className={styles.icon} />}
        text="Services"
        onActivate={handlePlaceholderClick}
        isActive={isActive("#", "Services")}
      />
      <SidebarItem
        icon={<UserCog className={styles.icon} />}
        text="Service Account"
        onActivate={handlePlaceholderClick}
        isActive={isActive("#", "Service Account")}
      />
      <SidebarItem
        icon={<ClipboardList className={styles.icon} />}
        text="Settlements"
        onActivate={handlePlaceholderClick}
        isActive={isActive("#", "Settlements")}
      />
      <SidebarItem
        icon={<ChartBar className={styles.icon} />}
        text="Reports"
        onActivate={handlePlaceholderClick}
        isActive={isActive("#", "Reports")}
      />

      {/* Settings Section */}
      <p className={styles.sectionTitle}>SETTINGS</p>
      <SidebarItem
        icon={<Sliders className={styles.icon} />}
        text="Preferences"
        onActivate={handlePlaceholderClick}
        isActive={isActive("#", "Preferences")}
      />
      <SidebarItem
        icon={<BadgePercent className={styles.icon} />}
        text="Fees and Pricing"
        onActivate={handlePlaceholderClick}
        isActive={isActive("#", "Fees and Pricing")}
      />
      <SidebarItem
        icon={<ClipboardList className={styles.icon} />}
        text="Audit Logs"
        onActivate={handlePlaceholderClick}
        isActive={isActive("#", "Audit Logs")}
      />

      {/* Conditional Items (only for user details page) */}
      {location.pathname.includes("/dashboard/user-details") && (
        <>
          <SidebarItem
            icon={<MessageSquare className={styles.icon} />}
            text="System Messages"
            onActivate={handlePlaceholderClick}
            isActive={isActive("#", "System Messages")}
          />
          <hr />
          <SidebarItem
            icon={<LogOut className={styles.icon} />}
            text="Logout"
            onActivate={handlePlaceholderClick}
            isActive={isActive("#", "Logout")}
            onClick={handleLogout}
          />
          <SidebarItem icon={""} text="v1.2.0" />
        </>
      )}
    </nav>
  );
};

// SidebarItem Component
const SidebarItem = ({
  icon,
  text,
  to = "#",
  onActivate,
  isActive = false,
  onClick,
}: {
  icon: React.ReactNode;
  text: string;
  to?: string;
  onActivate?: (text: string) => void;
  isActive?: boolean;
  onClick?: () => void;
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (to === "#") {
      e.preventDefault(); // Prevent routing if it's a placeholder
      onActivate?.(text);
    }
    onClick?.(); // Optional callback
  };

  return (
    <NavLink
      to={to}
      className={`${styles.navItem} ${isActive ? styles.active : ""}`}
      onClick={handleClick}
    >
      {icon}
      <span>{text}</span>
    </NavLink>
  );
};

export default BorrowerNav;
