// Importing Next and React modules
import Head from 'next/head'
import styles from '../../styles/Students.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { IoMdAdd } from 'react-icons/io'
import { FiEdit } from 'react-icons/fi'
import csv from 'csvtojson'

// Import DB operation


// Importing components
import Navbar from '../../components/shared/navbar/navbar';
import Header from '../../components/shared/header/header';
import AddNewRegion from '../../components/shared/forms/addRegion';
import EditRegion from '../../components/shared/forms/editRegion';

// export async function getServerSideProps() {
  
//   return { props: { data } }
// }

export default function Student({}) {
//   const [openForm, setOpenForm] = useState(false)
//   const [openEditForm, setOpenEditForm] = useState(false)
//   const [hover, setHover] = useState(false)
//   const [editHover, setEditHover] = useState(Array(data.length).fill(false))
//   const [trashHover, setTrashHover] = useState(Array(data.length).fill(false))

  const router = useRouter()
  const refreshData = () => {
    router.replace(router.asPath);
  }
  const [data, setData] = useState([])
  const [csvFile, setCsvFile] = useState(null)

//   async function removeElement(id) {
//     setTimeout(() => refreshData(), 500)
//     return
//   }

  useEffect(() => {
    if (csvFile != null) {
      console.log(csvFile)
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
                {/* <input type={'file'} onChange={(e) => setCsvFile(e.target.files[0])} /> */}
                {/* <IoMdAdd color={hover ? "#079CDB" : "#C4C4C4"} size={hover ? 45 : 40} style={{ cursor: 'pointer', transition: '0.2s linear' }}
                  onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={() => setOpenForm(true)} /> */}
              </div >
              {
                data.map((x, ind) => {
                  return (
                    <div style={{ width: '100%', height: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Link href={`/sites/database/site?location=${ind}`}>
                        <div className='displayRegionRow' key={`elem_${ind}`}>
                          <p style={{ marginLeft: '2rem', width: '10%' }}>{x['first_name']}</p>
                          <p style={{ width: '15%' }}>{x['last_name']}</p>
                          <p style={{ width: '25%' }}>{x.email}</p>
                          <p style={{ width: '15%' }}>{x['primary_phone']}</p>
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