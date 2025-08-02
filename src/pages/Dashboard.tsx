import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import TopNav from "../components/TopNav";
import UserAccountTable from "../components/UserAccountTable";
import Pagination from "../components/Pagination";
import SidebarNav from "../components/BorrowerNav";
import UserSummary from "../components/UserSummary";
import styles from "./Dashboard.module.scss";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredLength, setFilteredLength] = useState(0);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const navigate = useNavigate();

  // Check if current route is a user details page
  const isUserDetailsPage = location.pathname.includes("/user-details");

  // Reset to page 1 on search or item-per-page change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, itemsPerPage]);

  // Redirect to login if user is not authenticated
  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    if (!loggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  // Close sidebar on large screens when resizing
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent background scrolling when sidebar is open on mobile
  useEffect(() => {
    document.body.style.overflow = isMobileSidebarOpen ? "hidden" : "auto";
  }, [isMobileSidebarOpen]);

  return (
    <>
      {/* Set page title */}
      <Helmet>
        <title>Lendsqr | Dashboard</title>
      </Helmet>

      <div className={styles.dashboardLayout}>
        {/* Top navigation bar with search and menu toggle */}
        <TopNav
          onSearch={setSearch}
          onMenuToggle={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        />

        <main className={styles.mainContent}>
          {/* Sidebar navigation */}
          <aside
            className={`${styles.sidebar} ${
              isMobileSidebarOpen ? styles.sidebarOpen : ""
            }`}
          >
            <div className={styles.sidebarContent}>
              <SidebarNav />
            </div>
          </aside>

          {/* Dark overlay when mobile sidebar is open */}
          {isMobileSidebarOpen && (
            <div
              className={styles.sidebarOverlay}
              onClick={() => setIsMobileSidebarOpen(false)}
            />
          )}

          <div className={styles.contentWrapper}>
            {/* Conditionally show main dashboard or user details */}
            {!isUserDetailsPage ? (
              <>
                <UserSummary />
                <UserAccountTable
                  searchQuery={search}
                  currentPage={currentPage}
                  itemsPerPage={itemsPerPage}
                  onFilteredLengthChange={setFilteredLength}
                />
                <div className={styles.paginationContainer}>
                  <Pagination
                    currentPage={currentPage}
                    totalItems={filteredLength}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                    onItemsPerPageChange={setItemsPerPage}
                  />
                </div>
              </>
            ) : (
              <Outlet /> // Display user details page
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
