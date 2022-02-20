import React, { useState } from 'react'
import Link from 'next/link'
import { IoIosArrowDown } from 'react-icons/io';
import styles from '../../styles/DisplayClinic.module.css'
import Dropdown from './dropDown/dropdown';
import SearchString from '../shared/search'
import StatusParser from '../shared/status';

export default function DisplayClinic(props) {
  const [filteredClinicData, setFilteredClinicData] = useState(props.data)
  const [showSiteDropdown, setShowSiteDropdown] = useState(false)

  function searchClinicName(substr) {
    setFilteredClinicData(SearchString(data, substr))
  }

  return (
    <React.Fragment>
      <div className={styles.filterRow}>
        <div className={styles.searchBar}>
          <input className={styles.searchInput} placeholder="Enter Clinic Name ..." onChange={(x) => searchClinicName(x.target.value)} />
        </div>
        <div className={styles.regionForm}>
          <div className={styles.formTitle}>
            <p>Region</p>
            <IoIosArrowDown color='#079CDB' />
          </div>
          <div className={styles.dropDownMain} style={props.open ? { opacity: 1, transform: 'translateY(0px)' } : { opacity: 0, transform: 'translateY(-50px)' }}>
            <input className={styles.searchBar} placeholder='Search...' />
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
        </div>
        <div className={styles.siteForm}>
          <div className={styles.formTitle} onClick={() => setShowSiteDropdown(!showSiteDropdown)}>
            <p>Site</p>
            <IoIosArrowDown color='#079CDB' style={showSiteDropdown ? { transform: 'rotate(180deg)', transition: '0.3s linear' } : { transform: 'rotate(0deg)', transition: '0.3s linear' }} />
          </div>
          <Dropdown open={showSiteDropdown} setOpen={setShowSiteDropdown} />
        </div>
        <div className={styles.statusForm}>
          <div className={styles.formTitle}>
            <p>Status</p>
            <IoIosArrowDown color='#079CDB' />
          </div>
          <Dropdown open={showSiteDropdown} setOpen={setShowSiteDropdown} />
        </div>
      </div>
      <div className={styles.row}>
        <p className={styles.titleCol1}>Clinic Name</p>
        <p className={styles.titleCol2}>Affiliation</p>
        <p className={styles.titleCol3}>Region</p>
        <p className={styles.titleCol4}>Status</p>
      </div>
      {filteredClinicData.map((x, ind) => {
        const statusText = StatusParser("clinics", parseInt(x.status))
        return (
          <Link href={`/sites/database/clinics/clinic?name=${x.id}`}>
            <div key={`clinics_${ind}`} className='displayRow'>
              <div className="rowContentClinics">
                <p className={styles.dataCol1} style={{ marginLeft: '2rem' }}>{x.name}</p>
                <p className={styles.dataCol2}>{x.affiliation}</p>
                <p className={styles.dataCol3}>{x.region}</p>
                <p className={styles.dataCol4} style={{ marginRight: '2rem' }}>{statusText}</p>
              </div>
              <div className={`tag${x['status']}`}></div>
            </div>
          </Link>
        )
      })
      }
    </React.Fragment>
  )
}