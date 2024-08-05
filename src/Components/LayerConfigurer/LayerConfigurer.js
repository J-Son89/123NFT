import styles from "./LayerConfigurer.module.css";
import { useCallback, useState, memo, useMemo, useEffect } from "react";
import mergeImages from "merge-images";
import { sortBy, orderBy, get } from "lodash";
import { Label } from "../Input/Label/Label";
import { DropDownSelect } from "../Input/DropDownSelect/DropDownSelect";
import { useDrop } from "react-dnd";
import { Card } from "./Card";
import update from "immutability-helper";
import { ItemTypes } from "./ItemTypes";
import { ReactComponent as Arrow } from "../../svgs/arrow.svg";
import { Loader } from "../Loader/Loader";
const LayerSorter = function Container({
  layerNames,
  onChangeLayer,
  projectLayersDepth,
}) {
  const findCard = useCallback(
    (id) => {
      const card = layerNames.filter((c) => `${c.id}` === id)[0];
      return {
        card,
        index: layerNames.indexOf(card),
      };
    },
    [layerNames]
  );
  const moveCard = useCallback(
    (id, atIndex) => {
      const { card, index: currentItemIndex } = findCard(id);

      return onChangeLayer(
        update(layerNames, {
          $splice: [
            [currentItemIndex, 1],
            [atIndex, 0, card],
          ],
        })
      );
    },
    [findCard, layerNames, projectLayersDepth]
  );
  const [, drop] = useDrop(() => ({ accept: ItemTypes.CARD }));
  return (
    <div ref={drop} className={styles.layerSorterContainer}>
      <Label className={styles.layerSorterLabel}>
        Sort your artwork layers from top to bottom
      </Label>
      <div className={styles.layerSorterDiagramContainer}>
        <p className={styles.layerSorterDiagramHeading}>Top</p>
        <Arrow
          style={{ margin: "1rem 0", transform: "rotate(270deg)" }}
        ></Arrow>
        <p className={styles.layerSorterDiagramHeading}>Base</p>
      </div>
      <div className={styles.cardsContainer}>
        {layerNames.map((card, index) => (
          <Card
            key={card.id}
            index={index}
            id={`${card.id}`}
            text={card.text}
            moveCard={moveCard}
            findCard={findCard}
          />
        ))}
      </div>
    </div>
  );
};

const LabelsMenu = ({ traitVariants, updateImageCallback, selectedLabels }) => (
  <div className={styles.labelsMenu}>
    {Object.entries(traitVariants).map(([header, { options }], i) => {
      const selectedOption = selectedLabels[header];
      const formattedOptions = options.map((val) => ({
        value: val,
        label: val.substring(0, val.length - 4),
      }));
      return (
        <DropDownSelect
          options={formattedOptions}
          header={header}
          key={header + i}
          value={
            selectedOption
              ? {
                  value: selectedOption,
                  label: selectedOption.substring(0, selectedOption.length - 4),
                }
              : undefined
          }
          onChange={updateImageCallback}
        />
      );
    })}
  </div>
);

const getDefaultSelectedLabels = (traitVariants) => {
  return Object.fromEntries(
    Object.entries(traitVariants).map(([layerName, layerValues]) => {
      return [layerName, layerValues.options[0]];
    })
  );
};

export const LayerConfigurer = ({
  imageUrlsMap,
  projectStructure,
  projectLayersDepth,
  onChangeLayer,
  layerNames,
  initLayerIds,
}) => {
  const rootName = Object.keys(projectStructure)[0];
  const projectLayersDepthValues = Object.entries(projectLayersDepth);

  const traitVariants = useMemo(
    () =>
      Object.entries(projectStructure[rootName]).reduce(
        (acc, [layerName, layerEntries]) => {
          return {
            ...acc,
            [layerName]: {
              options: layerEntries,
              getPath: (t) =>
                get(imageUrlsMap, [rootName, layerName, t[layerName]]),
              depth: projectLayersDepth[layerName],
            },
          };
        },
        {}
      ),
    [layerNames, projectLayersDepthValues, projectStructure]
  );

  const [selectedLabels, setSelectedLabels] = useState(
    getDefaultSelectedLabels(traitVariants)
  );

  const getImagePaths = useCallback(
    (selectedLabels, variants) => {
      const paths = Object.keys(selectedLabels)
        .map((path) => ({
          path: variants[path].getPath(selectedLabels),
          depth: variants[path].depth,
        }))
        .filter((v) => v.path);
      const sortedPaths = orderBy(
        sortBy(paths, (v) => v.depth),
        (v) => v.depth,
        "desc"
      );

      return sortedPaths.map(({ path }) => path);
    },
    [selectedLabels]
  );
  const [isImageLoading, setImageLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(
    getImagePaths(selectedLabels, traitVariants)
  );
  useEffect(() => {
    const setup = async () => {
      await mergeImages(getImagePaths(selectedLabels, traitVariants), {
        crossOrigin: "anonymous",
      }).then(setSelectedImage);
      setImageLoading(false);
    };
    setup();
  }, [layerNames]);

  const updateImageCallback = ({ value }, header) => {
    const listOfSelectedLabels = { ...selectedLabels, [header]: value };
    setSelectedLabels(listOfSelectedLabels);
    const imagePaths = getImagePaths(listOfSelectedLabels, traitVariants);

    mergeImages(imagePaths, {
      crossOrigin: "anonymous",
    }).then(setSelectedImage);
  };

  return (
    <div className={styles.imagePreviewContainer}>
      <div className={styles.imageContainer}>
        <Label>Image preview</Label>
        <Loader
          loadingText="... Loading Preview Image"
          isLoading={isImageLoading}
        >
          <img
            onError={() => {
              setImageLoading(true);
            }}
            id="mainImage"
            className={styles.previewImage}
            src={selectedImage}
            onLoad={() => setImageLoading(false)}
          />
        </Loader>
        <LabelsMenu
          traitVariants={traitVariants}
          updateImageCallback={updateImageCallback}
          selectedLabels={selectedLabels}
        />
      </div>
      <LayerSorter
        onChangeLayer={onChangeLayer}
        layerNames={layerNames}
        projectLayersDepth={projectLayersDepth}
      ></LayerSorter>
    </div>
  );
};
