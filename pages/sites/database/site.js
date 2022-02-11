import Head from 'next/head'
import styles from '../../../styles/Database.module.css'
import nextConnect from 'next-connect';
import Link from 'next/link'
import { CosmosClient } from '@azure/cosmos';

import React, { useEffect } from 'react';
import Navbar from '../../../components/shared/navbar/navbar';
import Header from '../../../components/shared/header/header';
import { useRouter } from 'next/router';
import StatusParser from '../../../components/shared/status';

// Setting up access to API
const endpoint = process.env.COSMOS_ENDPOINT;
const key = process.env.COSMOS_KEY;
const client = new CosmosClient({endpoint , key});

export async function getServerSideProps(context) {
  const location = context.query.location
  const database = client.database("uc-ctct");
  const region_container = database.container("Regions");
  const container = database.container("Sites");
  const { resource: region_data } = await region_container.item(location, location).read();
  const { resources: data } = await container.items.query(`SELECT * from c WHERE c.region_id = '${location}'`).fetchAll();
  return { props: { data, region_data } }
}

export default function Database({ data, region_data }) {
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
            <Header header={`${region_data.name} Region - All Sites`} imgSrc="/asset/images/user-image.png" back={router.back} />
            <div className={styles.data}>
              <div className={styles.row}>
                <p className='row1Sites' style={{marginLeft: '2rem'}}>Site Name</p>
                <p className='row2Sites'>Affiliation</p>
                <p className='row3Sites'>Total sites</p>
                <p className='row4Sites'>Status</p>
              </div>
              {data.map((x, ind) => {
                const statusText = StatusParser("sites", x.status)
                return (
                  <Link href={`/sites/database/clinics?location=${x.id}`}>
                    <div key={`site_${ind}`} className='displayRow'>
                      <div className='rowContentClinics'>
                        <p className='row1Sites' style={{ marginLeft: '2rem' }}>{x['name']}</p>
                        <p className='row2Sites'>{x['affiliation']}</p>
                        <p className='row3Sites' style={{ paddingLeft: '3rem' }}>{x['total_clinics']}</p>
                        <p className="row4Sites">{statusText}</p>
                      </div>
                      <div className={`tag${x['status']}`}></div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </main>
      </div>
    </React.Fragment>
  )
}