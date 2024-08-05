import styles from "./AboutPage.module.css";

export const AboutPage = ({

}) => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.aboutContainer}>
        <h3 className={styles.aboutHeader}> About</h3>
        <p className={styles.aboutContent}>
          123 NFT is a team of Software Engineers and Artists 
          <br/> who specialise in NFT Generation.
        </p>
        <p className={styles.aboutContent}>
          The team also specialise in 3D NFT artwork generation
          <br/> with expertise designing and scripting in Blender and Keyshot.
        </p>
        <p className={styles.aboutContent}>
          If you have any projects that require more customisation
          <br/> then please get in touch at <a className={styles.email} href="mailto:123-nft@123-nft.io">123-nft@123-nft.io</a>
        </p>
      </div>
    </div>
  );
};


