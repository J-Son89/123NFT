import { Grid } from "react-loader-spinner";
// import styles from 'Overlay.module.css]'
export const Overlay = () => (
    <>
        <h3
            style={{
                color: "white",
                zIndex: 150,
                position: "absolute",
                left: "42%",
                top: "34%",
            }}
        >
            ...Generating Metadata
        </h3>
        <Grid
            color="#00BFFF"
            height={80}
            width={80}
            wrapperStyle={{
                zIndex: 150,
                position: "absolute",
                left: "50%",
                top: "50%",
            }}
        />
    </>
);