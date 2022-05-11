import React, { useState } from 'react'
import Link from 'next/link'
import styles from './DisplayClinic.module.css'
import { IoIosArrowDown } from 'react-icons/io';
import Dropdown from '../dropDown/dropdown';
import { searchString } from '../../shared/search'
import StatusParser from '../../shared/status';
import { getAllSites } from '../../../api-lib/azure/azureOps';
import { AiOutlineDownload } from 'react-icons/ai';
import { createClinicCSV, createDownloadLink } from '../csvParser';


export default function DisplayClinic(props) {
  const [filteredClinicData, setFilteredClinicData] = useState(props.data);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showRegionDropdown, setShowRegionDropdown] = useState(false);
  // const [showSiteDropdown, setShowSiteDropdown] = useState(false);
  const [showSetLocationDropdown, setShowSetLocationDropdown] = useState(false);
  const [showSetPopDropdown, setShowSetPopDropdown] = useState(false);
  const [showPopDropdown, setShowPopDropdown] = useState(false);
  const [showAcuityDropdown, setShowAcuityDropdown] = useState(false);

  const regionChoices = props.region_choices;
  // const allSiteNames = props.sites.map(x => x.name);
  const setLocationChoices = [... new Set(props.data.map(x => x.description.settingLocation))];
  const settingPopChoices = [... new Set(props.data.map(x => x.description.settingPopulation))];
  const populationChoices = [... new Set(props.data.map(x => x.description.population))];
  const patientAcuityChoices = [... new Set(props.data.map(x => x.description.patientAcuity))];
  const statusChoices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((x) => StatusParser('clinics', x))

  function searchClinicName(substr) {
    setFilteredClinicData(searchString(props.data, substr))
  }

  function searchSiteData(substr) {
    let finalSearch = searchString(props.data, substr)
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
    if (!allEqual(settingFilter)) {
      finalSearch = finalSearch.filter(d => {
        return settingFilter.includes(d.population)
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
    // createDownloadLink(props.data, "clinic-overview");
    createClinicCSV(props.data)
  }

  return (
    <React.Fragment>
      <div className={styles.filterRow}>
        <div className={styles.searchBar}>
          <input className={styles.searchInput} placeholder="Enter Clinic Name ..." onChange={(x) => searchClinicName(x.target.value)} />
        </div>
        <div className={styles.regionForm}>
          <div className={styles.formTitle} onClick={() => setShowRegionDropdown(!showRegionDropdown)}>
            <p style={{ fontSize: '0.7rem' }}>Affiliation</p>
            <IoIosArrowDown color='#079CDB' style={showRegionDropdown ? { transform: 'rotate(180deg)', transition: '0.3s linear' } : { transform: 'rotate(0deg)', transition: '0.3s linear' }} />
          </div>
          <Dropdown disableSearch displayOnly open={showRegionDropdown} setOpen={setShowRegionDropdown} choices={regionChoices} />
        </div>
        <div className={styles.statusForm}>
          <div className={styles.formTitle} onClick={() => setShowStatusDropdown(!showStatusDropdown)}>
            <p>Status</p>
            <IoIosArrowDown color='#079CDB' style={showStatusDropdown ? { transform: 'rotate(180deg)', transition: '0.3s linear' } : { transform: 'rotate(0deg)', transition: '0.3s linear' }} />
          </div>
          <Dropdown displayOnly open={showStatusDropdown} setOpen={setShowStatusDropdown} choices={statusChoices} />
        </div>
        <div className={styles.sLocationForm}>
          <div className={styles.formTitle} onClick={() => setShowSetLocationDropdown(!showSetLocationDropdown)}>
            <p style={{ fontSize: '0.71rem', marginRight: 0 }}>Setting</p>
            <IoIosArrowDown color='#079CDB' style={showSetLocationDropdown ? { transform: 'rotate(180deg)', transition: '0.3s linear' } : { transform: 'rotate(0deg)', transition: '0.3s linear' }} />
          </div>
          <Dropdown displayOnly open={showSetLocationDropdown} setOpen={setShowSetLocationDropdown} choices={setLocationChoices} />
        </div>
        <div className={styles.sPopForm}>
          <div className={styles.formTitle} onClick={() => setShowSetPopDropdown(!showSetPopDropdown)}>
            <p style={{ fontSize: '0.7rem', marginRight: 0 }}>Population</p>
            <IoIosArrowDown color='#079CDB' style={showSetPopDropdown ? { transform: 'rotate(180deg)', transition: '0.3s linear' } : { transform: 'rotate(0deg)', transition: '0.3s linear' }} />
          </div>
          <Dropdown displayOnly open={showSetPopDropdown} setOpen={setShowSetPopDropdown} choices={settingPopChoices} />
        </div>
        <div className={styles.popForm}>
          <div className={styles.formTitle} onClick={() => setShowPopDropdown(!showPopDropdown)}>
            <p style={{ fontSize: '0.71rem' }}>Age Group</p>
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
        <div className={styles.download} onClick={download_csv_file}>
          <AiOutlineDownload size={25} style={{ marginRight: '0.2rem' }} />
          <p>Download CSV</p>
        </div>
      </div>
      <div className={styles.row}>
        <div style={{ display: 'flex', width: '97%' }}>
          <p className={styles.titleCol1}>Clinic Name</p>
          <p className={styles.titleCol2}>Status</p>
          <p className={styles.titleCol3}>Affiliation</p>
          <p className={styles.titleCol4}>Setting</p>
          <p className={styles.titleCol5}>Population</p>
          <p className={styles.titleCol6}>Age Group</p>
          <p className={styles.titleCol7}>Acuity</p>
        </div>
      </div>

      {
        filteredClinicData.map((x, ind) => {
          const statusText = StatusParser("sites", parseInt(x.status));
          const regionName = (props.region_data == null ? null : props.region_data.filter((r) => r.id == x.region_id))
          let displayAffi = "N/A"
          if (regionName != null) {
            switch (regionName[0].name) {
              case "UC Davis":
                displayAffi = "UCD";
                break;
              case "UC San Francisco":
                displayAffi = "UCSF";
                break;
              case "UC Los Angeles":
                displayAffi = "UCLA";
                break;
              case "UC Irvine":
                displayAffi = "UCI";
                break;
              default:
                displayAffi = "N/A";
                break;
            }
          }
          return (
            <Link href={`/sites/database/clinics/clinic?name=${x.id}`}>
              <div key={`clinics_${ind}`} className='displayVizRow'>
                <div className="rowContentClinics">
                  <p className={styles.dataCol1}>{x.name}</p>
                  <p className={styles.dataCol2}>{statusText}</p>
                  <p className={styles.dataCol3}>{displayAffi}</p>
                  <p className={styles.dataCol4}>{x.description.settingLocation}</p>
                  <p className={styles.dataCol5}>{x.description.settingPopulation}</p>
                  <p className={styles.dataCol6}>{x.description.population}</p>
                  <p className={styles.dataCol7}>{x.description.patientAcuity}</p>
                </div>
              </div>
            </Link>
          )
        })
      }
    </React.Fragment >
  )
}