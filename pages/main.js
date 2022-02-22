import Head from 'next/head'
import styles from '../styles/Main.module.css'
import GoogleMapReact from 'google-map-react';
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
import React, { useState, useCallback } from 'react'

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
  const [searchSetting, setSearchSetting] = useState(0)

  const center = {
    lat: 38.5568118,
    lng: -121.7699631
  }
  const zoom = 12

  const Marker = () => <img height='30px' width="auto" src="/asset/images/clinic-pin.png" />
  // const Marker = ({ text }) => <div style={{width: '30px', height: '30px', borderRadius: '30px', backgroundColor: '#FFF', display: "flex", alignItems: 'center', justifyContent: 'center'}}>{text}</div>;
  const StudentMarker = () => <img height='30px' width="auto" src="/asset/images/student-pin.png" />
  // const StudentMarker = ({ text }) => <div style={{width: '30px', height: '30px', borderRadius: '30px', backgroundColor: '#FF0000', display: "flex", alignItems: 'center', justifyContent: 'center'}}>{text}</div>;
  
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
          <Header header="Welcome, Rosalind De Lisser!" imgSrc="/asset/images/user-image.png" />
          <div className={styles.activities}>
            <div className={styles.activityBox}>
              <h1 className={styles.actTitle}>Map of Clinics/Students</h1>
              <h4>Red Marker is Clinic and Green marker is student</h4>
              <div className={styles.mapFrame}>
                <div className={styles.mapContainer}>
                  <GoogleMapReact bootstrapURLKeys={{ key: "" }} defaultCenter={center} defaultZoom={zoom} >
                    <Marker
                      lat={38.5568118}
                      lng={-121.7699631}
                    />
                    <StudentMarker
                      lat={38.540895}
                      lng={-121.773334}
                    />
                  </GoogleMapReact>
                </div>
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