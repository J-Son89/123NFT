import { Input } from "../../Components/Input/Input";
import styles from "./QuotePage.module.css";
import { ImagePreview } from "../../Components/CollectionPreview/CollectionPreview";
import {
  getRandomInt,
  getImagePathsFromMetadataBlock,
  filterTraits,
} from "../../utilities";
import {
  React,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useLayoutEffect,
} from "react";
import { get, orderBy, set } from "lodash";
import { Label } from "../..//Components/Input/Label/Label";
import { Loader } from "../../Components/Loader/Loader";

import { DropDownSelect } from "../../Components/Input/DropDownSelect/DropDownSelect";
import cx from "classnames";

const CURRENCY = "$";

const prices = {
  1000: { label: `${CURRENCY}29.99`, value: 29.99 },
  2000: { label: `${CURRENCY}39.99`, value: 39.99 },
  5000: { label: `${CURRENCY}49.99`, value: 49.99 },
  10000: { label: `${CURRENCY}59.99`, value: 59.99 },
  Ethereum: { label: `${CURRENCY}5.00`, value: 5 },
  Cardano: { label: `${CURRENCY}5.00`, value: 5 },
  Json: { label: `${CURRENCY}0.00`, value: 0 },
};

const totalImagesMessage = {
  1000: "1,000",
  2000: "2,000",
  5000: "5,000",
  10000: "10,000",
};

const metadataOrderInputProps = [
  {
    label: "Json (OpenSea format)",
    value: "Json",
  },
  // {
  //   label: "Ethereum",
  //   value: "Ethereum",
  // },
  // {
  //   label: "Cardano",
  //   value: "Cardano",
  // }
];
// sources/colorOfFace/red/nose/nose.png
const defaultImages = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((num, i) => ({
  label: `Default${i}`,
  index: i,
  image: [`loaderImages/${num}.png`],
  no: "",
}));

const getTotal = (totalImages, metadata) => {
  const price = String(prices[totalImages].value + prices[metadata].value);

  return price.substring(0, 5);
};

export const QuotePage = ({ data, setData, rootName }) => {
  const handleSelect = useCallback(
    (e) => {
      setData((prev) => {
        const newState = { ...prev };
        set(newState, ["orderDetails", "metadata"], e.target.value);
        return newState;
      });
    },
    [setData]
  );
  const totalImages = 9;

  const layerOrder = useMemo(() => {
    return orderBy(
      Object.entries(data.projectLayersDepth),
      (v) => v[1],
      "desc"
    ).map(([k, v]) => k);
  }, [data.projectLayersDepth]);
  const [selectedImages, setSelectedImages] = useState(defaultImages);

  useLayoutEffect(() => {
    const x = async () => {
      const result = [];
      for (let i = 0; i < totalImages; i++) {
        const x = await getImagePathsFromMetadataBlock(
          data.metadata[getRandomInt(0, data.collectionDetails.totalImages)],
          rootName,
          layerOrder,
          data.imageUrlsMap
        );

        result.push(x);
      }
      setSelectedImages(result);
    };
    x();
  }, [data.metadata, data.imageUrlsMap]);

  return (
    <>
      <div className={styles.collectionPreviewContainer}>
        <div className={styles.collectionDetailContainer}>
          <div className={styles.collectionDetailLabelContainer}>
            <p className={styles.collectionDetail}>{"Collection Name: "}</p>
            <h4 className={styles.orange}>
              {" "}
              {data.collectionDetails.collectionName}
            </h4>
          </div>
          <div className={styles.collectionDetailLabelContainer}>
            <p className={styles.collectionDetail}>{`Creator: `}</p>
            <h4 className={styles.orange}> {data.collectionDetails.creator}</h4>
          </div>
        </div>
        <div className={styles.collectionPreviewImagesContainer}>
          {selectedImages.map(({ image, NO }) => {
            return (
              <div className={styles.imagePreviewContainer}>
                <ImagePreview height={"9.5vh"} image={image} no={NO} />
                {
                  <label className={styles.numberLabel}>
                    {NO ? `#${NO}` : ""}
                  </label>
                }
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.orderSummaryContainer}>
        <div className={styles.dropdownContainer}>
          <Label>Prepare metadata for blockchain?</Label>
          <DropDownSelect
            options={metadataOrderInputProps}
            header={"metadata"}
            value={get(data, ["orderDetails", "metadata"], {
              label: "Json",
              value: "Json",
            })}
            onChange={(arg0) => {
              setData((prevState) => {
                const state = { ...prevState };
                set(state, ["orderDetails", "metadata"], arg0);
                return state;
              });
            }}
          />
        </div>

        <div className={styles.detailsContainer}>
          <p className={styles.tableText}>
            <span className={styles.tableKey}>{`${
              totalImagesMessage[data.collectionDetails.totalImages]
            } images`}</span>
          </p>
          <p className={cx(styles.tableText, styles.right)}>
            {`${prices[data.collectionDetails.totalImages].label}`}
          </p>
          <p className={styles.tableText}>
            <span className={styles.tableKey}>{"Metadata Handling"}</span>
          </p>
          <p className={cx(styles.tableText, styles.right)}>
            {
              prices[get(data, ["orderDetails", "metadata", "value"], "Json")]
                .label
            }
          </p>

          <hr className={styles.divider}>{}</hr>

          <p className={styles.tableText}>
            <span className={styles.tableKey}>{"Total "}</span>
          </p>
          <p className={cx(styles.tableText, styles.right)}>
            {`${CURRENCY}${getTotal(
              data.collectionDetails.totalImages,
              get(data, ["orderDetails", "metadata", "value"])
            )}`}
          </p>
        </div>
      </div>
    </>
  );
};
