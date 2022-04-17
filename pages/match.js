import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect, useState } from 'react';
import styles from '../styles/Match.module.css'

import { IoIosArrowDown } from 'react-icons/io';
import Dropdown from '../components/visualPage/dropDown/dropdown';
import Navbar from '../components/shared/navbar/navbar';
import Header from '../components/shared/header/header';
import SearchString from '../components/shared/search'

import { FaChartPie, FaDatabase } from 'react-icons/fa';

import { getAllClinics, getAllStudents, getAllPreceptors, getDistinctRegions } from '../api-lib/azure/azureOps';
import { IoMdAdd } from 'react-icons/io';
import CountyList from '../components/shared/countyList';
import StudentPreview from '../components/matchingPage/displayProfile';

export async function getServerSideProps(context) {
  const clinics = await getAllClinics();
  const students = await getAllStudents();
  const preceptors = await getAllPreceptors();
  const region_choices = await getDistinctRegions();
  return { props: { clinics, students, preceptors, region_choices } }
}

export default function Matching({ clinics, students, preceptors, region_choices }) {
  const [hover, setHover] = useState(false)
  const [addHover, setAddHover] = useState(Array(students.length).fill(false))
  const [matching, setMatching] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)

  // const [selectedClinic, setSelectedClinic] = useState(clinics[0])
  const [showRegionDropdown, setShowRegionDropdown] = useState(false)
  const [showMeetingDropdown, setMeetingDropdown] = useState(false);
  const [showSetPopDropdown, setShowSetPopDropdown] = useState(false);

  const regionChoices = region_choices;
  const meetingChoices = ['Online', 'In Person', 'Hybrid'];
  const settingPopChoices = [... new Set(clinics.map(x => x.description.population))];

  const [regionFilter, setRegionFilter] = useState(Array(regionChoices.length).fill(""))

  return (
    <div className={styles.container}>
      <Head>
        <title>UC-CTCT: Site Management Systems</title>
        <meta name="description" content="University of California - Clinic Coordination Tools" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Navbar icons={[false, false, false, false, true]} />
        <div className={styles.content}>
          <Header header="Student - Clinic Matching Tool" imgSrc="/asset/images/user-image.png" />
          <div className={styles.data}>
            <div className={styles.studentSection} style={ matching ? { width: '47%', marginRight: '1rem', transition: 'linear 0.2s' } : { transition: 'linear 0.2s' } }>
              {
              matching 
              ? 
              (
                selectedStudent 
                ?
                <StudentPreview data={selectedStudent} setMatching={setMatching} />
                :
                <div>Loading...</div>
              ) 
              : 
              <React.Fragment>
                <div className={styles.row}>
                  <div style={{ display: 'flex', width: '80%' }}>
                    <p className={styles.headerCol}>Unassigned Students</p>
                  </div>
                </div>
                <div className={styles.row} style={ matching ? { fontSize: '1rem' } : null }>
                  <div style={{ display: 'flex', width: '85%' }}>
                    <p className={styles.titleCol1}>Name</p>
                    <p className={styles.titleCol2}>Primary Clinic</p>
                    <p className={styles.titleCol3}>Primary Status</p>
                    <p className={styles.titleCol4}>Secondary Clinic</p>
                    <p className={styles.titleCol5}>Secondary Status</p>
                  </div>
                </div >
                {
                  students ? students.map((x, ind) => {
                    return (
                      <div style={{ width: '100%', height: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <Link href={`/students/profile?id=${x.id}`}>
                          <div className='displaySurveyRow' key={`elem_${ind}`} style={ matching ? { fontSize: '0.8rem' } : null }>
                            <p style={{ marginLeft: '2rem', width: '20%' }}>{x.firstName} {x.middleName} {x.lastName}</p>
                            <p style={{ width: '15%' }}>{x.primaryClinic ? x.primaryClinic : "Unassigned"}</p>
                            <p style={{ width: '15%' }}>{x.status ? x.status : "Unassigned"}</p>
                            <p style={{ width: '18%' }}>{x.secondaryClinic ? x.secondaryClinic : "Unassigned"}</p>
                            <p style={{ width: '18%' }}>{x.status ? x.status : "Unassigned"}</p>
                          </div>
                        </Link>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '2rem', cursor: 'pointer' }}
                          onMouseEnter={() => { let newStatus = [...addHover]; newStatus[ind] = true; setAddHover(newStatus); return; }}
                          onMouseLeave={() => { let newStatus = [...addHover]; newStatus[ind] = false; setAddHover(newStatus); return; }} >
                          <p onClick={() => {
                            setSelectedStudent(x)
                            setMatching(true)
                          }} 
                            style={addHover[ind] ? { fontSize: '0.9rem', transition: 'linear 0.2s' } : 
                            { fontSize: '0.8rem', transition: 'linear 0.2s' }}>
                              Add to Clinic
                          </p>
                          <IoMdAdd color={addHover[ind] ? "#079CDB" : "#C4C4C4"} 
                            size={addHover[ind] ? 22 : 20} 
                            style={{ marginLeft: '1rem', transition: 'linear 0.2s' }} />
                        </div>
                      </div >
                    )
                  })
                    :
                    <p>Loading... Please wait</p>
                }
                <div className={styles.row}>
                  <div style={{ display: 'flex', width: '80%' }}>
                    <p className={styles.headerCol}>Assigned Students</p>
                  </div>
                </div>
              </React.Fragment>
              }
            </div>
            <div className={styles.clinicSection} style={ matching ? { width: '47%', transition: 'linear 0.2s' } : { transition: 'linear 0.2s' } }>
              <div className={ styles.matchContent } style={ matching ? null : { display: 'none' } }>
                <div className={styles.clinicSelect}>
                  <p style={{ marginLeft: '2rem', marginRight: '1rem' }}>County: </p>
                  <select>
                    {
                      CountyList().map(x => <option value={x}>{x}</option>)
                    }
                    
                  </select>
                </div>
                <div className={styles.row}>
                  <div style={{ display: 'flex', width: '80%' }}>
                    <p className={styles.headerCol}>Clinics Available</p>
                  </div>
                </div>
                <div className={ styles.availableClinicSection }>
                  {
                    clinics.map(x => <div className='displayRow'>

                    </div>)
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}