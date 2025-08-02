import { useEffect, useState, type ChangeEvent } from "react";
import { Bell, ChevronDown, Search } from "lucide-react";
import lendsqrLogo from "../assets/Group.svg";
import avatar from "../assets/avatar.png";
import styles from "./TopNav.module.scss";

interface TopNavProps {
  onSearch: (value: string) => void;
  onMenuToggle?: () => void; // Optional callback for toggling sidebar on mobile
}

const TopNav = ({ onSearch, onMenuToggle }: TopNavProps) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false); // Mobile search toggle
  const [username, setUsername] = useState(""); // Extracted username from email

  // Trigger search when input value changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  useEffect(() => {
    // Get user's email from localStorage and derive username
    const email = localStorage.getItem("userEmail");
    if (email) {
      const extractedUsername = email.split("@")[0] || "User";
      setUsername(extractedUsername);
    }
  }, []);

  return (
    <header className={styles.topnav}>
      {/* Left Section: Logo, Hamburger Menu, Desktop Search */}
      <div className={styles.leftSection}>
        {onMenuToggle && (
          <button
            className={styles.menuButton}
            onClick={onMenuToggle}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        )}

        <img src={lendsqrLogo} alt="Lendsqr logo" className={styles.logo} />

        {/* Desktop Search Input */}
        <div className={`${styles.searchContainer} ${styles.desktopOnly}`}>
          <input
            type="text"
            placeholder="Search for anything"
            className={styles.searchInput}
            onChange={handleChange}
          />
          <button className={styles.searchButton}>
            <Search className={styles.searchIcon} />
          </button>
        </div>
      </div>

      {/* Right Section: Docs link, notifications, profile, mobile search */}
      <div className={styles.rightSection}>
        <a href="#" className={styles.docsLink}>
          Docs
        </a>

        <div className={styles.notification}>
          <Bell className={styles.notificationIcon} />
        </div>

        <div className={styles.profile}>
          <img src={avatar} alt="User profile" className={styles.avatar} />
          <span className={styles.username}>{username}</span>
          <ChevronDown className={styles.chevron} />
        </div>

        {/* Mobile Search Toggle Input/Icon */}
        <div className={styles.mobileSearchToggle}>
          {isSearchVisible ? (
            <input
              type="text"
              className={styles.mobileSearchInput}
              placeholder="Search"
              onChange={handleChange}
              onBlur={() => setIsSearchVisible(false)}
              autoFocus
            />
          ) : (
            <Search
              className={styles.searchIcon}
              onClick={() => setIsSearchVisible(true)}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default TopNav;
