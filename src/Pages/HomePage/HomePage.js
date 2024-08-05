import React, { useEffect } from "react";
import {  Card3 } from "../../Components/Card/Card";
import { Card1, } from "../../Components/Card1/Card1";
import { Card2, } from "../../Components/Card2/Card2";
import styles from "./HomePage.module.css";

const TIDIO_SCRIPT = "//code.tidio.co/agxn9iq72rvfpj504y0rzd8brdegaskg.js"

export const HomePage = () => {
  useEffect(()=>{
    const script = document.createElement("script");

    script.src = TIDIO_SCRIPT;
    script.async = true;

    document.body.appendChild(script);
  },[])
  return (
    <>
      <div className={styles.homePageContainer}>
        <Card1 />
        <Card2 />
        <Card3 />
      </div>
    </>
  );
};
