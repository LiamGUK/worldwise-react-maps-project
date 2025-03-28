import { Outlet } from "react-router-dom";
import AppNav from "./AppNav";
import Footer from "./Footer";
import styles from "./Sidebar.module.css";

function SideBar() {
  return (
    <div className={styles.sidebar}>
      <AppNav />

      {/* Outlet component allows to render components under nested routes - will render given component based on URL path */}
      <Outlet />

      <Footer />
    </div>
  );
}

export default SideBar;
