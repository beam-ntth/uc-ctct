import React, { useState, useEffect } from 'react'
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
  const [showSettingDropdown, setShowSettingDropdown] = useState(false);
  const [showPopulationDropdown, setShowPopulationDropdown] = useState(false);
  const [showAgeGroupDropdown, setAgeGroupDropdown] = useState(false);
  const [showAcuityDropdown, setShowAcuityDropdown] = useState(false);

  const regionChoices = props.region_choices;
  const settingChoices = ["In-patient acute care", "In-patient consult liaison", "In-patient long term care", "Partial hospital program", "Acute stabilization unit <23 hours", "Out-patient community mental health", "Out-patient integrated care setting (primary or specialty care with psychiatry)", "Out-patient private or for-profit practice", "Out-patient urgent care", "Intensive outpatient"]
  const populationChoices = ["Mild/ Moderate Mental Illness", "Severe and persistent mental ilness", "Substance Use / Addiction", "Homeless", "Adult jail/ prison", "Juvenile Justice", "HIV", "LGBTQIA", "Native American Health", "Private or for profit clinic", "Public Mental Health", "School Based K-12", "University Student Health", "Veterans Health Adminstration", "Women's Health", "Other"]
  const ageGroupChoices = ["Adult", "Transitional age youth", "Child / adolescent", "Older adult", "Across the lifespan"]
  const patientAcuityChoices = ["Low acuity (routine visits every 4-12 weeks)", "Moderate acuity (visits every 1-4 weeks)", "High acuity out-patient (visits are daily)", "High acuity in-patient", "Other"]
  const statusChoices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((x) => StatusParser('clinics', x))
  
  const [regionFilter, setRegionFilter] = useState(Array(regionChoices.length).fill(""))
  const [settingFilter, setSettingFilter] = useState(Array(settingChoices.length).fill(""))
  const [populationFilter, setPopulationFilter] = useState(Array(populationChoices.length).fill(""))
  const [ageGroupFilter, setAgeGroupFilter] = useState(Array(ageGroupChoices.length).fill(""))
  const [patientAcuityFilter, setPatientAcuityFilter] = useState(Array(patientAcuityChoices.length).fill(""))
  const [statusFilter, setStatusFilter] = useState(Array(statusChoices.length).fill(""))

  /**
   * Helper functions for all the filters
   */
  const getAllPreceptorsInClinic = (clinic) => {
    const preceptors = clinic.preceptorInfo
    if (props.preceptorData) {
      return props.preceptorData.filter(p => preceptors.includes(p.id))
    }
    return []
  }
  const getClinicSettings = (preceps) => {
    const settings = preceps.map(p => p.survey.data.practiceSetting).flat().filter(x => x != null)
    if (settings.length == 0) {
      return "Need Preceptor Response"
    }
    return settings[0]
  }
  
  // function searchClinicName(substr) {
  //   setFilteredClinicData(searchString(props.data, substr))
  // }

  function searchClinicData(substr) {
    let finalSearch = searchString(props.data, substr)
    // If all the elements are "", means we're not filtering anything
    const allEqual = arr => arr.every(v => v === "")

    // region filter
    if (!allEqual(regionFilter)) {
      finalSearch = finalSearch.filter(d => {
        const regionName = (props.region_data == null ? '' : props.region_data.filter((r) => r.id == d.region_id)[0].name)
        console.log(regionName)
        return regionFilter.includes(regionName)
      })
    }
    if (!allEqual(statusFilter)) {
      finalSearch = finalSearch.filter(d => {
        return statusFilter.includes(StatusParser("clinics", parseInt(d.status)))
      })
    }

    // new setting filter
    if (!allEqual(settingFilter)) {
      finalSearch = finalSearch.filter(preceptor => {
        if (preceptor.survey.data.patientPopulation) {
          return settingFilter.some(e => preceptor.survey.data.practiceSetting.includes(e))
        }
        return false;
      })
    }
 
     // Check patient population new
     if (!allEqual(populationFilter)) {
      finalSearch = finalSearch.filter( preceptor => {
        return populationFilter.some(e => preceptor.survey.data.patientPopulation.includes(e))
      })
    }
    // Check patient acuity new
    if (!allEqual(ageGroupFilter)) {
      finalSearch = finalSearch.filter( preceptor => {
        return ageGroupFilter.some(e => preceptor.survey.data.ageGroup.includes(e))
      })
    }

    // Check patient acuity new
    if (!allEqual(patientAcuityFilter)) {
      finalSearch = finalSearch.filter( preceptor => {
        return patientAcuityFilter.some(e => preceptor.survey.data.patientAcuity.includes(e))
      })
    }
    setFilteredClinicData(finalSearch)
  }

  /**
   * This function takes 'effect' by calling searchSiteData()
   * when there is any changes to our filter (if user select or unselect anything)
   * as specified in the second argument 
   */
  useEffect(() => {
    searchClinicData('')
  }, [regionFilter, settingFilter, populationFilter, ageGroupFilter, patientAcuityFilter, statusFilter])

  function download_csv_file() {
    // createDownloadLink(props.data, "clinic-overview");
    createClinicCSV(props.data)
  }

  return (
    <React.Fragment>
      <div className={styles.filterRow}>
        <div className={styles.searchBar}>
          <input className={styles.searchInput} placeholder="Enter Clinic Name ..." onChange={(x) => searchClinicData(x.target.value)} />
        </div>
        <div className={styles.regionForm}>
          <div className={styles.formTitle} onClick={() => setShowRegionDropdown(!showRegionDropdown)}>
            <p style={{ fontSize: '0.7rem' }}>Affiliation</p>
            <IoIosArrowDown color='#079CDB' style={showRegionDropdown ? { transform: 'rotate(180deg)', transition: '0.3s linear' } : { transform: 'rotate(0deg)', transition: '0.3s linear' }} />
          </div>
          <Dropdown disableSearch open={showRegionDropdown} setOpen={setShowRegionDropdown} choices={regionChoices}
          ddFilter={regionFilter} setddFilter={setRegionFilter} />
        </div>
        <div className={styles.statusForm}>
          <div className={styles.formTitle} onClick={() => setShowStatusDropdown(!showStatusDropdown)}>
            <p>Status</p>
            <IoIosArrowDown color='#079CDB' style={showStatusDropdown ? { transform: 'rotate(180deg)', transition: '0.3s linear' } : { transform: 'rotate(0deg)', transition: '0.3s linear' }} />
          </div>
          <Dropdown open={showStatusDropdown} setOpen={setShowStatusDropdown} choices={statusChoices} 
          ddFilter={statusFilter} setddFilter={setStatusFilter}/>
        </div>
        <div className={styles.sLocationForm}>
          <div className={styles.formTitle} onClick={() => setShowSettingDropdown(!showSettingDropdown)}>
            <p style={{ fontSize: '0.71rem', marginRight: 0 }}>Setting</p>
            <IoIosArrowDown color='#079CDB' style={showSettingDropdown ? { transform: 'rotate(180deg)', transition: '0.3s linear' } : { transform: 'rotate(0deg)', transition: '0.3s linear' }} />
          </div>
          <Dropdown open={showSettingDropdown} setOpen={setShowSettingDropdown} choices={settingChoices}
          ddFilter={settingFilter} setddFilter={setSettingFilter} />
        </div>
        <div className={styles.sPopForm}>
          <div className={styles.formTitle} onClick={() => setShowPopulationDropdown(!showPopulationDropdown)}>
            <p style={{ fontSize: '0.7rem', marginRight: 0 }}>Population</p>
            <IoIosArrowDown color='#079CDB' style={showPopulationDropdown ? { transform: 'rotate(180deg)', transition: '0.3s linear' } : { transform: 'rotate(0deg)', transition: '0.3s linear' }} />
          </div>
          <Dropdown open={showPopulationDropdown} setOpen={setShowPopulationDropdown} choices={populationChoices}
          ddFilter={populationFilter} setddFilter={setPopulationFilter} />
        </div>
        <div className={styles.popForm}>
          <div className={styles.formTitle} onClick={() => setAgeGroupDropdown(!showAgeGroupDropdown)}>
            <p style={{ fontSize: '0.71rem' }}>Age Group</p>
            <IoIosArrowDown color='#079CDB' style={showAgeGroupDropdown ? { transform: 'rotate(180deg)', transition: '0.3s linear' } : { transform: 'rotate(0deg)', transition: '0.3s linear' }} />
          </div>
          <Dropdown open={showAgeGroupDropdown} setOpen={setAgeGroupDropdown} choices={ageGroupChoices}
          ddFilter={ageGroupFilter} setddFilter={setAgeGroupFilter} />
        </div>
        <div className={styles.acuityForm}>
          <div className={styles.formTitle} onClick={() => setShowAcuityDropdown(!showAcuityDropdown)}>
            <p style={{ fontSize: '0.71rem' }}>Patient Acuity</p>
            <IoIosArrowDown color='#079CDB' style={showAcuityDropdown ? { transform: 'rotate(180deg)', transition: '0.3s linear' } : { transform: 'rotate(0deg)', transition: '0.3s linear' }} />
          </div>
          <Dropdown open={showAcuityDropdown} setOpen={setShowAcuityDropdown} choices={patientAcuityChoices}
          ddFilter={patientAcuityFilter} setddFilter={setPatientAcuityFilter} />
        </div>
        <div className={styles.download} onClick={download_csv_file}>
          <AiOutlineDownload size={25} style={{ marginRight: '0.2rem' }} />
          <p>Download CSV</p>
        </div>
      </div>
      <div className={styles.row}>
        <div style={{ display: 'flex', width: '97%' }}>
          <p className={styles.titleCol1}>Clinic Name</p>
          <p className={styles.titleCol2}>Affiliation</p>
          <p className={styles.titleCol3}>Status</p>
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
                  <p className={styles.dataCol2}>{displayAffi}</p>
                  <p className={styles.dataCol3}>{statusText}</p>
                  <p className={styles.dataCol4}>{getAllPreceptorsInClinic(x).length == 0 ? "No Preceptor" : getClinicSettings(getAllPreceptorsInClinic(x))}</p>
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