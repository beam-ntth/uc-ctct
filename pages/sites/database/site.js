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
import { getRegion, getSitesFromRegion, removeSite } from '../../../api-lib/azure/azureOps';

// Import third-party icons
import { FiEdit } from 'react-icons/fi';
import { IoMdAdd } from 'react-icons/io';
import { FaRegTrashAlt } from 'react-icons/fa';
import AddNewSite from '../../../components/shared/forms/addSite';
import EditSite from '../../../components/shared/forms/editSite';
import SearchString from '../../../components/shared/search';

export async function getServerSideProps(context) {
  // ID for the region location, passed in as query param by previous page. 
  const location = context.query.location
  // TODO: CREATE GETTERS FOR REGION AND CLINIC -> THEN IMPLEMENT ERROR HANDLING WITH ERROR PAGE BY NEXTJS
  const region_data = await getRegion(location);
  const data = await getSitesFromRegion(location);
  return { props: { data, region_data } }
}

export default function SiteDetails({ data, region_data }) {
  const router = useRouter()
  const refreshData = () => {
    router.replace(router.asPath);
  }

  const [filteredData, setFilteredData] = useState(data)
  const [hover, setHover] = useState(false)
  const [openForm, setOpenForm] = useState(false)
  const [openEditForm, setOpenEditForm] = useState(false)
  const [editHover, setEditHover] = useState(Array(data.length).fill(false))
  const [trashHover, setTrashHover] = useState(Array(data.length).fill(false))

  function searchSiteName(substr) {
    setFilteredData(SearchString(data, substr))
  }

  async function removeElement(id, regionId) {
    console.log("ID", id);
    removeSite(id, regionId);
    setTimeout(() => refreshData(), 500)
    return
  }

  return (
    <React.Fragment>
      {openForm ? <AddNewSite open={openForm} setOpen={setOpenForm} reload={refreshData} regionId={region_data.id} /> : null}
      {openEditForm ? <EditSite open={openEditForm} setOpen={setOpenEditForm} reload={refreshData} /> : null}
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
              <div className={styles.searchBar}>
                <input className={styles.searchInput} placeholder="Search Site Name..." onChange={(x) => searchSiteName(x.target.value)} />
              </div>
              <div className={styles.row}>
                <p className='row1Sites' style={{ marginLeft: '2rem' }}>Site Name</p>
                <p className='row2Sites'>Affiliation</p>
                <p className='row3Sites'>Total Clinics</p>
                <p className='row4Sites'>Status</p>
                <IoMdAdd color={hover ? "#079CDB" : "#C4C4C4"} size={hover ? 45 : 40} style={{ cursor: 'pointer', transition: '0.2s linear' }}
                  onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={() => setOpenForm(true)} />
              </div>
              {filteredData.map((x, ind) => {
                const statusText = StatusParser("sites", parseInt(x.status))

                return (
                  <div style={{ width: '100%', height: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
                      onClick={() => setOpenEditForm(x.id)} />
                    <FaRegTrashAlt color={trashHover[ind] ? "#CD0000" : "#C4C4C4"} size={trashHover[ind] ? 38 : 35}
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
                      } onClick={() => removeElement(x.id, region_data.id)} />
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