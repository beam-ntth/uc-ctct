import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { IoIosArrowDown } from 'react-icons/io';
import { AiOutlineDownload } from 'react-icons/ai'
import styles from './DisplaySite.module.css'
import { searchString } from '../../shared/search'
import StatusParser from '../../shared/status';
import Dropdown from '../dropDown/dropdown';
import { createSiteCSV } from '../csvParser';

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
  // const [showSiteDropdown, setShowSiteDropdown] = useState(false)
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
    let finalSearch = searchString(props.data, substr)
    // If all the elements are "", means we're not filtering anything
    const allEqual = arr => arr.every(v => v === "")

    // Check region
    if (!allEqual(regionFilter)) {
      finalSearch = finalSearch.filter(d => {
        const regionName = (props.region_data == null ? '' : props.region_data.filter((r) => r.id == d.region_id)[0].name)
        return regionFilter.includes(regionName)
      })
    }

    // Check affiliation
    // if (!allEqual(affiFilter)) {
    //   finalSearch = finalSearch.filter(d => {
    //     return affiFilter.includes(d.affiliation)
    //   })
    // }

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
    console.log(props.data[1]);
  }, [])
  useEffect(() => {
    searchSiteData('')
  }, [regionFilter, affiFilter, statusFilter])

  /**
   * Converts JSON data to CSV data, then create a file for the user to download
   */
  function download_csv_file() {
    // createDownloadLink(props.data, "site-overview");
    createSiteCSV(props.data);
  }

  return (
    <React.Fragment>
      <div className={styles.filterRow}>
        <div className={styles.searchBar}>
          <input className={styles.searchInput} placeholder="Enter Site Name ..." onChange={(x) => searchSiteData(x.target.value)} />
        </div>
        <div className={styles.regionForm}>
          <div className={styles.formTitle} onClick={() => setShowRegionDropdown(!showRegionDropdown)}>
            <p>Affiliation</p>
            <IoIosArrowDown color='#079CDB' style={showRegionDropdown ? { transform: 'rotate(180deg)', transition: '0.3s linear' } : { transform: 'rotate(0deg)', transition: '0.3s linear' }} />
          </div>
          <Dropdown disableSearch open={showRegionDropdown} setOpen={setShowRegionDropdown}
            choices={regionChoices} ddFilter={regionFilter} setddFilter={setRegionFilter} />
        </div>
        {/* <div className={styles.siteForm}>
          <div className={styles.formTitle} onClick={() => setShowSiteDropdown(!showSiteDropdown)}>
            <p>Affiliation</p>
            <IoIosArrowDown color='#079CDB' style={showSiteDropdown ? { transform: 'rotate(180deg)', transition: '0.3s linear' } : { transform: 'rotate(0deg)', transition: '0.3s linear' }} />
          </div>
          <Dropdown disableSearch open={showSiteDropdown} setOpen={setShowSiteDropdown}
            choices={affiChoices} ddFilter={affiFilter} setddFilter={setAffiFilter} />
        </div> */}
        <div className={styles.statusForm}>
          <div className={styles.formTitle} onClick={() => setShowStatusDropdown(!showStatusDropdown)}>
            <p>Status</p>
            <IoIosArrowDown color='#079CDB' style={showStatusDropdown ? { transform: 'rotate(180deg)', transition: '0.3s linear' } : { transform: 'rotate(0deg)', transition: '0.3s linear' }} />
          </div>
          <Dropdown open={showStatusDropdown} setOpen={setShowStatusDropdown}
            choices={statusChoices} ddFilter={statusFilter} setddFilter={setStatusFilter} />
        </div>
        <div className={styles.download} onClick={download_csv_file}>
          <AiOutlineDownload size={25} style={{ marginRight: '0.2rem' }} />
          <p>Download CSV</p>
        </div>
      </div>
      <div className={styles.row}>
        <div style={{ display: 'flex', width: '97%' }}>
          <p className={styles.titleCol1}>Site Name</p>
          <p className={styles.titleCol2}>Affiliation</p>
          <p className={styles.titleCol3}>Status</p>
        </div>
        <p style={{ width: '3%' }}></p>
      </div>
      {
        filteredData.map((x, ind) => {
          const statusText = StatusParser("sites", parseInt(x.status))
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
            <Link href={`/sites/database/clinics?location=${x.id}`}>
              <div key={`clinics_${ind}`} className='displayVizRow'>
                <div className="rowContentClinics">
                  <p className={styles.dataCol1}>{x.name}</p>
                  <p className={styles.dataCol2}>{displayAffi}</p>
                  <p className={styles.dataCol3}>{statusText}</p>
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