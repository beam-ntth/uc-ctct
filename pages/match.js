import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import styles from '../styles/Match.module.css'

import Navbar from '../components/shared/navbar/navbar';
import Header from '../components/shared/header/header';

import { FaChartPie, FaDatabase } from 'react-icons/fa';

import { getAllClinics, getAllStudents } from '../api-lib/azure/azureOps';
import { IoMdAdd } from 'react-icons/io';

export async function getServerSideProps(context) {
    const clinics = await getAllClinics();
    const students = await getAllStudents();
    return { props: { clinics, students } }
}

export default function Matching({ clinics, students }) {
    const [hover, setHover] = useState(false)
    const [addHover, setAddHover] = useState(Array(students.length).fill(false))

    const [selectedClinic, setSelectedClinic] = useState(clinics[0].name)

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
                        <div className={styles.clinicSelect}>
                            <p style={{ marginRight: '2rem', fontSize: '1.2rem' }}>
                                <strong style={{ marginRight: '1rem' }}>Currently Assigning Clinic:</strong>
                                { selectedClinic ? selectedClinic : 'Unselected' }
                            </p>
                        </div>
                        <div className={styles.clinicSelect}>
                            <p style={{ marginRight: '1rem' }}>Please select your clinic: </p>
                            <select onChange={x => setSelectedClinic(x.target.value)}>
                                {
                                    clinics.map(x => <option value={x.name}>{ x.name }</option>)
                                }
                            </select>
                        </div>
                        <div className={styles.row}>
                            <div style={{ display: 'flex', width: '80%' }}>
                                <p className={styles.titleCol1}>Assigned Students</p>
                            </div>
                        </div>
                        {
                            clinics.filter(x => x.name == selectedClinic)[0].student ? 
                            clinics.filter(x => x.name == selectedClinic)[0].student :
                            <p>No Students Assigned To This Clinic</p>
                        }
                        <div className={styles.row}>
                            <div style={{ display: 'flex', width: '80%' }}>
                            <p className={styles.titleCol1}>Unassigned Students</p>
                            </div>
                        </div>
                        {
                            students ? students.map((x, ind) => {
                            return (
                                <div style={{ width: '100%', height: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                                    <Link href={`/students/profile?id=${x.id}`}>
                                        <div className='displaySurveyRow' key={`elem_${ind}`}>
                                            <p style={{ marginLeft: '2rem', width: '25%' }}>{x.firstName} {x.lastName}</p>
                                            <p style={{ width: '30%' }}>{x.email ? x.email : "Unknown"}</p>
                                            <p style={{ width: '15%' }}>{x.surveyCount ? x.surveyCount : "Not sent"}</p>
                                            <p style={{ width: '15%' }}>{x.surveyLastSent ? x.surveyLastSent : "N/A"}</p>
                                            <p style={{ width: '15%' }}>{x.surveyResponse ? x.surveyResponse : "No Response"}</p>
                                        </div>
                                    </Link>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '2rem', cursor: 'pointer' }}
                                    onMouseEnter={() => { let newStatus = [...addHover]; newStatus[ind] = true; setAddHover(newStatus); return; }} 
                                    onMouseLeave={() => { let newStatus = [...addHover]; newStatus[ind] = false; setAddHover(newStatus); return; }} >
                                        <p style={addHover[ind] ? { fontSize: '0.9rem', transition: 'linear 0.2s' } : { fontSize: '0.8rem', transition: 'linear 0.2s' }}>Add to Clinic</p>
                                        <IoMdAdd color={ addHover[ind] ? "#079CDB" : "#C4C4C4"} size={ addHover[ind] ? 22 : 20 } style={{ marginLeft: '1rem', transition: 'linear 0.2s' }} />
                                    </div>
                                </div >
                            )
                            })
                            :
                            <p>Loading... Please wait</p>
                        }
                    </div>
                </div>
            </main>
        </div>
    )
}