import { useRef, useState } from "react";
import { uniqBy, set } from "lodash";
import styles from "./UploadPage.module.css";
import { useDropzone } from "react-dropzone";
import cx from "classnames";
import { Notification } from "../../Components/Notification/Notification";
import { ReactComponent as Upload } from "../../svgs/IconMetro-upload.svg";
import { ReactComponent as Exclamation } from "../../svgs/exclamation.svg";
import { ProjectStructureModal } from "./Modal";

const splitPath = (file) => file.path.split("/").filter((f) => !!f);

const pathValidator = (file) => {
  const pathPieces = splitPath(file);
  if (pathPieces.length >= 3) {
    return null;
  }
  return {
    code: "path-too-short",
    message: `Upload the outer folder of your project. ie the folder containing the folder of traits.`,
  };
};

const buildProjectObject = (parentDir, pathSoFar, files, depth = 0) => {
  const uniquePathsSet = new Set();
  files.forEach((file) => {
    if (file.path.includes(pathSoFar)) {
      uniquePathsSet.add(splitPath(file)[depth + 1]);
    }
  });

  const uniquePaths = Array.from(uniquePathsSet);
  if (uniquePaths.length > 0 && uniquePaths[0].endsWith(".png")) {
    return uniquePaths;
  }
  return {
    [parentDir]: uniquePaths.reduce((acc, cur) => {
      const newPathSoFar = `${parentDir}/${cur}`;

      return {
        ...acc,
        [cur]: buildProjectObject(cur, newPathSoFar, files, depth + 1),
      };
    }, {}),
  };
};

const formatValidator = (file) => pathValidator(file);

const getNotificationProps = (filesUploaded, isErrors, uniqueRejectItems) => {
  if (filesUploaded) {
    return {
      notificationType: "success",
      message: "Click next button below to proceed to the next step.",
      messageHeading: "Everything is perfect",
    };
  }
  if (isErrors) {
    return {
      notificationType: "error",
      message: uniqueRejectItems[0].errors[0].message,
      messageHeading: "Oops!",
    };
  }
  return { notificationType: "success", message: "", messageHeading: "" };
};

const getMaxTotalImages = (projectObject) => {
  const root = Object.keys(projectObject)[0];
  const layers = Object.keys(projectObject[root]);
  const layerValueEntries = layers.map((layer) =>
    Object.entries(projectObject[root][layer])
  );

  const sumTotal = layerValueEntries.reduce((acc, cur) => {
    return acc * cur.length;
  }, 1);
  return sumTotal;
};

export const UploadWizardPage = ({
  data,
  setData,
  handleStep,
  setStepValid,
}) => {
  const projectName = useRef();
  const [text, setText] = useState(
    "Drag your project folder onto this dropzone to begin uploading your artwork"
  );
  const traits = useRef([]);
  const [customFileRejectionItems, setCustomFileRejectionItems] = useState([]);

  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      validator: formatValidator,
      accept: "image/png",
      noClick: true,
      onDrop: (files) => {
        if (files.length > 0) {
          setCustomFileRejectionItems([]);
          const collectionName = splitPath(files[0])[0];
          setText(
            `Your art project "${collectionName}" was successfully uploaded`
          );
          const projectObject = buildProjectObject(
            collectionName,
            collectionName,
            files
          );
          const maxTotalImages = getMaxTotalImages(projectObject);

          if (maxTotalImages < 1000) {
            setCustomFileRejectionItems([
              {
                errors: [
                  {
                    message: `You current collection does not have enough traits. The minimum number of combinations needs to be 1000. With your current collection it is only possible to make ${maxTotalImages}. Please add more traits to your art collection`,
                  },
                ],
              },
            ]);
            return;
          }

          setData((prev) => {
            const state = { ...prev };
            set(state, ["projectStructure"], projectObject);
            set(state, ["uploadedFiles"], files);
            set(state, ["maxTotalImages"], maxTotalImages);
            return state;
          });
          setStepValid({ isValid: true });
        }
      },
    });

  const uniqueRejectItems = uniqBy(fileRejections, "code");

  const rejectItems = [...uniqueRejectItems, ...customFileRejectionItems];
  const filesUploaded = rejectItems.length === 0 && acceptedFiles.length > 0;
  const isErrors = rejectItems.length > 0;

  const { notificationType, message, messageHeading } = getNotificationProps(
    filesUploaded,
    isErrors,
    rejectItems
  );

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <div
        {...getRootProps({
          className: cx(styles.dropzone, {
            [styles.error]: isErrors,
            [styles.success]: filesUploaded,
          }),
        })}
      >
        <input {...getInputProps()} />
        <Upload style={{ height: "3rem", weight: "3rem" }} />

        <p>{text}</p>
      </div>
      <div className={styles.structureWarning}>
          {
            <button className={styles.modalButton} onClick={() => openModal()}>
                      <Exclamation style={{ transform: "rotate(180deg)" }} />

          
          <span className={styles.structureWarningText}>
          Need help ?? 
          </span>
          <span className={styles.structureWarningText2}>
            Click Here
          </span>

            </button>
          }{" "}
          
      </div>
      <Notification
        message={message}
        messageHeading={messageHeading}
        key={"pageNotification"}
        notificationType={notificationType}
      ></Notification>
      <ProjectStructureModal
        modalIsOpen={modalIsOpen}
        afterOpenModal={afterOpenModal}
        closeModal={closeModal}
      ></ProjectStructureModal>
    </>
  );
};
