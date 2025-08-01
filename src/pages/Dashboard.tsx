import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import TopNav from "../components/TopNav";
import UserAccountTable from "../components/UserAccountTable";
import Pagination from "../components/Pagination";
import SidebarNav from "../components/BorrowerNav";
import UserSummary from "../components/UserSummary";
import styles from "./Dashboard.module.scss";

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredLength, setFilteredLength] = useState(0);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, itemsPerPage]);

  // Close mobile sidebar when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent background scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = isMobileSidebarOpen ? "hidden" : "auto";
  }, [isMobileSidebarOpen]);

  return (
    <>
      <Helmet>
        <title>Lendsqr | Dashboard</title>
      </Helmet>

      <div className={styles.dashboardLayout}>
        <TopNav
          onSearch={setSearch}
          onMenuToggle={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        />

        <main className={styles.mainContent}>
          <aside
            className={`${styles.sidebar} ${
              isMobileSidebarOpen ? styles.sidebarOpen : ""
            }`}
          >
            <div className={styles.sidebarContent}>
              <SidebarNav />
            </div>
          </aside>

          {isMobileSidebarOpen && (
            <div
              className={styles.sidebarOverlay}
              onClick={() => setIsMobileSidebarOpen(false)}
            />
          )}

          <div className={styles.contentWrapper}>
            {/* No global loading state needed here */}
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
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
