import React, { useState } from 'react'
import Link from 'next/link'
import { IoIosArrowDown } from 'react-icons/io';
import styles from '../../styles/DisplayClinic.module.css'
import Dropdown from './dropDown/dropdown';
import SearchString from '../shared/search'
import StatusParser from '../shared/status';
import { getAllSites } from '../../api-lib/azure/azureOps';
import { AiOutlineDownload } from 'react-icons/ai';

export default function DisplayClinic(props) {
  const [filteredClinicData, setFilteredClinicData] = useState(props.data);
  const [showRegionDropdown, setShowRegionDropdown] = useState(false);
  const [showSiteDropdown, setShowSiteDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  const regionChoices = props.region_choices;
  const allSiteNames = props.sites.map(x => x.name);
  const statusChoices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((x) => StatusParser('clinics', x))

  function searchClinicName(substr) {
    setFilteredClinicData(SearchString(props.data, substr))
  }

  return (
    <React.Fragment>
      <div className={styles.filterRow}>
        <div className={styles.searchBar}>
          <input className={styles.searchInput} placeholder="Enter Clinic Name ..." onChange={(x) => searchClinicName(x.target.value)} />
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
            <p>Site</p>
            <IoIosArrowDown color='#079CDB' style={showSiteDropdown ? { transform: 'rotate(180deg)', transition: '0.3s linear' } : { transform: 'rotate(0deg)', transition: '0.3s linear' }} />
          </div>
          <Dropdown open={showSiteDropdown} setOpen={setShowSiteDropdown} choices={allSiteNames} />
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