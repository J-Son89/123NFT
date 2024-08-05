import styles from "./IconLink.module.css";
import { Link } from "react-router-dom";

export const IconLink = () => (
  <Link className={styles.link} to={""}>
    <h1 className={styles.logo}>
      <span className={styles.underline}>
        <span className={styles.number}>123</span>
        <span className={styles.letters}>NFT</span>
      </span>
    </h1>
  </Link>
);
