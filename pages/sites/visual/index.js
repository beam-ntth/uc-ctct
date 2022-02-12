// Import React & Next modules
import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect } from "react";
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

export async function getServerSideProps() {
  // console.log("CREATING CLIENT");
  // const database = client.database({ id: "Test Database" });
  const { database } = await client.databases.createIfNotExists({ id: "Test DB" });
  console.log(database.id);
  // const container = await database.container.createIfNotExists({ id: "Test Container 1" });
  const { container } = await database.containers.createIfNotExists({ id: "Test Container 1" });
  console.log("Creating", container);
  // console.log(database);
  const res = await fetch(`${process.env.LOCAL_URL}/api/clinic`)
  const data = await res.json()
  console.log(data);
  return { props: { data } }
}

export default function Visualization({ data }) {
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
            <div className={styles.mainCharts}>
              <div className={styles.chart}>
                <div className={styles.chartTitle}>
                  <p>Clinic Regions</p>
                </div>
                <div style={{ height: '90%', width: 'auto' }}>
                  <PieChart />
                </div>
              </div>
              <div className={styles.chart}>
                <div className={styles.chartTitle}>
                  <p>Training Types</p>
                </div>
                <div style={{ height: '90%', width: 'auto' }}>
                  <PieChart />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </React.Fragment>
  )
}
