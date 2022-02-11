import Head from 'next/head'
import styles from '../../../styles/Database.module.css'
import Link from 'next/link'
import { CosmosClient } from '@azure/cosmos';

import React, { useState } from 'react';
import Navbar from '../../../components/shared/navbar/navbar';
import Header from '../../../components/shared/header/header';
import { useRouter } from 'next/router';
import { IoMdAdd } from 'react-icons/io'
import { FiEdit } from 'react-icons/fi'

// Setting up access to API
const endpoint = process.env.COSMOS_ENDPOINT;
const key = process.env.COSMOS_KEY;
const client = new CosmosClient({endpoint , key});

export async function getServerSideProps() {
  const database = client.database("uc-ctct");
  const container = database.container("Regions");
  const { resources: data } = await container.items.query("SELECT * from c").fetchAll();
  return { props: { data } }
}

export default function Database({ data }) {
  const router = useRouter()
  const [hover, setHover] = useState(false)

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
            <Header header="Management Overview" imgSrc="/asset/images/user-image.png" back={router.back} />
            <div className={styles.data}>
              <div className={styles.row}>
                <p style={{width:'70%', marginLeft: '2rem'}}>Region Name</p>
                <p style={{width:'20%'}}>Total sites</p>
                <IoMdAdd color="#079CDB" size={hover ? 45 : 40} style={{cursor: 'pointer', transition: '0.2s linear'}} 
                onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} />
              </div>
              {data.map((x, ind) => {
                const [hover, setHover] = useState(false)

                return (
                  <div style={{width: '100%', height: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Link href={`/sites/database/site?location=${x['id']}`}>
                      <div className='displayRegionRow' key={`elem_${ind}`}>
                        <p style={{ marginLeft: '2rem', width: '70%' }}>{x['name']} Region</p>
                        <p style={{ width: '25%', textAlign: 'center' }}>{x['total_sites']}</p>
                      </div>
                    </Link>
                    <FiEdit color="#C4C4C4" size={hover ? 40 : 35} style={{cursor: 'pointer', transition: '0.2s linear', marginLeft: '1rem'}} 
                    onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} />
                  </div>
                  )
              })}
            </div>
          </div>
        </main>
      </div>
      <style >
      </style>
    </React.Fragment>
  )
}