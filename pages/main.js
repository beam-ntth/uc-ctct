// Main Packages
import React from 'react'
import Head from 'next/head'
import styles from '../styles/Main.module.css'

// Component Packages
import Navbar from '../components/shared/navbar/navbar';
import Header from '../components/shared/header/header';
import Chart from 'chart.js/auto'
import BarChart from '../components/Charts/barcharts';
import LineChart from '../components/Charts/linechart';
import NumberChart from '../components/Charts/numberChart';

// DB Functions
import { runAuthMiddleware } from '../api-lib/auth/authMiddleware';

export async function getServerSideProps({ req, res }) {
  const redirect = await runAuthMiddleware(req, res);
  // If the user is invalid then we redirect them back to the index.js page
  // Master.items.create({ id: "2be67c94-063f-491a-aa46-487ad247765e", type: "BUG" })
  // Master.item.delete("hello world", "hello world")

  if (redirect) return redirect;
  // await addLastUpdatedToAllClinics()
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
                <p>Number of Sites per Category</p>
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