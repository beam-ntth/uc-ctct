import React, { useState } from 'react'
import styles from './Dropdown.module.css'

import { IoIosArrowDown } from 'react-icons/io'
import { FiEdit } from 'react-icons/fi';
import { FaRegTrashAlt } from 'react-icons/fa';

export default function Dropdown(props) {
  const [dropdown, setDropdown] = useState(false)
  const [showRegionForm, setShowRegionForm] = useState(false)
  const [showSiteForm, setShowSiteForm] = useState(false)
  const [showStatusForm, setShowStatusForm] = useState(false)

  return (
    <React.Fragment>
      <div className={styles.dropDownMain} style={props.open ? {opacity: 1, transform: 'translateY(0px)'} : {opacity: 0, transform: 'translateY(-50px)'}}>
        <input className={styles.dropDownSearchBar} placeholder='Search...' />
        <div className={styles.dropDownSelect}>
          <div className={styles.dropDownValue}>
            <input type='checkbox' value="site1" />
            <label for="site1">Site 1</label>
          </div>
          <div className={styles.dropDownValue}>
            <input type='checkbox' value="site2" />
            <label for="site2">Site 2</label>
          </div>
          <div className={styles.dropDownValue}>
            <input type='checkbox' value="site3" />
            <label for="site3">Site 3</label>
          </div>
          <div className={styles.dropDownValue}>
            <input type='checkbox' value="site4" />
            <label for="site4">Site 4</label>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}