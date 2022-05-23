// Importing Next and React modules
import Head from 'next/head'
import Link from 'next/link'
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styles from '../../styles/Database.module.css'

// Import DB operation
import { getAllRegions, removeRegion } from '../../api-lib/azure/azureOps';

// Importing components
import Navbar from '../../components/shared/navbar/navbar';
import Header from '../../components/shared/header/header';
import { runAuthMiddleware } from '../../api-lib/auth/authMiddleware';

// Only load when user clicks on it to improve performance
const AddNewRegion = dynamic(() => import('../../components/shared/forms/addRegion'));
const EditRegion = dynamic(() => import('../../components/shared/forms/editRegion'));

export async function getServerSideProps( {req, res} ) {
  const redirect = await runAuthMiddleware(req, res);
  // If the user is invalid then we redirect them back to the index.js page
  if (redirect) return redirect;

  const data = await getAllRegions();
  return { props: { data, user: req.user } }
}

export default function Database({ data, user }) {
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
            <Header header="Management Overview" imgSrc={user.photo ? user.photo : "/asset/images/user-image.png"} />
            <div className={styles.data}>
              <div className={styles.row}>
                <div style={{ display: 'flex', width: '90%' }}>
                  <p style={{ width: '50%', marginLeft: '2rem' }}>Affiliation</p>
                  <p style={{ width: '40%' }}>Total Active Sites</p>
                </div>
              </div >
              <div style={{ width: '100%', height: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Link href={`/sites/database/`}>
                  <div className='displayRegionRow' key={`elem_ALL`}>
                    <p style={{ marginLeft: '2rem', width: '50%' }}>All Affiliations</p>
                    <p style={{ width: '40%', textAlign: 'left', paddingLeft: '1.5rem' }}>{data.map(x => x.total_sites).reduce((acc, a) => acc + a, 0)}</p>
                  </div>
                </Link>
              </div >
              {
                data.map((x, ind) => {
                  return (
                    <div style={{ width: '100%', height: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Link href={`/sites/database/?location=${x['id']}`}>
                        <div className='displayRegionRow' key={`elem_${ind}`}>
                          <p style={{ marginLeft: '2rem', width: '50%' }}>{x['name']}</p>
                          <p style={{ width: '40%', textAlign: 'left', paddingLeft: '1.5rem' }}>{x['total_sites']}</p>
                        </div>
                      </Link>
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