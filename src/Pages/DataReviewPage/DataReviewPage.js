import { useRef, useState } from "react";
import { uniqBy, set } from "lodash";
import styles from "./DataReviewPage.module.css";
import { useDropzone } from "react-dropzone";
import cx from "classnames";
import { Notification } from "../../Components/Notification/Notification";
import { ReactComponent as Upload } from "../../svgs/IconMetro-upload.svg";
import { DataCollectionPreview } from "../../Components/DataCollectionPreview/DataCollectionPreview";


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

const openFile = async (file) => {
  const reader = new FileReader();
  return new Promise((res, rej) => {
    reader.onload = function (e) {
      const contents = e.target.result;
      return res(contents)
    };
    reader.readAsText(file);
  })


}

const formatMetadataBlock = (metadataBlock) => Object.fromEntries(
  metadataBlock.attributes.map((attribute) => [attribute['trait_type'], attribute['value']]
  ))


export const DataReviewPage = ({

}) => {
  const projectName = useRef();
  const [text, setText] = useState(
    "Drag your folder of metadata files onto this dropzone to begin reviewing your collection  data"
  );

  const [dataToShow, setDataToShow] = useState([])
  const [traitKeys, setTraitKeys] = useState([])

  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      accept: "application/JSON",
      noClick: true,
      onDrop: async (files) => {
        const metadata = []
        if (files.length > 0) {



          for await (const file of files) {
            const metadataBlock = await openFile(file)

            metadata.push(formatMetadataBlock(JSON.parse(metadataBlock)))

          }
          const newTraitKeys = Object.keys(metadata[0])
          
          setTraitKeys(newTraitKeys)
          setDataToShow(metadata)
        }

      },
    });

  const uniqueRejectItems = uniqBy(fileRejections, "code");

  const filesUploaded = uniqueRejectItems.length === 0 && acceptedFiles.length > 0;
  const isErrors = uniqueRejectItems.length > 0;

  const { notificationType, message, messageHeading } = getNotificationProps(
    filesUploaded,
    isErrors,
    uniqueRejectItems
  );

  return (
    <div className={styles.pageContainer}>
      {dataToShow.length === 0 ? <div
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
      </div> :
        <>
          <div className={cx(styles.previewGrid)}>
            <DataCollectionPreview
              label="Review Your Traits data"
              subLabel="View how many of each trait is in your collection"
              metadata={dataToShow}
              traitKeys={traitKeys}
              showDataList            />


          </div>
          <button
            className={cx(styles.resetBtn)}

            onClick={() => {
              setDataToShow([])
              setTraitKeys([])
            }
            }>Upload New Data</button>
        </>
      }

    </div>
  );
};


