import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import styles from "./UserDetails.module.scss";

interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string | number;
  bvn: string | number;
  gender: string;
  maritalStatus: string;
  children: string | number;
  residence: string;
  levelOfEducation: string;
  employmentStatus: string;
  sectorOfEmployment: string;
  durationOfEmployment: string;
  officeEmail: string;
  monthlyIncome: [number, number];
  loanRepayment: number;
  twitter: string;
  facebook: string;
  instagram: string;
  guarantor: {
    fullName: string;
    phone: string | number;
    email: string;
    relationship: string;
  };
  tier: number;
  accountNumber: string | number;
  bankName: string;
  status: string;
  organization: string;
  dateJoined: string;
  bankUniqueId: string;
}

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = () => {
      try {
        const storedUser = localStorage.getItem("selectedUser");
        if (!storedUser) throw new Error("No user data found");
        const userData = JSON.parse(storedUser);
        if (userData.id !== id) throw new Error("User ID mismatch");
        setUser(userData);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load user data"
        );
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id, navigate]);

  const renderTierStars = () => {
    return Array(3)
      .fill(0)
      .map((_, i) => (
        <span
          key={i}
          className={i < (user?.tier || 1) ? "star active" : "star"}
        >
          {i < (user?.tier || 1) ? "★" : "☆"}
        </span>
      ));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    })
      .format(amount)
      .replace("NGN", "₦");
  };

  const formatIncomeRange = () => {
    if (user?.monthlyIncome?.length === 2) {
      return `${formatCurrency(user.monthlyIncome[0])}-${formatCurrency(
        user.monthlyIncome[1]
      )}`;
    }
    return formatCurrency(0);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!user) return <div className="error">User data not available</div>;

  return (
    <>
      <Helmet>
        <title>Lendsqr | {user.name} Details</title>
      </Helmet>

      <div className={styles.userDetailsContainer}>
        <div className={styles.headerSection}>
          <div className={styles.userNav}>
            <div className={styles.navLinks}>
              <Link to="/dashboard" className={styles.backLink}>
                ← Back to Users
              </Link>
              <div className={styles.userActions}>
                <button className={styles.blacklistButton}>
                  BLACKLIST USER
                </button>
                <button className={styles.activateButton}>ACTIVATE USER</button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.userDetailsContent}>
          <h2 className={styles.sectionTitle}>User Details</h2>

          <div className={styles.userSummary}>
            <div className={styles.userProfile}>
              <div className={styles.userAvatar}>{user.name.charAt(0)}</div>
              <div className={styles.userName}>
                <h2>{user.name}</h2>
                <p>{user.bankUniqueId}</p>
              </div>
            </div>

            <div className={styles.userTier}>
              <p>User's Tier</p>
              <div className={styles.stars}>{renderTierStars()}</div>
            </div>

            <div className={styles.userAccount}>
              <h2>{formatCurrency(user.loanRepayment || 0)}</h2>
              <p>
                {user.accountNumber}/{user.bankName}
              </p>
            </div>
          </div>

          <div className={styles.userTabs}>
            <ul>
              <li className={styles.active}>General Details</li>
              <li>Documents</li>
              <li>Bank Details</li>
              <li>Loans</li>
              <li>Savings</li>
              <li>App and System</li>
            </ul>
          </div>

          <div className={styles.userDetailsSections}>
            <section className={styles.personalInfo}>
              <h3>Personal Information</h3>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <strong>FULL NAME</strong>
                  <span>{user.name}</span>
                </div>
                <div className={styles.infoItem}>
                  <strong>PHONE NUMBER</strong>
                  <span>
                    {"0"}
                    {user.phone}
                  </span>
                </div>
                <div className={styles.infoItem}>
                  <strong>EMAIL ADDRESS</strong>
                  <span>{user.email}</span>
                </div>
                <div className={styles.infoItem}>
                  <strong>BVN</strong>
                  <span>{user.bvn}</span>
                </div>
                <div className={styles.infoItem}>
                  <strong>GENDER</strong>
                  <span>{user.gender}</span>
                </div>
                <div className={styles.infoItem}>
                  <strong>MARITAL STATUS</strong>
                  <span>{user.maritalStatus}</span>
                </div>
                <div className={styles.infoItem}>
                  <strong>CHILDREN</strong>
                  <span>{user.children}</span>
                </div>
                <div className={styles.infoItem}>
                  <strong>TYPE OF RESIDENCE</strong>
                  <span>{user.residence}</span>
                </div>
              </div>
            </section>

            <section className={styles.educationEmployment}>
              <h3>Education and Employment</h3>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <strong>LEVEL OF EDUCATION</strong>
                  <span>{user.levelOfEducation}</span>
                </div>
                <div className={styles.infoItem}>
                  <strong>EMPLOYMENT STATUS</strong>
                  <span>{user.employmentStatus}</span>
                </div>
                <div className={styles.infoItem}>
                  <strong>SECTOR OF EMPLOYMENT</strong>
                  <span>{user.sectorOfEmployment}</span>
                </div>
                <div className={styles.infoItem}>
                  <strong>DURATION OF EMPLOYMENT</strong>
                  <span>{user.durationOfEmployment}</span>
                </div>
                <div className={styles.infoItem}>
                  <strong>OFFICE EMAIL</strong>
                  <span>{user.officeEmail}</span>
                </div>
                <div className={styles.infoItem}>
                  <strong>MONTHLY INCOME</strong>
                  <span>{formatIncomeRange()}</span>
                </div>
                <div className={styles.infoItem}>
                  <strong>LOAN REPAYMENT</strong>
                  <span>{formatCurrency(user.loanRepayment || 0)}</span>
                </div>
              </div>
            </section>

            <section className={styles.socialsInfo}>
              <h3>Socials</h3>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <strong>TWITTER</strong>
                  <span>{user.twitter}</span>
                </div>
                <div className={styles.infoItem}>
                  <strong>FACEBOOK</strong>
                  <span>{user.facebook}</span>
                </div>
                <div className={styles.infoItem}>
                  <strong>INSTAGRAM</strong>
                  <span>{user.instagram}</span>
                </div>
              </div>
            </section>

            <section className={styles.guarantorInfo}>
              <h3>Guarantor</h3>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <strong>FULL NAME</strong>
                  <span>{user.guarantor?.fullName}</span>
                </div>
                <div className={styles.infoItem}>
                  <strong>PHONE NUMBER</strong>
                  <span>
                    {"0"}
                    {user.guarantor?.phone}
                  </span>
                </div>
                <div className={styles.infoItem}>
                  <strong>EMAIL ADDRESS</strong>
                  <span>{user.guarantor?.email}</span>
                </div>
                <div className={styles.infoItem}>
                  <strong>RELATIONSHIP</strong>
                  <span>{user.guarantor?.relationship}</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
