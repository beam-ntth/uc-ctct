import React, { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import styles from "./Header.module.css"

export default function Header(props) {
  const currentdate = new Date();
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  
  /**
   * Initialize the time on the dashboard
   */
  const [datetime, setDatetime] = useState(`Today: ${monthNames[currentdate.getMonth()]} ${currentdate.getDate()}, 
  ${currentdate.getFullYear()} - ${currentdate.getHours() < 10 ? `0${currentdate.getHours()}`
  : currentdate.getHours()}:${currentdate.getMinutes() < 10 ? `0${currentdate.getMinutes()}`
  : currentdate.getMinutes()}:${currentdate.getSeconds() < 10 ? `0${currentdate.getSeconds()}` : currentdate.getSeconds()}`)
  
  /**
   * Update the time on the dashboard every second
   */
  useEffect(() => {
    setTimeout(() => setDatetime(`Today: ${monthNames[currentdate.getMonth()]} ${currentdate.getDate()}, 
    ${currentdate.getFullYear()} - ${currentdate.getHours() < 10 ? `0${currentdate.getHours()}`
    : currentdate.getHours()}:${currentdate.getMinutes() < 10 ? `0${currentdate.getMinutes()}`
    : currentdate.getMinutes()}:${currentdate.getSeconds() < 10 ? `0${currentdate.getSeconds()}` : currentdate.getSeconds()}`), 1000)
    return
  })

  return (
    <React.Fragment>
      <div className={styles.mainHeader}>
        {props.back ?
          <IoArrowBack size={50} style={{ width: '10%', cursor: 'pointer' }} onClick={props.back} /> : null}
        <div className={styles.headerText} style={props.prevPage ? { width: '80%' } : { width: '90%' }}>
          <h1 className={styles.headerName}>{props.header}</h1>
          <p className={styles.headerDate}>{datetime}</p>
        </div>
        <div className={styles.headerImg} style={{ width: '10%' }}>
          <img src={props.imgSrc} alt="Profile Image" />
        </div>
      </div>
    </React.Fragment>
  )
}