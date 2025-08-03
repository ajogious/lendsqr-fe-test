import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UserAccountTable.module.scss";
import { MoreVertical, Eye, UserX, UserCheck } from "lucide-react";

import { fetchUsers } from "../services/api";
import DropdownMenu from "./DropdownMenu";
import UserFilterForm from "./UserFilterForm";

// Define user status types
type UserStatus = "Active" | "Inactive" | "Pending" | "Blacklisted";

// Define shape of user object
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

// Props expected by the table component
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
  // Component state
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<Record<string, string>>({});
  const [showFilterForm, setShowFilterForm] = useState(false);
  const [filterPosition, setFilterPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });

  const tableRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Navigate to user detail page
  const handleViewUser = (user: User) => {
    localStorage.setItem("selectedUser", JSON.stringify(user));
    navigate(`/dashboard/user-details/${user.id}`);
  };

  // Fetch users on initial mount
  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const data = await fetchUsers();
        setUsers(data as User[]);
        onFilteredLengthChange?.(data.length);
      } catch (err) {
        console.error(err);
        setError("Failed to load users. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, [onFilteredLengthChange]);

  // Format user date
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

  // Format phone number with 0 prefix
  const formatPhoneNumber = (phone: string) => `0${phone}`;

  // Open filter form and set its position based on column header
  const handleFilterClick = (event: React.MouseEvent, index: number) => {
    const headerElement = event.currentTarget.closest("th");
    if (headerElement) {
      const rect = headerElement.getBoundingClientRect();
      setFilterPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left,
        width: rect.width,
      });
      setShowFilterForm(true);
    }
  };

  // Apply global search + form filters
  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase();

    const matchesSearch =
      user.organization?.toLowerCase().includes(query) ||
      user.username?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query) ||
      user.phone?.toLowerCase().includes(query) ||
      formatDate(user.dateJoined).toLowerCase().includes(query) ||
      user.status?.toLowerCase().includes(query);

    const matchesForm =
      (!filters.organization ||
        user.organization.includes(filters.organization)) &&
      (!filters.username || user.username.includes(filters.username)) &&
      (!filters.email || user.email.includes(filters.email)) &&
      (!filters.phone || user.phone.includes(filters.phone)) &&
      (!filters.date || user.dateJoined.startsWith(filters.date)) &&
      (!filters.status || user.status === filters.status);

    return matchesSearch && matchesForm;
  });

  // Notify parent of filtered result count
  useEffect(() => {
    onFilteredLengthChange?.(filteredUsers.length);
  }, [filteredUsers, onFilteredLengthChange]);

  // Paginate users
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Renders the custom filter icon per header column
  const FilterIcon = ({ index }: { index: number }) => (
    <div
      className={styles.filterIcon}
      onClick={(e) => handleFilterClick(e, index)}
    >
      <div className={styles.filterLine} style={{ width: "14px" }}></div>
      <div className={styles.filterLine} style={{ width: "10px" }}></div>
      <div className={styles.filterLine} style={{ width: "4px" }}></div>
    </div>
  );

  // Loading state
  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <div className={styles.loader} role="progressbar"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container} ref={tableRef}>
      {/* Conditionally render filter form as overlay */}
      {showFilterForm && (
        <UserFilterForm
          onFilter={setFilters}
          allUsers={users}
          onClose={() => setShowFilterForm(false)}
          position={filterPosition}
        />
      )}

      {/* Empty state if no user matches */}
      {paginatedUsers.length === 0 ? (
        <div className={styles.noResults}>No users found</div>
      ) : (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                {/* Render table headers with filters */}
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
                      <FilterIcon index={index} />
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
                  <td className={styles.cell}>
                    {formatPhoneNumber(user.phone)}
                  </td>
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
                        {
                          label: "View Details",
                          icon: <Eye size={16} />,
                          action: () => handleViewUser(user),
                        },
                        {
                          label: "Blacklist User",
                          icon: <UserX size={16} />,
                          action: () => {}, // Hook to blacklist logic
                        },
                        {
                          label: "Activate User",
                          icon: <UserCheck size={16} />,
                          action: () => {}, // Hook to activate logic
                        },
                      ]}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserAccountTable;
