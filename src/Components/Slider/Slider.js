import * as React from "react";
import { styled, alpha, Box } from "@mui/system";
import SliderUnstyled from "@mui/base/SliderUnstyled";
import styles from "./Slider.module.css";

// import { styled } from '@mui/material/styles';
import Tooltip from "@mui/material/Tooltip";
// import Box from '@mui/material/Box';

function ValueLabelComponent(props) {
  const { children, value } = props;

  return (
    <Tooltip
      classes={{ tooltip: styles.tooltip }}
      styleenterTouchDelay={0}
      placement="top"
      title={`${value}%`}
    >
      {children}
    </Tooltip>
  );
}

const StyledSlider = styled(SliderUnstyled)(
  ({ theme, value }) => `
  color: ${theme.palette.mode === "light" ? "#FA7D09" : "#90caf9"};
  height: 4px;
  width: 100%;
  padding: 13px 0;
  display: inline-block;
  position: relative;
  cursor: pointer;
  touch-action: none;
  -webkit-tap-highlight-color: transparent;
  opacity: 0.75;
  &:hover {
    opacity: 1;
  }
  & .MuiSlider-markLabel{
    position: absolute;
    font-size: 0.5rem;
    color: white;
    bottom: -4px;
    font-family: 'Poppins-Medium';
    margin-left: 4px;
  }
  & .MuiSlider-rail {
    display: block;
    position: absolute;
    width: 100%;
    height: 4px;
    border-radius: 2px;
    background-color: #23242A;
    opacity: 0.38;
  }
  
  
  &.MuiSlider-root span:nth-child(6) {
      left: 88% !important;
    
  }

  & .MuiSlider-track {
    display: block;
    position: absolute;
    height: 4px;
    border-radius: 2px;
    background-color: currentColor;
  }

  & .MuiSlider-thumb {
    position: absolute;
    width: 14px;
    height: 14px;
    margin-left: -6px;
    margin-top: -5px;
    box-sizing: border-box;
    border-radius: 50%;
    outline: 0;
    border: 2px solid white;
    background-color: #fff;

    :hover,
    &.Mui-focusVisible {
      box-shadow: 0 0 0 0.25rem ${alpha(
        theme.palette.mode === "light" ? "#1976d2" : "#90caf9",
        0.15
      )};
    }

    &.Mui-active {
      box-shadow: 0 0 0 0.25rem ${alpha(
        theme.palette.mode === "light" ? "#1976d2" : "#90caf9",
        0.3
      )};
    }
  }
`
);

const marks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 100,
    label: "100%",
  },
];

export default function UnstyledSlider({
  value,
  onChange,
  defaultValue,
  width,
  label,
  ...rest
}) {
  return (
    <div className={styles.sliderContainer}>
      <label className={styles.label}>{label}</label>
      <Box sx={{ width }}>
        <StyledSlider
          {...rest}
          value={value}
          onChange={onChange}
          defaultValue={defaultValue}
          marks={marks}
          valueLabelDisplay="auto"
          components={{
            ValueLabel: ValueLabelComponent,
          }}
        />
      </Box>
    </div>
  );
}

// const AirbnbSlider = styled(Slider)(({ theme }) => ({
//   color: '#3a8589',
//   height: 3,
//   padding: '13px 0',
//   '& .MuiSlider-thumb': {
//     height: 27,
//     width: 27,
//     backgroundColor: '#fff',
//     border: '1px solid currentColor',
//     '&:hover': {
//       boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
//     },
//     '& .airbnb-bar': {
//       height: 9,
//       width: 1,
//       backgroundColor: 'currentColor',
//       marginLeft: 1,
//       marginRight: 1,
//     },
//   },
//   '& .MuiSlider-track': {
//     height: 3,
//   },
//   '& .MuiSlider-rail': {
//     color: theme.palette.mode === 'dark' ? '#bfbfbf' : '#d8d8d8',
//     opacity: theme.palette.mode === 'dark' ? undefined : 1,
//     height: 3,
//   },
// }));
