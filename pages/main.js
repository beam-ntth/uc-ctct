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
import React, { useState, useEffect } from 'react'
import Marker from '../components/shared/marker/marker';
import { getAllClinics, getAllStudents } from '../api-lib/azure/azureOps';

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
  const [clinicData, setClinicData] = useState(null)
  const [studentData, setStudentData] = useState(null)
  const [mapIsLoading, setMapIsLoading] = useState(true)

  const center = {
    lat: 36.427590,
    lng: -120.388835
  }
  const zoom = 7

  async function loadData() {
    const cData = await getAllClinics();
    const sData = await getAllStudents();
    setClinicData(cData)
    setStudentData(sData)
    setMapIsLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

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
          <Header header="Welcome!" imgSrc="/asset/images/user-image.png" />
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
          <div className={styles.activities}>
            <div className={styles.activityBox}>
              <h1 className={styles.actTitle}>Map of Clinics and Students</h1>
              <h4 className={styles.legend}>
                <img src='/asset/images/clinic-pin.png' /> Clinic <span style={{marginRight: '2rem'}} />
                <img src='/asset/images/student-pin.png' />  Student (Assigned) <span style={{marginRight: '2rem'}} />
                <img src="/asset/images/student-unassigned-pin.png" /> Student (Unassigned)
                </h4>
              {mapIsLoading ? <p style={{ margin: '1rem 0 0 2rem', padding: 0 }}>Loading student and clinic data. Please wait...</p> : null}
              <div className={styles.mapFrame}>
                <div className={styles.mapContainer}>
                  <GoogleMapReact bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY }} defaultCenter={center} defaultZoom={zoom} >
                      {
                        clinicData != null ?
                        clinicData.map((x) => {
                          const genInfo = x.generalInformation
                          return <Marker lat={genInfo.lat} lng={genInfo.long} id={x.id}
                          type={'clinic'} name={x.name} phoneNumber={genInfo.phoneNumber}
                          addr={`${genInfo.addressLine1}, ${genInfo.addressLine2 ? `${genInfo.addressLine2}, ` : ''}${genInfo.city}, ${genInfo.state}, ${genInfo.postal}`} />
                        })
                        :
                        null
                      }
                      {
                        studentData != null ?
                        studentData.map(x => {
                          const addr = `${x.addressLine1}, ${x.addressLine2 == "" ? "" : x.addressLine2 + ', '}${x.city}, ${x.state} ${x.postal}`
                          return <Marker lat={x.lat} lng={x.long} type={x.assignedPreceptor ? 'student-assigned' : 'student-unassigned'} 
                          id={x.id} name={`${x.firstName} ${x.lastName}`} phoneNumber={x.phoneNumber} addr={addr} />
                        })
                        :
                        null
                      }
                  </GoogleMapReact>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}