// Import React & Next modules
import Head from 'next/head'
import Link from 'next/link'
import dynamic from 'next/dynamic';
import React, { useEffect, useState, Component } from "react";
import styles from '../../../styles/Visualization.module.css'

// Import Next Components
import Navbar from '../../../components/shared/navbar/navbar';
import Header from '../../../components/shared/header/header';

import DisplaySite from '../../../components/visualPage/displaySite/displaySite';
const DisplayClinic = dynamic(() => import('../../../components/visualPage/displayClinic/displayClinic'));
const DisplayPreceptor = dynamic(() => import('../../../components/visualPage/displayPreceptor/displayPreceptor'));

// Import DB ops.
import { getAllClinics, getAllSites, getAllPreceptors, getDistinctRegions,
   getAllRegions, getDistinctSiteAffiliations } from '../../../api-lib/azure/azureOps'

export async function getServerSideProps() {
  const site_data = await getAllSites();
  const regionChoices = await getDistinctRegions();
  const affiliationChoices = await getDistinctSiteAffiliations();
  return { props: { site_data, regionChoices, affiliationChoices } }
}

export default function Visualization({ site_data, regionChoices, affiliationChoices }) {
  /**
   * Status of search setting; 0 = Sites, 1 = Clinics, 2 = Preceptors
   */
  const [searchSetting, setSearchSetting] = useState(0)

  /**
   * Store lazy loaded data in UseState() so React knows to re-render component
   * when new data arrives
   */
  const [regionData, setRegionData] = useState(null)
  const [clinicData, setClinicData] = useState(null)
  const [preceptorData, setPreceptorData] = useState(null)

  /**
   * Load part of the data on the client-side instead to speed up loading page
   * NOTE: MAKE SURE THE ORDER IS CORRECT
   */
  async function lazyLoadData() {
    const rData = await getAllRegions();
    setRegionData(rData)
    // Load Clinic and Preceptor data later, since we will load site page first
    const cData = await getAllClinics();
    setClinicData(cData)
    const pData = await getAllPreceptors();
    setPreceptorData(pData)
  }
  
  /**
   * Activate loading on the client-side, [] means only load once
   */
  useEffect(() => {
    lazyLoadData()
    const stickyValue = window.localStorage.getItem('pageSetting');
    stickyValue !== null ? setSearchSetting(JSON.parse(stickyValue)) : setSearchSetting(0)
  }, [])

  /**
   * Save user's last state in local storage, so when they click 'go back' button
   * in the browser, they don't have tp re-choose the page again
   */
  useEffect(() => {
    window.localStorage.setItem('pageSetting', JSON.stringify(searchSetting))
  }, [searchSetting])

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
              {searchSetting === 0 ? <DisplaySite region_data={regionData} data={site_data}
                region_choices={regionChoices} affiliation_choices={affiliationChoices} /> : null}
              {searchSetting === 1 ? (clinicData == null ? <p>Loading...</p> : <DisplayClinic data={clinicData} region_data={regionData} region_choices={regionChoices} sites={site_data} />) : null}
              {searchSetting === 2 ? (preceptorData == null ? <p>Loading...</p> : <DisplayPreceptor data={preceptorData} clinicData={clinicData} choices={regionChoices} />) : null}
            </div>
          </div>
        </main>
      </div>
    </React.Fragment>
  )
}
