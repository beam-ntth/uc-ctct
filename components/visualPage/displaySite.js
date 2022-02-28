import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { IoIosArrowDown } from 'react-icons/io';
import { AiOutlineDownload } from 'react-icons/ai'
import styles from '../../styles/DisplayClinic.module.css'
import SearchString from '../shared/search'
import StatusParser from '../shared/status';
import Dropdown from './dropDown/dropdown';
import { parse } from 'json2csv';

export default function DisplaySite(props) {
  /**
   * Global state of the current displayed data
   * - Initialized with all the site data
   */
  const [filteredData, setFilteredData] = useState(props.data)

  useEffect(() => setFilteredData(props.data), [props.data, props.region_data])

  /**
   * States of all the dropdown buttoons
   * true = display dropdown, false = hide dropdown
   */
  const [showRegionDropdown, setShowRegionDropdown] = useState(false)
  const [showSiteDropdown, setShowSiteDropdown] = useState(false)
  const [showStatusDropdown, setShowStatusDropdown] = useState(false)

  /**
   * List of all the choices for each dropdown
   */
  const regionChoices = props.region_choices;
  const affiChoices = props.affiliation_choices;
  const statusChoices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((x) => StatusParser('sites', x))

  /**
   * Status of all the dropdown filters
   * Ex: (Initially) = ["", "", ""] -> (clicked) = ["Northern", "", ""]
   */
  const [regionFilter, setRegionFilter] = useState(Array(regionChoices.length).fill(""))
  const [affiFilter, setAffiFilter] = useState(Array(affiChoices.length).fill(""))
  const [statusFilter, setStatusFilter] = useState(Array(statusChoices.length).fill(""))

  /**
   * Filter displayed data via name and all the dropdowns
   * @param {String} substr - search string inputted by the user 
   */
  function searchSiteData(substr) {
    let finalSearch = SearchString(props.data, substr)
    // If all the elements are "", means we're not filtering anything
    const allEqual = arr => arr.every( v => v === "" )
    // Check region
    if (!allEqual(regionFilter)) {
      finalSearch = finalSearch.filter(d => {
        const regionName = (props.region_data == null ? '' : props.region_data.filter((r) => r.id == d.region_id)[0].name)
        console.log(regionName)
        return regionFilter.includes(regionName)
      })
    }
    // Check affiliation
    if (!allEqual(affiFilter)) {
      finalSearch = finalSearch.filter(d => {
        return affiFilter.includes(d.affiliation)
      })
    }
    // Check status
    if (!allEqual(statusFilter)) {
      finalSearch = finalSearch.filter(d => {
        return statusFilter.includes(StatusParser("sites", parseInt(d.status)))
      })
    }
    setFilteredData(finalSearch)
  }

  /**
   * This function takes 'effect' by calling searchSiteData()
   * when there is any changes to our filter (if user select or unselect anything)
   * as specified in the second argument 
   */
  useEffect(() => {
    searchSiteData('')
  }, [regionFilter, affiFilter, statusFilter])

  /**
   * Converts JSON data to CSV data, then create a file for the user to download
   */
  function download_csv_file() {
    // Turn JSON to CSV
    const csv = parse(props.data)
    // Create mock element to download
    var hiddenElement = document.createElement('a');  
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);  
    hiddenElement.target = '_blank';  
    const currentdate = new Date();
    hiddenElement.download = `site-details-${currentdate.getFullYear()}.csv`;
    // Download the file
    hiddenElement.click();  
  }  

  return (
    <React.Fragment>
      <div className={styles.filterRow}>
        <div className={styles.searchBar}>
          <input className={styles.searchInput} placeholder="Enter Site Name ..." onChange={(x) => searchSiteData(x.target.value)} />
        </div>
        <div className={styles.regionForm}>
          <div className={styles.formTitle} onClick={() => setShowRegionDropdown(!showRegionDropdown)}>
            <p>Region</p>
            <IoIosArrowDown color='#079CDB' style={showRegionDropdown ? { transform: 'rotate(180deg)', transition: '0.3s linear' } : { transform: 'rotate(0deg)', transition: '0.3s linear' }} />
          </div>
          <Dropdown disableSearch open={showRegionDropdown} setOpen={setShowRegionDropdown} 
          choices={regionChoices} ddFilter={regionFilter} setddFilter={setRegionFilter} />
        </div>
        <div className={styles.siteForm}>
          <div className={styles.formTitle} onClick={() => setShowSiteDropdown(!showSiteDropdown)}>
            <p>Affiliation</p>
            <IoIosArrowDown color='#079CDB' style={showSiteDropdown ? { transform: 'rotate(180deg)', transition: '0.3s linear' } : { transform: 'rotate(0deg)', transition: '0.3s linear' }} />
          </div>
          <Dropdown disableSearch open={showSiteDropdown} setOpen={setShowSiteDropdown} 
          choices={affiChoices} ddFilter={affiFilter} setddFilter={setAffiFilter} />
        </div>
        <div className={styles.statusForm}>
          <div className={styles.formTitle} onClick={() => setShowStatusDropdown(!showStatusDropdown)}>
            <p>Status</p>
            <IoIosArrowDown color='#079CDB' style={showStatusDropdown ? { transform: 'rotate(180deg)', transition: '0.3s linear' } : { transform: 'rotate(0deg)', transition: '0.3s linear' }} />
          </div>
          <Dropdown open={showStatusDropdown} setOpen={setShowStatusDropdown} 
          choices={statusChoices} ddFilter={statusFilter} setddFilter={setStatusFilter} />
        </div>
        <div className={styles.download} onClick={download_csv_file}>
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
      {
        filteredData.map((x, ind) => {
          const statusText = StatusParser("sites", parseInt(x.status))
          const regionName = (props.region_data == null ? null : props.region_data.filter((r) => r.id == x.region_id))
          return (
            <Link href={`/sites/database/clinics?location=${x.id}`}>
              <div key={`clinics_${ind}`} className='displayRow'>
                <div className="rowContentClinics">
                  <p className={styles.dataCol1}>{x.name}</p>
                  <p className={styles.dataCol2}>{props.region_data == null ? 'Loading...' : regionName[0].name}</p>
                  <p className={styles.dataCol3}>{x.affiliation}</p>
                  <p className={styles.dataCol4}>{statusText}</p>
                </div>
                <div className={`siteTag${x['status']}`}></div>
              </div>
            </Link>
          )
        })
      }
    </React.Fragment>
  )
}