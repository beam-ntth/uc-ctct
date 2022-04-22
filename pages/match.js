import Head from 'next/head'
import React, { useEffect, useState } from 'react';
import styles from '../styles/Match.module.css'

import Navbar from '../components/shared/navbar/navbar';
import Header from '../components/shared/header/header';
import SearchString from '../components/shared/search'
import CircularProgress from '@mui/material/CircularProgress'

import { getAllClinics, getAllStudents, getAllPreceptors, getDistinctRegions, addStudentToPreceptor } from '../api-lib/azure/azureOps';
import { IoMdAdd } from 'react-icons/io';
import CountyList from '../components/shared/countyList';
import StudentPreview from '../components/matchingPage/displayProfile';
import { useRouter } from 'next/router';

export async function getServerSideProps(context) {
  const clinics = await getAllClinics();
  const students = await getAllStudents();
  const preceptors = await getAllPreceptors();
  const region_choices = await getDistinctRegions();
  return { props: { clinics, students, preceptors, region_choices } }
}

export default function Matching({ clinics, students, preceptors, region_choices }) {
  const router = useRouter()

  /**
   * All the states for the main page filters
   * @var cohortFilter : Cohort year is defaulted as the current year
   * @var campusFilter : Campus value is defaulted to UC Davis
   */
  const [cohortFilter, setCohortFilter] = useState((new Date()).getFullYear())
  const [campusFilter, setCampusFilter] = useState('UC Davis')

  /**
   * All the states for manage buttons
   */
  const [manageUnassignedHover, setManageUnassignedHover] = useState(Array(students.filter(x => !x.assignment.isAssigned).length).fill(false))
  const [manageAssignedHover, setManageAssignedHover] = useState(Array(students.filter(x => x.assignment.isAssigned).length).fill(false))
  
  /**
   * All the states for when the page is loading, loaded, or in the dual-monitor mode
   */
  const [matching, setMatching] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)

  /**
   * All the states when assigning a student to a preceptor and clinic
   * @param clinic_id : Takes in a clinic ID
   * @param preceptor_id : Takes in a preceptor ID
   */
  const [isUpdating, setIsUpdating] = useState(false)
  const [choiceRank, setChoiceRank] = useState('Primary')
  const assignStudent = async (clinic_id, preceptor_id) => {
    setIsUpdating(true)
    await addStudentToPreceptor(selectedStudent.id, clinic_id, preceptor_id, choiceRank)
    router.reload()
    setIsUpdating(false)
    return
  }

  /**
   * @function getAvailablePreceptorPerClinic : Helper function to display preceptors
   * @param clinic : Accepts a clinic object
   */
  const getAvailablePreceptorPerClinic = (clinic) => {
    return preceptors.filter(p => {
      // Filter the preceptor based on their ID and availability (from <= current_year <= to)
      const fromYear = p.availability.from.substring(p.availability.from.length-4, p.availability.from.length)
      const toYear = p.availability.from.substring(p.availability.to.length-4, p.availability.to.length)
      return clinic.preceptorInfo.includes(p.id) && fromYear >= cohortFilter && toYear <= cohortFilter
    })
  }

  /**
   * Activate loading on the client-side, [] means only load once
   */
  useEffect(() => {
    const stickyValue = window.localStorage.getItem('matchingPageSetting');
    if (stickyValue !== 'null') {
      setMatching(true)
      setSelectedStudent(students.filter(x => x.id == JSON.parse(stickyValue))[0])
    } else {
      setMatching(false)
    }
  }, [])
  
  /**
   * Save user's last state in local storage, so when they click 'go back' button
   * in the browser, they don't have tp re-choose the page again
   */
  useEffect(() => {
    window.localStorage.setItem('matchingPageSetting', selectedStudent ? JSON.stringify(selectedStudent.id) : JSON.stringify(null))
  }, [selectedStudent])

  return (
    <React.Fragment>
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
                  isUpdating ? 
                    <div style={{height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignContent: 'center', justifyContent: "center"}}>
                      <div style={{textAlign: 'center', marginBottom: '1rem'}}>
                        <CircularProgress color="primary" size={120} />
                      </div>
                      <p style={{textAlign: 'center'}}>Updating Student Data. Please wait.</p>
                    </div> 
                    : 
                    <StudentPreview data={selectedStudent} setMatching={setMatching} setStudent={setSelectedStudent} clinic_data={clinics} preceptor_data={preceptors} setUpdating={setIsUpdating} reload={router.reload} />
                  :
                  <div>Loading...</div>
                ) 
                : 
                <React.Fragment>
                  <div className={styles.titleRow}>
                    <div className={ styles.filterOptions }>
                      <p>Cohort: </p>
                      <select onChange={ x => setCohortFilter(x.target.value) }>
                        {['2022', '2021'].map(x => <option key={x}>{x}</option>)}
                      </select>
                      <p>Campus: </p>
                      <select onChange={ x => setCampusFilter(x.target.value) }>
                        {['UC Davis', 'UC San Francisco', 'UC Irvine', 'UC Los Angeles'].map(x => <option key={x}>{x}</option>)}
                      </select>
                    </div>
                    <div style={{ display: 'flex', width: '100%' }}>
                      <p className={styles.headerCol}>Unassigned Students</p>
                    </div>
                  </div>
                  <div className={ styles.titleAndRow }>
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
                      students ? students.filter(x => !x.assignment.isAssigned && x.year == cohortFilter && x.location_affiliation == campusFilter).map((x, ind) => {
                        return (
                          <div style={{ width: '100%', height: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }} key={x.id}>
                            <div className='displayMatchRow' key={`elem_${ind}`} style={ matching ? { fontSize: '0.8rem' } : null }>
                              <p style={{ marginLeft: '2rem', width: '20%' }}>{x.firstName} {x.middleName} {x.lastName}</p>
                              <p style={{ width: '15%' }}>{x.primaryClinic ? x.primaryClinic : "Unassigned"}</p>
                              <p style={{ width: '15%' }}>{x.status ? x.status : "Unassigned"}</p>
                              <p style={{ width: '18%' }}>{x.secondaryClinic ? x.secondaryClinic : "Unassigned"}</p>
                              <p style={{ width: '18%' }}>{x.status ? x.status : "Unassigned"}</p>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '2rem', cursor: 'pointer' }}
                              onMouseEnter={() => { let newStatus = [...manageUnassignedHover]; newStatus[ind] = true; setManageUnassignedHover(newStatus); return; }}
                              onMouseLeave={() => { let newStatus = [...manageUnassignedHover]; newStatus[ind] = false; setManageUnassignedHover(newStatus); return; }} >
                              <p onClick={() => {
                                setSelectedStudent(x)
                                setMatching(true)
                              }} 
                                style={manageUnassignedHover[ind] ? { fontSize: '0.9rem', transition: 'linear 0.2s' } : 
                                { fontSize: '0.8rem', transition: 'linear 0.2s' }}>
                                  Manage
                              </p>
                              <IoMdAdd color={manageUnassignedHover[ind] ? "#079CDB" : "#C4C4C4"} 
                                size={manageUnassignedHover[ind] ? 22 : 20} 
                                style={{ marginLeft: '1rem', transition: 'linear 0.2s' }} />
                            </div>
                          </div >
                        )
                      })
                        :
                        <p>Loading... Please wait</p>
                    }
                  </div>
                  <div className={styles.row}>
                    <div style={{ display: 'flex', width: '80%' }}>
                      <p className={styles.headerCol}>Assigned Students</p>
                    </div>
                  </div>
                  <div className={ styles.titleAndRow }>
                    {
                      students ? students.filter(x => x.assignment.isAssigned && x.year == cohortFilter && x.location_affiliation == campusFilter).map((x, ind) => {
                        return (
                          <div style={{ width: '100%', height: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }} key={x.id}>
                            <div className='displayMatchRow' key={`elem_${ind}`} style={ matching ? { fontSize: '0.8rem' } : null }>
                              <p style={{ marginLeft: '2rem', width: '20%' }}>{x.firstName} {x.middleName} {x.lastName}</p>
                              <p style={{ width: '15%' }}>{x.primaryClinic ? x.primaryClinic : "Unassigned"}</p>
                              <p style={{ width: '15%' }}>{x.status ? x.status : "Unassigned"}</p>
                              <p style={{ width: '18%' }}>{x.secondaryClinic ? x.secondaryClinic : "Unassigned"}</p>
                              <p style={{ width: '18%' }}>{x.status ? x.status : "Unassigned"}</p>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '2rem', cursor: 'pointer' }}
                              onMouseEnter={() => { let newStatus = [...manageAssignedHover]; newStatus[ind] = true; setManageAssignedHover(newStatus); return; }}
                              onMouseLeave={() => { let newStatus = [...manageAssignedHover]; newStatus[ind] = false; setManageAssignedHover(newStatus); return; }} >
                              <p onClick={() => {
                                setSelectedStudent(x)
                                setMatching(true)
                              }} 
                                style={manageAssignedHover[ind] ? { fontSize: '0.9rem', transition: 'linear 0.2s' } : 
                                { fontSize: '0.8rem', transition: 'linear 0.2s' }}>
                                  Manage
                              </p>
                              <IoMdAdd color={manageAssignedHover[ind] ? "#079CDB" : "#C4C4C4"} 
                                size={manageAssignedHover[ind] ? 22 : 20} 
                                style={{ marginLeft: '1rem', transition: 'linear 0.2s' }} />
                            </div>
                          </div >
                        )
                      })
                      :
                      <p>Loading... Please wait</p>
                    }
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
                        CountyList().map(x => <option value={x} key={x} >{x}</option>)
                      }
                    </select>
                    <p style={{ marginLeft: '1rem', marginRight: '1rem' }}>Age: </p>
                    <select>
                      {
                        ['Child/Adolescent'].map(x => <option value={x} key={x} >{x}</option>)
                      }
                    </select>
                    <p style={{ marginLeft: '1rem', marginRight: '1rem' }}>Choice: </p>
                    <select onChange={x => setChoiceRank(x.target.value)}>
                      {
                        ['Primary', 'Secondary', 'Tertiary'].map(x => <option value={x} key={x} >{x}</option>)
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
                      clinics.map(clinic => 
                      <div className='clinicBar' key={ clinic.id }>
                        <div className='clinicTitle'>
                          <p>{ clinic.name }</p>
                        </div>
                        <div className='line'></div>
                        <div className='clinicDetails'>
                          <p><strong>Setting: </strong>{ clinic.description.settingLocation }</p>
                          <p><strong>Population: </strong>{ clinic.description.settingPopulation }</p>
                          <p><strong>Age Group: </strong>{ clinic.description.population }</p>
                          <p><strong>Acuity: </strong>{ clinic.description.patientAcuity }</p>
                        </div>
                        <div className='line'></div>
                        <div className='clinicDetails' style={{ marginBottom: '1rem' }}>
                          <p><strong>Preceptor(s) Available </strong></p>
                          {
                            clinic.preceptorInfo.length == 0 ?
                            <div>
                              <p>No preceptor at this clinic</p>
                            </div>
                            : 
                            getAvailablePreceptorPerClinic(clinic).length == 0 ?
                            <div>
                              <p>No preceptor available for this cohort</p>
                            </div>
                            :
                            getAvailablePreceptorPerClinic(clinic).map(precep => 
                              <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1.6rem', marginTop: '0.5rem' }} key={ precep.id }>
                                  <p>{ precep.firstname } { precep.lastname } | <strong>Availability:</strong> {precep.availability.from} - {precep.availability.to} | <strong>Students Assigned: </strong> {precep.students.length}</p>
                                  <div className='assignBtn' onClick={() => assignStudent(clinic.id, precep.id)}>
                                    Assign!
                                  </div>
                              </div>
                            )
                          }
                        </div>
                      </div>)
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <style jsx>
        {
          `
            .clinicBar {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: flex-start;
              background-color: #fff;
              height: auto;
              width: 85%;
              margin: 0.4rem 0;
              border-radius: 1rem;
              box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
              font-family: 'Lato', sans-serif;
              font-weight: 600;
              font-size: 1rem;
              cursor: pointer;
              z-index: 99;
            }

            .clinicTitle p {
              margin: 1rem 0 0.5rem 1rem;
            }

            .line {
              height: 2px;
              width: 80%;
              background-color: #C4C4C4;
              margin: 0.3rem 0 0.3rem 1rem;
              border-radius: 1rem;
              opacity: 50%;
            }

            .clinicDetails {
              margin-left: 1rem;
            }

            .clinicDetails p {
              margin: 0.3rem 0;
              font-size: 0.8rem;
              font-weight: normal;
            }

            .assignBar {
              height: 2rem;
              width: 100%;
              display: flex;
              justify-content: flex-end;
              align-items: center;
            }

            .assignBtn {
              height: 1.5rem;
              width: 5rem;
              background-color: #079CDB;
              display: flex;
              justify-content: center;
              align-items: center;
              color: #fff;
              font-size: 0.8rem;
              font-weight: normal;
              border-radius: 1rem;
              transition: linear 0.2s;
              margin-left: 1rem;
            }

            .assignBtn:hover {
              height: 1.6rem;
              width: 5.1rem;
            }
          `
        }
      </style>
    </React.Fragment>
  )
}