import Head from 'next/head'
import styles from '../../../styles/Database.module.css'
import nextConnect from 'next-connect';
import Link from 'next/link'

import React, { useEffect } from 'react';
import Navbar from '../../../components/shared/navbar/navbar';
import Header from '../../../components/shared/header/header';
import { useRouter } from 'next/router';

export async function getServerSideProps(context) {
    const query = context.query
    const res = await fetch(`http://localhost:3000/api/site/region?location=${query['location']}`)
    const data = await res.json()
    return { props: { data } }
}

export default function Database({ data }) {
    return (
        <React.Fragment>
            <div className={styles.container}>
                <Head>
                    <title>UC-CTCT: Site Management Systems</title>
                    <meta name="description" content="University of California - Clinic Coordination Tools" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <main className={styles.main}>
                    <Navbar icons={[false, true, false, false, false]} /> 
                    <div className={styles.content}>
                        <Header header="Management Overview - Sites" date="Today: Febuary 2, 2022" imgSrc="" />
                        <div className={styles.data}>
                            <div className={styles.row}>
                                <p className='row1'>Site Name</p>
                                <p className='row2'>Affiliation</p>
                                <p className='row3'>Total sites</p>
                            </div>
                            {data.map((x, ind) => {
                                return (
                                    <Link href={`/sites/database/clinics?location=${x['id']}`}>
                                        <div key={`site_${ind}`} className='displayRow'>
                                            <p className='row1' style={{marginLeft: '2rem'}}>{x['name']}</p>
                                            <p className='row2'>{x['affiliation']}</p>
                                            <p className='row3' style={{paddingLeft: '3rem'}}>{x['num_clinics']}</p>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </main>
            </div>
            <style jsx>
                {
                    `
                    .displayRow {
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        align-items: center;
                        padding: 0.5rem;
                        background-color: #fff;
                        height: auto;
                        width: 90%;
                        margin: 0.4rem 0;
                        border-radius: 1rem;
                        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
                        font-family: 'Lato', sans-serif;
                        font-weight: 600;
                        font-size: 1.2rem;
                        cursor: pointer;
                    }

                    .displayRow:hover {
                        color: #079CDB;
                        width: 91%;
                        transition: linear 0.3s;
                    }

                    .row1 {
                        width: 50%;
                    }

                    .row2 {
                        width: 30%;
                    }

                    .row3 {
                        width: 20%;
                    }
                    `
                }
            </style>
        </React.Fragment>
    )
}