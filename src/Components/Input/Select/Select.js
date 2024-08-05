import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./Select.module.css";
import { Label } from "../Label/Label";
import cx from 'classnames';
import { get, set } from "lodash";


const getGridLayout = (size) => {
  if (size == 4) {
    return {
      'gridTemplateColumns': '1fr 1fr',
      'gridTemplateRows': '1fr 1fr'
    }
  }
  else {
    return {

      'gridTemplateColumns': '1fr 1fr 1fr',
      'gridTemplateRows': '1fr'
    }
  }
}

export const Select = ({ onChange, inputLabel = "Collection size", inputProps, hideInputPropsByIndex }) => {
  const isChecked = useRef(0);
  return (
    <div className={styles.radioButtonContainer} >
      <Label>{inputLabel}</Label>
      <div className={styles.radioButtonsContainer} style={getGridLayout(inputProps.length)} >
        {
          inputProps.map(({ id,
            name,
            text,
            value,
            subText }, index) => {
            const disabled = hideInputPropsByIndex.some(disabledIndex => disabledIndex === index)
            return (
              <label className={cx(styles.radioButtonLabel, { [styles.disabled]: disabled, [styles.isChecked]: isChecked.current === index })} for={id}>
                <input
                  disabled={disabled}
                  checked={isChecked.current === index}
                  type="radio"
                  id={id}
                  name={name}
                  value={value}
                  onChange={e => {
                    isChecked.current = index
                    return onChange(e)
                  }
                  }

                />
                <h4>{text}</h4>
                {subText && <p>{subText}</p>}
              </label>
            )
          })}

      </div>
    </div >

  );
};
