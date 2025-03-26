import { useState } from "react";
// NavLink = alternative option to Link except it adds an active class to links that are currently being used. Can then use CSS to style links to show they are active
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Logo from "./Logo";
// Use CSS modules by importing to required component and giving the name 'styles' - becomes usable object to apply to JSX elements
import styles from "./PageNav.module.css";
import User from "./User";

function PageNav() {
  const [menuActive, setMenuActive] = useState(false);
  const { isAuthenticated } = useAuth();

  const menuState = menuActive ? "nav-mobile__a" : "nav-mobile__na";

  function handleMenu() {
    setMenuActive((currState) => !currState);
  }

  return (
    // Use styles object and add class name of specific CSS declaration to apply style rules to JSX element
    <nav className={styles.nav}>
      <div onClick={handleMenu} className={styles["nav-bBtn"]}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={styles[menuState]}>
        <li onClick={handleMenu} className={styles["nav-close__btn"]}>
          <span></span>
          <span></span>
        </li>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Products</NavLink>
        </li>
        <li>
          <NavLink to="/app">Tracking</NavLink>
        </li>
      </ul>
      <Logo />
      <ul className={styles["nav-list"]}>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Products</NavLink>
        </li>
        <li>
          <NavLink to="/app">Tracking</NavLink>
        </li>
      </ul>
      {isAuthenticated ? (
        <User />
      ) : (
        <NavLink to="/login" className={styles.ctaLink}>
          Login
        </NavLink>
      )}
    </nav>
  );
}

export default PageNav;
