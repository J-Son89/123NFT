import styles from "./Loader.module.css";
export const Loader = ({ isLoading, loadingText, children }) => {
  return isLoading ? (
    <p className={styles.loadingText}>{loadingText}</p>
  ) : (
    children
  );
};
