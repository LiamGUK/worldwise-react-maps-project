import PageNav from "../components/PageNav";
import styles from "./Product.module.css";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />
      <section>
        <div className={styles["img-card"]}>
          <picture className={styles["img-left"]}>
            <img
              src="img-1.jpg"
              alt="person with dog overlooking mountain with sunset"
            />
          </picture>
          <div className={styles["text-block"]}>
            <h2>About WorldWide.</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo est
              dicta illum vero culpa cum quaerat architecto sapiente eius non
              soluta, molestiae nihil laborum, placeat debitis, laboriosam at
              fuga perspiciatis?
            </p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis
              doloribus libero sunt expedita ratione iusto, magni, id sapiente
              sequi officiis et.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
