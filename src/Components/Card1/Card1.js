import styles from "./Card1.module.css";
import { ReactComponent as Elipse1 } from "../../svgs/Elipse1.svg";
import { ReactComponent as Elipse2 } from "../../svgs/Elipse2.svg";
import { ReactComponent as SmallRectangles } from "../../svgs/SmallRectangles.svg";
import { ReactComponent as Swirls } from "../../svgs/Swirls.svg";
import { ReactComponent as SingleArrowOrange } from "../../svgs/singleArrowOrange.svg";

import { Link } from "react-router-dom";

import cx from "classnames";
import { useEffect, useState } from "react";
import { getSVGStylePumpkinGhost, getSVGStylePenguin, getSVGStylePumpkinCat, getSVGStyleElipse1, getSVGStyleElipse2, getSVGStyleSwirl, getSVGStylePumpkin } from './Card1SVGstyles'


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


export const Card1 = () => {
  const { height, width, matchMedia } = useWindowDimensions();



  return (
    <div className={cx(styles.cardContainer, styles.card1Container)}>
      
      <div className={styles.tagLineContainer}>
        <Elipse1
          style={getSVGStyleElipse1(matchMedia)}
        ></Elipse1>
        <h2 className={styles.tagLine}>
          Turn <span className={styles.orange}>20+</span>  images into <span className={styles.orange}>Thousands of images</span> with <span className={styles.orange}>metadata</span> and <span className={styles.orange}>rarities</span> for
          your NFT collection in three simple steps
        </h2>
        <div className={styles.bulletPointContainer}>
          <div className={styles.bulletPointSVG}>
            <SingleArrowOrange style={{ 
            }}
            />
          </div>
          <p className={styles.bulletPoint}>No Code Needed</p>
          <div className={styles.bulletPointSVG}>
            <SingleArrowOrange style={{ }}
            />
          </div>
          <p className={styles.bulletPoint}>Same Day Delivery</p>
        </div>

      </div>
      <div className={styles.murialContainer}>
      <Swirls
            style={getSVGStyleSwirl(matchMedia)}
          ></Swirls>
        <div className={styles.svgContainer}>
        
          <Elipse2
            style={
              getSVGStyleElipse2(matchMedia)
            }
          ></Elipse2>
          <SmallRectangles
            style={{
              height: "0.75rem",
              zIndex: 0,
              position: "absolute",
              top: "90%",
              left: "20%",
            }}
          ></SmallRectangles>
          <SmallRectangles
            style={{
              height: "0.75rem",
              zIndex: 0,
              position: "absolute",
              top: "15%",
              left: "75%",
            }}
          ></SmallRectangles>
          
          <img
            style={getSVGStylePumpkin(matchMedia)
            }
            src={"Pumpkin.png"}
          ></img>
          <img
            style={getSVGStylePumpkinCat(matchMedia)}
            src={"PumpkinCat.png"}
          ></img>
          <img
            style={getSVGStylePenguin(matchMedia)}
            src={"Penguin.png"}
          ></img>
          <img
            style={getSVGStylePumpkinGhost(matchMedia)}
            src={"PumpkinGhost.png"}
          ></img>
          <img
            style={{
              width: "3rem",
              height: "3rem",
              zIndex: 0,
              position: "absolute",
              top: "70%",
              left: "40%",
            }}
            src={"MonkeyLaser.png"}
          ></img>
          <img
            style={{
              width: "5rem",
              height: "5rem",
              zIndex: 5,
              position: "absolute",
              // bottom: "5%",
              top: "75%",
              left: "66%",
            }}
            src={"MonkeyRedLaser.png"}
          ></img>
          <img
            style={{
              width: "6rem",
              height: "6rem",
              zIndex: 2,
              position: "absolute",
              // bottom: "5%",
              top: "35%",
              left: "15%",
            }}
            src={"MonkeyCrown.png"}
          ></img>
          <img
            style={{
              width: "7rem",
              height: "10rem",
              zIndex: 2,
              position: "absolute",
              // bottom: "5%",
              top: "35%",
              left: "45%",
            }}
            src={"MonkeySmoke.png"}
          ></img>
          <img
            style={{
              width: "2rem",
              height: "2rem",
              zIndex: 0,
              position: "absolute",
              // bottom: "5%",
              top: "25%",
              left: "75%",
            }}
            src={"Horse.png"}
          ></img>
        </div>
        <div className={styles.linkContainer}>

          <Link className={styles.getStarted} to={"getStarted"}>Get Started</Link>
        </div>

      </div>
    </div>
  )
};
