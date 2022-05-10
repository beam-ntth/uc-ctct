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
import NumberChart from '../components/Charts/numberChart';
import { runAuthMiddleware } from '../api-lib/auth/authMiddleware';

export async function getServerSideProps({ req, res }) {
  const redirect = await runAuthMiddleware(req, res);
  // If the user is invalid then we redirect them back to the index.js page
  if (redirect) return redirect;
  return {
    props: { user: req.user },
  };
}

export default function Main(props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>UC-CTCT: Main</title>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <meta name="description" content="University of California - Clinic Coordination Tools" />
      </Head>
      <main className={styles.main}>
        <Navbar icons={[true, false, false, false, false]} />
        <div className={styles.content}>
          <Header header={`${(new Date()).getHours() < 12 ? "Good morning," : "Good afternoon,"} ${props.user.name}!`} imgSrc={props.user.photo ? props.user.photo : "/asset/images/user-image.png"} />
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
                <p>Number of Site based on Categories</p>
              </div>
              <NumberChart />
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