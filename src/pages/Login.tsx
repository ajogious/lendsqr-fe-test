import { Helmet } from "react-helmet-async";
import styles from "./Login.module.scss";
import groupLogo from "../assets/Group.svg";
import illustration from "../assets/pablo-sign-in.png";
import { useState } from "react";

// Email validation regex (moved outside the component to avoid recreating it)
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login = () => {
  // Toggle for showing/hiding password
  const [showPassword, setShowPassword] = useState(false);

  // Form input values
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Form input validation errors
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  // Handle input field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let valid = true;
    const newErrors = { email: "", password: "" };

    // Validate email
    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
      valid = false;
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setErrors(newErrors);

    // If all validations pass, submit the form
    if (valid) {
      console.log("Form submitted:", formData);

      // Save login status and email
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("userEmail", formData.email);

      // Redirect to dashboard
      window.location.href = "/dashboard";
    }
  };

  return (
    <>
      {/* SEO Title */}
      <Helmet>
        <title>Lendsqr | Login</title>
      </Helmet>

      <div className={styles.loginContainer}>
        {/* Left visual pane */}
        <div className={styles.leftPane}>
          <img src={groupLogo} alt="Lendsqr Logo" className={styles.logo} />
          <img
            src={illustration}
            alt="Illustration"
            className={styles.illustration}
          />
        </div>

        {/* Right form pane */}
        <div className={styles.rightPane}>
          <h1>Welcome!</h1>
          <p>Enter details to login.</p>

          <form onSubmit={handleSubmit} noValidate>
            {/* Email Field */}
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

            {/* Password Field */}
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
                  onClick={() => setShowPassword((prev) => !prev)}
                  className={styles.showHide}
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </span>
              </div>
              {errors.password && (
                <span className={styles.errorText}>{errors.password}</span>
              )}
            </div>

            {/* Forgot Password Link */}
            <a href="#" className={styles.forgotPassword}>
              FORGOT PASSWORD?
            </a>

            {/* Submit Button */}
            <button type="submit">LOG IN</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
