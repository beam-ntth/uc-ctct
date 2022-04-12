// Importing Next and React modules
import Head from 'next/head'
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

// Import styles and icons modules
import styles from '../../styles/Students.module.css'
import { FiEdit, FiUpload } from 'react-icons/fi'
import csv from 'csvtojson'
import { v4 as uuidv4 } from "uuid";

// Import DB operation

// Importing components
import Navbar from '../../components/shared/navbar/navbar';
import Header from '../../components/shared/header/header';
import ValidateStudentDetails from '../../components/studentPage/validateDetails';
const DisplayALL = dynamic(() => import('../../components/studentPage/displayAll'));
const DisplayUCD = dynamic(() => import('../../components/studentPage/displayDavis'))
const DisplayUCLA = dynamic(() => import('../../components/studentPage/displayLA'));
const DisplayUCI = dynamic(() => import('../../components/studentPage/displayIrvine'))
const DisplayUCSF = dynamic(() => import('../../components/studentPage/displaySF'))

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
  const [page, setPage] = useState('Default')

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
              /**
               * Clean up the string so that everything follows the same pattern
               * Pattern: {CAP}{lower} {CAP}{lower}-{CAP}{lower} | hello WORLD-examPLE -> Hello World-Example
               */
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
                survey: {
                  lastSent: "",
                  sentCount: "0",
                  responseDate: ""
                },
                assignedPreceptor: false,
                year: `${ new Date().getFullYear() }`,
                metadata: {
                  date_format: 'mm/dd/yyyy',
                  date_added: `${ new Date().getMonth() }/${ new Date().getDate() }/${ new Date().getFullYear() }`,
                  date_last_updated: `${ new Date().getMonth() }/${ new Date().getDate() }/${ new Date().getFullYear() }`
                }
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
   * Set a state for validation pop-up screen, asking user to check everything before
   * uploading to the database
   */
  const [validation, setValidation] = useState(false)

  /**
   * Activate loading on the client-side, [] means only load once
   */
   useEffect(() => {
    const stickyValue = window.localStorage.getItem('studentPageSetting');
    stickyValue !== null ? setPage(JSON.parse(stickyValue)) : setPage("Default")
  }, [])

  /**
   * Save user's last state in local storage, so when they click 'go back' button
   * in the browser, they don't have tp re-choose the page again
   */
  useEffect(() => {
    window.localStorage.setItem('studentPageSetting', JSON.stringify(page))
  }, [page])

  /**
   * Configure Header Text
   */
  
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
            <Header header={`Student Management ${ page == 'Default' ? 'Full Overview' : '- ' + page }`} imgSrc="/asset/images/user-image.png" />

            {/* Hidden file upload button */}
            <input type={'file'} onChange={(e) => setCsvFile(e.target.files[0])} style={{display: 'none'}} />
            <input type={'file'} id={'fileElem'} style={{display: 'none'}} onChange={(e) => setCsvFile(e.target.files[0])} />

            {/* Switching between pages */}
            { page === 'Default' ? <div className={styles.selectUniversities}>
              <div className={styles.fileUpload} style={ hover ? { height: '11%', width: '91%', transition: 'linear 0.2s' } : {} }
                onClick={() => fileElem != null ? fileElem.click() : null} onMouseEnter={() => setHover(true)} 
                onMouseLeave={() => setHover(false)} >
                <p style={ hover ? { fontSize: '1.1rem', marginRight: '1rem', transition: 'linear 0.2s' } 
                : { marginRight: '1rem', transition: 'linear 0.2s' } }>
                  Upload the CSV file here
                </p>
                <FiUpload color={ hover ? "#079CDB" : "#C4C4C4" } size={ hover ? 35 : 30 } 
                style={{ cursor: 'pointer', transition: 'linear 0.2s' }} />
              </div>
              <div className={styles.allUniversities} onClick={() => setPage('ALL')}>
                <p>Show all universities</p>
              </div>
              <div className={styles.selectIndiUni}>
                <div className={styles.universityBtn} onClick={() => setPage('UCD')}>
                  <img src='/asset/images/school_seals/UCD_Seal.png' />
                  <p>UC Davis</p>
                </div>
                <div className={styles.universityBtn} onClick={() => setPage('UCSF')}>
                  <img src='/asset/images/school_seals/UCSF_Seal.png' />
                  <p>UCSF</p>
                </div>
              </div>
              <div className={styles.selectIndiUni}>
                <div className={styles.universityBtn} onClick={() => setPage('UCLA')}>
                  <img src='/asset/images/school_seals/UCLA_Seal.png' />
                  <p>UCLA</p>
                </div>
                <div className={styles.universityBtn} onClick={() => setPage('UCI')}>
                  <img src='/asset/images/school_seals/UCI_Seal.png' />
                  <p>UC Irvine</p>
                </div>
              </div>
            </div> : null }

            { page === 'UCD' ? <DisplayUCD students={students} setPage={setPage} /> : null }
            { page === 'UCLA' ? <DisplayUCLA students={students} setPage={setPage} /> : null }
            { page === 'UCI' ? <DisplayUCI students={students} setPage={setPage} /> : null }
            { page === 'UCSF' ? <DisplayUCSF students={students} setPage={setPage} /> : null }
            { page === 'ALL' ? <DisplayALL students={students} setPage={setPage} /> : null }
          </div >
        </main >
      </div >
      <style >
      </style>
    </React.Fragment >
  )
}