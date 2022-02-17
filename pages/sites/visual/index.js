// Import React & Next modules
import Head from 'next/head'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import React, { useEffect, useState, Component } from "react";
import styles from '../../../styles/Visualization.module.css'

// Import Next Components
import Chart from 'chart.js/auto'
import Navbar from '../../../components/shared/navbar/navbar';
import Header from '../../../components/shared/header/header';
import PieChart from '../../../components/Charts/piechart';
import BarChart from '../../../components/Charts/barcharts';
import StatusParser from '../../../components/shared/status';
// import Dropdown from '../../../components/visualPage/dropdown';

// Import DB component
import { client } from '../../../api-lib/azure/azureConfig';
import { IoSearch } from 'react-icons/io5';
import { IoIosArrowDown } from 'react-icons/io'
import SearchString from '../../../components/shared/search';

export async function getServerSideProps() {
  const database = client.database("uc-ctct");
  const container = database.container("Clinics");
  const preceptor_container = database.container("Preceptors");
  const { resources: data } = await container.items.query("SELECT * FROM c").fetchAll();
  const { resources: preceptor_data } = await preceptor_container.items.query("SELECT * FROM c").fetchAll();
  return { props: { data, preceptor_data } }
}

export default function Visualization({ data, preceptor_data }) {
  const [searchClinic, setSearchClinic] = useState(true)
  const [filteredClinicData, setFilteredClinicData] = useState(data)
  const [filteredPrecepData, setFilteredPrecepData] = useState(data)
  const [showRegionForm, setShowRegionForm] = useState(false)
  const [showSiteForm, setShowSiteForm] = useState(false)
  const [showStatusForm, setShowStatusForm] = useState(false)

  const DropdownMultiple = dynamic(
    async () => {
      const module = await import('reactjs-dropdown-component');
      const DDM = module.DropdownMultiple;
  
      return ({ forwardedRef, ...props }) => <DDM ref={forwardedRef} {...props} />;
    },
    { ssr: false },
  );

  function searchClinicName(substr) {
    setFilteredClinicData(SearchString(data, substr))
  }

  function searchPreceptorName(substr) {
    setFilteredPrecepData(SearchString(data, substr))
  }

  const clinicData = <React.Fragment>
    <div className={styles.row}>
        <p className={styles.titleCol1}>Clinic Name</p>
        <p className={styles.titleCol2}>Affiliation</p>
        <p className={styles.titleCol3}>Region</p>
        <p className={styles.titleCol4}>Status</p>
    </div>  
    {filteredClinicData.map((x, ind) => {
      const statusText = StatusParser("clinics", parseInt(x.status))
      return (
        <Link href={`/sites/database/clinics/clinic?name=${x.id}`}>
          <div key={`clinics_${ind}`} className='displayRow'>
              <div className="rowContentClinics">
                <p className={styles.dataCol1} style={{ marginLeft: '2rem' }}>{x.name}</p>
                <p className={styles.dataCol2}>{x.affiliation}</p>
                <p className={styles.dataCol3}>{x.region}</p>
                <p className={styles.dataCol4} style={{ marginRight: '2rem' }}>{statusText}</p>
              </div>
            <div className={`tag${x['status']}`}></div>
          </div>
      </Link>
      )}
      )
    }
    </React.Fragment>

  const preceptorData = <React.Fragment>
    <div className={styles.row}>
        <p className={styles.titleCol1}>Preceptor Name</p>
        <p className={styles.titleCol2}>Position</p>
        <p className={styles.titleCol3}>Credential</p>
        <p className={styles.titleCol4}>Status</p>
    </div>
    {filteredPrecepData.map((x, ind) => {
    const statusText = StatusParser("preceptors", parseInt(x.status))
    return (
      <Link href={`/sites/database/clinics/preceptor?${x.id}`}>
        <div key={`clinics_${ind}`} className='displayRow'>
            <div className="rowContentClinics">
              <p className={styles.dataCol1} style={{ marginLeft: '2rem' }}>{x.name}</p>
              <p className={styles.dataCol2}>{x.position}</p>
              <p className={styles.dataCol3}>{x.credential}</p>
              <p className={styles.dataCol4} style={{ marginRight: '2rem' }}>{statusText}</p>
            </div>
          <div className={`tag${x['status']}`}></div>
        </div>
    </Link>
    )}
    )
  }
  </React.Fragment>

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
            <Header header="Data Analytics" imgSrc="/asset/images/user-image.png" />
            <div className={styles.data}>
              <div className={styles.toggleRow}>
                <p className={styles.toggleTitle}
                  style={searchClinic ? { marginRight: '5rem', fontWeight: 'bold', opacity: '100%' } : { marginRight: '5rem', opacity: '60%' }}
                  onClick={() => setSearchClinic(true)} > Clinic </p>
                <p className={styles.toggleTitle}
                  style={searchClinic ? { opacity: '60%' } : { fontWeight: 'bold', opacity: '100%' }}
                  onClick={() => setSearchClinic(false)} > Preceptor </p>
              </div>
              <div className={styles.filterRow}>
                <div className={styles.searchBar}>
                  <input className={styles.searchInput} placeholder={searchClinic ? "Enter Clinic Name ..." : "Enter Preceptor Name ..."} onChange={(x) => searchClinicName(x.target.value)} />
                  {/* <div className={styles.searchBtn}>
                    <IoSearch color='#fff' />
                  </div> */}
                </div>
                <div className={styles.regionForm}>
                  <DropdownMultiple
                    name="locations"
                    searchable={['Search for location', 'No matching location']}
                    titleSingular="Location"
                    title="Regions"
                    list={"Region 1", "Region 2", "Region 3"}
                    styles={{
                      headerTitle: {
                        fontSize: '1rem'
                      },
                      wrapper: {
                        height: '100%',
                        width: 'auto',
                        backgroundColor: '#fff',
                        borderRadius: '0.6rem',
                        border: '1px solid #C4C4C4'
                      }
                    }}
                  />
                </div>
                <div className={styles.siteForm}>
                  <div className={styles.formTitle}>
                    <p>Site</p>
                    <IoIosArrowDown color='#079CDB' />
                  </div>
                  <form></form>
                </div>
                <div className={styles.statusForm}>
                  <div className={styles.formTitle}>
                    <p>Status</p>
                    <IoIosArrowDown color='#079CDB' />
                  </div>
                  <form></form>
                </div>
              </div>
              {searchClinic ? clinicData : preceptorData}
              </div>
            </div>
        </main>
      </div>
    </React.Fragment>
  )
}

