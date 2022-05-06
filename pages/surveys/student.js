import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import styles from '../../styles/Surveys.module.css'

import Navbar from '../../components/shared/navbar/navbar';
import Header from '../../components/shared/header/header';

import { getAllStudents } from '../../api-lib/azure/azureOps';
import { useRouter } from 'next/router';
import { runAuthMiddleware } from '../../api-lib/auth/authMiddleware';

export async function getServerSideProps( {req, res} ) {
    const redirect = await runAuthMiddleware(req, res);
    // If the user is invalid then we redirect them back to the index.js page
    if (redirect) return redirect;

    const students = await getAllStudents();
    return { props: { students, user: req.user } }
}

export default function StudentSurveys({ students, user }) {
    const currentYear = (new Date()).getFullYear()
    const [cohortFilter, setCohortFilter] = useState(currentYear)
    const [campusFilter, setCampusFilter] = useState('ALL')

    const getFormattedDate = () => {
        const curDate = new Date()
        return `${curDate.getMonth()+1 < 10 ? '0' : ''}${curDate.getMonth()+1}/${curDate.getDate() < 10 ? '0' : ''}${curDate.getDate()}/${curDate.getFullYear()}`
    }

    /**
     * Filter all the students based on their cohort and campus
     */
    const getFilteredStudents = () => {
        if ( campusFilter === "ALL" ) {
            return students.filter(x => x.year == cohortFilter)
        }
        else {
            return students.filter(x => x.location_affiliation == campusFilter && x.year == cohortFilter)
        }
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
                    <Header header="Surveys Management" imgSrc={user.photo ? user.photo : "/asset/images/user-image.png"} back={router.back}/>
                    <div className={styles.content}>
                        <div className={styles.data}>
                            <div style={{ width: '100%', marginTop: '1rem', paddingLeft: '2rem', display: 'flex', alignItems: 'center' }}>
                                <p style={{ marginRight: '1rem' }}>Please select student's year: </p>
                                <select className={ styles.cohortFilter }
                                    value={ cohortFilter } 
                                    onChange={ x => setCohortFilter(x.target.value) }>
                                    {[currentYear+1, currentYear, currentYear-1].map(x => <option value={x} key={x} >{x}</option>)}
                                </select>
                                <p style={{ marginRight: '1rem' }}>Please select student's campus: </p>
                                <select className={ styles.campusFilter }
                                    value={ campusFilter }
                                    onChange={x => setCampusFilter(x.target.value)}>
                                    <option value={'ALL'}>All</option>
                                    <option value={'UC Davis'}>UC Davis</option>
                                    <option value={'UC San Francisco'}>UC San Francisco</option>
                                    <option value={'UC Los Angeles'}>UC Los Angeles</option>
                                    <option value={'UC Irvine'}>UC Irvine</option>
                                </select>
                            </div>
                            <p className={ styles.displayLastUpdated } ><strong>Response Last updated:</strong> {getFormattedDate()}</p>
                            <div className={ styles.row }>
                                <div className={ styles.rowTitle }>
                                <p className={styles.titleCol1}>Name</p>
                                <p className={styles.titleCol2}>Email</p>
                                <p className={styles.titleCol5}>Responded</p>
                                </div>
                            </div >
                            {
                                students ? 
                                getFilteredStudents().length == 0 ?
                                <div>No student from this campus</div> 
                                : 
                                getFilteredStudents().map((x, ind) => {
                                return (
                                    <div style={{ width: '100%', height: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }} key={x.id}>
                                        <div className='displaySurveyRow' key={`elem_${ind}`}>
                                            <p style={{ marginLeft: '2rem', width: '25%' }}>{x.firstName} {x.lastName}</p>
                                            <p style={{ width: '30%' }}>{x.email ? x.email : "Unknown"}</p>
                                            <p style={{ width: '15%' }}>{(x.survey != null && x.survey.responseDate) != "" ? x.survey.responseDate : "No Response"}</p>
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