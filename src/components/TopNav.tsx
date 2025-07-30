import { Bell, ChevronDown } from "lucide-react";
import lendsqrLogo from "../assets/Group.svg";
// import profileImg from "../assets/profile.png"; // Replace with your actual image

const TopNav = () => {
  return (
    <header className="w-full flex items-center justify-between bg-white px-6 py-4 shadow-sm">
      {/* Logo and Search */}
      <div className="flex items-center gap-8">
        <img src={lendsqrLogo} alt="Lendsqr logo" className="h-6" />

        <div className="relative w-[300px]">
          <input
            type="text"
            placeholder="Search for anything"
            className="w-full py-2 pl-4 pr-10 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-600">
            🔍
          </button>
        </div>
      </div>

      {/* Right section: Docs, bell, profile */}
      <div className="flex items-center gap-6">
        <a href="#" className="text-sm text-blue-900 hover:underline">
          Docs
        </a>

        <Bell className="text-blue-900 cursor-pointer" />

        <div className="flex items-center gap-2 cursor-pointer">
          <img
            // src={profileImg}
            src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png?20200919003010"
            alt="User"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-sm text-blue-900 font-medium">Adedeji</span>
          <ChevronDown className="w-4 h-4 text-blue-900" />
        </div>
      </div>
    </header>
  );
};

export default TopNav;
