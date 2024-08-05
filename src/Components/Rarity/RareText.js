import styles from "./RareText.module.css";

// Super Duper Rare (2%)
// Super Rare (2%-5%)
// Rare 5%-20%
// Not so Common 20% - 45%
// Not so special 45% - 65%
// Average Joe 80%
// Common  80%-100%

const rarityTypes = {
  superRare: {
    label: "Super Rare",
  },
  rare: {
    label: "Rare",
  },
  other: {
    label: "",
  },
};
// lowest in collection
//

const getTypeFromRarity = function (rarity) {
  if (rarity < 1.5) {
    return "superRare";
  }
  if (rarity < 2.5) {
    return "rare";
  }
  return "other";
};

export const RareText = ({ rarity }) => {
  const type = getTypeFromRarity(rarity);
  return <span className={styles[type]}>{rarityTypes[type].label}</span>;
};
