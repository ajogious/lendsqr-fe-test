import { useState, type ChangeEvent } from "react";
import { Bell, ChevronDown, Search } from "lucide-react";
import lendsqrLogo from "../assets/Group.svg";
import styles from "./TopNav.module.scss";

interface TopNavProps {
  onSearch: (value: string) => void;
  onMenuToggle?: () => void;
}

const TopNav = ({ onSearch, onMenuToggle }: TopNavProps) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <header className={styles.topnav}>
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

        {/* Full Search on Large Screens */}
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

      <div className={styles.rightSection}>
        <a href="#" className={styles.docsLink}>
          Docs
        </a>

        <div className={styles.notification}>
          <Bell className={styles.notificationIcon} />
        </div>

        <div className={styles.profile}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png?20200919003010"
            alt="User profile"
            className={styles.avatar}
          />
          <span className={styles.username}>Adedeji</span>
          <ChevronDown className={styles.chevron} />
        </div>

        {/* Toggle Search on Mobile */}
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
