import mergeImages from "merge-images";
import { sortBy, get, merge, orderBy } from "lodash";

const minRandomNumber = 0;
const maxRandomNumber = 10000;

export const getProjectProperties = (projectStructure) => {
  const rootName = Object.keys(projectStructure)[0];
  const layerNames = Object.keys(projectStructure[rootName]);
  return {
    rootName: rootName,
    layerNames: layerNames,
  };
};
export const filterTraits = (t) => t !== "NO" && t !== "fileName";

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

export const getImagePathsFromMetadataBlock = async (
  metadataBlock,
  rootName,
  layerOrder,
  imageUrlsMap
) => {
  const imagePathsArray = Object.entries(metadataBlock)
    .filter(([layerName]) => filterTraits(layerName))
    .map(([layerName, traitName]) => {
      // for more dynamic paths, check is file ending a file or directory, if file it's full path else it's only sub path
      return {
        [layerName]: get(imageUrlsMap, [
          rootName,
          layerName,
          `${traitName}.png`,
        ]),
      };
    });
  return {
    ...metadataBlock,
    label: `#${metadataBlock["NO"]}`,
    image: await mergeImages(
      sortBy(imagePathsArray, layerOrder).map((v) => Object.values(v)[0]),
      {
        crossOrigin: "anonymous",
      }
    ),
  };
};

const getMaxRandomNumber = (maxNumber, numberOfTraits) => {
  const mod = maxNumber % numberOfTraits;
  return numberOfTraits * 100;
};

const createRandomizer = (traits, layerScaler) => {
  return () => {
    const numberOfTraits = Object.keys(traits).length;
    const randomNumber = getRandomInt(
      minRandomNumber,
      getMaxRandomNumber(maxRandomNumber, numberOfTraits)
    );
    let range = 0;
    for (const traitName in traits) {
      range = range + layerScaler * traits[traitName];
      if (randomNumber <= range) {
        return traitName;
      }
    }

    return "None";
  };
};

export const makeRandomizers = ({ data, rootName, layerScalers }) => {
  // const layerScalers = get(data, ["layerScalers"]);
  const layerEntries = get(data, ["projectLayerCount", rootName]);

  const randomizers = Object.fromEntries(
    Object.entries(layerEntries).map(([layerName, layerValues]) => {
      return [
        layerName,
        createRandomizer(layerValues, layerScalers[layerName]),
      ];
    })
  );
  return randomizers;
};

const makeFormatNumber = (totalImages) => (n) =>
  String(n).padStart(String(totalImages).length, "0");

const isInList = (newEntry, list) => {
  if (list.length == 0) {
    return false;
  }
  for (const entry in list) {
    const entryKeys = Object.keys(entry).filter(
      (key) => key !== "fileName" && key !== "NO"
    );
    if (entryKeys.every((entryKey) => entry[entryKey] == newEntry[entryKey])) {
      return true;
    }
  }
  return false;
};

export const generateMetadata = async ({
  collectionName,
  randomizers,
  totalImages,
}) => {
  const rows = [];
  const formatNumber = makeFormatNumber(totalImages);
  for (let i = 1; i < totalImages + 1; i++) {
    const newEntry = Object.entries(randomizers).reduce(
      (acc, [key, randomizer]) => ({
        ...acc,
        [key]: randomizer(),
      }),
      {
        fileName: `${i}.png`,
        NO: formatNumber(i),
      }
    );
    if (!isInList(newEntry, rows)) {
      rows.push(newEntry);
    } else {
      i--;
    }
  }
  //   setIsConfettiActive(true);
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve(rows);
    }, 4000);
  });
};

export const isHomePage = (pathname) => pathname != "/getStarted" && pathname != "/success" && pathname != "/dataReview"  && pathname != "/prices"  && pathname != "/about";
