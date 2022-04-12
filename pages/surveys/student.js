import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import styles from '../../styles/Surveys.module.css'

import Navbar from '../../components/shared/navbar/navbar';
import Header from '../../components/shared/header/header';

import { getAllStudents } from '../../api-lib/azure/azureOps';
import { IoSend } from 'react-icons/io5';
import { useRouter } from 'next/router';

export async function getServerSideProps( context ) {
    const students = await getAllStudents();
    return { props: { students } }
}

export default function StudentSurveys({ students }) {
    const [hover, setHover] = useState(false)
    const [sendHover, setSendHover] = useState(Array(students.length).fill(false))

    const router = useRouter()

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
                    <Header header="Surveys Management" imgSrc="/asset/images/user-image.png" back={router.back}/>
                    <div className={styles.content}>
                        <div className={styles.data}>
                            <div style={{ width: '100%', marginTop: '1rem', paddingLeft: '2rem', display: 'flex', alignItems: 'center' }}>
                                <p style={{ marginRight: '1rem' }}>Please select student's year: </p>
                                <select style={{ marginRight: '2rem', borderRadius: '0.5rem', border: 'solid 1px #c4c4c4', padding: '0 0.5rem', height: '2rem' }}>
                                    <option value={'2022'}>2022</option>
                                    <option value={'2021'}>2021</option>
                                </select>
                                <p style={{ marginRight: '1rem' }}>Please select student's campus: </p>
                                <select style={{ borderRadius: '0.5rem', border: 'solid 1px #c4c4c4', padding: '0 0.5rem', height: '2rem' }}>
                                    <option value={'ALL'}>All</option>
                                    <option value={'UCD'}>UCD</option>
                                    <option value={'UCSF'}>UCSF</option>
                                    <option value={'UCLA'}>UCLA</option>
                                    <option value={'UCI'}>UCI</option>
                                </select>
                            </div>
                            <div className={styles.row}>
                                <div style={{ display: 'flex', width: '80%' }}>
                                <p className={styles.titleCol1}>Name</p>
                                <p className={styles.titleCol2}>Email</p>
                                <p className={styles.titleCol3}>Survey Sent</p>
                                <p className={styles.titleCol4}>Last sent</p>
                                <p className={styles.titleCol5}>Responded</p>
                                </div>
                                <div className={styles.sendAllBtn} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
                                style={ hover ? { height: '3.1rem', width: '7.4rem', transition: 'linear 0.2s' } : null }>
                                    <p style={hover ? { fontSize: '0.9rem', transition: 'linear 0.2s' } : null}>Send All</p>
                                    <IoSend color={hover ? "#079CDB" : "#C4C4C4"} size={ hover ? 22 : 20 } style={{ transition: 'linear 0.2s' }} />
                                </div>
                            </div >
                            {
                                students ? students.map((x, ind) => {
                                return (
                                    <div style={{ width: '100%', height: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                                        <Link href={`/students/profile?id=${x.id}`}>
                                            <div className='displaySurveyRow' key={`elem_${ind}`}>
                                                <p style={{ marginLeft: '2rem', width: '25%' }}>{x.firstName} {x.lastName}</p>
                                                <p style={{ width: '30%' }}>{x.email ? x.email : "Unknown"}</p>
                                                <p style={{ width: '15%' }}>{(x.survey != null && parseInt(x.survey.sentCount) > 0) ? `Sent ${x.survey.sentCount} time${x.survey.sentCount > 1 ? 's' : ''}` : "Not sent"}</p>
                                                <p style={{ width: '15%' }}>{(x.survey != null && x.survey.lastSent) != "" ? x.survey.lastSent : "N/A"}</p>
                                                <p style={{ width: '15%' }}>{(x.survey != null && x.survey.responseDate) != "" ? x.survey.responseDate : "No Response"}</p>
                                            </div>
                                        </Link>
                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '2rem', cursor: 'pointer' }}
                                        onMouseEnter={() => { let newStatus = [...sendHover]; newStatus[ind] = true; setSendHover(newStatus); return; }} 
                                        onMouseLeave={() => { let newStatus = [...sendHover]; newStatus[ind] = false; setSendHover(newStatus); return; }} >
                                            <p style={ sendHover[ind] ? { fontSize: '0.9rem', transition: 'linear 0.2s' } 
                                            : { fontSize: '0.8rem', transition: 'linear 0.2s' }}>Send Survey</p>
                                            <IoSend color={ sendHover[ind] ? "#079CDB" : "#C4C4C4"} size={ sendHover[ind] ? 22 : 20 } 
                                            style={{ marginLeft: '1rem', transition: 'linear 0.2s' }}/>
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