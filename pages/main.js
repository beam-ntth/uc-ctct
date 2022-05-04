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
import { redirectLogin, runAuthMiddleware } from '../api-lib/auth/authMiddleware';
import { checkIfAdminExist } from '../api-lib/azure/azureOps';

/* Suppress just for development */
// Example code from https://github.com/hoangvvo/next-connect at .run
export async function getServerSideProps({ req, res }) {
  runAuthMiddleware(req, res);
  const user = req.user;
  console.log("Getting user: ", user)

  // If have not attempted to login, then redirect back to main login page. 
  if (!user) {
    return redirectLogin();
  }
  const adminExist = await checkIfAdminExist(user.email);
  // If user does not have permission, then return to auth failed page
  if (user && !adminExist) {
    return {
      redirect: {
        permanent: false,
        destination: '/?auth=failed',
      },
    }
  }

  return {
    props: { user: user },
  };
}
// 0 is site, 1 is clinic, 2 is preceptor

export default function Main(props) {
  console.log(props)
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