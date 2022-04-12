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
    const [showPrimeSiteDropdown, setShowPrimeSiteDropdown] = useState(false);
    const [showPrimeStatusDropdown, setShowPrimeStatusDropdown] = useState(false);
    const [showSecSiteDropdown, setShowSecSiteDropdown] = useState(false);
    const [showSecStatusDropdown, setShowSecStatusDropdown] = useState(false);

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
                  <div className={styles.formTitle} onClick={() => setShowPrimeSiteDropdown(!showPrimeSiteDropdown)}>
                    <p style={{ fontSize: '0.7rem' }}>Primary Site</p>
                    <IoIosArrowDown color='#079CDB' style={showPrimeSiteDropdown ? { transform: 'rotate(180deg)', transition: '0.3s linear' } : { transform: 'rotate(0deg)', transition: '0.3s linear' }} />
                  </div>
                  <Dropdown disableSearch displayOnly open={showPrimeSiteDropdown} setOpen={setShowPrimeSiteDropdown} choices={["N/A"]} />
                </div>
                <div className={styles.regionForm}>
                  <div className={styles.formTitle} onClick={() => setShowPrimeStatusDropdown(!showPrimeStatusDropdown)}>
                    <p style={{ fontSize: '0.7rem' }}>Primary Status</p>
                    <IoIosArrowDown color='#079CDB' style={showPrimeStatusDropdown ? { transform: 'rotate(180deg)', transition: '0.3s linear' } : { transform: 'rotate(0deg)', transition: '0.3s linear' }} />
                  </div>
                  <Dropdown disableSearch displayOnly open={showPrimeStatusDropdown} setOpen={setShowPrimeStatusDropdown} choices={["N/A"]} />
                </div>
                <div className={styles.regionForm}>
                  <div className={styles.formTitle} onClick={() => setShowSecSiteDropdown(!showSecSiteDropdown)}>
                    <p style={{ fontSize: '0.7rem' }}>Secondary Site</p>
                    <IoIosArrowDown color='#079CDB' style={showSecSiteDropdown ? { transform: 'rotate(180deg)', transition: '0.3s linear' } : { transform: 'rotate(0deg)', transition: '0.3s linear' }} />
                  </div>
                  <Dropdown disableSearch displayOnly open={showSecSiteDropdown} setOpen={setShowSecSiteDropdown} choices={["N/A"]} />
                </div>
                <div className={styles.regionForm}>
                  <div className={styles.formTitle} onClick={() => setShowSecStatusDropdown(!showSecStatusDropdown)}>
                    <p style={{ fontSize: '0.7rem' }}>Secondary Status</p>
                    <IoIosArrowDown color='#079CDB' style={showSecStatusDropdown ? { transform: 'rotate(180deg)', transition: '0.3s linear' } : { transform: 'rotate(0deg)', transition: '0.3s linear' }} />
                  </div>
                  <Dropdown disableSearch displayOnly open={showSecStatusDropdown} setOpen={setShowSecStatusDropdown} choices={["N/A"]} />
                </div>
              </div>

              {/* Display title for all the columns */}
              <div className={styles.row}>
                <div style={{ display: 'flex', width: '90%' }}>
                  <p className={styles.titleCol1}>Name</p>
                  <p className={styles.titleCol2}>Primary Site</p>
                  <p className={styles.titleCol3}>Primary Status</p>
                  <p className={styles.titleCol4}>Secondary Site</p>
                  <p className={styles.titleCol5}>Secondary Status</p>
                </div>
              </div >
              {
                props.students.map((x, ind) => {
                  return (
                    <div style={{ width: '100%', height: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                      <Link href={`/students/profile?id=${x.id}`}>
                        <div className='displayStudentRow' key={`elem_${ind}`}>
                          <p style={{ marginLeft: '2rem', width: '20%' }}>{x.firstName} {x.middleName} {x.lastName}</p>
                          <p style={{ width: '15%' }}>{x.primaryClinic ? x.primaryClinic : "Unassigned"}</p>
                          <p style={{ width: '15%' }}>{x.status ? x.status : "Unassigned"}</p>
                          <p style={{ width: '18%' }}>{x.secondaryClinic ? x.secondaryClinic : "Unassigned"}</p>
                          <p style={{ width: '18%' }}>{x.status ? x.status : "Unassigned"}</p>
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