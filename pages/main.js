import Head from 'next/head'
import styles from '../styles/Main.module.css'
// import '../styles/fonts.css'

// Authentication Packages
import { isAuthenticated } from './api/auth/isAuthenticated';
import passport from 'passport';
import nextConnect from 'next-connect';
import setup from '../api-lib/auth/passportSetup';
import Chart from 'chart.js/auto'

// Component Packages
import Navbar from '../components/shared/navbar/navbar';
import Header from '../components/shared/header/header';
import BarChart from '../components/Charts/barcharts';
import LineChart from '../components/Charts/linechart';
import React from 'react'

/* Suppress just for development */
// Example code from https://github.com/hoangvvo/next-connect at .run
// export async function getServerSideProps({ req, res }) {
//   const handler = nextConnect().use(...setup);
//   await handler.run(req, res);
//   const user = req.user;
//   console.log("Getting user: ", user)
//   if (!user) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: '/',
//       },
//     }
//   }
//   return {
//     props: { user: req.user },
//   };
// }
// 0 is site, 1 is clinic, 2 is preceptor

export default function Main() {
  return (
    <div className={styles.container}>
      <Head>
        <title>UC-CTCT: Main</title>
        <meta name="description" content="University of California - Clinic Coordination Tools" />
        <link rel="icon" href="/favicon.ico" />
        {/* <link href='http://fonts.googleapis.com/css?family=Lato:400,700' rel='stylesheet' type='text/css'/> */}
      </Head>
      <main className={styles.main}>
        <Navbar icons={[true, false, false, false, false]} />
        <div className={styles.content}>
          <Header header="UC PMHNP Consortium Clinical Site Management" imgSrc="/asset/images/user-image.png" />
          <div className={styles.mainCharts}>
            <div className={styles.chart}>
              <div className={styles.chartTitle}>
                <p>Number of active students per Affiliation</p>
              </div>
              <div style={{ height: '90%', width: 'auto' }}>
                <BarChart />
              </div>
            </div>
            <div className={styles.chart}>
              <div className={styles.chartTitle}>
                <p>Number of active sites</p>
              </div>
              {/* <div style={{ height: '90%', width: 'auto' }}> */}
                <div className={styles.data}>
                  <p className={styles.numCol1}>45</p>
                  <p className={styles.numCol2}>70</p>
                  <p className={styles.numCol3}>63</p>
                </div>
                <div className={styles.label}>
                  <p className={styles.siteCol1}>Total Green</p>
                  <p className={styles.siteCol2}>Total Yellow</p>
                  <p className={styles.siteCol3}>Total Red</p>
                {/* </div> */}
              </div>
            </div>
          </div>
          <div className={styles.mainCharts}>
          <div className={styles.chart}>
              <div className={styles.chartTitle}>
                <p>Matching Goal Percentage per Affiliation</p>
              </div>
              <div style={{ height: '90%', width: 'auto' }}>
                <LineChart />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}