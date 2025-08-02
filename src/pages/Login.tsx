import { Helmet } from "react-helmet-async";
import styles from "./Login.module.scss";
import groupLogo from "../assets/Group.svg";
import illustration from "../assets/pablo-sign-in.svg";
import { useState } from "react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    const newErrors = { email: "", password: "" };

    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      console.log("Form submitted:", formData);
      localStorage.setItem("loggedIn", "true"); // mark as logged in
      window.location.href = "/dashboard"; // redirect
    }
  };

  return (
    <>
      <Helmet>
        <title>Lendsqr | Login</title>
      </Helmet>

      <div className={styles.loginContainer}>
        <div className={styles.leftPane}>
          <img src={groupLogo} alt="Lendsqr Logo" className={styles.logo} />
          <img
            src={illustration}
            alt="Illustration"
            className={styles.illustration}
          />
        </div>

        <div className={styles.rightPane}>
          <h1>Welcome!</h1>
          <p>Enter details to login.</p>
          <form onSubmit={handleSubmit} noValidate>
            <div className={styles.inputGroup}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? styles.errorInput : ""}
              />
              {errors.email && (
                <span className={styles.errorText}>{errors.email}</span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.passwordField}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? styles.errorInput : ""}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className={styles.showHide}
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </span>
              </div>
              {errors.password && (
                <span className={styles.errorText}>{errors.password}</span>
              )}
            </div>

            <a href="#" className={styles.forgotPassword}>
              FORGOT PASSWORD?
            </a>
            <button type="submit">LOG IN</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
