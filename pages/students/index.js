// Importing Next and React modules
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

// Import styles and icons modules
import styles from '../../styles/Students.module.css'
import { FaRegTrashAlt } from 'react-icons/fa';
import { IoMdAdd } from 'react-icons/io'
import { FiEdit, FiUpload } from 'react-icons/fi'

import csv from 'csvtojson'

// Import DB operation


// Importing components
import Navbar from '../../components/shared/navbar/navbar';
import Header from '../../components/shared/header/header';

export default function Student({}) {
  const [hover, setHover] = useState(false)

  const router = useRouter()
  const refreshData = () => {
    router.replace(router.asPath);
  }

  /**
   * Initiate states to parse and store uploaded data from a CSV file
   */
  const [data, setData] = useState([])
  const [csvFile, setCsvFile] = useState(null)
  const [fileElem, setFileElem] = useState(null)

  /**
   * Parse the CSV file and update the "data" state, whenever there is
   * a new CSV file uploaded to the site 
   */
  useEffect(() => {
    if (csvFile != null) {
      const reader = new FileReader();
      reader.addEventListener('load', function (e) {   
        let csvdata = e.target.result; 
        csv().fromString(csvdata).then(
          obj => {
            console.log(obj)
            setData(obj)
          }
        )
      });
      reader.readAsBinaryString(csvFile)
    }
  }, [csvFile])

  /**
   * Initialize hidden CSV upload button
   */
  useEffect(() => setFileElem(document.getElementById('fileElem')), [])
  
  return (
    <React.Fragment>
      <div className={styles.container}>
        <Head>
          <title>UC-CTCT: Site Management Systems</title>
          <meta name="description" content="University of California - Clinic Coordination Tools" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
          <Navbar icons={[false, false, true, false, false]} />
          <div className={styles.content}>
            <Header header="Student Management Overview" imgSrc="/asset/images/user-image.png" back={router.back} />
            <div className={styles.data}>
            <input type={'file'} onChange={(e) => setCsvFile(e.target.files[0])} style={{display: 'none'}} />
              <div className={styles.row}>
                <p className={styles.titleCol1}>Name</p>
                <p className={styles.titleCol2}>Status</p>
                <p className={styles.titleCol3}>Population Age</p>
                <p className={styles.titleCol4}>Primary Site</p>
                <p className={styles.titleCol5}>Secondary Site</p>
                <p className={styles.titleCol6}>Affiliation</p>
                <input type={'file'} id={'fileElem'} style={{display: 'none'}} onChange={(e) => setCsvFile(e.target.files[0])} />
                <FiUpload color={hover ? "#079CDB" : "#C4C4C4"} size={hover ? 55 : 50} 
                style={{ cursor: 'pointer', transition: 'linear 0.2s' }} 
                onClick={() => fileElem != null ? fileElem.click() : null}
                onMouseEnter={() => setHover(true)} 
                onMouseLeave={() => setHover(false)} />
              </div >
              {
                data.map((x, ind) => {
                  return (
                    <div style={{ width: '100%', height: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Link href={`/sites/database/site?location=${ind}`}>
                        <div className='displayStudentRow' key={`elem_${ind}`}>
                          <p style={{ marginLeft: '2rem', width: '20%' }}>{x['first_name']} {x['last_name']}</p>
                          <p style={{ width: '20%' }}>{x.email.length > 20 ? `${x.email.substring(0, 20).toLowerCase()}...` : x.email.toLowerCase()}</p>
                          <p style={{ width: '15%' }}>{x['primary_phone']}</p>
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