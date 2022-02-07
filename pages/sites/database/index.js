import Head from 'next/head'
import styles from '../../../styles/Database.module.css'
import Link from 'next/link'


import React from 'react';
import Navbar from '../../../components/shared/navbar/navbar';
import Header from '../../../components/shared/header/header';

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:3000/api/site/region`)
  const data = await res.json()
  return { props: { data } }
}

export default function Database({ data }) {
  return (
    <React.Fragment>
      <div className={styles.container}>
        <Head>
          <title>UC-CTCT: Site Management Systems</title>
          <meta name="description" content="University of California - Clinic Coordination Tools" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
          <Navbar icons={[false, true, false, false, false]} />
          <div className={styles.content}>
            <Header header="Management Overview - All Regions" date="Today: Febuary 2, 2022" imgSrc="/asset/images/user-image.png" />
            <div className={styles.data}>
              <div className={styles.row}>
                <p>Region Name</p>
                <p>Total number of sites</p>
              </div>
              {data.map((x, ind) => {
                return (
                  <Link href={`/sites/database/site?location=${x['id']}`}>
                    <div className='displayRow' key={`elem_${ind}`}>
                      <p style={{ marginLeft: '2rem' }}>{x['name']}</p>
                      <p style={{ marginRight: '5rem' }}>{x['num_sites']}</p>
                    </div>
                  </Link>)
              })}
            </div>
          </div>
        </main>
      </div>
      <style>
      </style>
    </React.Fragment>
  )
}