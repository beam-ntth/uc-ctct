import React, { useState } from "react";
import Link from 'next/link'
import styles from './Display.module.css'
import { IoArrowBack } from "react-icons/io5";
import { IoIosArrowDown } from 'react-icons/io';
import Dropdown from '../visualPage/dropDown/dropdown';

export default function DisplayUCD (props) {
    /**
     * Keep track of all the dropdown states
     */
    const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
    const [showCountyDropdown, setShowCountyDropdown] = useState(false);
    const [showPopDropdown, setShowPopDropdown] = useState(false);
    const [showPopPrefDropdown, setShowPopPrefDropdown] = useState(false);

    const setLanguageChoices = [... new Set(props.students.map(x => x.survey.data.otherLanguages).flat().filter(x => x != null))];
    const setCountyChoices = [... new Set(props.students.map(x => x.county).filter(x => x != null))];
    const setPopulationChoices = [... new Set(props.students.map(x => x.survey.data.practiceSetting).flat().filter(x => x != null))];
    const setPopulationPrefChoices = [... new Set(props.students.map(x => x.survey.data.patientPopulation).flat().filter(x => x != null))];

    return (
        <React.Fragment>
            <div className={styles.data}>
              <div className={ styles.topRow }>
                <div className={ styles.goBack } onClick={() => props.setPage('Default')} >
                  <IoArrowBack size={30} style={{ width: '10%', marginRight: '0.5rem' }} /> 
                  <p style={{ margin: 0 }}>Back to selection</p>
                </div>
                <p style={{ marginRight: '1rem' }}>Cohort: </p>
                <select style={{ borderRadius: '0.5rem', border: 'solid 1px #c4c4c4', padding: '0 0.5rem', height: '2rem' }}>
                  {
                    <option value={'2022'}>2022</option>
                  }
                </select>
              </div>

              {/* Filtering */}
              <div className={styles.filterRow}>
                <div className={styles.searchBar}>
                  <input className={styles.searchInput} placeholder="Enter Student Name ..." onChange={(x) => searchClinicName(x.target.value)} />
                </div>
                <div className={styles.regionForm}>
                  <div className={styles.formTitle} onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}>
                    <p style={{ fontSize: '0.7rem' }}>Language</p>
                    <IoIosArrowDown color='#079CDB' style={showLanguageDropdown ? { transform: 'rotate(180deg)', transition: '0.3s linear' } : { transform: 'rotate(0deg)', transition: '0.3s linear' }} />
                  </div>
                  <Dropdown disableSearch displayOnly open={showLanguageDropdown} setOpen={setShowLanguageDropdown} choices={setLanguageChoices} />
                </div>
                <div className={styles.regionForm}>
                  <div className={styles.formTitle} onClick={() => setShowCountyDropdown(!showCountyDropdown)}>
                    <p style={{ fontSize: '0.7rem' }}>County</p>
                    <IoIosArrowDown color='#079CDB' style={showCountyDropdown ? { transform: 'rotate(180deg)', transition: '0.3s linear' } : { transform: 'rotate(0deg)', transition: '0.3s linear' }} />
                  </div>
                  <Dropdown disableSearch displayOnly open={showCountyDropdown} setOpen={setShowCountyDropdown} choices={setCountyChoices} />
                </div>
                <div className={styles.regionForm}>
                  <div className={styles.formTitle} onClick={() => setShowPopDropdown(!showPopDropdown)}>
                    <p style={{ fontSize: '0.7rem' }}>Population</p>
                    <IoIosArrowDown color='#079CDB' style={showPopDropdown ? { transform: 'rotate(180deg)', transition: '0.3s linear' } : { transform: 'rotate(0deg)', transition: '0.3s linear' }} />
                  </div>
                  <Dropdown disableSearch displayOnly open={showPopDropdown} setOpen={setShowPopDropdown} choices={setPopulationChoices} />
                </div>
                <div className={styles.regionForm}>
                  <div className={styles.formTitle} onClick={() => setShowPopPrefDropdown(!showPopPrefDropdown)}>
                    <p style={{ fontSize: '0.7rem' }}>Population Pref</p>
                    <IoIosArrowDown color='#079CDB' style={showPopPrefDropdown ? { transform: 'rotate(180deg)', transition: '0.3s linear' } : { transform: 'rotate(0deg)', transition: '0.3s linear' }} />
                  </div>
                  <Dropdown disableSearch displayOnly open={showPopPrefDropdown} setOpen={setShowPopPrefDropdown} choices={setPopulationPrefChoices} />
                </div>
              </div>

              {/* Display title for all the columns */}
              <div className={styles.row}>
                <div style={{ display: 'flex', width: '90%' }}>
                  <p className={styles.titleCol1}>Name</p>
                  <p className={styles.titleCol2}>Language</p>
                  <p className={styles.titleCol3}>County</p>
                  <p className={styles.titleCol4}>Population</p>
                  <p className={styles.titleCol5}>Address</p>
                  <p className={styles.titleCol6}>Population Preference</p>
                  <p className={styles.titleCol7}>Last Accessed</p>
                </div>
              </div >
              {
                props.students.map((x, ind) => {
                  const surveyData = x.survey.data
                  return (
                    <div style={{ width: '100%', height: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                      <Link href={`/students/profile?id=${x.id}`}>
                        <div className='displayStudentRow' key={`elem_${ind}`}>
                          <p style={{ marginLeft: '2rem', width: '20%' }}>{x.firstName} {x.lastName}</p>
                          <p style={{ width: '10%' }}>{surveyData.otherLanguages ? surveyData.otherLanguages[0] : "N/A"}</p>
                          <p style={{ width: '10%' }}>{x.county}</p>
                          <p style={{ width: '10%', paddingRight: '1rem' }}>{surveyData.practiceSetting ? surveyData.practiceSetting[0]: "N/A"}</p>
                          <p style={{ width: '15%', paddingRight: '1rem' }}>{x.addressLine1 ? `${x.addressLine1}, ${x.addressLine2 ? x.addressLine2 + ', ' : ''}${x.city}, ${x.postal.substring(0, 5)}` : "TBD"}</p>
                          <p style={{ width: '18%' }}>{surveyData.patientPopulation ? surveyData.patientPopulation[0] : "N/A"}</p>
                          <p style={{ width: '15%' }}>{x.metadata ? x.metadata.date_last_updated : "TBD"}</p>
                        </div>
                      </Link>
                    </div >
                  )
                })
              }
            </div >
        </React.Fragment>
    )
}