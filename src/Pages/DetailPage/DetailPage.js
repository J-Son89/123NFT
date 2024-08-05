import { useRef, useState } from "react";
import { get, set } from "lodash";

import { Input } from "../../Components/Input/Input";
import {
  SESSION_STORAGE_PROJECT_STRUCTURE_KEY,
  DEFAULT_TOTAL_IMAGES,
} from "../../constants";

const splitPath = (file) => file.path.split("/").filter((f) => !!f);

export const DetailWizardPage = ({ data, setData, handleStep }) => {
  const projectName = useRef();
  const [text, setText] = useState(
    "Drag your project folder onto this dropzone to begin uploading your artwork"
  );
  const traits = useRef([]);

  return (
    <>
      <Input
        onChange={(e) =>
          setData((prev) => {
            const state = { ...prev };
            set(state, ["collectionDetails", "collectionName"], e.target.value);
            return state;
          })
        }
        label="* Collection Name"
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
        label="* Creator Name"
        value={get(data, ["collectionDetails", "creator"], "")}
      />
      <Input
        onChange={(e) =>
          setData((prev) => {
            const state = { ...prev };

            set(state, ["collectionDetails", "totalImages"], e.target.value);
            return state;
          })
        }
        type="number"
        label="* Total Images"
        value={get(
          data,
          ["collectionDetails", "totalImages"],
          DEFAULT_TOTAL_IMAGES
        )}
      />
    </>
  );
};
