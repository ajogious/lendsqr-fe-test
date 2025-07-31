import { Helmet } from "react-helmet-async";
import TopNav from "../components/TopNav";
import UserAccountTable from "../components/UserAccountTable";
import Pagination from "../components/Pagination";
import BorrowerNav from "../components/BorrowerNav";
import UserSummary from "../components/UserSummary";
import styles from "./Dashboard.module.scss";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredLength, setFilteredLength] = useState(0);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const USERS_PER_PAGE = 10;

  // Reset to page 1 when search input changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  return (
    <>
      <Helmet>
        <title>Lendsqr | Dashboard</title>
      </Helmet>
      <div className={styles.dashboardLayout}>
        <aside
          className={`${styles.sidebar} ${
            isMobileSidebarOpen ? styles.sidebarOpen : ""
          }`}
          onClick={() => setIsMobileSidebarOpen(false)}
        >
          <div className={styles.sidebarContent}>
            <h1 className={styles.organizationTitle}>Swatch Organization</h1>
            <BorrowerNav />
          </div>
        </aside>

        <div
          className={styles.sidebarOverlay}
          onClick={() => setIsMobileSidebarOpen(false)}
        />

        <main className={styles.mainContent}>
          <TopNav
            onSearch={setSearch}
            onMenuToggle={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          />
          <div className={styles.contentWrapper}>
            <UserSummary />
            <UserAccountTable
              searchQuery={search}
              currentPage={currentPage}
              onFilteredLengthChange={setFilteredLength}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredLength / USERS_PER_PAGE)}
              onPageChange={setCurrentPage}
              totalItems={0}
              itemsPerPage={0}
            />
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
