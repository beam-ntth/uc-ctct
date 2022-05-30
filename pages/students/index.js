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
import ValidateEditStudentDetails from '../../components/studentPage/validateEditDetails';
import { runAuthMiddleware } from '../../api-lib/auth/authMiddleware';

export async function getServerSideProps({ req, res }) {
  const redirect = await runAuthMiddleware(req, res);
  // If the user is invalid then we redirect them back to the index.js page
  if (redirect) return redirect;

  const students = await getAllStudents();

  /**
   * DEVELOPMENT PURPOSE: Only uncomment this part when you want
   * to delete every instance of student profile
   */
  // const database = client.database("uc-ctct");
  // const container = database.container("Students");
  // students.map(x => container.item(x.id, x.id).delete())

  return { props: { students, user: req.user } }
}

export default function Student({ students, user }) {
  const [addStudentHover, setAddStudentHover] = useState(false)
  const [editStudentHover, setEditStudentHover] = useState(false)
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
  const [updateInfoData, setUpdateInfoData] = useState(null)
  const [updateInfoCsvFile, setUpdateInfoCsvFile] = useState(null)
  const [updateInfoFileElem, setUpdateInfoFileElem] = useState(null)

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
                county: "",
                country: x["pref_country"],
                postal: x["pref_postal_cd"],
                state: x["pref_state"].toUpperCase(),
                primary_degree: x["primary_education_degree"] == "" ? "Unspecified" : x["primary_education_degree"],
                primary_major: x["primary_education_major"] == "" ? "Unspecified" : x["primary_education_major"],
                phoneNumber: x["primary_phone"].replace(/[^\d]/g, ""),
                sex: x["sexual_orientation_descr"] == "" ? "Unspecified" : x["sexual_orientation_descr"],
                usCitizen: x["us_citizen"] == "US" ? "Yes" : `No (${x["us_citizen"]})`,
                status: "Active",
                location_affiliation: "",
                survey: {
                  hasResponded: false,
                  responseDate: "",
                  data: {}
                },
                assignment: {
                  isAssigned: false,
                  primary_choice: {
                      clinic_id: "",
                      preceptor_id: "",
                      date_assigned: ""
                  },
                  secondary_choice: {
                      clinic_id: "",
                      preceptor_id: "",
                      date_assigned: ""
                  },
                  tertiary_choice: {
                      clinic_id: "",
                      preceptor_id: "",
                      date_assigned: ""
                  }
                },
                assignedPreceptor: false,
                year: `${ new Date().getFullYear() }`,
                notes: [],
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
   * Parse the CSV file and update the "updateInfoData" state, whenever there is
   * a new CSV file uploaded to the site 
   */
   useEffect(() => {
    if (updateInfoCsvFile != null) {
      const reader = new FileReader();
      reader.addEventListener('load', function (e) {   
        let csvdata = e.target.result; 
        csv().fromString(csvdata).then(
          obj => {
            const cleaned_obj = obj.map((x) => {
              return {
                firstName: x["first_name"],
                middleName: x["middle_name"],
                lastName: x["last_name"],
                email: x["home_email"],
                affiliatedEmail: x["affiliated_email"],
              }
            })
            setUpdateInfoData(cleaned_obj)
            setUpdateValidation(true)
          }
        )
      });
      reader.readAsBinaryString(updateInfoCsvFile)
    }
  }, [updateInfoCsvFile])

  /**
   * Initialize hidden CSV upload button
   */
  useEffect(() => {
    setFileElem(document.getElementById('fileElem'));
    setUpdateInfoFileElem(document.getElementById('updateFileElem'));
  }, [])

  /**
   * Set a state for validation pop-up screen, asking user to check everything before
   * uploading to the database
   */
  const [validation, setValidation] = useState(false)
  const [updatevalidation, setUpdateValidation] = useState(false)

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
  
  return (
    <React.Fragment>
      { validation ? <ValidateStudentDetails data={data} setOpen={ setValidation } reload={ refreshData } setCsv={ setCsvFile } /> : null }
      { updatevalidation ? <ValidateEditStudentDetails data={updateInfoData} setOpen={ setUpdateValidation } reload={ refreshData } setCsv={ setUpdateInfoCsvFile } /> : null }
      <div className={styles.container}>
        <Head>
          <title>UC-CTCT: Site Management Systems</title>
          <meta name="description" content="University of California - Clinic Coordination Tools" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
          <Navbar icons={[false, false, true, false, false]} />
          <div className={styles.content}>
            <Header header={`Student Management ${ page == 'Default' ? 'Full Overview' : '- ' + page }`} imgSrc={user.photo ? user.photo : "/asset/images/user-image.png"} />

            {/* Hidden file upload button */}
            <input type={'file'} id={'fileElem'} style={{display: 'none'}} onChange={(e) => setCsvFile(e.target.files[0])} />
            <input type={'file'} id={'updateFileElem'} style={{display: 'none'}} onChange={(e) => setUpdateInfoCsvFile(e.target.files[0])} />

            {/* Switching between pages */}
            { page === 'Default' ? 
            <div className={styles.selectUniversities}>
              <div className={styles.selectIndiUni}>
                <div className={styles.universityBtn3} onClick={() => setPage('UCD')}>
                  <img src='/asset/images/school_logos/UCD_logo.png' height='15%' />
                </div>
                <div className={styles.universityBtn} onClick={() => setPage('UCSF')}>
                  <img src='/asset/images/school_logos/UCSF_logo.png' />
                </div>
              </div>
              <div className={styles.selectIndiUni}>
                <div className={styles.universityBtn2} onClick={() => setPage('UCLA')}>
                  <img src='/asset/images/school_logos/UCLA_logo.png'  height='15%'/>
                </div>
                <div className={styles.universityBtn4} onClick={() => setPage('UCI')}>
                  <img src='/asset/images/school_logos/UCI_logo.png' height='15%'/>
                </div>
              </div>
              <div className={styles.allUniversities} onClick={() => setPage('ALL')}>
                <p>Show all universities</p>
              </div>
              <div className={styles.uploadBtns}>
                <div className={styles.fileUpload} style={ addStudentHover ? { height: '96%', width: '101%', transition: 'linear 0.2s' } : {} }
                  onClick={() => fileElem != null ? fileElem.click() : null} 
                  onMouseEnter={() => setAddStudentHover(true)} 
                  onMouseLeave={() => setAddStudentHover(false)} >
                  <p style={ addStudentHover ? { fontSize: '1.1rem', marginRight: '1rem', transition: 'linear 0.2s' } 
                  : { marginRight: '1rem', transition: 'linear 0.2s' } }>
                    Add student profile with CSV
                  </p>
                  <FiUpload color={ addStudentHover ? "#079CDB" : "#C4C4C4" } size={ addStudentHover ? 35 : 30 } 
                  style={{ cursor: 'pointer', transition: 'linear 0.2s' }} />
                </div>
                {/* <div className={styles.fileUpload} style={ editStudentHover ? { height: '96%', width: '49%', transition: 'linear 0.2s' } : {} }
                  onClick={() => {
                      alert(`BEFORE UPLOADING THE FILE!\nPlease make sure the first two columns are:\n1. Student Name\n2. Student Home Email\nThe system will not match student records correctly if the two fields are not correct.`)
                      updateInfoFileElem != null ? updateInfoFileElem.click() : null
                    }
                  } 
                  onMouseEnter={() => setEditStudentHover(true)} 
                  onMouseLeave={() => setEditStudentHover(false)} >
                  <p style={ editStudentHover ? { fontSize: '1.1rem', marginRight: '1rem', transition: 'linear 0.2s' } 
                  : { marginRight: '1rem', transition: 'linear 0.2s' } }>
                    Edit student profile with CSV
                  </p>
                  <FiUpload color={ editStudentHover ? "#079CDB" : "#C4C4C4" } size={ editStudentHover ? 35 : 30 } 
                  style={{ cursor: 'pointer', transition: 'linear 0.2s' }} />
                </div> */}
              </div>
            </div> : null }

            { page === 'UCD' ? <DisplayUCD students={students.filter(x => x.location_affiliation == "UC Davis")} setPage={setPage} /> : null }
            { page === 'UCLA' ? <DisplayUCLA students={students.filter(x => x.location_affiliation == "UC Los Angeles")} setPage={setPage} /> : null }
            { page === 'UCI' ? <DisplayUCI students={students.filter(x => x.location_affiliation == "UC Irvine")} setPage={setPage} /> : null }
            { page === 'UCSF' ? <DisplayUCSF students={students.filter(x => x.location_affiliation == "UC San Francisco")} setPage={setPage} /> : null }
            { page === 'ALL' ? <DisplayALL students={students} setPage={setPage} /> : null }
          </div >
        </main >
      </div >
      <style >
      </style>
    </React.Fragment >
  )
}