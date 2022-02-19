import React, { useState } from 'react'
import Link from 'next/link'
import { IoIosArrowDown } from 'react-icons/io';
import styles from '../../styles/DisplayClinic.module.css'
import SearchString from '../shared/search'
import StatusParser from '../shared/status';
import Dropdown from './dropDown/dropdown';

export default function DisplaySite (props) {
    const [filteredData, setFilteredData] = useState(props.data)
    const [showRegionDropdown, setShowRegionDropdown] = useState(false)
    const [showSiteDropdown, setShowSiteDropdown] = useState(false)

    function searchPreceptorName(substr) {
        setFilteredData(SearchString(data, substr))
    }

    return (
        <React.Fragment>
            <div className={styles.filterRow}>
                <div className={styles.searchBar}>
                    <input className={styles.searchInput} placeholder="Enter Site Name ..." onChange={(x) => searchPreceptorName(x.target.value)} />
                </div>
                <div className={styles.regionForm}>
                    <div className={styles.formTitle} onClick={() => setShowRegionDropdown(!showRegionDropdown)}>
                        <p>Region</p>
                        <IoIosArrowDown color='#079CDB' style={showRegionDropdown ? {transform: 'rotate(180deg)', transition: '0.3s linear'} : {transform: 'rotate(0deg)', transition: '0.3s linear'}} />
                    </div>
                    <Dropdown open={showRegionDropdown} setOpen={setShowRegionDropdown} />
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
                  <Dropdown/>
                </div>
            </div>
            <div className={styles.row}>
                <p className={styles.titleCol1}>Site Name</p>
                <p className={styles.titleCol2}>Region</p>
                <p className={styles.titleCol3}>Affiliation</p>
                <p className={styles.titleCol4}>Status</p>
            </div>
            {filteredData.map((x, ind) => {
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