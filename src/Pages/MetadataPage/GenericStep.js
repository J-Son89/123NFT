import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from './GenericStep.module.css';
import { useWizard } from "react-use-wizard";
import cx from "classnames";
import { ReactComponent as Arrow } from "../../svgs/arrow.svg";
import { ReactComponent as ArrowOrange } from "../../svgs/arrow-orange.svg";


export const GenericStep = ({
  whiteLabel,
  orangeLabel,
  subOrangeLabel,
  subWhiteLabel,
  onClick,
  disabled,
  children,
  previousStep: previousStepIndex,
  gridTemplateRows,
  gridTemplateColumns,
  nextButtonText = "Next"
}) => {
  const { handleStep, previousStep, nextStep, activeStep } = useWizard();

  useEffect(() => {
    previousStepIndex.current = activeStep;
  }, [activeStep, previousStepIndex]);

  const variants = {
    enter: (direction) => {
      return {
        x: direction < 0 ? -1000 : 1000,
        opacity: 0,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    // transition: { delay: 1 },
  };

  return (
    <motion.div
      custom={activeStep - previousStepIndex.current}
      variants={variants}
      initial={activeStep === 0 ? "none" : "enter"}
      transition={{ ease: [0.17, 0.67, 0.83, 0.67] }}
      animate="center"
    >
      <div className={styles.genericStepContainer} style={
        {
          gridTemplateRows: gridTemplateRows,
          gridTemplateColumns: gridTemplateColumns
        }

      }>
        <div>
          <h2 className={styles.whiteLabel}>{whiteLabel}{<span className={styles.orange}>{orangeLabel}</span>}</h2>
          <p class={styles.subLabel}><span class={styles.orange}>{subOrangeLabel}</span> {subWhiteLabel}</p>
        </div>
        {children}
        <div className={styles.buttonContainer}>
          <div className={styles.innerButtonContainer}>

            {activeStep !== 0 && (
              <button className={styles.previousBtn}
                onClick={() => previousStep()}>
                <Arrow style={{ height: '1rem', width: '1rem', transform: 'rotate(180deg)' }} />
                Previous</button>
            )}
            <button
              className={cx(styles.nextBtn, { [styles.disabled]: disabled })}
              disabled={disabled}

              onClick={(...args) => {

                const res = onClick(...args);
                if (res) {
                  nextStep();
                }
              }}
            >
              {nextButtonText}
              <ArrowOrange style={{ height: '1rem', width: '1rem' }} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
