import styles from "./RarityConfigurerPaginator.module.css";
import { React, useCallback, useEffect, useMemo, useState } from "react";
import mergeImages from "merge-images";
import { sortBy, get, merge } from "lodash";
import { RarityConfigurer } from "./RarityConfigurer";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import { Paginator } from "../Paginator/Paginator";

export const RarityConfigurerPaginator = ({
  traitLayerEntries,
  rootName,
  data,
  setData,
}) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const pageIndex = wrap(0, traitLayerEntries.length, page);
  const [layerName, traits] = traitLayerEntries[pageIndex];
  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <Paginator
      paginate={paginate}
      direction={direction}
      wrapperClassname={styles.container}
      label={`Trait: ${layerName}`}
    >
      <div className={styles.imagePreviewContainer}>
        <AnimatePresence initial={false} custom={direction}>
          <RarityConfigurer
            rootName={rootName}
            layerName={layerName}
            traits={traits}
            data={data}
            setData={setData}
          />
          ))
        </AnimatePresence>
      </div>
    </Paginator>
  );
};
