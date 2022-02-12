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
import { FaRegTrashAlt } from 'react-icons/fa';

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
  const [editHover, setEditHover] = useState(Array(data.length).fill(false))
  const [trashHover, setTrashHover] = useState(Array(data.length).fill(false))

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
                <IoMdAdd color={hover ? "#079CDB" : "#C4C4C4"} size={hover ? 45 : 40} style={{cursor: 'pointer', transition: '0.2s linear'}} 
                onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} />
              </div>
              {data.map((x, ind) => {
                const statusText = StatusParser("sites", x.status)

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
                  <FiEdit color={editHover[ind] ? "#079CDB" : "#C4C4C4"} size={editHover[ind] ? 38 : 35} 
                    style={{cursor: 'pointer', transition: '0.2s linear', marginLeft: '1rem'}} 
                    onMouseEnter={() => {
                      let newStatus = [...editHover]
                      newStatus[ind] = true
                      setEditHover(newStatus)
                      return
                      }
                    } onMouseLeave={() => {
                      let newStatus = [...editHover]
                      newStatus[ind] = false
                      setEditHover(newStatus)
                      return
                      }
                    }
                    onClick={() => setOpenEditForm(x.id)} />
                  <FaRegTrashAlt color={trashHover[ind] ? "#CD0000" : "#C4C4C4"} size={trashHover[ind] ? 38 : 35} 
                    style={{cursor: 'pointer', transition: '0.2s linear', marginLeft: '1rem'}} 
                    onMouseEnter={() => {
                      let newStatus = [...trashHover]
                      newStatus[ind] = true
                      setTrashHover(newStatus)
                      return
                      }
                    } onMouseLeave={() => {
                      let newStatus = [...trashHover]
                      newStatus[ind] = false
                      setTrashHover(newStatus)
                      return
                      }
                    } onClick={() => removeElement(x.id)} />
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