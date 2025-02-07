// NavLink = alternative option to Link except it adds an active class to links that are currently being used. Can then use CSS to style links to show they are active
import { NavLink } from "react-router-dom";
import Logo from "./Logo";
// Use CSS modules by importing to required component and giving the name 'styles' - becomes usable object to apply to JSX elements
import styles from "./PageNav.module.css";

function PageNav() {
  return (
    // Use styles object and add class name of specific CSS declaration to apply style rules to JSX element
    <nav className={styles.nav}>
      <Logo />
      <ul>
        {/* <li>
          <NavLink to="/">Home</NavLink>
        </li> */}
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Products</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.ctaLink}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
