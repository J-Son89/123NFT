import styles from './DropDownSelect.module.css';
import Select from "react-select";

export const DropDownSelect = ({
    options,
    header,
    value,
    onChange
}) => <div className={styles.selectOptionContainer} >
        <label className={styles.selectOptionLabel}>{header}</label>
        <Select
            isSearchable={false}
            styles={{
                control: (p) => ({
                    ...p,
                    background: 'transparent',
                    border: 'none'
                }),
                indicatorSeparator: (p) => ({
                    ...p,
                    display: 'none'
                }),
                indicatorsContainer: (p) => ({
                    ...p,
                    color: 'white'
                }),
                singleValue: (p) => ({
                    ...p,
                    color: 'white',
                    fontFamily: "Poppins-Medium",
                    fontSize: '0.75rem',
                    position: 'absolute',
                    top: '4px',
                    left: '2px',
                }),
                ValueContainer: (p) => ({
                    ...p,
                    color: 'white',
                    overflow: 'visible',
                    width: '20vw'
                }),


            }}
            defaultValue={options[0]}
            value={value}
            onChange={(arg0) => onChange(arg0, header)}
            options={options}
        />
    </div>