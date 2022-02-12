// Import Next & React modules
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import styles from '../../../styles/Database.module.css'

// Import Next Components
import Navbar from '../../../components/shared/navbar/navbar';
import Header from '../../../components/shared/header/header';
import StatusParser from '../../../components/shared/status';

// Import DB component
import { client } from '../../../api-lib/azure/azureConfig';

// Import third-party icons
import { FiEdit } from 'react-icons/fi';
import { IoMdAdd } from 'react-icons/io';

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
            <Header header={`${region_data.name} Region - All Sites`} imgSrc="/asset/images/user-image.png" back={router.back} />
            <div className={styles.data}>
              <div className={styles.row}>
                <p className='row1Sites' style={{marginLeft: '2rem'}}>Site Name</p>
                <p className='row2Sites'>Affiliation</p>
                <p className='row3Sites'>Total Clinics</p>
                <p className='row4Sites'>Status</p>
                <IoMdAdd color="#079CDB" size={hover ? 45 : 40} style={{cursor: 'pointer', transition: '0.2s linear'}} 
                onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} />
              </div>
              {data.map((x, ind) => {
                const statusText = StatusParser("sites", x.status)
                const [hover, setHover] = useState(false)
                return (
                  <div style={{width: '100%', height: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
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
                  <FiEdit color="#C4C4C4" size={hover ? 40 : 35} style={{cursor: 'pointer', transition: '0.2s linear', marginLeft: '1rem'}} 
                  onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} />
                  </div>
                )
              })}
            </div>
          </div>
        </main>
      </div>
    </React.Fragment>
  )
}