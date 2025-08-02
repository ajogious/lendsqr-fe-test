import { useState, useRef, useEffect } from "react";
import styles from "./DropdownMenu.module.scss";

interface DropdownItem {
  label: string;
  icon: React.ReactNode;
  action: () => void;
}

interface DropdownMenuProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
}

const DropdownMenu = ({ trigger, items }: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      <div className={styles.trigger} onClick={toggleDropdown}>
        {trigger}
      </div>

      {isOpen && (
        <div className={styles.menu}>
          {items.map((item, index) => (
            <div
              key={index}
              className={styles.menuItem}
              onClick={() => {
                item.action();
                setIsOpen(false);
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
