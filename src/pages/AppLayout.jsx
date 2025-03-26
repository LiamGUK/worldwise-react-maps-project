import Map from "../components/Map";
import PageNav from "../components/PageNav";
import SideBar from "../components/SideBar";
import styles from "./AppLayout.module.css";

function AppLayout() {
  return (
    <main className={styles["nav-bar"]}>
      <PageNav />
      <div className={styles.app}>
        <SideBar />
        <Map />
      </div>
    </main>
  );
}

export default AppLayout;
