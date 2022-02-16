// Import React & Next modules
import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect, useState } from "react";
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
import { IoSearch } from 'react-icons/io5';
import { IoIosArrowDown } from 'react-icons/io'

export async function getServerSideProps() {
  // console.log("CREATING CLIENT");
  // const database = client.database({ id: "Test Database" });
  const { database } = await client.databases.createIfNotExists({ id: "Test DB" });
  // const container = await database.container.createIfNotExists({ id: "Test Container 1" });
  const { container } = await database.containers.createIfNotExists({ id: "Test Container 1" });
  // console.log(database);
  const res = await fetch(`${process.env.LOCAL_URL}/api/clinic`)
  const data = await res.json()
  return { props: { data } }
}

export default function Visualization({ data }) {
  const [searchClinic, setSearchClinic] = useState(true)
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
                style={searchClinic ? { marginRight: '5rem', fontWeight: 'bold', opacity: '100%' } : { marginRight: '5rem', opacity: '60%' }}
                onClick={() => setSearchClinic(true)} > Clinic </p>
                <p className={styles.toggleTitle} 
                style={searchClinic ? { opacity: '60%'} : { fontWeight: 'bold', opacity: '100%' }}
                onClick={() => setSearchClinic(false)} > Preceptor </p>
              </div>
              <div className={styles.filterRow}>
                <div className={styles.searchBar}>
                  <input className={styles.searchInput} placeholder={searchClinic ? "Enter Clinic Name ..." : "Enter Preceptor Name ..."} />
                  <div className={styles.searchBtn}>
                    <IoSearch color='#fff' />
                  </div>
                </div>
                <div className={styles.regionForm}>
                  <div className={styles.formTitle}>
                    <p>Region</p>
                    <IoIosArrowDown color='#079CDB' />
                  </div>
                  {showRegionForm ? <form>
                    <input type='checkbox' name='region1' />
                    <label for='region1'>Region 1</label>
                    <input type='checkbox' name='region2' />
                    <label for='region2'>Region 2</label>
                    <input type='checkbox' name='region3' />
                    <label for='region3'>Region 3</label>
                  </form> : null}
                </div>
                <div className={styles.siteForm}>
                  <div className={styles.formTitle}>
                    <p>Site</p>
                    <IoIosArrowDown color='#079CDB' />
                  </div>
                  <form></form>
                </div>
                <div className={styles.statusForm}>
                  <div className={styles.formTitle}>
                    <p>Status</p>
                    <IoIosArrowDown color='#079CDB' />
                  </div>
                  <form></form>
                </div>
              </div>
              <div className={styles.row}>
                <p className={styles.titleCol1} style={{ marginLeft: '2rem' }}>Clinic Name</p>
                <p className={styles.titleCol2}>Affiliation</p>
                <p className={styles.titleCol3}>Region</p>
                <p className={styles.titleCol4}>Status</p>
              </div>

              {data.map((x, ind) => {
                const statusText = StatusParser("clinics", x.status)
                return (
                  <div className='displayRow' key={`elem_${ind}`}>
                    <div className="rowContentClinics">
                      <p className={styles.dataCol1} style={{ marginLeft: '2rem' }}>{x.name}</p>
                      <p className={styles.dataCol2}>{x.affiliation}</p>
                      <p className={styles.dataCol3}>{x.region}</p>
                      <p className={styles.dataCol4} style={{ marginRight: '2rem' }}>{statusText}</p>
                    </div>
                    <div className={`tag${x['status']}`}></div>
                  </div>
                )
              })
              }
            </div>
          </div>
        </main>
      </div>
    </React.Fragment>
  )
}
