// Import React & Next modules
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "../../../../styles/Preceptor.module.css";

// Import Next Components
import Navbar from "../../../../components/shared/navbar/navbar";
import Header from "../../../../components/shared/header/header";
import AddNewNote from "../../../../components/clinicPage/addNewNote";
import Accordion from "../../../../components/clinicPage/accordion";
import StatusParser from "../../../../components/shared/status";

// Import DB component
import { client } from '../../../../api-lib/azure/azureConfig';

// Import third-party icons
import { IoMdAdd } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import { getPreceptor, getClinicOrSiteOrRegion } from "../../../../api-lib/azure/azureOps";

import EditPreceptorProfile from "../../../../components/shared/forms/editPreceptorProfile";
import EditPreceptorNote from "../../../../components/shared/forms/editPreceptorNote";
import { runAuthMiddleware } from "../../../../api-lib/auth/authMiddleware";

export async function getServerSideProps(context) {
  const redirect = await runAuthMiddleware(context.req, context.res);
  // If the user is invalid then we redirect them back to the index.js page
  if (redirect) return redirect;

  const preceptor = await getPreceptor(context.query.preceptor_id);
  return { props: { preceptor, user: context.req.user } }
}

export default function Preceptors({ preceptor, user }) {
  /**
   * States to keep track of all the pop-ups
   */
  const [ openNewNote, setOpenNewNote ] = useState(false)
  const [ openEditNote, setOpenEditNote ] = useState(false)
  const [ openEditInfo, setOpenEditInfo ] = useState(false)

  /**
   * Variable for preceptor survey data
   */
  const surveyData = preceptor.survey.data

  const router = useRouter()

  const [allClinics, setAllClinics] = useState(null)
  async function lazyLoadClinic() {
    const all_clinics = []
    for (let i = 0; i < preceptor.clinics.length; i++) {
      all_clinics.push(await getClinicOrSiteOrRegion(preceptor.clinics[i]))
    }
    setAllClinics(all_clinics)
  }
  useEffect(() => lazyLoadClinic(), [])

  /**
   * Remove a note from a preceptor
   * @param {String} remove_index - index of the note that we want to remove. 
   */
     async function removeNoteEntry(remove_index) {
      const database = client.database("uc-ctct");
      const p_container = database.container("Preceptors");
      preceptor.notes.splice(remove_index, 1)
      const replaceOperation =
        [
          {
            op: "replace",
            path: "/notes",
            value: preceptor.notes
          }
        ]
      await p_container.item(preceptor.id, preceptor.id).patch(replaceOperation)
      router.reload()
      return 
    }

  return (
    <React.Fragment>
      { openNewNote ? <AddNewNote open={openNewNote} setOpen={setOpenNewNote} reload={router.reload} type="Preceptors" id={preceptor.id} /> : null }
      { openEditNote ? <EditPreceptorNote open={openEditNote} setOpen={setOpenEditNote} reload={router.reload} /> : null }
      { openEditInfo ? <EditPreceptorProfile open={openEditInfo} setOpen={setOpenEditInfo} data={preceptor} reload={router.reload} id={preceptor.id} /> : null }
      <div className={styles.container}>
        <Head>
          <title>UC-CTCT: Site Management Systems</title>
          <meta
            name="description"
            content="University of California - Clinic Coordination Tools"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
          <Navbar icons={[false, true, false, false, false]} />
          <div className={styles.content}>
            <Header header={`Preceptor: ${preceptor.firstname} ${preceptor.lastname}`} imgSrc={user.photo ? user.photo : "/asset/images/user-image.png"} back={router.back} />
            <div className={styles.data}>
              <div className={styles.bioTitle}>
                <h4>General Profile Information</h4>
                <div className={"editButton"} onClick={() => setOpenEditInfo(true)}>Edit Information</div>
              </div>
              <div className={styles.bioTitle}>
                <div className={styles.profileInfo}>
                  <div className={styles.infoRow}>
                    <p style={{ marginRight: '2.5rem' }}><strong>Name:</strong> {preceptor.firstname} {preceptor.lastname}</p>
                    <p style={{ marginRight: '2.5rem' }}><strong>Email:</strong> {preceptor.email}</p>
                    <p><strong>Phone Number:</strong> ({preceptor.phoneNumber.substring(0, 3)}) {preceptor.phoneNumber.substring(3, 6)}-{preceptor.phoneNumber.substring(6, 10)}</p>
                  </div>
                  <div className={styles.infoRow}>
                    <p style={{ marginRight: '2.5rem' }}><strong>Status:</strong> {StatusParser('preceptors', parseInt(preceptor.status))}</p>
                    <p style={{ marginRight: '2.5rem' }}><strong>National Provider Identifier (NPI):</strong> {preceptor.npi}</p>
                    <p><strong>Credentials:</strong> {preceptor.credential}</p>
                  </div>
                  <p>
                    <strong>Precepting Clinic (s):</strong>
                    {
                      (allClinics == null ? <p>Loading...</p> : allClinics.map(x => x ? <p style={{ margin: '0.4rem 0' }}>{x.name}</p> : <p>Clinic Unknown</p>))
                    }
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.data}>
              <div className={styles.bioTitle}>
                <h4>Survey Information</h4>
              </div>
              {
              surveyData.homeEmail ?
              <div className={styles.bioTitle}>
                <div className={styles.profileInfo}>
                  <div className={styles.infoRow}>
                    <p style={{ marginRight: '2.5rem' }}><strong>Profession:</strong> {surveyData.profession}</p>
                    <p style={{ marginRight: '2.5rem' }}>
                      <strong>Preferred Contact Information:</strong> 
                      {surveyData.preferredContact.includes("@") ? ` ${surveyData.preferredContact}` : ` (${surveyData.preferredContact.substring(0, 3)}) ${surveyData.preferredContact.substring(3, 6)}-${surveyData.preferredContact.substring(6, 10)}`}
                    </p>
                    <p><strong>Clinic Planned to Precep:</strong> {surveyData.clinicPlanned}</p>
                  </div>
                  <div className={styles.infoRow}>
                    <p style={{ marginRight: '2.5rem' }}><strong>Practice Setting:</strong> {surveyData.practiceSetting.join(", ")}</p>
                    <p><strong>Age Group:</strong> {surveyData.ageGroup.join(", ")}</p>
                  </div>
                  <div className={styles.infoRow}>
                    <p><strong>Patient Population:</strong> {surveyData.patientPopulation.join(", ")}</p>
                  </div>
                  <div className={styles.infoRow}>
                    <p style={{ marginRight: '2.5rem' }}><strong>Visit Type:</strong> {surveyData.visitType}</p>
                    <p style={{ marginRight: '2.5rem' }}><strong>Visit % In-Person:</strong> {surveyData.visitPercentInPerson ? surveyData.visitPercentInPerson : "Not Indicated"}</p>
                    <p><strong>Visit % Online:</strong> {surveyData.visitPercentOnline ? surveyData.visitPercentOnline : "Not Indicated"}</p>
                  </div>
                  <div className={styles.infoRow}>
                    <p style={{ marginRight: '2.5rem' }}><strong>Patient Volume:</strong> {surveyData.patientVolume}</p>
                    <p><strong>Patient Acuity:</strong> {surveyData.patientAcuity}</p>
                  </div>
                  <div className={styles.infoRow}>
                    <p><strong>Experience with PMHNP:</strong> {surveyData.experienceWithPmhnp}</p>
                  </div>
                  <div className={styles.infoRow}>
                    <p><strong>Model of Precepting:</strong> {surveyData.modelOfPrecepting}</p>
                  </div>
                  <div className={styles.infoRow}>
                    <p><strong>Order Entry:</strong> {surveyData.orderEntry}</p>
                  </div>
                  <div className={styles.infoRow}>
                    <p><strong>Documents Practice:</strong> {surveyData.documentPractice.join(", ")}</p>
                  </div>
                  <div className={styles.infoRow}>
                    <p><strong>Student Scheduling Preference:</strong> {surveyData.studentSchedule}</p>
                  </div>
                  {
                    surveyData.interestInSupportOtherPrecep == "Yes" ?
                    <div className={styles.infoRow}>
                      <p><strong>Interested In Supporting Other Preceptors:</strong> Yes</p>
                      <p><strong>Type(s) of support:</strong> {surveyData.typeOfSupport.join(", ")}</p>
                    </div>
                    : null
                  }
                  <div className={styles.infoRow}>
                    <p><strong>Number of days for student to visit:</strong> {surveyData.daysForStudentToAttend}</p>
                  </div>
                  <div className={styles.infoRow}>
                    <p><strong>Preferred Days to Precep:</strong> {surveyData.preferredDaysToWork.join(", ")}</p>
                  </div>
                  <div className={styles.infoRow}>
                    <p style={{ marginRight: '2.5rem' }}><strong>Helpful When Students Speak Other Languages:</strong> {surveyData.helpfulStudentOtherLangs}</p>
                    <p><strong>Desired Languages:</strong> {surveyData.helpfulStudentOtherLangs == "Yes" ? surveyData.whatOtherLangs : "N/A"}</p>
                  </div>
                  <div className={styles.infoRow}>
                    <p style={{ marginRight: '2.5rem' }}><strong>Preferred Communication Method:</strong> {surveyData.preferredCommMethod}</p>
                    <p><strong>Other Comments:</strong> {surveyData.otherConcerns}</p>
                  </div>
                </div>
              </div>
              :
              <div>Preceptor still hasn't responded to the survey</div>
              }
            </div>
            <div className={styles.noteData}>
              <div style={{ width: '90%', display: 'flex', flexDirection: 'column', paddingTop: '2rem' }}>
                <div style={{ width: '100%', display: 'flex', marginBottom: '2rem' }}>
                  <p className="titleClinics" style={{ width: '80%', paddingLeft: '2rem', margin: 0, display: 'flex', alignItems: 'center' }}>Preceptor Notes</p>
                  <div style={{ width: '20%', display: 'flex', justifyContent: 'center' }}>
                    <div className={"editButton"} onClick={() => setOpenNewNote(true)}>+ Add Notes</div>
                  </div>
                </div>
                <div>
                  {
                    preceptor.notes.length !== 0 ? preceptor.notes.map((x, ind) => {
                      return (<Accordion x={x} ind={ind} key={ind} open={openEditNote} setOpen={setOpenEditNote} id={preceptor.id} remove={removeNoteEntry} />)
                    }) : <p style={{ width: '100%', textAlign: 'center' }}>Currently, you do not have any notes!</p>
                  }
                </div>

              </div>
            </div>
          </div >
        </main >
      </div >
    </React.Fragment >
  );
}


////<div className='editButton' onClick={() => setOpenNote(true)}>+ Add Note</div>