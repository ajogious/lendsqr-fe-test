// UserFilterForm.tsx
import { useEffect, useRef, useState } from "react";
import styles from "./UserFilterForm.module.scss";

interface User {
  organization: string;
  status: string;
}

interface FilterFormProps {
  onFilter: (filters: any) => void;
  allUsers: User[];
  onClose: () => void;
  position: { top: number; left: number; width: number };
}

const UserFilterForm = ({
  onFilter,
  allUsers,
  onClose,
  position,
}: FilterFormProps) => {
  const formRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({
    organization: "",
    username: "",
    email: "",
    date: "",
    phone: "",
    status: "",
  });

  const uniqueOrgs = Array.from(new Set(allUsers.map((u) => u.organization)));
  const uniqueStatuses = Array.from(new Set(allUsers.map((u) => u.status)));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(form);
    onClose();
  };

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
    onFilter(cleared);
  };

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

            <div className={styles.formGroup}>
              <label>Username</label>
              <input
                name="username"
                placeholder="User"
                value={form.username}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Email</label>
              <input
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
              />
            </div>

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

            <div className={styles.formGroup}>
              <label>Phone Number</label>
              <input
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
              />
            </div>

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
