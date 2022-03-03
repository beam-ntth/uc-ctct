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
import Marker from '../components/shared/marker/marker';

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
  const center = {
    lat: 38.5568118,
    lng: -121.7699631
  }
  const zoom = 10

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
              <h1 className={styles.actTitle}>Map of Clinics and Students</h1>
              <h4 className={styles.legend}><img src='/asset/images/clinic-pin.png' /> Clinic <span style={{marginRight: '2rem'}} /> <img src='/asset/images/student-pin.png' />  Student</h4>
              <div className={styles.mapFrame}>
                <div className={styles.mapContainer}>
                  <GoogleMapReact bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY }} defaultCenter={center} defaultZoom={zoom} >
                      <Marker lat={38.6568118} lng={-121.8699631} type={'clinic'} data={'Clinic 1'} />
                      <Marker lat={38.5368118} lng={-121.8689631} type={'clinic'} data={'Clinic 2'} />
                      <Marker lat={38.5168118} lng={-121.7799631} type={'clinic'} data={'Clinic 3'} />
                      <Marker lat={38.4968118} lng={-121.7609631} type={'clinic'} data={'Clinic 4'} />
                      <Marker lat={38.4768118} lng={-121.7669631} type={'clinic'} data={'Clinic 5'} />
                      <Marker lat={38.740895} lng={-121.753334} type={'student'} data={'Student 1'} />
                      <Marker lat={38.660895} lng={-121.663334} type={'student'} data={'Student 2'} />
                      <Marker lat={38.520895} lng={-121.733334} type={'student'} data={'Student 3'} />
                      <Marker lat={38.500895} lng={-121.713334} type={'student'} data={'Student 4'} />
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