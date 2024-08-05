import Modal from "react-modal";
import styles from "./Modal.module.css";
import { ReactComponent as CheckMark } from "../../svgs/IconAwesome-check.svg";
import { ReactComponent as FileUpload } from "../../svgs/IconMetro-upload.svg";
import cx from "classnames";

const Check = () => (
  <div className={styles.svgContainer}>
    <div className={styles.svgDisc}></div>
    <CheckMark className={styles.svg}></CheckMark>
  </div>
);

const ProjectSample = () => {
  return (
    <div>
      <h2 className={cx(styles.checkListHeader, styles.projectStructureHeader)}>
        123 NFT project structure
      </h2>
      <div className={styles.projectSampleContainer}>
        <div className={styles.projectSampleHeaderContainerMain}>
          <div className={styles.svgContainer}>
            <div className={styles.svgDisc}></div>
            <FileUpload className={styles.svg}></FileUpload>
          </div>

          <h3 className={styles.checkListItemText}> Sample Artwork Folder </h3>
        </div>
        <div className={styles.projectSampleHeaderContainer}>
          <div className={styles.svgContainerSmall}>
            <div className={styles.svgDiscSmall}></div>
            <FileUpload className={styles.svgSmall}></FileUpload>
          </div>

          <h3 className={cx(styles.span2, styles.folderHeader)}>
            {" "}
            Heads Folder
          </h3>

          <div className={styles.fileContainer}>
            <img
              className={styles.layerImg}
              src={"Total traits/head/yellow.png"}
            />
            <p className={styles.layerFileName}>Yellow</p>
          </div>
          <div className={styles.fileContainer}>
            <img
              className={styles.layerImg}
              src={"Total traits/head/blue.png"}
            />
            <p className={styles.layerFileName}>Blue</p>
          </div>
          <div className={styles.fileContainer}>
            <img
              className={styles.layerImg}
              src={"Total traits/head/green.png"}
            />
            <p className={styles.layerFileName}>Green</p>
          </div>
        </div>
        <div className={styles.projectSampleHeaderContainer}>
          <div className={styles.svgContainerSmall}>
            <div className={styles.svgDiscSmall}></div>
            <FileUpload className={styles.svgSmall}></FileUpload>
          </div>

          <h3 className={cx(styles.span2, styles.folderHeader)}>
            {" "}
            Faces Folder
          </h3>
          <div className={styles.fileContainer}>
            <img
              className={styles.layerImg}
              src={"Total traits/face/sunglasses.png"}
            />
            <p className={styles.layerFileName}>Sunglasses</p>
          </div>
          <div className={styles.fileContainer}>
            <img
              className={styles.layerImg}
              src={"Total traits/face/sad note.png"}
            />
            <p className={styles.layerFileName}>Sad Note</p>
          </div>
          <div className={styles.fileContainer}>
            <img
              className={styles.layerImg}
              src={"Total traits/face/3d glasses.png"}
            />
            <p className={styles.layerFileName}>3d glasses</p>
          </div>
        </div>
        <div className={styles.projectSampleHeaderContainer}>
          <div className={styles.svgContainerSmall}>
            <div className={styles.svgDiscSmall}></div>
            <FileUpload className={styles.svgSmall}></FileUpload>
          </div>

          <h3 className={cx(styles.span2, styles.folderHeader)}>
            {" "}
            Hair Styles Folder{" "}
          </h3>
          <div className={styles.fileContainer}>
            <img
              className={styles.layerImg}
              src={"Total traits/hair/viking.png"}
            />
            <p className={styles.layerFileName}>Viking</p>
          </div>
          <div className={styles.fileContainer}>
            <img
              className={styles.layerImg}
              src={"Total traits/hair/crown.png"}
            />
            <p className={styles.layerFileName}>Crown</p>
          </div>
          <div className={styles.fileContainer}>
            <img
              className={styles.layerImg}
              src={"Total traits/hair/cowboy.png"}
            />
            <p className={styles.layerFileName}>Cowboy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProjectStructureModal = ({
  modalIsOpen,
  afterOpenModal,
  closeModal,
}) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={{
        overlay: {
          zIndex: 100,
          border: "2px solid #fa7d09",
        }
      }

      }
      contentLabel="123 NFT Project Structure"
    >
      <div className={styles.checkListContainer}>
        <div className={styles.checkListHeaderContainer}>
          <h1 className={styles.checkListHeader}>
            123 <span className={styles.orange}>NFT</span> Checklist
          </h1>
        </div>
        <div className={styles.checkListItemContainer}>
          <Check />
          <div className={styles.textContainer}>
            <h2 className={styles.checkListItemText}>
              All images are of the same dimensions (height & width)
            </h2>
            <p className={styles.checkListItemSubText}>
              it is important that all of your image files are of the same size
              so they stack consistenly when the tool is merging the image layers
            </p>
          </div>
        </div>
        <div className={styles.checkListItemContainer}>
          <Check />
          <div className={styles.textContainer}>
            <h2 className={styles.checkListItemText}>
              All images are PNG format
            </h2>
            <p className={styles.checkListItemSubText}>
              Currently 123 NFT only supports PNG images. Support for other file
              types will be coming soon.
            </p>
          </div>
        </div>
        <div className={styles.checkListItemContainer}>
          <Check />
          <div className={styles.textContainer}>
            <h2 className={styles.checkListItemText}>
              The file and folder structure for your uploaded artwork matches
              the 123 NFT project structure as illustrated below
            </h2>
            <p className={styles.checkListItemSubText}>
              123 NFT depends on your file/folder structure matching this
              pattern.
            </p>
          </div>
        </div>

        <div className={styles.checkListItemContainer}>
          <Check />
          <div className={styles.textContainer}>
            <h2 className={styles.checkListItemText}>
              The uploaded artwork has enough trait combinations to create at
              least 1,000 images
            </h2>
            <p className={styles.checkListItemSubText}>
              For example, the sample project structure below has a possible 9
              traits, this is calculated by multiplying the number of traits
              together (3 x3 x3)
            </p>
          </div>
        </div>

        <div>
          <ProjectSample />
        </div>
      </div>
    </Modal>
  );
};
