// UserFilterForm.tsx
import { useEffect, useRef, useState } from "react";
import styles from "./UserFilterForm.module.scss";

// Define types for individual user data
interface User {
  organization: string;
  status: string;
}

// Props received from parent
interface FilterFormProps {
  onFilter: (filters: any) => void; // Function to apply filters
  allUsers: User[]; // Full list of users to extract filter options from
  onClose: () => void; // Callback when filter form is closed
  position: { top: number; left: number; width: number }; // (Not currently used) for dynamic positioning
}

const UserFilterForm = ({ onFilter, allUsers, onClose }: FilterFormProps) => {
  const formRef = useRef<HTMLDivElement>(null); // To detect outside clicks
  const [form, setForm] = useState({
    organization: "",
    username: "",
    email: "",
    date: "",
    phone: "",
    status: "",
  });

  // Extract unique values for organization and status
  const uniqueOrgs = Array.from(new Set(allUsers.map((u) => u.organization)));
  const uniqueStatuses = Array.from(new Set(allUsers.map((u) => u.status)));

  // Handle input and select field changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(form); // Pass form data to parent
    onClose(); // Close the filter form
  };

  // Reset form to default state
  const resetForm = () => {
    const cleared = {
      organization: "",
      username: "",
      email: "",
      date: "",
      phone: "",
      status: "",
    };
    setForm(cleared);
    onFilter(cleared); // Clear filters in parent
  };

  // Detect and close form if user clicks outside the form area
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className={styles.overlay}>
      <div ref={formRef}>
        <div className={styles.formContainer}>
          <form className={styles.form} onSubmit={handleSubmit}>
            {/* Organization Dropdown */}
            <div className={styles.formGroup}>
              <label>Organization</label>
              <select
                name="organization"
                value={form.organization}
                onChange={handleChange}
              >
                <option value="">Select</option>
                {uniqueOrgs.map((org) => (
                  <option key={org} value={org}>
                    {org}
                  </option>
                ))}
              </select>
            </div>

            {/* Username Field */}
            <div className={styles.formGroup}>
              <label>Username</label>
              <input
                name="username"
                placeholder="User"
                value={form.username}
                onChange={handleChange}
              />
            </div>

            {/* Email Field */}
            <div className={styles.formGroup}>
              <label>Email</label>
              <input
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            {/* Date Field (type toggles on focus/blur) */}
            <div className={styles.formGroup}>
              <label>Date</label>
              <input
                type="text"
                name="date"
                placeholder="Date"
                value={form.date}
                onChange={handleChange}
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
              />
            </div>

            {/* Phone Field */}
            <div className={styles.formGroup}>
              <label>Phone Number</label>
              <input
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
              />
            </div>

            {/* Status Dropdown */}
            <div className={styles.formGroup}>
              <label>Status</label>
              <select name="status" value={form.status} onChange={handleChange}>
                <option value="">Select</option>
                {uniqueStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            {/* Action Buttons */}
            <div className={styles.buttonGroup}>
              <button
                type="button"
                className={styles.reset}
                onClick={resetForm}
              >
                Reset
              </button>
              <button type="submit" className={styles.submit}>
                Filter
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserFilterForm;
