import { useEffect, useState } from "react";
import styles from "./UserAccountTable.module.scss";
import { MoreVertical } from "lucide-react";
import { fetchUsers } from "../services/api";
import DropdownMenu from "./DropdownMenu";

interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  dateJoined: string;
  status: "Active" | "Inactive" | "Pending" | "Blacklisted";
  organization: string;
}

interface UserAccountTableProps {
  searchQuery: string;
  currentPage: number;
  onFilteredLengthChange?: (length: number) => void;
}

const USERS_PER_PAGE = 10;

const UserAccountTable = ({
  searchQuery,
  currentPage,
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
        setUsers(data);
      } catch (err) {
        setError("Failed to load users. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

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
    // Format Nigerian phone numbers
    return phone
      .replace(/^234/, "0")
      .replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3");
  };

  const filteredUsers = users.filter((user) => {
    const queryLower = searchQuery.toLowerCase();
    return (
      user.organization?.toLowerCase().includes(queryLower) ||
      user.username?.toLowerCase().includes(queryLower) ||
      user.email?.toLowerCase().includes(queryLower) ||
      user.phone?.toLowerCase().includes(queryLower) ||
      formatDate(user.dateJoined).toLowerCase().includes(queryLower) ||
      user.status?.toLowerCase().includes(queryLower)
    );
  });

  useEffect(() => {
    onFilteredLengthChange?.(filteredUsers.length);
  }, [filteredUsers, onFilteredLengthChange]);

  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + USERS_PER_PAGE
  );

  if (loading) {
    return <div className={styles.loading}>Loading users...</div>;
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
              <th className={styles.headerCell}>Organization</th>
              <th className={styles.headerCell}>Username</th>
              <th className={styles.headerCell}>Email</th>
              <th className={styles.headerCell}>Phone number</th>
              <th className={styles.headerCell}>Date joined</th>
              <th className={styles.headerCell}>Status</th>
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
