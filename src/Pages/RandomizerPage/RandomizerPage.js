import { get, isEmpty } from "lodash";
import { useState, useEffect } from "react";
import styles from "./RandomizerPage.module.css";
import cx from "classnames";
import { CollectionPreview } from "../../Components/CollectionPreview/CollectionPreview";
import { DataCollectionPreview } from "../../Components/DataCollectionPreview/DataCollectionPreview";
import { useWindowSize } from "react-use";
import ConfettiExplosion from "react-confetti-explosion";

export const RandomizerPage = ({ rootName, data }) => {
  const [isConfettiActive, setIsConfettiActive] = useState(true);
  const totalImages = get(data, ["collectionDetails", "totalImages"]);
  const traitKeys = Object.keys(get(data, ["projectLayerCount", rootName]));
  const { width, height } = useWindowSize();
  const { metadata } = data;

  useEffect(() => {
    setTimeout(() => {
      setIsConfettiActive(false);
    }, 1200);
  }, []);

  return (
    <>
      {isConfettiActive && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "25%",
          }}
        >
          <ConfettiExplosion floorHeight={height} floorWidth={width} />
        </div>
      )}
      {!isEmpty(metadata) && (
        <div className={cx(styles.previewGrid)}>
          <DataCollectionPreview
            label="Review Your Traits data"
            subLabel="View how many of each trait is in your collection"
            metadata={metadata}
            traitKeys={traitKeys}
          />

          <CollectionPreview
            rootName={rootName}
            imageUrlsMap={data.imageUrlsMap}
            projectLayersDepth={data.projectLayersDepth}
            label="Collection preview"
            subLabel="preview some images from your new NFT collection"
            metadata={metadata}
            totalImages={totalImages}
          ></CollectionPreview>
        </div>
      )}
    </>
  );
};
