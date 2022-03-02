import React, { useState } from 'react'
import Link from 'next/link'
import { IoIosArrowDown } from 'react-icons/io';
import styles from '../../styles/DisplayClinic.module.css'
import Dropdown from './dropDown/dropdown';
import SearchString from '../shared/search'
import StatusParser from '../shared/status';
import { getAllSites } from '../../api-lib/azure/azureOps';
import { AiOutlineDownload } from 'react-icons/ai';
import { createDownloadLink } from './csvParser';


export default function DisplayClinic(props) {
  const [filteredClinicData, setFilteredClinicData] = useState(props.data);
  const [showRegionDropdown, setShowRegionDropdown] = useState(false);
  // const [showSiteDropdown, setShowSiteDropdown] = useState(false);
  const [showSetLocationDropdown, setShowSetLocationDropdown] = useState(false);
  const [showSetPopDropdown, setShowSetPopDropdown] = useState(false);
  const [showPopDropdown, setShowPopDropdown] = useState(false);
  const [showAcuityDropdown, setShowAcuityDropdown] = useState(false);

  // const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  const regionChoices = props.region_choices;
  // const allSiteNames = props.sites.map(x => x.name);
  const setLocationChoices = [... new Set(props.data.map(x => x.description.settingLocation))];
  const settingPopChoices = [... new Set(props.data.map(x => x.description.settingPopulation))];
  const populationChoices = [... new Set(props.data.map(x => x.description.population))];
  const patientAcuityChoices = [... new Set(props.data.map(x => x.description.patientAcuity))];
  const statusChoices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((x) => StatusParser('clinics', x))

  function searchClinicName(substr) {
    setFilteredClinicData(SearchString(props.data, substr))
  }

  function searchSiteData(substr) {
    let finalSearch = SearchString(props.data, substr)
    // If all the elements are "", means we're not filtering anything
    const allEqual = arr => arr.every(v => v === "")
    // Check region
    if (!allEqual(regionFilter)) {
      finalSearch = finalSearch.filter(d => {
        const regionName = (props.region_data == null ? '' : props.region_data.filter((r) => r.id == d.region_id)[0].name)
        console.log(regionName)
        return regionFilter.includes(regionName)
      })
    }
    // Check setting locatiom
    if (!allEqual(slFilter)) {
      finalSearch = finalSearch.filter(d => {
        return slFilter.includes(d.settingLocation)
      })
    }
    // Check setting population
    if (!allEqual(spFilter)) {
      finalSearch = finalSearch.filter(d => {
        return spFilter.includes(d.settingPopulation)
      })
    }
    // Check  population
    if (!allEqual(populationFilter)) {
      finalSearch = finalSearch.filter(d => {
        return populationFilter.includes(d.population)
      })
    }
    // Check patient acuity
    if (!allEqual(acuityFilter)) {
      finalSearch = finalSearch.filter(d => {
        return acuityFilter.includes(d.patientAcuity)
      })
    }
    setFilteredData(finalSearch)
  }

  function download_csv_file() {
    createDownloadLink(props.data, "clinic-overview");
  }

  return (
    <React.Fragment>
      <div className={styles.filterRow}>
        <div className={styles.searchBar}>
          <input className={styles.searchInput} placeholder="Enter Clinic Name ..." onChange={(x) => searchClinicName(x.target.value)} />
        </div>
        <div className={styles.regionForm}>
          <div className={styles.formTitle} onClick={() => setShowRegionDropdown(!showRegionDropdown)}>
            <p style={{ fontSize: '0.7rem' }}>Region</p>
            <IoIosArrowDown color='#079CDB' style={showRegionDropdown ? { transform: 'rotate(180deg)', transition: '0.3s linear' } : { transform: 'rotate(0deg)', transition: '0.3s linear' }} />
          </div>
          <Dropdown disableSearch displayOnly open={showRegionDropdown} setOpen={setShowRegionDropdown} choices={regionChoices} />
        </div>
        <div className={styles.sLocationForm}>
          <div className={styles.formTitle} onClick={() => setShowSetLocationDropdown(!showSetLocationDropdown)}>
            <p style={{ fontSize: '0.71rem', marginRight: 0 }}>Setting Location</p>
            <IoIosArrowDown color='#079CDB' style={showSetLocationDropdown ? { transform: 'rotate(180deg)', transition: '0.3s linear' } : { transform: 'rotate(0deg)', transition: '0.3s linear' }} />
          </div>
          <Dropdown displayOnly open={showSetLocationDropdown} setOpen={setShowSetLocationDropdown} choices={setLocationChoices} />
        </div>
        <div className={styles.sPopForm}>
          <div className={styles.formTitle} onClick={() => setShowSetPopDropdown(!showSetPopDropdown)}>
            <p style={{ fontSize: '0.7rem', marginRight: 0 }}>Setting Population</p>
            <IoIosArrowDown color='#079CDB' style={showSetPopDropdown ? { transform: 'rotate(180deg)', transition: '0.3s linear' } : { transform: 'rotate(0deg)', transition: '0.3s linear' }} />
          </div>
          <Dropdown displayOnly open={showSetPopDropdown} setOpen={setShowSetPopDropdown} choices={settingPopChoices} />
        </div>
        <div className={styles.popForm}>
          <div className={styles.formTitle} onClick={() => setShowPopDropdown(!showPopDropdown)}>
            <p style={{ fontSize: '0.71rem' }}>Population</p>
            <IoIosArrowDown color='#079CDB' style={showPopDropdown ? { transform: 'rotate(180deg)', transition: '0.3s linear' } : { transform: 'rotate(0deg)', transition: '0.3s linear' }} />
          </div>
          <Dropdown displayOnly open={showPopDropdown} setOpen={setShowPopDropdown} choices={populationChoices} />
        </div>
        <div className={styles.acuityForm}>
          <div className={styles.formTitle} onClick={() => setShowAcuityDropdown(!showAcuityDropdown)}>
            <p style={{ fontSize: '0.71rem' }}>Patient Acuity</p>
            <IoIosArrowDown color='#079CDB' style={showAcuityDropdown ? { transform: 'rotate(180deg)', transition: '0.3s linear' } : { transform: 'rotate(0deg)', transition: '0.3s linear' }} />
          </div>
          <Dropdown displayOnly open={showAcuityDropdown} setOpen={setShowAcuityDropdown} choices={patientAcuityChoices} />
        </div>
        {/* <div className={styles.statusForm}>
          <div className={styles.formTitle} onClick={() => setShowStatusDropdown(!showStatusDropdown)}>
            <p>Status</p>
            <IoIosArrowDown color='#079CDB' style={showStatusDropdown ? { transform: 'rotate(180deg)', transition: '0.3s linear' } : { transform: 'rotate(0deg)', transition: '0.3s linear' }} />
          </div>
          <Dropdown displayOnly open={showStatusDropdown} setOpen={setShowStatusDropdown} choices={statusChoices} />
        </div> */}
        <div className={styles.download} onClick={download_csv_file}>
          <AiOutlineDownload size={25} style={{ marginRight: '0.2rem' }} />
          <p>Download CSV</p>
        </div>
      </div>
      <div className={styles.row}>
        <p className={styles.titleCol1}>Clinic Name</p>
        <p className={styles.titleCol5}>Region</p>
        <p className={styles.titleCol2}>Setting Location</p>
        <p className={styles.titleCol3}>Setting Population</p>
        <p className={styles.titleCol4}>Population</p>
        <p className={styles.titleCol6}>Patient Acuity</p>
      </div>

      {
      filteredClinicData.map((x, ind) => {
      //const population = Parser("clinics", parseInt(x.population))
      const regionName = (props.region_data == null ? null : props.region_data.filter((r) => r.id == x.region_id))
      return (
        <Link href={`/sites/database/clinics/clinic?name=${x.id}`}>
          <div key={`clinics_${ind}`} className='displayRow'>
            <div className="rowContentClinics">
              <p className={styles.dataCol1} style={{ marginLeft: '2rem' }}>{x.name}</p>
              {/* <p className={styles.dataCol2}>{x.affiliation}</p> */}
              <p className={styles.dataCol2}>{x.region}</p>
              <p className={styles.dataCol3} >{x.description.settingLocation}</p>
              <p className={styles.dataCol4}>{x.description.settingPopulation}</p>
              <p className={styles.dataCol3}>{x.description.population}</p>
              <p className={styles.dataCol3}>{x.description.patientAcuity}</p>
              {/* <p className={styles.dataCol4} style={{ marginRight: '2rem' }}>{statusText}</p> */}
            </div>
            <div className={`clinicTag${x['status']}`}></div>
          </div>
        </Link>
      )
    })
  }
    </React.Fragment >
  )
}