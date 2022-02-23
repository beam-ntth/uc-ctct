import React, { useState } from 'react'
import SearchString from '../../shared/search';
import styles from './Dropdown.module.css'

export default function Dropdown(props) {
  const [filteredData, setFilteredData] = useState(props.choices);

  function searchName(substr) {
    setFilteredData(SearchString(props.choices, substr))
  }

  return (
    <React.Fragment>
      <div className={styles.dropDownMain} style={props.open ? { opacity: 1, transform: 'translateY(0px)' } : { opacity: 0, transform: 'translateY(-50px)' }}>
        <input className={styles.dropDownSearchBar} placeholder='Search...' onChange={(x) => searchName(x.target.value)} />
        <div className={styles.dropDownSelect}>
          {
            filteredData.map((x, ind) => <div className={styles.dropDownValue}>
                <input type='checkbox' id={x} key={ind} value={x} />
                <label htmlFor={x} key={ind}>{x}</label>
              </div>
            )
          }
        </div>
      </div>
    </React.Fragment>
  )
}