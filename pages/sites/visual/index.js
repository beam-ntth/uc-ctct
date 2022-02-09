import Head from 'next/head'
import styles from '../../../styles/Visualization.module.css'
import Link from 'next/link'

import React, { useEffect } from "react";
import Chart from 'chart.js/auto'
import Navbar from '../../../components/shared/navbar/navbar';
import Header from '../../../components/shared/header/header';
import PieChart from '../../../components/Charts/piechart';
import BarChart from '../../../components/Charts/barcharts';

export async function getServerSideProps() {
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
                <p className='col1DV'>Clinic Name</p>
                <p className='col2DV'>Training Type</p>
                <p className='col3DV'>Affiliation</p>
                <p className='col4DV'>Region</p>
                <p className='col5DV'>Status</p>
              </div>
              {/* { */}
              {/* // data.map((x, ind) => {
                  // let statusText = 'N/A'

                  // if (x['status'] === 0) {
                  //   statusText = 'Need To Contact'
                  // }
                  // if (x['status'] === 1) {
                  //   statusText = 'Need To Follow Up'
                  // }
                  // if (x['status'] === 2) {
                  //   statusText = 'Contacted'
                  // }
                  // if (x['status'] === 3) {
                  //   statusText = 'Connected'
                  // } */}

              {/* return ( */}
              {/* <Link href={`/sites/database/clinics/clinic?name=${x['id']}`}> */}
              <div className="displayRow">
                <div className="rowContentClinics">
                  <p className="col1DV" style={{ marginLeft: '2rem' }}>{'Clinic 1'}</p>
                  <p className="col2DV" >{'FNP'}</p>
                  <p className="col3DV">{'UCSF'}</p>
                  <p className="col4DV">{'Southern'}</p>
                  <p className="col5DV"style={{ marginRight: '2rem' }}>{'Status'}</p>
                </div>
                {/* <div className={`tag${x['status']}`}></div> */}
              </div>
              {/* </Link> */}
              {/* ) */}
              {/* }) */}
              {/* } */}
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
