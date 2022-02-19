import React, { useState } from 'react'
import Link from 'next/link'
import { IoIosArrowDown } from 'react-icons/io';
import styles from '../../styles/DisplayClinic.module.css'
import Dropdown from './dropDown/dropdown';
import SearchString from '../shared/search'
import StatusParser from '../shared/status';

export default function DisplayPreceptor (props) {
    const [filteredPrecepData, setFilteredPrecepData] = useState(props.data)
    const [showSiteDropdown, setShowSiteDropdown] = useState(false)

    function searchPreceptorName(substr) {
        setFilteredPrecepData(SearchString(preceptor_data, substr))
    }

    return (
        <React.Fragment>
            <div className={styles.filterRow}>
                <div className={styles.searchBar}>
                    <input className={styles.searchInput} placeholder="Enter Preceptor Name ..." onChange={(x) => searchPreceptorName(x.target.value)} />
                </div>
                <div className={styles.regionForm}>
                </div>
                <div className={styles.siteForm}>
                  <div className={styles.formTitle} onClick={() => setShowSiteDropdown(!showSiteDropdown)}>
                    <p>Site</p>
                    <IoIosArrowDown color='#079CDB' style={showSiteDropdown ? {transform: 'rotate(180deg)', transition: '0.3s linear'} : {transform: 'rotate(0deg)', transition: '0.3s linear'}} />
                  </div>
                  <Dropdown open={showSiteDropdown} setOpen={setShowSiteDropdown} />
                </div>
                <div className={styles.statusForm}>
                  <div className={styles.formTitle}>
                    <p>Status</p>
                    <IoIosArrowDown color='#079CDB' />
                  </div>
                  <form></form>
                </div>
            </div>
            <div className={styles.row}>
                <p className={styles.titleCol1}>Preceptor Name</p>
                <p className={styles.titleCol2}>Position</p>
                <p className={styles.titleCol3}>Credential</p>
                <p className={styles.titleCol4}>Status</p>
            </div>
            {filteredPrecepData.map((x, ind) => {
            const statusText = StatusParser("preceptors", parseInt(x.status))
            return (
            <Link href={`/sites/database/clinics/preceptor?${x.id}`}>
                <div key={`clinics_${ind}`} className='displayRow'>
                    <div className="rowContentClinics">
                    <p className={styles.dataCol1} style={{ marginLeft: '2rem' }}>{x.name}</p>
                    <p className={styles.dataCol2}>{x.position}</p>
                    <p className={styles.dataCol3}>{x.credential}</p>
                    <p className={styles.dataCol4} style={{ marginRight: '2rem' }}>{statusText}</p>
                    </div>
                <div className={`tag${x['status']}`}></div>
                </div>
            </Link>
            )}
            )
        }
      </React.Fragment>
    )
}