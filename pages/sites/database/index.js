import Head from 'next/head'
import styles from '../../../styles/Database.module.css'
import Link from 'next/link'
// import { CosmosClient } from '@azure/cosmos';

import React, { useEffect, useState } from 'react';
import Navbar from '../../../components/shared/navbar/navbar';
import Header from '../../../components/shared/header/header';
import { useRouter } from 'next/router';
import { client } from '../../../api-lib/azure/azureConfig';
import { IoMdAdd } from 'react-icons/io'
import { FiEdit } from 'react-icons/fi'
import AddNewRegion from '../../../components/shared/forms/addRegion';
import { FaRegTrashAlt } from 'react-icons/fa';
import EditRegion from '../../../components/shared/forms/editRegion';

export async function getServerSideProps() {
  const database = client.database("uc-ctct");
  const container = database.container("Regions");
  const querySpec = {
    query : "SELECT * from f"
  }
  const { resources: data } = await container.items.query(querySpec).fetchAll();
  return { props: { data } }
}

export default function Database({ data }) {
  const [openForm, setOpenForm] = useState(false)
  const [openEditForm, setOpenEditForm] = useState(false)
  const [hover, setHover] = useState(false)
  const [editHover, setEditHover] = useState(Array(data.length).fill(false))
  const [trashHover, setTrashHover] = useState(Array(data.length).fill(false))

  const router = useRouter()
  const refreshData = () => {
    router.replace(router.asPath);
  }

  async function removeElement(id) {
    const database = client.database("uc-ctct");
    const container = database.container("Regions");
    await container.item(id, id).delete();
    refreshData()
    return
  }

  return (
    <React.Fragment>
      {openEditForm ? <EditRegion open={openEditForm} setOpen={setOpenEditForm} reload={refreshData} /> : null}
      {openForm ? <AddNewRegion open={openForm} setOpen={setOpenForm} reload={refreshData} /> : null}
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
                <IoMdAdd color={hover ? "#079CDB" : "#C4C4C4"} size={hover ? 45 : 40} style={{cursor: 'pointer', transition: '0.2s linear'}} 
                onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={() => setOpenForm(true)} />
              </div>
              {data.map((x, ind) => {
                return (
                  <div style={{width: '100%', height: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Link href={`/sites/database/site?location=${x['id']}`}>
                      <div className='displayRegionRow' key={`elem_${ind}`}>
                        <p style={{ marginLeft: '2rem', width: '70%' }}>{x['name']} Region</p>
                        <p style={{ width: '25%', textAlign: 'center' }}>{x['total_sites']}</p>
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
      <style >
      </style>
    </React.Fragment>
  )
}