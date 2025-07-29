import { Helmet } from "react-helmet-async";
import styles from "./Login.module.scss";
import groupLogo from "../assets/Group.svg";
import illustration from "../assets/pablo-sign-in.svg";
import { useState } from "react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

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
          <form>
            <input type="email" placeholder="Email" />
            <div className={styles.passwordField}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "HIDE" : "SHOW"}
              </span>
            </div>

            <a href="#">FORGOT PASSWORD?</a>
            <button type="submit">LOG IN</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
