import styles from "./Card.module.css";
import { ReactComponent as Elipse1 } from "../../svgs/Elipse1.svg";
import { ReactComponent as SideDots } from "../../svgs/SideDots.svg";
import { ReactComponent as Arrow } from "../../svgs/arrow.svg";
import { Link } from "react-router-dom";


import mergeImages from "merge-images";
import cx from "classnames";
import { useEffect, useState } from "react";
import { getRareIconStyle, getSVGStyleArrow,   getSVGStyleElipse3, getSVGStyleElipse4,  getSVGStyleSideDots1, getSVGStyleSideDots2 } from './CardSVGstyles'


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

export const Card3 = () => {
  const [combo1, setCombo1] = useState("Total traits/head/yellow.png");
  const [combo2, setCombo2] = useState("Total traits/head/yellow.png");
  const [combo3, setCombo3] = useState("Total traits/head/yellow.png");
  const [combo4, setCombo4] = useState("Total traits/head/yellow.png");

  const { height, width, matchMedia } = useWindowDimensions();


  useEffect(() => {
    const getCombos = async () => {
      const v = await mergeImages([
        "Total traits/head/yellow.png",
        "Total traits/face/sunglasses.png",
        "Total traits/hair/wizard.png",
      ]);
      setCombo1(v);
      const v2 = await mergeImages([
        "Total traits/head/blue.png",
        "Total traits/face/sunglasses.png",
        "Total traits/hair/wizard.png",
      ]);
      setCombo2(v2);
      const v3 = await mergeImages([
        "Total traits/head/yellow.png",
        "Total traits/face/in love.png",
        "Total traits/hair/wizard.png",
      ]);
      setCombo3(v3);
      const v4 = await mergeImages([
        "Total traits/head/yellow.png",
        "Total traits/face/sunglasses.png",
        "Total traits/hair/crown long.png",
      ]);
      setCombo4(v4);
    };
    getCombos();
  });

  return (
    <div className={styles.card3container}>
      <SideDots
        style={getSVGStyleSideDots1(matchMedia)}
      ></SideDots>
      <SideDots
        style={getSVGStyleSideDots2(matchMedia)}
      ></SideDots>
      
      

      <div className={styles.tagLineContainer3}>
        <h2 className={cx(styles.tagLine, styles.tagLine3)}>
          Create your unique collection{" "}
          <span className={styles.orange}>today!</span>
        </h2>
      </div>
      <div className={styles.layersGrid}>
      <Elipse1
        style={getSVGStyleElipse3(matchMedia)}
      ></Elipse1>
        <p className={styles.layerName}>Head</p>
        <p className={styles.layerName}>Face</p>
        <p className={styles.layerName}>Hair</p>
        <div className={styles.layerTitle}>
          <img className={styles.layerImg} src={"Total traits/head/blue.png"} />
          <p className={styles.layerFileName}>Blue</p>
        </div>
        <div className={styles.layerTitle}>
          <img
            className={styles.layerImg}
            src={"Total traits/face/sunglasses.png"}
          />
          <p className={styles.layerFileName}>Sunglasses</p>
        </div>
        <div className={styles.layerTitle}>
          <img
            className={styles.layerImg}
            src={"Total traits/hair/crown long.png"}
          />
          <p className={styles.layerFileName}>Crown</p>
        </div>
        <div className={styles.layerTitle}>
          <img
            className={styles.layerImg}
            src={"Total traits/head/yellow.png"}
          />
          <p className={styles.layerFileName}>Yellow</p>
        </div>

        <div className={styles.layerTitle}>
          <img
            className={styles.layerImg}
            src={"Total traits/face/in love.png"}
          />
          <p className={styles.layerFileName}>In Love</p>
        </div>
        <div className={styles.layerTitle}>
          <img
            className={styles.layerImg}
            src={"Total traits/hair/wizard.png"}
          />
          <p className={styles.layerFileName}>Wizard</p>
        </div>
      </div>
      <Arrow
        style={getSVGStyleArrow(matchMedia)}
      ></Arrow>
      <div className={styles.collectionPreviewContainer}>
      <Elipse1
        style={getSVGStyleElipse4(matchMedia)}
      ></Elipse1>
        <div className={styles.collectionImage}>
          <img
            className={styles.layerImg}
            style={{
              background: "#C6A664",
              "border-radius": "5px",
            }}
            src={combo1}
          />
          <p className={styles.layerName}>#0123</p>
          <p className={styles.layerFileName}>Yellow</p>
          <p className={styles.layerFileName}>Sunglasses</p>
          <p className={styles.layerFileName}>Wizard</p>
        </div>
        <div className={styles.collectionImage}>
          <img
            className={styles.layerImg}
            style={{
              background: "#308446",
              "border-radius": "5px",
            }}
            src={combo2}
          />
          <p className={styles.layerName}>#1023</p>
          <p className={styles.layerFileName}>Blue</p>
          <p className={styles.layerFileName}>Sunglasses</p>
          <p className={styles.layerFileName}>Wizard</p>
        </div>
        <div className={styles.collectionImage}>
          <img
            className={styles.layerImg}
            style={{
              background: "#924E7D",
              "border-radius": "5px",
            }}
            src={combo3}
          />
          <p className={styles.layerName}>#3201</p>
          <p className={styles.layerFileName}>Yellow</p>
          <p className={styles.layerFileName}>In Love</p>
          <p className={styles.layerFileName}>Wizard</p>
        </div>
        <div className={styles.collectionImage}>
          <img
            className={styles.layerImg}
            style={{
              background: "#6A5D4D",
              "border-radius": "5px",
            }}
            src={combo4}
          />
          <div
            style={getRareIconStyle(matchMedia)}
          >
            <img
              style={{
                height: "2.5rem",

              }}
              src={"rare.png"}
            />
          </div>
          <p className={styles.layerName}>#2310</p>
          <p className={styles.layerFileName}>Yellow</p>
          <p className={styles.layerFileName}>Sunglasses</p>
          <p className={styles.layerFileName}>Crown</p>
        </div>
      </div>
      <div className={styles.linkContainer}>
          <Link className={styles.getStarted} to={"getStarted"}>Get Started</Link>
        </div>
    </div>
  );
};
