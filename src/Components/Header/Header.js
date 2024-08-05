import styles from "./Header.module.css";
import cx from "classnames";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { isHomePage } from "../../utilities";
import { IconLink } from "../../Components/IconLink/IconLink";

export const Header = ({}) => {
  const { pathname } = useLocation();
  return (
    <div
      className={cx(styles.headerContainer, {
        isHomePage: isHomePage(pathname),
      })}
    >
      <IconLink />
      <Link className={cx(styles.normalLink, styles.firstLink)} to={"prices"}>
          Prices
        </Link>
        <Link className={styles.normalLink} to={"about"}>
          About
        </Link>
      {isHomePage(pathname) && (
        <Link className={styles.getStarted} to={"getStarted"}>
          Get Started
        </Link>
      )}
    </div>
  );
};
