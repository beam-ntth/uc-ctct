import React, { useState } from 'react'
import Link from 'next/link'
import { IoIosArrowDown } from 'react-icons/io';
import styles from './DisplayPreceptor.module.css'
import Dropdown from '../dropDown/dropdown';
import SearchString from '../../shared/search'
import StatusParser from '../../shared/status';
import { AiOutlineDownload } from 'react-icons/ai';
import { parse } from 'json2csv';
import { createDownloadLink } from '../csvParser';

/* TODO: preceptor no search in the dropdowns */

export default function DisplayPreceptor(props) {
  const [filteredPrecepData, setFilteredPrecepData] = useState(props.data);
  // const [showCredDropdown, setShowCredDropdown] = useState(false);
  const [showPositionDropdown, setShowPositionDropdown] = useState(false);
  const [showPopulationDropdown, setShowPopulationDropdown] = useState(false);
  const [showExperienceDropdown, setShowExperienceDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  const positionChoices = [... new Set(props.data.map(x => x.position))];
  // const credentialChoices = props.data.map(x => x.credential);
  const populationChoices = props.data[0].survey.data.population ? [... new Set(props.data.map(x => x.description.population))] : [];
  const experienceChoices = props.data[0].survey.data.experience ? [... new Set(props.data.map(x => x.description.experience))] : [];
  const statusChoices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((x) => StatusParser('preceptors', x))

  function searchPreceptorName(substr) {
    setFilteredPrecepData(SearchString(props.data, substr))
  }

  function download_csv_file() {
    const parsedPreceptorData = props.data.map(x => {
      return {
        firstname: x.firstname,
        lastname: x.lastname,
        position: x.position,
        credential: x.credential,
        email: x.email,
        npi: x.npi,
        phoneNumber: x.phoneNumber,
        status: StatusParser('preceptors', parseInt(x.status)),
        notes: x.notes,
        clinics: x.clinics
      }
    })

    createDownloadLink(parsedPreceptorData, "preceptors-overview");
  }

  return (
    <React.Fragment>
      <div className={styles.filterRow}>
        <div className={styles.searchBar}>
          <input className={styles.searchInput} placeholder="Enter Preceptor Name ..." onChange={(x) => searchPreceptorName(x.target.value)} />
        </div>
        <div className={styles.positionForm}>
          <div className={styles.formTitle} onClick={() => setShowPositionDropdown(!showPositionDropdown)}>
            <p>Position</p>
            <IoIosArrowDown color='#079CDB' style={showPositionDropdown ? { transform: 'rotate(180deg)', transition: '0.3s linear' } : { transform: 'rotate(0deg)', transition: '0.3s linear' }} />
          </div>
          <Dropdown disableSearch displayOnly open={showPositionDropdown} setOpen={setShowPositionDropdown} choices={positionChoices} />
        </div>
        {/* <div className={styles.credsForm}>
          <div className={styles.formTitle} onClick={() => setShowCredDropdown(!showCredDropdown)}>
            <p>Credential</p>
            <IoIosArrowDown color='#079CDB' style={showCredDropdown ? { transform: 'rotate(180deg)', transition: '0.3s linear' } : { transform: 'rotate(0deg)', transition: '0.3s linear' }} />
          </div>
          <Dropdown displayOnly open={showCredDropdown} setOpen={setShowCredDropdown} choices={credentialChoices} />
        </div> */}
        <div className={styles.popForm}>
          <div className={styles.formTitle} onClick={() => setShowPopulationDropdown(!showPopulationDropdown)}>
            <p>Population</p>
            <IoIosArrowDown color='#079CDB' style={showPopulationDropdown ? { transform: 'rotate(180deg)', transition: '0.3s linear' } : { transform: 'rotate(0deg)', transition: '0.3s linear' }} />
          </div>
          <Dropdown disableSearch displayOnly open={showPopulationDropdown} setOpen={setShowPopulationDropdown} choices={populationChoices} />
        </div>
        <div className={styles.expForm}>
          <div className={styles.formTitle} onClick={() => setShowExperienceDropdown(!showExperienceDropdown)}>
            <p>Experience</p>
            <IoIosArrowDown color='#079CDB' style={showExperienceDropdown ? { transform: 'rotate(180deg)', transition: '0.3s linear' } : { transform: 'rotate(0deg)', transition: '0.3s linear' }} />
          </div>
          <Dropdown disableSearch displayOnly open={showExperienceDropdown} setOpen={setShowExperienceDropdown} choices={experienceChoices} />
        </div>
        <div className={styles.statusForm}>
          <div className={styles.formTitle} onClick={() => setShowStatusDropdown(!showStatusDropdown)}>
            <p>Status</p>
            <IoIosArrowDown color='#079CDB' style={showStatusDropdown ? { transform: 'rotate(180deg)', transition: '0.3s linear' } : { transform: 'rotate(0deg)', transition: '0.3s linear' }} />
          </div>
          <Dropdown disableSearch displayOnly open={showStatusDropdown} setOpen={setShowStatusDropdown} choices={statusChoices} />
        </div>
        <div className={styles.download} onClick={download_csv_file}>
          <AiOutlineDownload size={25} style={{ marginRight: '0.2rem' }} />
          <p>Download CSV</p>
        </div>
      </div>
      <div className={styles.row}>
        <div style={{display: 'flex', width: '97%'}}>
          <p className={styles.titleCol1}>Preceptor Name</p>
          <p className={styles.titleCol2}>Position</p>
          <p className={styles.titleCol3}>Population</p>
          <p className={styles.titleCol4}>Experience</p>
          <p className={styles.titleCol5}>Status</p>
        </div>
        <p style={{width: '3%'}}></p>
      </div>
      {
        filteredPrecepData.map((x, ind) => {
        const statusText = StatusParser("preceptors", parseInt(x.status))
        return (
          <Link href={`/sites/database/clinics/preceptor?preceptor_id=${x.id}`}>
            <div key={`clinics_${ind}`} className='displayVizRow'>
              <div className="rowContentClinics">
                <p className={styles.dataCol1}>{x.firstname} {x.lastname}</p>
                <p className={styles.dataCol2}>{x.survey.data.position ? x.survey.data.position : "Waiting for response"}</p>
                <p className={styles.dataCol3}>{x.survey.data.population ? x.survey.data.population : "Waiting for response"}</p>
                <p className={styles.dataCol4}>{x.survey.data.experience ? x.survey.data.experience : "Waiting for response"}</p>
                <p className={styles.dataCol5}>{statusText}</p>
              </div>
              <div className={`preceptorTag${x['status']}`}></div>
            </div>
          </Link>
        )})
      }
    </React.Fragment>
  )
}