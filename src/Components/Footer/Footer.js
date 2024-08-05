import styles from "./Footer.module.css";
import cx from "classnames";
import { ReactComponent as Divider } from "../../svgs/divider.svg";
import { useLocation } from "react-router-dom";
import { isHomePage } from "../../utilities";

export const Footer = ({ }) => {
  const { pathname } = useLocation();

  return (
    <div
      className={cx(styles.footerContainer, {
        [styles.isHomePage]: isHomePage(pathname),
        [styles.hidden]: !isHomePage(pathname),
      })}
    >
      <div className={styles.logoContainer}>
        <h1 className={styles.logo}>
          <span className={styles.underline}>
            <span className={styles.number}>123</span>
            <span className={styles.letters}>NFT</span>
          </span>
        </h1>
        {/* <div className={styles.dividerContainer}>
          <Divider style={{ height: "2rem" }}></Divider>
        </div> */}
      </div>
      {/* <p className={styles.email}>
      <span className={styles.orange}>email: </span>
        <a className={styles.email} href="mailto:123nft@123-nft.io">
          123nft@123-nft.io
          </a>

      </p> */}

    </div>
  );
};
