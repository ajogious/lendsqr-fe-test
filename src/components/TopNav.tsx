import { Bell, ChevronDown } from "lucide-react";
import lendsqrLogo from "../assets/Group.svg";
import "./TopNav.scss";

const TopNav = () => {
  return (
    <header className="topnav">
      <div className="topnav__left">
        <img src={lendsqrLogo} alt="Lendsqr logo" className="topnav__logo" />

        <div className="topnav__search">
          <input
            type="text"
            placeholder="Search for anything"
            className="topnav__input"
          />
          <button className="topnav__search-icon">🔍</button>
        </div>
      </div>

      <div className="topnav__right">
        <a href="#" className="topnav__docs">
          Docs
        </a>
        <Bell className="topnav__icon" />

        <div className="topnav__profile">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png?20200919003010"
            alt="User"
            className="topnav__avatar"
          />
          <span className="topnav__username">Adedeji</span>
          <ChevronDown className="topnav__chevron" />
        </div>
      </div>
    </header>
  );
};

export default TopNav;

// import profileImg from "../assets/profile.png"; // Replace with your actual image
