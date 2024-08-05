import styles from "./CollectionPreview.module.css";
import { React, useCallback, useEffect, useMemo, useState } from "react";
import { get, merge, orderBy } from "lodash";

import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import { Paginator } from "../Paginator/Paginator";
import {
  getRandomInt,
  getImagePathsFromMetadataBlock,
  filterTraits,
} from "../../utilities";
import { Loader } from "../Loader/Loader";

const createDataTable = (metadata, traitsKeys) => {
  return metadata.reduce((acc, currentRow) => {
    const valuesForThisRow = traitsKeys.reduce((acc2, key) => {
      const updateTrait = get(currentRow, [key])
        ? { [currentRow[key]]: get(acc, [key, currentRow[key]], 0) + 1 }
        : {};
      return {
        ...acc2,
        [key]: {
          ...get(acc2, [key], {}),
          ...updateTrait,
        },
      };
    }, {});
    return merge(acc, valuesForThisRow);
  }, {});
};

const makeGetRarity = (metadata) => {
  const dataTableObject = createDataTable(
    metadata,
    Object.keys(metadata[0]).filter(([key]) => filterTraits(key))
  );
  return (trait, traitValue) => {
    return (dataTableObject[trait][traitValue] / metadata.length) * 100;
  };
};

const getCollectionImageDetails = (image, getRarity) => {
  return (
    <div className={styles.detailsContainer}>
      {Object.entries(image)
        .filter(
          ([key]) => key !== "label" && key !== "image" && key !== "fileName"
        )
        .map(([traitName, traitValue], i) => (
          <p className={styles.tableText}>
            <span className={styles.tableKey}>{traitName}</span>
            {`: ${traitValue}`}
          </p>
        ))}
    </div>
  );
};

export const CollectionPreview = ({
  projectLayersDepth,
  metadata,
  label,
  subLabel,
  rootName,
  imageUrlsMap,
  totalImages,
}) => {
  const numberOfImagesToPreview = Array(5).fill(totalImages);

  const layerOrder = useMemo(() => {
    return orderBy(Object.entries(projectLayersDepth), (v) => v[1], "desc").map(
      ([k, v]) => k
    );
  }, [projectLayersDepth]);
  const [selectedImages, setSelectedImages] = useState([
    {
      label: "Default",
      index: 0,
      image: ["sources/colorOfFace/red/nose/nose.png"],
    },
  ]);
  const getRarity = useCallback(
    (trait, traitValue) => {
      return makeGetRarity(metadata)(trait, traitValue);
    },
    [metadata]
  );

  useEffect(() => {
    const x = async () => {
      const result = [];
      for (const i in numberOfImagesToPreview) {
        const x = await getImagePathsFromMetadataBlock(
          metadata[getRandomInt(0, numberOfImagesToPreview[0])],
          rootName,
          layerOrder,
          imageUrlsMap
        );

        result.push(x);
      }
      setSelectedImages(result);
    };
    x();
  }, [metadata]);
  return (
    <Loader
      loadingText="... loading images"
      isLoading={selectedImages.length !== numberOfImagesToPreview.length}
    >
      <ImagePreviewer
        subLabel={subLabel}
        label={label}
        getRarity={getRarity}
        images={selectedImages}
      />
      ƒ
    </Loader>
  );
};
const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

export const ImagePreviewer = ({ images, getRarity, label, subLabel }) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const pageIndex = wrap(0, images.length, page);
  const image = images[pageIndex];
  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <>
      <Paginator
        label={label}
        subLabel={subLabel}
        paginate={paginate}
        direction={direction}
        wrapperClassname={styles.container}
      >
        <div className={styles.imagePreviewContainer}>
          <AnimatePresence initial={false} custom={direction}>
            <ImagePreview
              image={image.image}
              direction={direction}
            ></ImagePreview>
          </AnimatePresence>
          {getCollectionImageDetails(image, getRarity)}
        </div>
      </Paginator>
    </>
  );
};

export const ImagePreview = ({ image, direction, height = "20vh" }) => (
  <div
    className={styles.imageContainer}
    style={{ height: "inherit" }}
    key={"animatePresence"}
  >
    <motion.img
      className={styles.img}
      style={{
        height: height,
      }}
      src={image}
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={1}
    />
  </div>
);
