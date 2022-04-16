// Importing Next and React modules
import Head from 'next/head'
import Link from 'next/link'
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { IoMdAdd } from 'react-icons/io'
import { FiEdit } from 'react-icons/fi'
import styles from '../../styles/Database.module.css'

// Import DB operation
import { getAllRegions, removeRegion } from '../../api-lib/azure/azureOps';

// Importing components
import Navbar from '../../components/shared/navbar/navbar';
import Header from '../../components/shared/header/header';

// Only load when user clicks on it to improve performance
const AddNewRegion = dynamic(() => import('../../components/shared/forms/addRegion'));
const EditRegion = dynamic(() => import('../../components/shared/forms/editRegion'));

export async function getServerSideProps() {
  const data = await getAllRegions();
  return { props: { data } }
}

export default function Database({ data }) {
  /**
   * Status of all the forms in this page
   * true = open form, false = close form
   */ 
  const [openForm, setOpenForm] = useState(false)
  const [openEditForm, setOpenEditForm] = useState(false)
  
  /**
   * Status of all the buttons, whether the user hovers over it
   * true = display as active, false = display as inactive
   */
  const [hover, setHover] = useState(false)
  const [editHover, setEditHover] = useState(Array(data.length).fill(false))
  // const [trashHover, setTrashHover] = useState(Array(data.length).fill(false))

  /**
   * Create a refresh data function to reload page when there 
   * is any changes to the database
   */
  const router = useRouter()
  const refreshData = () => {
    router.replace(router.asPath);
  }

  /**
   * Remove site element and update total number of sites in the region
   * @param {String} id - UUID of region to remove. 
   */
  async function removeElement(id) {
    await removeRegion(id);
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
            <Header header="Management Overview" imgSrc="/asset/images/user-image.png" />
            <div className={styles.data}>
              <div className={styles.row}>
                <div style={{ display: 'flex', width: '90%' }}>
                  <p style={{ width: '70%', marginLeft: '2rem' }}>Affiliation</p>
                  <p style={{ width: '20%' }}>Total Active Sites</p>
                </div>
                {/* <IoMdAdd color={hover ? "#079CDB" : "#C4C4C4"} size={hover ? 45 : 40} style={{ cursor: 'pointer', transition: '0.2s linear' }}
                  onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={() => setOpenForm(true)} /> */}
              </div >
              {
                data.map((x, ind) => {
                  return (
                    <div style={{ width: '100%', height: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Link href={`/sites/database/?location=${x['id']}`}>
                        <div className='displayRegionRow' key={`elem_${ind}`}>
                          <p style={{ marginLeft: '2rem', width: '70%' }}>{x['name']}</p>
                          <p style={{ width: '20%', textAlign: 'left', paddingLeft: '1.5rem' }}>{x['total_sites']}</p>
                        </div>
                      </Link>
                      {/* <FiEdit color={editHover[ind] ? "#079CDB" : "#C4C4C4"} size={editHover[ind] ? 38 : 35}
                        style={{ cursor: 'pointer', transition: '0.2s linear', marginLeft: '1rem' }}
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
                        onClick={() => setOpenEditForm([x.id, x.name])} /> */}
                      {/* <FaRegTrashAlt color={trashHover[ind] ? "#CD0000" : "#C4C4C4"} size={trashHover[ind] ? 38 : 35}
                        style={{ cursor: 'pointer', transition: '0.2s linear', marginLeft: '1rem' }}
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
                        } onClick={() => removeElement(x.id)} /> */}
                    </div >
                  )
                })
              }
            </div >
          </div >
        </main >
      </div >
      <style >
      </style>
    </React.Fragment >
  )
}