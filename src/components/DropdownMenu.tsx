import { useState, useRef, useEffect } from "react";
import styles from "./DropdownMenu.module.scss";

// Defines the structure of each dropdown item
interface DropdownItem {
  label: string; // Text shown for the item
  icon: React.ReactNode; // Icon displayed next to the label
  action: () => void; // Function triggered on click
}

// Props for the DropdownMenu component
interface DropdownMenuProps {
  trigger: React.ReactNode; // The element that toggles the dropdown
  items: DropdownItem[]; // List of menu items
}

const DropdownMenu = ({ trigger, items }: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false); // Tracks if menu is open
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref to detect outside clicks

  // Toggles the dropdown visibility
  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    // Closes dropdown if clicked outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    // Add listener for outside clicks
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Clean up event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      {/* Trigger element to toggle dropdown */}
      <div className={styles.trigger} onClick={toggleDropdown}>
        {trigger}
      </div>

      {/* Dropdown menu, only visible when open */}
      {isOpen && (
        <div className={styles.menu}>
          {items.map((item, index) => (
            <div
              key={index}
              className={styles.menuItem}
              onClick={() => {
                item.action(); // Trigger item action
                setIsOpen(false); // Close menu after selection
              }}
            >
              <span className={styles.menuIcon}>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
