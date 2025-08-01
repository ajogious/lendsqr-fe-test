import { useEffect, useState } from "react";
import styles from "./UserAccountTable.module.scss";
import { MoreVertical } from "lucide-react";
import { fetchUsers } from "../services/api";
import DropdownMenu from "./DropdownMenu";

type UserStatus = "Active" | "Inactive" | "Pending" | "Blacklisted";

interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  dateJoined: string;
  status: UserStatus;
  organization: string;
}

interface UserAccountTableProps {
  searchQuery: string;
  currentPage: number;
  itemsPerPage: number;
  onFilteredLengthChange?: (length: number) => void;
}

const UserAccountTable = ({
  searchQuery,
  currentPage,
  itemsPerPage,
  onFilteredLengthChange,
}: UserAccountTableProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const data = await fetchUsers();
        setUsers(data as User[]);
        if (onFilteredLengthChange) {
          onFilteredLengthChange(data.length);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load users. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, [onFilteredLengthChange]);

  const formatDate = (rawDate: string) => {
    const date = new Date(rawDate);
    return date
      .toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
      .replace(",", "");
  };

  const formatPhoneNumber = (phone: string) => {
    return phone
      .replace(/^234/, "0")
      .replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3");
  };

  const FilterIcon = () => (
    <div className={styles.filterIcon}>
      <div className={styles.filterLine} style={{ width: "14px" }}></div>
      <div className={styles.filterLine} style={{ width: "10px" }}></div>
      <div className={styles.filterLine} style={{ width: "4px" }}></div>
    </div>
  );

  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase();
    return (
      user.organization?.toLowerCase().includes(query) ||
      user.username?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query) ||
      user.phone?.toLowerCase().includes(query) ||
      formatDate(user.dateJoined).toLowerCase().includes(query) ||
      user.status?.toLowerCase().includes(query)
    );
  });

  useEffect(() => {
    onFilteredLengthChange?.(filteredUsers.length);
  }, [filteredUsers, onFilteredLengthChange]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <div className={styles.loader}></div>
      </div>
    );
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!paginatedUsers.length) {
    return <div className={styles.noResults}>No users found</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              {[
                "Organization",
                "Username",
                "Email",
                "Phone number",
                "Date joined",
                "Status",
              ].map((header, index) => (
                <th key={index} className={styles.headerCell}>
                  <div className={styles.headerContent}>
                    <span>{header}</span>
                    <FilterIcon />
                  </div>
                </th>
              ))}
              <th className={styles.headerCell}></th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user) => (
              <tr key={user.id} className={styles.row}>
                <td className={styles.cell}>{user.organization}</td>
                <td className={styles.cell}>{user.username}</td>
                <td className={styles.cell}>{user.email}</td>
                <td className={styles.cell}>{formatPhoneNumber(user.phone)}</td>
                <td className={styles.cell}>{formatDate(user.dateJoined)}</td>
                <td className={styles.cell}>
                  <span
                    className={`${styles.status} ${
                      styles[user.status.toLowerCase()]
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className={styles.cell}>
                  <DropdownMenu
                    trigger={<MoreVertical className={styles.moreIcon} />}
                    items={[
                      { label: "View Details", action: () => {} },
                      { label: "Blacklist User", action: () => {} },
                      { label: "Activate User", action: () => {} },
                    ]}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserAccountTable;
