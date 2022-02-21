import React, { useState } from 'react'
import styles from './Dropdown.module.css'

export default function Dropdown(props) {
  return (
    <React.Fragment>
      <div className={styles.dropDownMain} style={props.open ? { opacity: 1, transform: 'translateY(0px)' } : { opacity: 0, transform: 'translateY(-50px)' }}>
        <input className={styles.dropDownSearchBar} placeholder='Search...' />
        <div className={styles.dropDownSelect}>
          {
            props.choices.map((x, ind) => <div className={styles.dropDownValue}>
              <input type='checkbox' id={x} key={x} value={x} />
              <label htmlFor={x} key={x}>{x}</label>
            </div>
            )
          }
        </div>
      </div>
    </React.Fragment>
  )
}