import React, { useState } from 'react'
import Link from 'next/link'
import { IoIosArrowDown } from 'react-icons/io';
import styles from './DisplayPreceptor.module.css'
import Dropdown from '../dropDown/dropdown';
import { searchPreceptorName } from '../../shared/search'
import StatusParser from '../../shared/status';
import { AiOutlineDownload } from 'react-icons/ai';
import { parse } from 'json2csv';
import { createDownloadLink } from '../csvParser';
import { useEffect } from 'react';

export default function DisplayPreceptor(props) {
  const [filteredPrecepData, setFilteredPrecepData] = useState(props.data);
  // const [showCredDropdown, setShowCredDropdown] = useState(false);
  const [showPositionDropdown, setShowPositionDropdown] = useState(false);
  const [showPopulationDropdown, setShowPopulationDropdown] = useState(false);
  const [showExperienceDropdown, setShowExperienceDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);


  //list of the choices for each dropdown
  //const positionChoices = [... new Set(props.data.map(x => x.position))];
  // const credentialChoices = props.data.map(x => x.credential);
  const positionChoices = [
      "Psychiatric Mental Health Nurse Practitioner (PMHNP)",
      "Psychiatric Mental Health Clinical Nurse Specialist",
      "Psychiatrist",
      "Licensed Clinical Social Worker",
      "Marriage and Family Therapist",
      "Pharmacist",
      "Psychologist"
    ]
  const populationChoices = ["Mild/ Moderate Mental Illness", "Severe and persistent mental ilness", "Substance Use / Addiction", "Homeless", "Adult jail/ prison", "Juvenile Justice", "HIV", "LGBTQIA", "Native American Health", "Private or for profit clinic", "Public Mental Health", "School Based K-12", "University Student Health", "Veterans Health Adminstration", "Women's Health", "Other"]
  const experienceChoices = ["Never precepted before", "1-4 years", "5-8 years", "9+ years of precepting"]
  const statusChoices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((x) => StatusParser('preceptors', x))


  const [positionFilter, setPositionFilter] = useState(Array(positionChoices.length).fill(""))
  const [settingFilter, setPopulationFlter] = useState(Array(populationChoices.length).fill(""))
  const [experienceFilter, setExperienceFilter] = useState(Array(experienceChoices.length).fill(""))
  const [statusFilter, setStatusFilter] = useState(Array(statusChoices.length).fill(""))

  const experienceMapper = {
    "I am a new PMHNP preceptor (never precepted before)" : "Never precepted before", 
    "I have some experience precepting PMHNPs (1-4 years)" : "1-4 years", 
    "I have a good bit of experience precepting (5-8 years)" : "5-8 years", 
    "I am an expert preceptor (9+ years of precepting)" : "9+ years of precepting"
  }

  // function searchPreceptorName(substr) {
  //   setFilteredPrecepData(searchString(props.data, substr))
  // }

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


  /**
   * Filter displayed data via name and all the dropdowns
   * @param {String} substr - search string inputted by the user 
   */
  function searchPreceptorData(substr) {
    let finalSearch = searchPreceptorName(props.data, substr)
    // let finalSearch = props.data
    // If all the elements are "", means we're not filtering anything
    const allEqual = arr => arr.every(v => v === "")

    // Check position
    if (!allEqual(positionFilter)) {
      finalSearch = finalSearch.filter(preceptor => {
        return positionFilter.includes(preceptor.survey.data.profession)
      })
    }
    
    if (!allEqual(settingFilter)) {
      finalSearch = finalSearch.filter(preceptor => {
        if (preceptor.survey.data.patientPopulation) {
          return settingFilter.some(e => preceptor.survey.data.patientPopulation.includes(e))
        }
        return false;
      })
    }
    
    if (!allEqual(experienceFilter)) {
      finalSearch = finalSearch.filter(preceptor => {
        if (preceptor.survey.data.experienceWithPmhnp) {
          const exp = experienceMapper[preceptor.survey.data.experienceWithPmhnp]
          return experienceFilter.includes(exp)
        }
        return false;
      })
    }

    // Check status
    if (!allEqual(statusFilter)) {
      finalSearch = finalSearch.filter(d => {
        return statusFilter.includes(StatusParser("preceptors", parseInt(d.status)))
      })
    }
    setFilteredPrecepData(finalSearch)
  }

  /**
   * This function takes 'effect' by calling searchSiteData()
   * when there is any changes to our filter (if user select or unselect anything)
   * as specified in the second argument 
   */
  useEffect(() => {
    searchPreceptorData('')
  }, [positionFilter, experienceFilter, settingFilter, statusFilter])

  return (
    <React.Fragment>
      <div className={styles.filterRow}>
        <div className={styles.searchBar}>
          <input className={styles.searchInput} placeholder="Enter Preceptor Name ..." onChange={(x) => searchPreceptorData(x.target.value)} />
        </div>
        <div className={styles.positionForm}>
          <div className={styles.formTitle} onClick={() => setShowPositionDropdown(!showPositionDropdown)}>
            <p>Position</p>
            <IoIosArrowDown color='#079CDB' style={showPositionDropdown ? { transform: 'rotate(180deg)', transition: '0.3s linear' } : { transform: 'rotate(0deg)', transition: '0.3s linear' }} />
          </div>
          <Dropdown disableSearch open={showPositionDropdown} setOpen={setShowPositionDropdown} choices={positionChoices}
          ddFilter={positionFilter} setddFilter={setPositionFilter} />
        </div>
        <div className={styles.popForm}>
          <div className={styles.formTitle} onClick={() => setShowPopulationDropdown(!showPopulationDropdown)}>
            <p>Population</p>
            <IoIosArrowDown color='#079CDB' style={showPopulationDropdown ? { transform: 'rotate(180deg)', transition: '0.3s linear' } : { transform: 'rotate(0deg)', transition: '0.3s linear' }} />
          </div>
          <Dropdown disableSearch open={showPopulationDropdown} setOpen={setShowPopulationDropdown} choices={populationChoices}
          ddFilter={settingFilter} setddFilter={setPopulationFlter} />
        </div>
        <div className={styles.expForm}>
          <div className={styles.formTitle} onClick={() => setShowExperienceDropdown(!showExperienceDropdown)}>
            <p>Experience</p>
            <IoIosArrowDown color='#079CDB' style={showExperienceDropdown ? { transform: 'rotate(180deg)', transition: '0.3s linear' } : { transform: 'rotate(0deg)', transition: '0.3s linear' }} />
          </div>
          <Dropdown disableSearch open={showExperienceDropdown} setOpen={setShowExperienceDropdown} choices={experienceChoices}
          ddFilter={experienceFilter} setddFilter={setExperienceFilter} />
        </div>
        <div className={styles.statusForm}>
          <div className={styles.formTitle} onClick={() => setShowStatusDropdown(!showStatusDropdown)}>
            <p>Status</p>
            <IoIosArrowDown color='#079CDB' style={showStatusDropdown ? { transform: 'rotate(180deg)', transition: '0.3s linear' } : { transform: 'rotate(0deg)', transition: '0.3s linear' }} />
          </div>
          <Dropdown disableSearch open={showStatusDropdown} setOpen={setShowStatusDropdown} choices={statusChoices}
          ddFilter={statusFilter} setddFilter={setStatusFilter} />
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
                <p className={styles.dataCol2}>{x.survey.data.profession ? x.survey.data.profession : "Waiting for response"}</p>
                <p className={styles.dataCol3}>{x.survey.data.patientPopulation ? x.survey.data.patientPopulation.join(", ") : "Waiting for response"}</p>
                <p className={styles.dataCol4}>{x.survey.data.experienceWithPmhnp ? x.survey.data.experienceWithPmhnp : "Waiting for response"}</p>
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
