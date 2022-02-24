import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { IoIosArrowDown } from 'react-icons/io';
import { AiOutlineDownload } from 'react-icons/ai'
import styles from '../../styles/DisplayClinic.module.css'
import SearchString from '../shared/search'
import StatusParser from '../shared/status';
import Dropdown from './dropDown/dropdown';

export default function DisplaySite(props) {
  const [filteredData, setFilteredData] = useState(props.data)

  // Dropdown States
  const [showRegionDropdown, setShowRegionDropdown] = useState(false)
  const [showSiteDropdown, setShowSiteDropdown] = useState(false)
  const [showStatusDropdown, setShowStatusDropdown] = useState(false)

  // Dropdown Choices
  const regionChoices = props.region_choices;
  const affiChoices = props.affiliation_choices;
  const statusChoices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((x) => StatusParser('sites', x))

  // Dropdown Filtered States
  const [regionFilter, setRegionFilter] = useState(Array(regionChoices.length).fill(""))
  const [affiFilter, setAffiFilter] = useState(Array(affiChoices.length).fill(""))
  const [statusFilter, setStatusFilter] = useState(Array(statusChoices.length).fill(""))

  // Search Functionality
  function searchPreceptorName(substr) {
    setFilteredData(SearchString(props.data, substr))
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
            <IoIosArrowDown color='#079CDB' style={showRegionDropdown ? { transform: 'rotate(180deg)', transition: '0.3s linear' } : { transform: 'rotate(0deg)', transition: '0.3s linear' }} />
          </div>
          <Dropdown open={showRegionDropdown} setOpen={setShowRegionDropdown} choices={regionChoices} />
        </div>
        <div className={styles.siteForm}>
          <div className={styles.formTitle} onClick={() => setShowSiteDropdown(!showSiteDropdown)}>
            <p>Affiliation</p>
            <IoIosArrowDown color='#079CDB' style={showSiteDropdown ? { transform: 'rotate(180deg)', transition: '0.3s linear' } : { transform: 'rotate(0deg)', transition: '0.3s linear' }} />
          </div>
          <Dropdown open={showSiteDropdown} setOpen={setShowSiteDropdown} choices={affiChoices} />
        </div>
        <div className={styles.statusForm}>
          <div className={styles.formTitle} onClick={() => setShowStatusDropdown(!showStatusDropdown)}>
            <p>Status</p>
            <IoIosArrowDown color='#079CDB' style={showStatusDropdown ? { transform: 'rotate(180deg)', transition: '0.3s linear' } : { transform: 'rotate(0deg)', transition: '0.3s linear' }} />
          </div>
          <Dropdown open={showStatusDropdown} setOpen={setShowStatusDropdown} choices={statusChoices} />
        </div>
        <div className={styles.download}>
          <AiOutlineDownload size={25} style={{marginRight: '0.2rem'}} />
          <p>Download CSV</p>
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
        const regionName = props.region_data.filter((r) => r.id == x.region_id)
        return (
          <Link href={`/sites/database/clinics?location=${x.id}`}>
            <div key={`clinics_${ind}`} className='displayRow'>
              <div className="rowContentClinics">
                <p className={styles.dataCol1}>{x.name}</p>
                <p className={styles.dataCol2}>{regionName[0].name}</p>
                <p className={styles.dataCol3}>{x.affiliation}</p>
                <p className={styles.dataCol4}>{statusText}</p>
              </div>
              <div className={`tag${x['status']}`}></div>
            </div>
          </Link>
        )
      }
      )
      }
    </React.Fragment>
  )
}