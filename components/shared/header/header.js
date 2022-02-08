import React from "react";
import { IoArrowBack } from "react-icons/io5";
import styles from "./Header.module.css"

export default function Header(props) {
    return (
        <React.Fragment>
            <div className={styles.mainHeader}>
                {props.back ? 
                    <IoArrowBack size={50} style={{width: '10%', cursor: 'pointer'}} onClick={props.back}/> : null}
                <div className={styles.headerText} style={props.prevPage ? {width: '80%'} : {width: '90%'}}>
                    <h1 className={styles.headerName}>{props.header}</h1>
                    <p className={styles.headerDate}>{props.date}</p>
                </div>
                <div className={styles.headerImg} style={{width: '10%'}}>
                    <img src={props.imgSrc} alt="Profile Image" />
                </div>
            </div>
        </React.Fragment>
        )
}