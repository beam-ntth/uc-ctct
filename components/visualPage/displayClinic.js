import React, { useState } from 'react'
import Link from 'next/link'
import { IoIosArrowDown } from 'react-icons/io';
import styles from '../../styles/DisplayClinic.module.css'
import Dropdown from './dropDown/dropdown';
import SearchString from '../shared/search'
import StatusParser from '../shared/status';
import { getAllSites } from '../../api-lib/azure/azureOps';
import { AiOutlineDownload } from 'react-icons/ai';
import { parse } from 'json2csv';

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
  // const statusChoices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((x) => StatusParser('clinics', x))

  function searchClinicName(substr) {
    setFilteredClinicData(SearchString(props.data, substr))
  }

  function download_csv_file() {
    const csv = parse(props.data)
 
    var hiddenElement = document.createElement('a');  
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);  
    hiddenElement.target = '_blank';  
    const currentdate = new Date();
    hiddenElement.download = `clinic-details-${currentdate.getFullYear()}.csv`;  
    hiddenElement.click();  
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
          <Dropdown disableSearch displayOnly open={showRegionDropdown} setOpen={setShowRegionDropdown} choices={regionChoices} />
        </div>
        <div className={styles.sLocationForm}>
          <div className={styles.formTitle} onClick={() => setShowSetLocationDropdown(!showSetLocationDropdown)}>
            <p style={{fontSize: '0.8rem'}}>Setting Location</p>
            <IoIosArrowDown color='#079CDB' style={showSetLocationDropdown ? { transform: 'rotate(180deg)', transition: '0.3s linear' } : { transform: 'rotate(0deg)', transition: '0.3s linear' }} />
          </div>
          <Dropdown displayOnly open={showSetLocationDropdown} setOpen={setShowSetLocationDropdown} choices={setLocationChoices} />
        </div>
        <div className={styles.sPopForm}>
          <div className={styles.formTitle} onClick={() => setShowSetPopDropdown(!showSetPopDropdown)}>
            <p style={{fontSize: '0.8rem'}}>Setting Population</p>
            <IoIosArrowDown color='#079CDB' style={showSetPopDropdown ? { transform: 'rotate(180deg)', transition: '0.3s linear' } : { transform: 'rotate(0deg)', transition: '0.3s linear' }} />
          </div>
          <Dropdown displayOnly open={showSetPopDropdown} setOpen={setShowSetPopDropdown} choices={settingPopChoices} />
        </div>
        <div className={styles.popForm}>
          <div className={styles.formTitle} onClick={() => setShowPopDropdown(!showPopDropdown)}>
            <p>Population</p>
            <IoIosArrowDown color='#079CDB' style={showPopDropdown ? { transform: 'rotate(180deg)', transition: '0.3s linear' } : { transform: 'rotate(0deg)', transition: '0.3s linear' }} />
          </div>
          <Dropdown displayOnly open={showPopDropdown} setOpen={setShowPopDropdown} choices={populationChoices} />
        </div>
        <div className={styles.acuityForm}>
          <div className={styles.formTitle} onClick={() => setShowAcuityDropdown(!showAcuityDropdown)}>
            <p>Patient Acuity</p>
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
        // const statusText = StatusParser("clinics", parseInt(x.status))
        
        return (
          <Link href={`/sites/database/clinics/clinic?name=${x.id}`}>
            <div key={`clinics_${ind}`} className='displayRow'>
              <div className="rowContentClinics">
                <p className={styles.dataCol1} style={{ marginLeft: '2rem' }}>{x.name}</p>
                <p className={styles.dataCol2}>{x.affiliation}</p>
                <p className={styles.dataCol3}>{x.region}</p>
                {/* <p className={styles.dataCol4} style={{ marginRight: '2rem' }}>{statusText}</p> */}
              </div>
              <div className={`clinicTag${x['status']}`}></div> 
            </div>
          </Link>
        )
      })
      }
    </React.Fragment>
  )
}