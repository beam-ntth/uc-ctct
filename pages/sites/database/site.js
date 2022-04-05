// Import Next & React modules
import Head from 'next/head'
import Link from 'next/link'
import dynamic from 'next/dynamic';
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

// Only load when user clicks on it to improve performance
const AddNewSite = dynamic(() => import('../../../components/shared/forms/addSite'));
const EditSite = dynamic(() => import('../../../components/shared/forms/editSite'));
const SearchString = dynamic(() => import('../../../components/shared/search'));

export async function getServerSideProps(context) {
  // ID for the region location, passed in as query param by previous page. 
  const location = context.query.location
  // TODO: CREATE GETTERS FOR REGION AND CLINIC -> THEN IMPLEMENT ERROR HANDLING WITH ERROR PAGE BY NEXTJS
  const region_data = await getRegion(location);
  const data = await getSitesFromRegion(location);
  return { props: { data, region_data } }
}

export default function SiteDetails({ data, region_data }) {
  /**
   * Global state of the current displayed data
   * - Initialized with all the site data
   */
  const [filteredData, setFilteredData] = useState(data)
  
  /**
   * Status of all the buttons, whether the user hovers over it
   * true = display as active, false = display as inactive
   */
  const [addHover, setAddHover] = useState(false)
  const [editHover, setEditHover] = useState(Array(data.length).fill(false))
  const [trashHover, setTrashHover] = useState(Array(data.length).fill(false))
  
  /**
   * Status of all the forms in this page
   * true = open form, false = close form
   */
  const [openForm, setOpenForm] = useState(false)
  const [openEditForm, setOpenEditForm] = useState(false)

  /**
   * Create a refresh data function to reload page when there 
   * is any changes to the database
   */
  const router = useRouter()
  const refreshData = () => {
    router.replace(router.asPath);
  }

  /**
   * Filter displayed data via name
   * @param {String} substr - search string inputted by the user 
   */
  function searchSiteName(substr) {
    setFilteredData(SearchString(data, substr))
  }

  /**
   * Remove site element and update total number of sites in the region
   * @param {String} id - UUID of site to remove. 
   * @param {String} regionId - UUID of region to update total number of sites. 
   */
  async function removeElement(id, regionId) {
    await removeSite(id, regionId);
    refreshData()
    return
  }

  /**
   * This function take in 'effect' by reinitialize filteredData with data from DB
   * when there is any changes to the DB data
   */
  useEffect(() => {
    setFilteredData(data)
  }, [data])

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
                <div style={{ width: '85%' }}>
                  <div style={{ display: 'flex', width: '97%' }}>
                  <p className='row1Sites'>Site Name</p>
                  <p className='row2Sites'>Total Clinics</p>
                  <p className='row3Sites'>Total Active Preceptors</p>
                  <p className='row4Sites'>Status</p>
                  </div>
                  {/* Fake color tab for alignment */}
                  <p style={{ width: '3%', margin: 0 }}></p>
                </div>
                <IoMdAdd color={addHover ? "#079CDB" : "#C4C4C4"} size={addHover ? 45 : 40} style={{ cursor: 'pointer', transition: '0.2s linear' }}
                  onMouseEnter={() => setAddHover(true)} onMouseLeave={() => setAddHover(false)} onClick={() => setOpenForm(true)} />
              </div>
              {
                filteredData.map((x, ind) => {
                  const statusText = StatusParser("sites", parseInt(x.status))
                  return (
                    <div style={{ width: '100%', height: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                      <Link href={`/sites/database/clinics?location=${x.id}`}>
                        <div key={`site_${ind}`} className='displayRow'>
                          <div className='rowContentClinics'>
                            <p className='row1Sites'>{x['name']}</p>
                            <p className='row2Sites'>{x['total_clinics']}</p>
                            <p className='row3Sites'>0</p>
                            <p className="row4Sites">{statusText}</p>
                          </div>
                          <div className={`siteTag${x['status']}`}></div>
                        </div>
                      </Link>
                      <FiEdit color={editHover[ind] ? "#079CDB" : "#C4C4C4"} size={editHover[ind] ? 38 : 35}
                        style={{ cursor: 'pointer', transition: '0.2s linear', marginLeft: '1rem' }}
                        onMouseEnter={() => {
                          let newStatus = [...editHover]
                          newStatus[ind] = true
                          setEditHover(newStatus)
                          return
                        }} 
                        onMouseLeave={() => {
                          let newStatus = [...editHover]
                          newStatus[ind] = false
                          setEditHover(newStatus)
                          return
                        }}
                        onClick={() => setOpenEditForm(x.id)} />
                      <FaRegTrashAlt color={trashHover[ind] ? "#CD0000" : "#C4C4C4"} size={trashHover[ind] ? 38 : 35}
                        style={{ cursor: 'pointer', transition: '0.2s linear', marginLeft: '1rem' }}
                        onMouseEnter={() => {
                          let newStatus = [...trashHover]
                          newStatus[ind] = true
                          setTrashHover(newStatus)
                          return
                        }} 
                        onMouseLeave={() => {
                          let newStatus = [...trashHover]
                          newStatus[ind] = false
                          setTrashHover(newStatus)
                          return
                        }} 
                        onClick={() => removeElement(x.id, region_data.id)} />
                    </div>
                  )
                })
              }
            </div>
          </div>
        </main>
      </div>
    </React.Fragment>
  )
}