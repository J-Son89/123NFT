import { useState, useMemo } from "react";
import { BarChart } from "../../Components/BarChart/BarChart";
import { wrap } from "popmotion";
import { Paginator } from "../Paginator/Paginator";
import { get, merge, orderBy } from "lodash";
import styles from "./DataCollection.module.css";



const createDataTable = (metadata, traitsKeys) => {
  return metadata.reduce((acc, currentRow) => {
    const valuesForThisRow = traitsKeys.reduce((acc2, key) => {
      const updateTrait = get(currentRow, [key])
        ? { [currentRow[key]]: get(acc, [key, currentRow[key]], 0) + 1 }
        : {};
      return {
        ...acc2,
        [key]: {
          ...get(acc2, [key], {}),
          ...updateTrait,
        },
      };
    }, {});
    return merge(acc, valuesForThisRow);
  }, {});
};

const shortenString = (message) =>
  message.length < 12 ? message : `${message.substring(0,4)} ..${message.substring(message.length-6,message.length)}`
    

const DataList = ({ trait, tableData }) => {
  const listOfTraitNumbers = useMemo(() => {
    const data = orderBy(Object.entries(tableData[trait]), ([key, val]) => val, 'desc')
    return data.map(([key, val], i) => {
      return <li key={`listItem${i}`} className={styles.dataListItem}>{shortenString(key)}: {val}</li>
    })
  }, [trait, tableData])
  return <div className={styles.dataListContainer}>
    {/* <h3  className={styles.dataListTitle}>{trait}</h3> */}
    <ul className={styles.dataListUL}>

      {listOfTraitNumbers}
    </ul>
  </div>

}

export const DataCollectionPreview = ({ label, metadata, traitKeys, subLabel, showDataList }) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  const tableData = createDataTable(metadata, traitKeys);
  const pageIndex = wrap(0, traitKeys.length, page);
  return (
    <>
      <Paginator
        title={"Your Collection in Data"}
        paginate={paginate}
        direction={direction}
        wrapperClassname={styles.container}
        labelsAndButtonContainerClassname={styles.labelsAndButtonContainer}
        label={label}
        subLabel={subLabel}
      >
        {showDataList && <DataList trait={traitKeys[pageIndex]} tableData={tableData} />}
        <BarChart trait={traitKeys[pageIndex]} tableData={tableData} />
      </Paginator>
    </>
  );
};
