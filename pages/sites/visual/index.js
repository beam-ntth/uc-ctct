// Import React & Next modules
import Head from 'next/head'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import React, { useEffect, useState, Component } from "react";
import styles from '../../../styles/Visualization.module.css'

// Import Next Components
import Chart from 'chart.js/auto'
import Navbar from '../../../components/shared/navbar/navbar';
import Header from '../../../components/shared/header/header';
import PieChart from '../../../components/Charts/piechart';
import BarChart from '../../../components/Charts/barcharts';
import StatusParser from '../../../components/shared/status';

// Import DB component
import { client } from '../../../api-lib/azure/azureConfig';
import DisplayClinic from '../../../components/visualPage/displayClinic';
import DisplayPreceptor from '../../../components/visualPage/displayPreceptor';
import DisplaySite from '../../../components/visualPage/displaySite';

// export async function getServerSideProps() {
//   const database = client.database("uc-ctct");
//   const container = database.container("Clinics");
//   const preceptor_container = database.container("Preceptors");
//   const { resources: data } = await container.items.query("SELECT * FROM c").fetchAll();
//   const { resources: preceptor_data } = await preceptor_container.items.query("SELECT * FROM c").fetchAll();
//   return { props: { data, preceptor_data } }
// }

export default function Visualization({ data, preceptor_data }) {
  // 0 is site, 1 is clinic, 2 is preceptor
  const [searchSetting, setSearchSetting] = useState(0)

  const [showRegionForm, setShowRegionForm] = useState(false)
  const [showSiteForm, setShowSiteForm] = useState(false)
  const [showStatusForm, setShowStatusForm] = useState(false)

  return (
    <React.Fragment>
      <div className={styles.container}>
        <Head>
          <title>Data Analytics</title>
          <meta name="description" content="University of California - Clinic Coordination Tools" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
          <Navbar icons={[false, true, false, false, false]} />
          <div className={styles.content}>
            <Header header="Data Analytics" imgSrc="/asset/images/user-image.png" />
            <div className={styles.data}>
              <div className={styles.toggleRow}>
                <p className={styles.toggleTitle}
                  style={searchSetting === 0 ? { marginRight: '5rem', fontWeight: 'bold', opacity: '100%' } : { marginRight: '5rem', opacity: '60%' }}
                  onClick={() => setSearchSetting(0)} > Site </p>
                <p className={styles.toggleTitle}
                  style={searchSetting === 1 ? { marginRight: '5rem', fontWeight: 'bold', opacity: '100%' } : { marginRight: '5rem', opacity: '60%' }}
                  onClick={() => setSearchSetting(1)} > Clinic </p>
                <p className={styles.toggleTitle}
                  style={searchSetting === 2 ? { fontWeight: 'bold', opacity: '100%' } : { opacity: '60%' }}
                  onClick={() => setSearchSetting(2)} > Preceptor </p>
              </div>
              {/* {searchSetting === 1 ? <DisplaySite /> : null}
              {searchSetting === 1 ? <DisplayClinic /> : null}
              {searchSetting === 2 ? <DisplayPreceptor /> : null} */}
            </div>
          </div>
        </main>
      </div>
    </React.Fragment>
  )
}
