import { Helmet } from "react-helmet-async";
import TopNav from "../components/TopNav";
import UserAccountTable from "../components/UserAccountTable";
import Pagination from "../components/Pagination";
import BorrowerNav from "../components/BorrowerNav";
import UserSummary from "../components/UserSummary";
import styles from "./Dashboard.module.scss";

const Dashboard = () => {
  return (
    <>
      <Helmet>
        <title>Lendsqr | Dashboard</title>
      </Helmet>
      <div className={styles.dashboardLayout}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <BorrowerNav />
        </aside>

        {/* Main content */}
        <main className={styles.mainContent}>
          <TopNav />
          <UserSummary />
          <UserAccountTable />
          <Pagination
            currentPage={1}
            totalPages={5}
            onPageChange={(page) => console.log("Go to page:", page)}
          />
        </main>
      </div>
    </>
  );
};

export default Dashboard;
