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
    return { props: { clinics } }
}

export default function Matching({ clinics }) {
    const [hover, setHover] = useState(false)
    const [data, setData] = useState(null)

    /**
     * Load all student data lazily
     */
    async function initialLoadData() {
        const allData = await getAllStudents();
        setData(allData)
        return
    }
    useEffect(() => initialLoadData(), [])

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
                            <p style={{ marginRight: '2rem' }}>Clinic: Unselected</p>
                            <p style={{ marginRight: '1rem' }}>Please select your clinic: </p>
                            <select>
                                {
                                    clinics.map(x => <option>{x.name}</option>)
                                }
                            </select>
                        </div>
                        <div className={styles.row}>
                            <div style={{ display: 'flex', width: '80%' }}>
                                <p className={styles.titleCol1}>Assigned Students</p>
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div style={{ display: 'flex', width: '80%' }}>
                            <p className={styles.titleCol1}>Unassigned Students</p>
                            </div>
                        </div>
                        {
                            data ? data.map((x, ind) => {
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
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '2rem' }}>
                                        <p style={{ fontSize: '0.8rem' }}>Add to Clinic</p>
                                        <IoMdAdd color={ hover ? "#079CDB" : "#C4C4C4"} size={ hover ? 22 : 20 } style={{ marginLeft: '1rem', transition: 'linear 0.2s', cursor: 'pointer' }} />
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