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
import PieChart from '../components/Charts/piechart';
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
                <p>Chart 1: Detail</p>
              </div>
              <div style={{ height: '90%', width: 'auto' }}>
                <BarChart />
              </div>
            </div>
            <div className={styles.chart}>
              <div className={styles.chartTitle}>
                <p>Chart 2: Detail</p>
              </div>
              <div style={{ height: '90%', width: 'auto' }}>
                <PieChart />
              </div>
            </div>
          </div>
          <div className={styles.mainCharts}>
            <div className={styles.chart}>
              <div className={styles.chartTitle}>
                <p>Chart 1: Detail</p>
              </div>
              <div style={{ height: '90%', width: 'auto' }}>
                <BarChart />
              </div>
            </div>
            <div className={styles.chart}>
              <div className={styles.chartTitle}>
                <p>Chart 2: Detail</p>
              </div>
              <div style={{ height: '90%', width: 'auto' }}>
                <PieChart />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}