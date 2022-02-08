import Head from 'next/head'
import styles from '../../../styles/Database.module.css'
import Link from 'next/link'


import React from 'react';
import Navbar from '../../../components/shared/navbar/navbar';
import Header from '../../../components/shared/header/header';
import { useRouter } from 'next/router';

export async function getServerSideProps() {
  const res = await fetch(`${process.env.LOCAL_URL}api/site/region`)
  const data = await res.json()
  return { props: { data } }
}

export default function Database({ data }) {
  const router = useRouter()

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
            <Header header="Management Overview - All Regions" date="Today: Febuary 2, 2022" imgSrc="/asset/images/user-image.png" back={router.back} />
            <div className={styles.data}>
              <div className={styles.row}>
                <p style={{marginLeft: '2rem', width:'80%'}}>Region Name</p>
                <p style={{width:'20%'}}>Total sites</p>
              </div>
              {data.map((x, ind) => {
                return (
                  <Link href={`/sites/database/site?location=${x['id']}`}>
                    <div className='displayRow' key={`elem_${ind}`}>
                      <p style={{ marginLeft: '2rem', width: '88%' }}>{x['name']}</p>
                      <p style={{ width: '12%' }}>{x['num_sites']}</p>
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