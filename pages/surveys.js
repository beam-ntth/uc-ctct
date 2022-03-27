import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import styles from '../styles/Surveys.module.css'

import Navbar from '../components/shared/navbar/navbar';
import Header from '../components/shared/header/header';

import { FaChartPie, FaDatabase } from 'react-icons/fa';

import { getAllStudents } from '../api-lib/azure/azureOps';
import { IoSend } from 'react-icons/io5';

export default function Surveys() {
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
                <Navbar icons={[false, false, false, true, false]} /> 
                <div className={styles.content}>
                    <Header header="Surveys Management" imgSrc="/asset/images/user-image.png" />
                    <div className={styles.content}>
                        <div className={styles.data}>
                            <div className={styles.row}>
                                <div style={{ display: 'flex', width: '80%' }}>
                                <p className={styles.titleCol1}>Name</p>
                                <p className={styles.titleCol2}>Email</p>
                                <p className={styles.titleCol3}>Survey Sent</p>
                                <p className={styles.titleCol4}>Last sent</p>
                                <p className={styles.titleCol5}>Responded</p>
                                </div>
                                <div className={styles.sendAllBtn} onMouseEnter={() => setHover(true)} 
                                    onMouseLeave={() => setHover(false)}>
                                    <p style={hover ? { fontSize: '0.9rem', transition: 'linear 0.2s' } : null}>Send All</p>
                                    <IoSend color={hover ? "#079CDB" : "#C4C4C4"} size={ hover ? 22 : 20 } style={{ transition: 'linear 0.2s' }} />
                                </div>
                            </div >
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
                                            <p style={{ fontSize: '0.8rem' }}>Send Survey</p>
                                            <IoSend color={ hover ? "#079CDB" : "#C4C4C4"} size={ hover ? 22 : 20 } style={{ marginLeft: '1rem', transition: 'linear 0.2s', cursor: 'pointer' }} />
                                        </div>
                                    </div >
                                )
                                })
                                :
                                <p>Loading... Please wait</p>
                            }
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}