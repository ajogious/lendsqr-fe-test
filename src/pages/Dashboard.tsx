import { Helmet } from "react-helmet-async";
import TopNav from "../components/TopNav";

const Dashboard = () => {
  return (
    <>
      <Helmet>
        <title>Lendsqr | Dashboard</title>
      </Helmet>
      <div className="min-h-screen bg-gray-100">
        <TopNav />
      </div>
    </>
  );
};

export default Dashboard;
