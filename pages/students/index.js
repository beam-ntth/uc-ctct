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
import { v4 as uuidv4 } from "uuid";

// Import DB operation


// Importing components
import Navbar from '../../components/shared/navbar/navbar';
import Header from '../../components/shared/header/header';
import ValidateStudentDetails from '../../components/studentPage/validateDetails';

import { getAllStudents } from '../../api-lib/azure/azureOps';
import { client } from '../../api-lib/azure/azureConfig';

export async function getServerSideProps(context) {
  const students = await getAllStudents();

  /**
   * DEVELOPMENT PURPOSE: Only uncomment this part when you want
   * to delete every instance of student profile
   */
  // const database = client.database("uc-ctct");
  // const container = database.container("Students");
  // students.map(x => container.item(x.id, x.id).delete())

  return { props: { students } }
}

export default function Student({ students }) {
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
            const cleaned_obj = obj.map((x) => {
              
              function cleanUpName (name) {
                if (name.includes(" ")) {
                  const fnArr = name.split(" ").map(x => `${x.charAt(0).toUpperCase()}${x.slice(1).toLowerCase()}`)
                  return fnArr.join(" ")
                }
                if (name.includes("-")) {
                  const fnArr = name.split("-").map(x => `${x.charAt(0).toUpperCase()}${x.slice(1).toLowerCase()}`)
                  return fnArr.join("-")
                }
                return `${name.charAt(0).toUpperCase()}${name.slice(1).toLowerCase()}`
              }
              return {
                id: uuidv4().toString(),
                englishNative: x["Is English your native language?"],
                militaryService: x["Military_service"] == "" ? "No" : "Yes",
                dob: x["dob"],
                email: x["email"].toLowerCase(),
                ethnic: x["ethnic_background"] == "" ? "Unspecified" : x["ethnic_background"],
                firstName: cleanUpName(x["first_name"]),
                gender: x["gender_identity"] == "" ? "Unspecified" : x["gender_identity"],
                lastName: cleanUpName(x["last_name"]),
                medically_underserved: x["medically_underserved_community"] == "Y" ? "Yes" : "No",
                middleName: x["middle_name"] != ("-" || "") ? cleanUpName(x["middle_name"]) : "",
                addressLine1: cleanUpName(x["pref_address1"]),
                addressLine2: cleanUpName(x["pref_address2"]),
                city: cleanUpName(x["pref_city"]),
                country: x["pref_country"],
                postal: x["pref_postal_cd"],
                state: x["pref_state"].toUpperCase(),
                primary_degree: x["primary_education_degree"] == "" ? "Unspecified" : x["primary_education_degree"],
                primary_major: x["primary_education_major"] == "" ? "Unspecified" : x["primary_education_major"],
                phoneNumber: x["primary_phone"].replace(/[^\d]/g, ""),
                sex: x["sexual_orientation_descr"] == "" ? "Unspecified" : x["sexual_orientation_descr"],
                usCitizen: x["us_citizen"] == "US" ? "Yes" : `No (${x["us_citizen"]})`,
              }
            })
            setData(cleaned_obj)
            setValidation(true)
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

  /**
   * 
   */
  const [validation, setValidation] = useState(false)
  
  return (
    <React.Fragment>
      { validation ? <ValidateStudentDetails data={data} setOpen={ setValidation } reload={refreshData} setCsv={setCsvFile} /> : null }
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
                students.map((x, ind) => {
                  return (
                    <div style={{ width: '100%', height: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Link href={`/students/profile?id=${x.id}`}>
                        <div className='displayStudentRow' key={`elem_${ind}`}>
                          <p style={{ marginLeft: '2rem', width: '20%' }}>{x.firstName} {x.middleName} {x.lastName}</p>
                          <p style={{ width: '22%' }}>{x.email}</p>
                          <p style={{ width: '15%' }}>{x.phoneNumber}</p>
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