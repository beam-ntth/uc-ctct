import Head from 'next/head'
import styles from '../../styles/Database.module.css'
import Link from 'next/link'

import Navbar from '../../components/shared/navbar/navbar';
import Header from '../../components/shared/header/header';
import React from 'react';

export async function getServerSideProps() {
    const res = await fetch(`http://localhost:3000/api/site/region`)
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
                        <Header header="Management Overview - All Regions" date="Today: Febuary 2, 2022" imgSrc="" />
                        <div className={styles.data}>
                            <div className={styles.row}>
                                <p>Region Name</p>
                                <p>Total number of sites</p>
                            </div>
                            {data.map((x) => {
                            return (
                                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
                                alignItems: 'center', padding: '0.5rem', backgroundColor: '#fff', height: 'auto', width: '90%', margin: '0.4rem 0', borderRadius: '1rem', boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.1);',
                                fontFamily: 'Lato', fontWeight: '600', fontSize: '1.2rem'}}>
                                    <p style={{marginLeft: '2rem'}}>{x['name']}</p>
                                    <p style={{marginRight: '5rem'}}>{x['num_sites']}</p>
                                </div>)
                            })}
                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', cursor: 'pointer',
                                alignItems: 'center', padding: '0.5rem', backgroundColor: '#FFF', opacity: 0.75, height: 'auto', width: '90%', margin: '0.4rem 0', borderRadius: '1rem', boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.1);',
                                fontFamily: 'Lato', fontWeight: '600', border: '1px solid #CACACA', fontSize: '1.2rem'}}>
                                    <p style={{marginLeft: '2.5rem', color: "#545454"}}>+ Add New Region</p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap');
            </style>
        </React.Fragment>
    )
}