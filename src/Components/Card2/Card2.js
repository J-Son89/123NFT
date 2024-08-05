import styles from "./Card2.module.css";
import { ReactComponent as FileUpload } from "../../svgs/IconMetro-upload.svg";
import { ReactComponent as LightBulb } from "../../svgs/lightBulb.svg";
import { ReactComponent as CheckMark } from "../../svgs/IconAwesome-check.svg";

import { ReactComponent as Arrows } from "../../svgs/arrows.svg";
import { Link } from "react-router-dom";


import cx from "classnames";
import { useEffect, useState } from "react";
import { } from './CardSVGstyles'


function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height, matchMedia } = window;
  return {
    width,
    height,
    matchMedia
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}


export const Card2 = () => (
  <div className={cx(styles.card2Container, styles.section2)}>
    <div className={styles.tagLine2Container}>
      <h2 className={cx(styles.tagLine, styles.tagLine2)}>How it works</h2>
      <div className={styles.arrowContainer}>
        <Arrows
          style={{ height: "1.5rem", transform: "rotateY(180deg)" }}
        ></Arrows>
      </div>
    </div>

    <Link style={{'textDecoration':'none'}} to="/getStarted">
    <div className={cx(styles.helperBox, styles.activeBox)}>
      <div className={styles.svgContainer}>
        <div className={styles.svgDisc}></div>
        <FileUpload className={styles.svg}></FileUpload>
      </div>
      <p className={styles.stepNumber}>Step 1</p>
      <p className={styles.stepDescription}>Upload your artwork</p>
    </div>
    </Link>
    <div className={cx(styles.helperBox)}>
      <div className={styles.svgContainer}>
        <div className={styles.svgDisc}></div>
        <LightBulb className={styles.svg}></LightBulb>
      </div>
      <p className={styles.stepNumber}>Step 2</p>
      <p className={styles.stepDescription}>
        We create the NFT combinations and handle the technical aspects
        (Rarity Scores)
      </p>
    </div>
    <div className={cx(styles.helperBox)}>
      <div className={styles.svgContainer}>
        <div className={styles.svgDisc}></div>
        <CheckMark className={styles.svg}></CheckMark>
      </div>
      <p className={styles.stepNumber}>Step 3</p>
      <p className={styles.stepDescription}>
        Confirm your order and we will send your collection immediately
      </p>
    </div>
  </div>
);
