import { NavLink } from "react-router-dom";
import {
  Users,
  Briefcase,
  LayoutDashboard,
  Settings,
  ChevronDown,
} from "lucide-react";
import "./BorrowerNav.scss";

const BorrowerNav = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar__top">
        <span>Switch Organization</span>
        <ChevronDown className="icon" />
      </div>

      <NavLink to="/dashboard" className="sidebar__item">
        <LayoutDashboard className="icon" />
        Dashboard
      </NavLink>

      <p className="sidebar__section-title">Customers</p>
      <SidebarItem
        icon={<Users className="icon" />}
        text="Users"
        to="/dashboard/users"
      />
      <SidebarItem icon={<Briefcase className="icon" />} text="Guarantors" />
      <SidebarItem icon={<Briefcase className="icon" />} text="Loans" />
      <SidebarItem
        icon={<Briefcase className="icon" />}
        text="Decision Models"
      />
      <SidebarItem icon={<Briefcase className="icon" />} text="Savings" />
      <SidebarItem icon={<Briefcase className="icon" />} text="Loan Requests" />
      <SidebarItem icon={<Briefcase className="icon" />} text="Whitelist" />
      <SidebarItem icon={<Briefcase className="icon" />} text="Karma" />

      <p className="sidebar__section-title">Businesses</p>
      <SidebarItem icon={<Briefcase className="icon" />} text="Organization" />
      <SidebarItem icon={<Briefcase className="icon" />} text="Loan Products" />
      <SidebarItem
        icon={<Briefcase className="icon" />}
        text="Savings Products"
      />
      <SidebarItem
        icon={<Briefcase className="icon" />}
        text="Fees and Charges"
      />
      <SidebarItem icon={<Briefcase className="icon" />} text="Transactions" />
      <SidebarItem icon={<Briefcase className="icon" />} text="Services" />
      <SidebarItem
        icon={<Briefcase className="icon" />}
        text="Service Account"
      />
      <SidebarItem icon={<Briefcase className="icon" />} text="Settlements" />
      <SidebarItem icon={<Briefcase className="icon" />} text="Reports" />

      <p className="sidebar__section-title">Settings</p>
      <SidebarItem icon={<Settings className="icon" />} text="Preferences" />
      <SidebarItem
        icon={<Settings className="icon" />}
        text="Fees and Pricing"
      />
      <SidebarItem icon={<Settings className="icon" />} text="Audit Logs" />
    </aside>
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
      className={({ isActive }) => `sidebar__item ${isActive ? "active" : ""}`}
    >
      {icon}
      {text}
    </NavLink>
  );
};

export default BorrowerNav;
