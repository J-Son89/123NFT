import React from "react";
import { Card, Card2, Card3 } from "../../Components/Card/Card";
import styles from "./SuccessPage.module.css";
import { ReactComponent as SuccessIcon } from '../../svgs/greenCheck.svg'
import { useSearchParams } from "react-router-dom";


export const SuccessPage = () => {
  const params = (new URL(document.location)).searchParams;
  const orderID = params.get('orderID');
  const totalImages = params.get('totalImages');
  const metadataProduct = params.get('metadataProduct');

  return (
    <div className={styles.successPageContainer}>
      <div className={styles.titleContainer}>

        <div className={styles.iconContainer}>

          <SuccessIcon style={{
            // zIndex: 5,
            borderRadius: '50%',
            height: '1.5rem',
            width: '1.5rem'
          }} />
        </div>

        <h2 className={styles.iconTitle}>Order <span className={styles.green} >Success</span> </h2>
      </div>
      <div className={styles.orderDetailsContainer}>
        <h3>Your order <span className={styles.orange} >{`#${orderID}`}</span> has been received.</h3>
        <h3>
          You will receive a confirmation email and a follow up email with your order:
        </h3>
        <h3 > <span className={styles.orange} >{totalImages}</span> unique images</h3>
        <h3 > <span className={styles.orange} >{metadataProduct}</span> metadata</h3>
      </div>
    </div>
  );
};
