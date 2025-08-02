import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./UserDetails.scss"; // your SCSS file

const UserDetails = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("selectedUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/users"); // fallback if no user found
    }
  }, [navigate]);

  if (!user) return <div>Loading...</div>;
  console.log(id);
  console.log(user);

  return (
    <div className="user-details-page">
      <Helmet>
        <title>Lendsqr | User Details</title>
      </Helmet>
      <div className="user-summary">
        <div className="user-avatar"></div>
      </div>

      <div className="user-tabs">
        <ul>
          <li className="active">General Details</li>
          <li>Documents</li>
          <li>Bank Details</li>
          <li>Loans</li>
          <li>Savings</li>
          <li>App and System</li>
        </ul>
      </div>

      <div className="user-details-sections"></div>
    </div>
  );
};

export default UserDetails;
