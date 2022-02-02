import React from "react";
import styles from "./Header.module.css"

export default function Header(props) {
    return (
        <React.Fragment>
            <div className={styles.mainHeader}>
                <div className={styles.headerText}>
                    <h1 className={styles.headerName}>{props.header}</h1>
                    <p className={styles.headerDate}>{props.date}</p>
                </div>
                <div className={styles.headerImg}>
                    <img src={props.imgSrc} alt="Profile Image" />
                </div>
            </div>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap');
            </style>
        </React.Fragment>
        )
}