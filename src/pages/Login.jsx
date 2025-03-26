import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import PageNav from "../components/PageNav";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Login() {
  // PRE-FILL FOR DEV DEMO PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  // import custom hook to access login function & isAuthenticated state variable from context provider
  const { login, isAuthenticated } = useAuth();

  // import useNavigate hook from react-router to change URL and load component set in App.jsx Routes
  const navigate = useNavigate();

  // use useEffect to monitor changes to isAuthenticated state variable, to only navigate and load new component if state variable changes to true
  useEffect(
    function () {
      if (isAuthenticated) {
        // Add replace: true object to set the last component loaded as the previous page so will navigate back to it when clicking back button in browser
        navigate("/app", { replace: true });
      }
    },
    [isAuthenticated, navigate]
  );

  function handleSubmit(e) {
    // add preventDefault to stop page refresh on submission
    e.preventDefault();
    // fire login function and pass in email and password from useState variables store input changes
    if (email && password) login(email, password);
  }

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles["form-login"]} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}
