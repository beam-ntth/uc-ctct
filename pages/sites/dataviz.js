import Head from "next/head";
import Link from "next/link";

import React from "react";
//import Navbar from "../../../../components/shared/navbar/navbar";
// import Header from "../../../../components/shared/header/header";
// import styles from "../../../../styles/Visualization.module.css";
import styles from '../../styles/Database.module.css'


// export async function getServerSideProps() {
//     const res = await fetch(`http://localhost:3000/api/dataviz`)
//     const data = await res.json()
//     return { props: { data } }
//   }


export default function Visualization() {
    return (
        <div className={styles.container}>
            <Head>
                <title>UC-CTCT: Site Management Systems</title>
                <meta name="description" content="University of California - Clinic Coordination Tools" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <Navbar icons={[false, true, false, false, false]} /> 
                <div className={styles.content}>
                    <Header header="Data Visualization" date="Today: Febuary 2, 2022" imgSrc="/asset/images/user-image.png" />
                    <div className={styles.menu}>
                        {/* <Link href="/sites/visual"> */}
                          <Link href="/sites/dataviz">
                            <div className={styles.menuOption}>
                                <FaChartPie size={100} color='#079CDB' />
                                <h1>Manage Data Visualization</h1>
                                <p>Quick overview of all the clinics and chart analysis</p>
                            </div>
                        </Link>
                        <Link href="/sites/database">
                            <div className={styles.menuOption}>
                                <FaDatabase size={100} color='#079CDB'/>
                                <h1>Manage Clinical Database</h1>
                                <p>Add more clinics, sites, or regions and edit existing information</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    )
}