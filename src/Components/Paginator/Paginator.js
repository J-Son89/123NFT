import { React } from "react";
import styles from "./Paginator.module.css";
import { AnimatePresence } from "framer-motion";
import { ReactComponent as RightPaginator } from "../../svgs/rightPaginator.svg";
import { ReactComponent as LeftPaginator } from "../../svgs/leftPaginator.svg";
import cx from 'classnames'

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

export const Paginator = ({
  paginate,
  direction,
  children,
  wrapperClassname,
  labelsAndButtonContainerClassname,
  label,
  subLabel
}) => {
  return (
    <div className={cx(wrapperClassname, styles.paginatorWrapper)}>
      <div className={cx(labelsAndButtonContainerClassname,styles.labelsAndButtonContainer)}>

        <div className={styles.labelContainer}>
          <h3 className={styles.label}>{label}</h3>
          <p className={styles.subLabel}>{subLabel}</p>
        </div>
        <div className={styles.buttonsContainer}>

          <LeftPaginator className={styles.prev} onClick={() => paginate(-1)}>
            <button> </button>
          </LeftPaginator>
          <RightPaginator className={styles.next} onClick={() => paginate(-1)}>
            <button> </button>
          </RightPaginator>
        </div>
      </div>
      <AnimatePresence initial={false} custom={direction}>
        {children}
      </AnimatePresence>

    </div>
  );
};


