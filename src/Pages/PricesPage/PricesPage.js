import { useRef, useState } from "react";
import styles from "./PricesPage.module.css";

const prices = {
  1000: "€29.99",
  2000: "€39.99",
  5000: "€49.99",
  10000: "€59.99"
}

export const PricesPage = ({

}) => {
  const projectName = useRef();


  return (
    <div className={styles.pageContainer}>
      <div className={styles.pricesContainer}>
        <h3 className={styles.pricesHeader}> Prices</h3>
      <div className={styles.pricesBox}>
        {Object.entries(prices).map(([key,val])=>{
          return <div className={styles.price} > <span className={styles.orange}>{key}</span> images : {val}</div>
        })}
      </div>
      </div>
    </div>
  );
};


