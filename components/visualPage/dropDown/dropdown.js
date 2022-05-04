import React, { useEffect, useState } from 'react'
import {searchString} from '../../shared/search';
import styles from './Dropdown.module.css'

export default function Dropdown(props) {
  const [filteredData, setFilteredData] = useState(props.choices);

  function searchName(substr) {
    setFilteredData(searchString(props.choices, substr))
  }

  return (
    <React.Fragment>
      <div className={styles.dropDownMain} style={props.open ? { opacity: 1, transform: 'translateY(0px)', zIndex: 100 } : { opacity: 0, transform: 'translateY(-50px)', zIndex: 10 }}>
        {props.disableSearch ? null : <input className={styles.dropDownSearchBar} placeholder='Search...' onChange={(x) => searchName(x.target.value)} />}
        <div className={styles.dropDownSelect}>
          {
            filteredData.map((x, ind) => <div className={styles.dropDownValue}>
                {
                  // Temporary since not all dropdowns are implemented with search functionality
                  props.displayOnly ? <input type='checkbox' id={x} key={`${x}_${ind}`} /> :
                  <input type='checkbox' id={x} key={`${x}_${ind}`} 
                  value={props.ddFilter[ind]} 
                  onChange={() => {
                    let newDropDown = [...props.ddFilter]
                    if (newDropDown[ind] === "") {
                      newDropDown[ind] = x
                    } else {
                      newDropDown[ind] = ""
                    }
                    console.log(newDropDown)
                    props.setddFilter(newDropDown)
                  }} 
                  />
                }
                <label htmlFor={x} key={ind}>{x}</label>
              </div>
            )
          }
        </div>
      </div>
    </React.Fragment>
  )
}