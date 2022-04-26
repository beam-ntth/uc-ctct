import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import styles from '../../styles/Surveys.module.css'

import Navbar from '../../components/shared/navbar/navbar';
import Header from '../../components/shared/header/header';

import { getAllPreceptors } from '../../api-lib/azure/azureOps';
import { IoSend } from 'react-icons/io5';
import { useRouter } from 'next/router';

export async function getServerSideProps( context ) {
    const preceptors = await getAllPreceptors();
    return { props: { preceptors } }
}

export default function PreceptorSurveys({ preceptors }) {
    const getFormattedDate = () => {
        const curDate = new Date()
        return `${curDate.getMonth()+1 < 10 ? '0' : ''}${curDate.getMonth()+1}/${curDate.getDate() < 10 ? '0' : ''}${curDate.getDate()}/${curDate.getFullYear()}`
    }

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
                                <p style={{ marginRight: '1rem' }}>Please select preceptor campus: </p>
                                <select style={{ borderRadius: '0.5rem', border: 'solid 1px #c4c4c4', padding: '0 0.5rem', height: '2rem' }}>
                                    <option value={'ALL'}>All</option>
                                    <option value={'UCD'}>UCD</option>
                                    <option value={'UCSF'}>UCSF</option>
                                    <option value={'UCLA'}>UCLA</option>
                                    <option value={'UCI'}>UCI</option>
                                </select>
                            </div>
                            <p className={ styles.displayLastUpdated } ><strong>Response Last updated:</strong> {getFormattedDate()}</p>
                            <div className={styles.row}>
                                <div className={ styles.rowTitle }>
                                <p className={styles.titleCol1}>Name</p>
                                <p className={styles.titleCol2}>Email</p>
                                <p className={styles.titleCol5}>Responded</p>
                                </div>
                            </div >
                            {
                                preceptors ? preceptors.map((x, ind) => {
                                return (
                                    <div style={{ width: '100%', height: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                                        <Link href={`/students/profile?id=${x.id}`}>
                                            <div className='displaySurveyRow' key={`elem_${ind}`}>
                                                <p style={{ marginLeft: '2rem', width: '25%' }}>{x.firstname} {x.lastname}</p>
                                                <p style={{ width: '30%' }}>{x.email ? x.email : "Unknown"}</p>
                                                <p style={{ width: '15%' }}>{(x.survey != null && x.survey.responseDate) != "" ? x.survey.responseDate : "No Response"}</p>
                                            </div>
                                        </Link>
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