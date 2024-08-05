import { useEffect, useMemo, useState } from "react";
import styles from "./MetadataPage.module.css";
import { Wizard, useWizard } from "react-use-wizard";
import { Input } from "../../Components/Input/Input";
import { Select } from "../../Components/Input/Select/Select";
import { LayerConfigurer } from "../../Components/LayerConfigurer/LayerConfigurer";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Overlay } from "../../Components/Overlay/Overlay";
import { RandomizerPage } from "../RandomizerPage/RandomizerPage";
import { handleUpload, createCheckoutSession } from "../../handleUpload";
import { RarityConfigurerPaginator } from "../../Components/Rarity/RarityConfigurerPaginator";
import cx from "classnames";
import { isEmpty, get, set, isString, sortBy, orderBy } from "lodash";
import { QuotePage } from "../QuotePage/QuotePage";
import { UploadWizardPage } from "../UploadPage/UploadWizardPage";
import {
  getProjectProperties,
  generateMetadata,
  makeRandomizers,
} from "../../utilities";
import { Grid } from "react-loader-spinner";

import { DEFAULT_TOTAL_IMAGES } from "../../constants";
import { GenericStep } from "./GenericStep";

const getFileName = (file) => file && file.substring(0, file.length - 4);

const setDefaultLayerDepth = (projectInfo = {}) => {
  if (isEmpty(projectInfo)) {
    return {};
  }
  const { rootName, layerNames } = getProjectProperties(projectInfo);

  const layers = Object.entries(projectInfo[rootName]);
  const sortedLayers = orderBy(
    sortBy(layers, (o) => o[0]),
    (o) => o[0],
    "desc"
  );
  return Object.fromEntries(sortedLayers.map(([key], i) => [key, i]));
};

const UploadStep = ({ data, setData }) => {
  const { handleStep, previousStep, nextStep } = useWizard();
  const [isStepValid, setStepValid] = useState({ isValid: false });

  return (
    <GenericStep
      previousStep={previousStep}
      whiteLabel={"Upload "}
      orangeLabel={"Your Artwork"}
      disabled={!isStepValid.isValid}
      onClick={() => {
        setData((prev) => {
          const state = { ...prev };
          set(
            state,
            ["projectLayerCount"],
            setDefaultLayerCounts(prev.projectStructure, DEFAULT_TOTAL_IMAGES)
          );
          set(
            state,
            ["projectLayersDepth"],
            setDefaultLayerDepth(prev.projectStructure)
          );
          return state;
        });
        nextStep();
      }}
    >
      <UploadWizardPage
        setStepValid={setStepValid}
        data={data}
        setData={setData}
      />
    </GenericStep>
  );
};

const setDefaultLayerCounts = (projectInfo = {}, totalImages) => {
  if (isEmpty(projectInfo)) {
    return {};
  }

  return Object.entries(projectInfo).reduce((acc, [key, val]) => {
    if (isString(val) && val.endsWith(".png")) {
      return {
        ...acc,
        [getFileName(val)]: 100,
      };
    }
    return {
      ...acc,
      [key]: setDefaultLayerCounts(projectInfo[key], totalImages),
    };
  }, {});
};

const defaultCollectionDetails = {
  collectionName: "",
  creator: "",
  totalImages: DEFAULT_TOTAL_IMAGES,
};

const numberOfImagesOptions = [
  {
    id: "1000totalImages",
    name: "totalImages",
    value: 1000,
    text: 1000,
    subText: "images",
  },
  {
    id: "2000totalImages",
    name: "totalImages",
    value: 2000,
    text: 2000,
    subText: "images",
  },
  {
    id: "5000totalImages",
    name: "totalImages",
    value: 5000,
    text: 5000,
    subText: "images",
  },
  {
    id: "10000totalImages",
    name: "totalImages",
    value: 10000,
    text: 10000,
    subText: "images",
  },
];

const TellUsAboutYourCollection = ({
  data,
  setData,
  setFilesUploadedToS3,
  filesUploadedToS3,
}) => {
  const { handleStep, previousStep, nextStep } = useWizard();
  const isValid = useMemo(() => {
    return ["collectionName", "totalImages", "creator"].every(
      (key) => !!get(data, ["collectionDetails", key])
    );
  }, [data]);

  const maxTotalImages = get(data, "maxTotalImages");
  useEffect(() => {
    const setup = async () => {
      const [urlPrefix, imageUrlsMap] = await handleUpload(
        get(data, "uploadedFiles")
      );

      setData((prevState) => {
        const state = { ...prevState };
        set(state, "urlPrefix", urlPrefix);
        set(state, "imageUrlsMap", imageUrlsMap);
        set(state, "orderID", urlPrefix);
        return state;
      });
      setFilesUploadedToS3(true);
    };
    setup();
  }, []);

  return (
    <GenericStep
      previousStep={previousStep}
      gridTemplateRows="1fr 1fr 1fr auto 1fr 1fr"
      whiteLabel={"Tell us about "}
      orangeLabel="your NFT collection"
      onClick={() => {
        nextStep();
      }}
      disabled={!(isValid && filesUploadedToS3)}
    >
      <Input
        onChange={(e) =>
          setData((prev) => {
            const state = { ...prev };
            set(state, ["collectionDetails", "collectionName"], e.target.value);
            return state;
          })
        }
        label="Collection Name *"
        placeholder="the name of your nft collection"
        value={get(data, ["collectionDetails", "collectionName"], "")}
      />
      <Input
        onChange={(e) => {
          setData((prev) => {
            const state = { ...prev };
            set(state, ["collectionDetails", "creator"], e.target.value);
            return state;
          });
        }}
        placeholder="the creator's name of your nft collection"
        label="Creator Name *"
        value={get(data, ["collectionDetails", "creator"], "")}
      />
      <Select
        inputProps={numberOfImagesOptions}
        hideInputPropsByIndex={numberOfImagesOptions
          .map(({ value }, i) => {
            if (value >= maxTotalImages) {
              return i;
            }
            return null;
          })
          .filter((opt) => opt !== null)}
        inputLabel="How many images do you want to generate?"
        value={get(
          data,
          ["collectionDetails", "totalImages"],
          DEFAULT_TOTAL_IMAGES
        )}
        onChange={(e) =>
          setData((prev) => {
            const state = { ...prev };

            set(
              state,
              ["collectionDetails", "totalImages"],
              Number(e.target.value)
            );
            return state;
          })
        }
      ></Select>

      <div
        className={cx(styles.loaderContainer, {
          [styles.hidden]: !(isValid && !filesUploadedToS3),
        })}
      >
        <Grid color="#00BFFF" height={35} width={35} wrapperStyle={{}} />
        <h3
          style={{
            fontSize: "0.75rem",
            color: "white",
          }}
        >
          ... Uploading Remaining Images
        </h3>
      </div>
    </GenericStep>
  );
};

const OrganizeYourArtworkLayers = ({ data, setData }) => {
  const { handleStep, previousStep, nextStep } = useWizard();
  const [layerNames, setLayerNames] = useState(
    sortBy(Object.entries(data.projectLayersDepth), (o) => o[1]).map(
      ([k, depth], i) => ({ id: i, text: k })
    ),
    [data.projectLayersDepth]
  );
  const [initLayerIds, setInitLayerIds] = useState({});
  useEffect(() => {
    setInitLayerIds(
      sortBy(Object.entries(data.projectLayersDepth), (o) => o[1]).reduce(
        (acc, [k, depth], i) => ({ ...acc, [k]: i }),
        {}
      )
    );
  }, []);
  const isValid = useMemo(() => {
    return ["collectionName", "totalImages", "creator"].every(
      (key) => !!get(data, ["collectionDetails", key])
    );
  }, [data]);
  return (
    <DndProvider backend={HTML5Backend}>
      <GenericStep
        gridTemplateRows={"1fr 4fr 1fr"}
        previousStep={previousStep}
        whiteLabel={"Organize your "}
        orangeLabel="artwork layers"
        onClick={() => {
          nextStep();
        }}
        disabled={!isValid}
      >
        <LayerConfigurer
          layerNames={layerNames}
          onChangeLayer={(newLayerNames) => {
            const newProjectLayersDepth = Object.fromEntries(
              newLayerNames.map((layerName, index) => [layerName.text, index])
            );
            setData((prev) => {
              const state = { ...prev };
              set(state, ["projectLayersDepth"], newProjectLayersDepth);
              return state;
            });
            setLayerNames(newLayerNames);
          }}
          initLayerIds={initLayerIds}
          imageUrlsMap={data.imageUrlsMap}
          projectStructure={data.projectStructure}
          projectLayersDepth={data.projectLayersDepth}
        />
      </GenericStep>
    </DndProvider>
  );
};

const getWeightedTotal = (traitWeightMap) =>
  Object.entries(traitWeightMap).reduce(
    (acc, [traitName, weight]) => acc + weight,
    0
  );

const getLayerScalars = (weightsMap) => {
  const weightsMapEntries = Object.entries(weightsMap);
  return Object.fromEntries(
    weightsMapEntries.map(([layerName, traitWeightMap]) => {
      const weightedTotal = getWeightedTotal(traitWeightMap);
      return [
        layerName,
        (Object.keys(traitWeightMap).length * 100) / weightedTotal,
      ];
    })
  );
};

const RankYourTraitRarity = ({ data, setData, rootName }) => {
  const { handleStep, previousStep, nextStep } = useWizard();
  const isValid = true;
  const [isGenerating, setGenerating] = useState(false);

  useEffect(() => {
    handleStep(async () => {
      const randomizers = makeRandomizers({
        data,
        rootName,
        layerScalers: getLayerScalars(
          get(data, ["projectLayerCount", rootName])
        ),
      });
      const totalImages = get(data, ["collectionDetails", "totalImages"]);

      setGenerating(true);

      const generatedMetadata = await generateMetadata({
        collectionName: get(data, ["collectionDetails", "collectionName"]),
        randomizers: randomizers,
        totalImages: totalImages,
      });
      setGenerating(false);

      setData((prevState) => {
        const state = { ...prevState };
        set(state, "metadata", generatedMetadata);
        return state;
      });
    });
  }, [data, rootName]);

  return (
    <>
      {isGenerating && <Overlay />}
      {isGenerating && (
        <span className={cx({ [styles.overlay]: isGenerating })} />
      )}
      <GenericStep
        gridTemplateRows={"0fr 4fr 1fr"}
        previousStep={previousStep}
        whiteLabel={"Rank your "}
        orangeLabel="traits rarity"
        nextButtonText="Generate My Collection"
        subOrangeLabel={"higher more common,"}
        subWhiteLabel={"lower more rare,"}

        onClick={() => {
          nextStep();
        }}
        disabled={!isValid}
      >
        <RarityConfigurerPaginator
          traitLayerEntries={Object.entries(data.projectLayerCount[rootName])}
          rootName={rootName}
          data={data}
          setData={setData}
        ></RarityConfigurerPaginator>
      </GenericStep>
    </>
  );
};

const GenerateMetadataStep = ({ rootName, data, setData, totalImages }) => {
  const { handleStep, previousStep, nextStep } = useWizard();

  return (
    <GenericStep
      gridTemplateRows={"1fr 4fr 1fr"}
      previousStep={previousStep}
      whiteLabel="Preview Your "
      orangeLabel="NFT Collection"
      onClick={() => {
        nextStep();
      }}
      nextButtonText="Quote Order"
    >
      <RandomizerPage rootName={rootName} data={data} setData={setData} />
    </GenericStep>
  );
};

const QuoteStep = ({ data, setData, rootName }) => {
  const { handleStep, previousStep, nextStep, activeStep } = useWizard();
  const [isStepValid, setStepValid] = useState({ isValid: true });

  return (
    <div>
      <GenericStep
        gridTemplateRows={"0fr 2fr 3fr 1fr"}
        previousStep={previousStep}
        whiteLabel="Your "
        orangeLabel="Quote"
        onClick={async () => {
          const { url } = await createCheckoutSession(data);
          if (url) {
            window.location.href = url;
          }
        }}
        nextButtonText="Order Collection"
      >
        <QuotePage data={data} setData={setData} rootName={rootName} />
      </GenericStep>
    </div>
  );
};

export const MetadataPage = () => {
  const [filesUploadedToS3, setFilesUploadedToS3] = useState(false);

  const [data, setData] = useState({
    projectStructure: {},
    collectionDetails: defaultCollectionDetails,
    projectLayerCount: {},
    orderDetails: {
      metadata: {
        label: "Json (OpenSea format)",
        value: "Json",
      },
    },
  });

  const rootName = Object.keys(data.projectLayerCount)[0];

  return (
    <Wizard>
      <UploadStep data={data} setData={setData} />
      <TellUsAboutYourCollection
        setFilesUploadedToS3={setFilesUploadedToS3}
        filesUploadedToS3={filesUploadedToS3}
        data={data}
        setData={setData}
      />
      <OrganizeYourArtworkLayers data={data} setData={setData} />
      <RankYourTraitRarity data={data} setData={setData} rootName={rootName} />
      <GenerateMetadataStep rootName={rootName} data={data} setData={setData} />
      <QuoteStep rootName={rootName} data={data} setData={setData} />
    </Wizard>
  );
};
