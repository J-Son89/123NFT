import { useCallback, useState } from "react";
import styles from "./RarityConfigurer.module.css";
import SliderStyled from "../../Components/Slider/Slider";
import { get, set } from "lodash";

const updateTraitData = (
  newVal,
  rootName,
  layerName,
  traitName,
  prevState,

) => {
  const state = { ...prevState };
  set(state, ["projectLayerCount", rootName, layerName, traitName], newVal);
  return state;
};

const TraitConfigurer = ({ items, traitName, rootName, onChange, value, defaultValue, layerName, imageUrlsMap }) => (
  <div className={styles.traitImageContainer}>
    <img
      className={styles.previewImage}
      src={get(imageUrlsMap, [
        rootName,
        layerName,
        `${traitName}.png`
      ])}
      style={{
        width: `Calc(${70}vh / ${items.length})`,
        height: `Calc(${70}vh / ${items.length})`
      }}
    />

    <SliderStyled
      width={'8rem'}
      label={traitName}
      step={1}
      min={0}
      max={100}
      onChange={onChange}
      value={value}
      defaultValue={defaultValue}
    />
  </div>
);



export const RarityConfigurer = ({
  data,
  setData,
  rootName,
  layerName,
  traits,
}) => {
  // const [isStepValid, setStepValid] = useState({ isValid: true });
  const traitsKeys = Object.keys(traits);

  const updateTraitDataCallback = useCallback(
    (newValParam, traitNameParam, prevState) => {
      return updateTraitData(
        newValParam,
        rootName,
        layerName,
        traitNameParam,
        prevState,

      );
    },
    [rootName, layerName,]
  );
  return (
    <div className={styles.rarityConfigurerContainer}>

      {traitsKeys.map(traitName =>

        <TraitConfigurer items={traitsKeys} imageUrlsMap={data.imageUrlsMap} traitName={traitName} rootName={rootName} layerName={layerName} onChange={(evt, newVal) => {
          setData((prevState) => {
            return updateTraitDataCallback(
              newVal,
              traitName,
              prevState
            );
          });
        }}
          value={get(data, [
            "projectLayerCount",
            rootName,
            layerName,
            traitName,
          ])}
          defaultValue={get(data, [
            "projectLayerCount",
            rootName,
            layerName,
            traitName,
          ])}
        />

      )}
    </div >
  );
};


