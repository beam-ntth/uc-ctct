import Head from 'next/head'
import styles from '../../../styles/Visualization.module.css'
import Link from 'next/link'

import React, { useEffect } from "react";
import Navbar from '../../../components/shared/navbar/navbar';
import Header from '../../../components/shared/header/header';

// export async function getServerSideProps() {
//     const res = await fetch(`http://localhost:3000/api/dataviz/visualization`)
//     const data = await res.json()
//     return { props: { data } }
//   }

export default function Visualization({ data }) {
  return (
    <React.Fragment>
      <div className={styles.container}>
        <Head>
          <title>Data Analytics</title>
          <meta name="description" content="University of California - Clinic Coordination Tools" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
          <Navbar icons={[false, true, false, false, false]} />
          <div className={styles.content}>
            <Header header="Data Analytics" date="Today: Febuary 2, 2022" imgSrc="/asset/images/user-image.png" />
            <div className={styles.data}>
              <div className={styles.row}>
                <p className='col1DV'>Clinic Name</p>
                <p className='col2DV'>Training Type</p>
                <p className='col3DV'>Affiliation</p>
                <p className='col4DV'>Region</p>
                <p className='col5DV'>Status</p>
              </div>
              {/* { */}
                {/* // data.map((x, ind) => {
                  // let statusText = 'N/A'

                  // if (x['status'] === 0) {
                  //   statusText = 'Need To Contact'
                  // }
                  // if (x['status'] === 1) {
                  //   statusText = 'Need To Follow Up'
                  // }
                  // if (x['status'] === 2) {
                  //   statusText = 'Contacted'
                  // }
                  // if (x['status'] === 3) {
                  //   statusText = 'Connected'
                  // } */}

                  {/* return ( */}
                    {/* <Link href={`/sites/database/clinics/clinic?name=${x['id']}`}> */}
                      <div className="displayRow">
                        <div className="rowContentClinics">
                          <p className="col1DV" style={{ marginLeft: '2rem' }}>{'Clinic 1'}</p>
                          <p className="col2DV" >{'FNP'}</p>
                          <p className="col3DV">{'UCSF'}</p>
                          <p className="col4DV">{'Southern'}</p>
                          <p className="col5DV">{'Status'}</p>
                        </div>
                        {/* <div className={`tag${x['status']}`}></div> */}
                      </div>
                    {/* </Link> */}
                  {/* ) */}
                {/* }) */}
              {/* } */}
            </div>
          </div>
        </main>
      </div>
    </React.Fragment>
  )
}