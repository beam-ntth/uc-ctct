// Import React & Next modules
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "../../styles/Preceptor.module.css";

// Import Next Components
import Navbar from "../../components/shared/navbar/navbar";
import Header from "../../components/shared/header/header";
import NoteEdit from "../../components/clinicPage/noteEdit";
import Accordion from "../../components/clinicPage/accordion";
import StatusParser from "../../components/shared/status";

// Import DB component
import { client } from '../../api-lib/azure/azureConfig';

// Import third-party icons
import { IoMdAdd } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import EditSiteNote from "../../components/shared/forms/editSiteNote";
import AddNewClinic from "../../components/shared/forms/addClinic";
import { removeClinic, getPreceptor, getClinic, getStudent } from "../../api-lib/azure/azureOps";

import PreceptorInfoEdit from "../../components/clinicPage/preceptorInfoEdit";
import EditStudentProfile from "../../components/shared/forms/editStudentProfile";

export async function getServerSideProps(context) {
    const student = await getStudent(context.query.id);
    return { props: { student } }
}

export default function StudentProfile({ student }) {
  const surveyData = student.survey.data

  /**
   * States to keep track of all the pop-ups
   */
  const [openNewNote, setOpenNewNote] = useState(false)
  const [openEditInfo, setOpenEditInfo] = useState(false)

  /**
   * Router object is used to reload the page
   */
  const router = useRouter()

  async function removeNoteEntry(remove_index) {
    const database = client.database("uc-ctct");
    const container = database.container("Students");
    note_data.notes.splice(remove_index, 1)
    const replaceOperation =
      [
        {
          op: "replace",
          path: "/notes",
          value: note_data.notes
        }
      ]
    await container.item(note_data.id, note_data.id).patch(replaceOperation)
    router.reload()
  }

  async function removeElement(id) {
    await removeClinic(id, note_data.id)
    router.reload()
    return
  }

  return (
    <React.Fragment>
      { openNewNote ? <NoteEdit open={openNewNote} setOpen={setOpenNewNote} reload={router.reload} type="Students" id={student.id} /> : null }
      { openEditInfo ? <EditStudentProfile open={openEditInfo} setOpen={setOpenEditInfo} data={student} reload={router.reload} id={student.id} /> : null }
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
          <Navbar icons={[false, false, true, false, false]} />
          <div className={styles.content}>
            <Header header={`Student: ${student.firstName} ${student.middleName} ${student.lastName}`} imgSrc="/asset/images/user-image.png" back={router.back} />
            <div className={styles.data}>
              <div className={styles.bioTitle}>
                <h4>General Profile Information</h4>
                <div style={{ width: '30%', display: 'flex', justifyContent: 'flex-end' }}>
                    <div className={"editButton"} onClick={() => setOpenEditInfo(true)}>Edit Profile</div>
                </div>
              </div>
              <div className={styles.bioTitle}>
                <div className={styles.profileInfo}>
                  <div className={styles.infoRow}>
                    <p style={{ marginRight: '2.5rem' }}><strong>Name:</strong> {student.firstName} {student.middleName} {student.lastName}</p>
                    <p><strong>Date of Birth:</strong> {student.dob}</p>
                  </div>
                  <div className={styles.infoRow}>
                    <p style={{ marginRight: '2.5rem' }}><strong>Address:</strong> { `${student.addressLine1}, ${student.addressLine2 == "" ? "" : student.addressLine2 + ', '}${student.city}, ${student.state} ${student.postal}` }</p>
                    <p><strong>Ethnicity:</strong> {student.ethnic}</p>
                  </div>
                  <div className={styles.infoRow}>
                    <p style={{ marginRight: '2.5rem' }}><strong>Sexual Orientation:</strong> {student.sex}</p>
                    <p><strong>Gender Preference:</strong> {student.gender}</p>
                  </div>
                  <div className={styles.infoRow}>
                    <p style={{ marginRight: '2.5rem' }}><strong>Phone Number:</strong> ({student.phoneNumber.substring(0, 3)}) {student.phoneNumber.substring(3, 6)}-{student.phoneNumber.substring(6, 10)}</p>
                    <p><strong>Email:</strong> {student.email}</p>
                  </div>
                  <div className={styles.infoRow}>
                    <p style={{ marginRight: '2.5rem' }}><strong>Previously Served in Military:</strong> {student.militaryService}</p>
                    <p><strong>From Medically Underserved Community:</strong> {student.medically_underserved}</p>
                  </div>
                  <div className={styles.infoRow}>
                    <p style={{ marginRight: '2.5rem' }}><strong>Primary Degree:</strong> {student.primary_degree}</p>
                    <p><strong>Primary Major:</strong> {student.primary_major}</p>
                  </div>
                  <div className={styles.infoRow}>
                    <p style={{ marginRight: '2.5rem' }}><strong>US Citizen:</strong> {student.usCitizen}</p>
                    <p><strong>English is the Native Language:</strong> {student.englishNative}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.data} style={{ marginTop: '1rem' }}>
                <div className={styles.bioTitle}>
                  <h4>Survey Data</h4>
                </div>
                { student.survey.hasResponded ? null : <p>Nothing has been assigned to this student so far!</p> }
                <div className={styles.bioTitle}>
                <div className={styles.profileInfo}>
                  <div className={styles.infoRow}>
                      <p style={{ marginRight: '1.5rem' }}><strong>Other Language(s) Spoken:</strong> {surveyData.otherLanguages.join(", ")}</p>
                  </div>
                  <div className={styles.infoRow}>
                      <p style={{ marginRight: '1.5rem' }}><strong>Preferred Location (Primary):</strong> {`${surveyData.preferredLocation.firstCity}, ${surveyData.preferredLocation.firstCounty}`}</p>
                      <p><strong>Preferred Location (Secondary):</strong> {`${surveyData.preferredLocation.secondCity}, ${surveyData.preferredLocation.secondCounty}`}</p>
                  </div>
                  <div className={styles.infoRow}>
                      <p style={{ lineHeight: '2rem' }}><strong>Practice Setting Rank:</strong> {surveyData.practiceSetting.map((x, ind) => `${ind+1}. ${x}`).join(" | ")}</p>
                  </div>
                  <div className={styles.infoRow}>
                      <p style={{ lineHeight: '2rem' }}><strong>Patient Population Rank:</strong> {surveyData.patientPopulation.map((x, ind) => `${ind+1}. ${x}`).join(" | ")}</p>
                  </div>
                  <div className={styles.infoRow}>
                      <p><strong>Age Group Rank:</strong> {surveyData.ageGroup.map((x, ind) => `${ind+1}. ${x}`).join(" | ")}</p>
                  </div>
                  <div className={styles.infoRow}>
                      <p style={{ marginRight: '1.5rem' }}><strong>Current Certification:</strong> {surveyData.currentCert}</p>
                      <p style={{ marginRight: '1.5rem' }}><strong>Primary Clinic Certification:</strong> {surveyData.primaryCert}</p>
                      {surveyData.secondaryCert ? <p><strong>Secondary Clinic Certification:</strong> {surveyData.secondaryCert}</p> : null}
                  </div>
                  <div className={styles.infoRow}>
                      <p style={{ marginRight: '1.5rem' }}><strong>APRN Years of Experience:</strong> {surveyData.aprnWorkDuration}</p>
                      <p><strong>Average Patient Volume:</strong> {surveyData.avgPatientVol}</p>
                  </div>
                  <div className={styles.infoRow}>
                      <p><strong>PMHNP Time Commitment:</strong> {surveyData.planToWork}</p>
                  </div>
                  <div className={styles.infoRow}>
                      <p><strong>Availability:</strong> {surveyData.daysAvailable}</p>
                  </div>
                  <div className={styles.infoRow}>
                      <p><strong>Plans After Graduation:</strong> {surveyData.planAfterGraduate}</p>
                  </div>
                  <div className={styles.infoRow}>
                      <p><strong>Current Working at Mental Health Facility:</strong> {surveyData.isWorkingAtMentalHealth}</p>
                  </div>
                  <div className={styles.infoRow}>
                      <p><strong style={{ textDecoration: 'underline' }}>Experience Working With</strong></p>
                  </div>
                  <div className={styles.infoRow}>
                      <p style={{ marginRight: '1.5rem' }}><strong>Depression:</strong> {surveyData.mentalExperienceLevel.depression}</p>
                      <p style={{ marginRight: '1.5rem' }}><strong>Anxiety:</strong> {surveyData.mentalExperienceLevel.anxiety}</p>
                      <p style={{ marginRight: '1.5rem' }}><strong>Bipolar Disorder:</strong> {surveyData.mentalExperienceLevel.bipolarDisorder}</p>
                      <p><strong>Eating Disorder:</strong> {surveyData.mentalExperienceLevel.eatingDisorders}</p>
                  </div>
                  <div className={styles.infoRow}>
                      <p style={{ marginRight: '1.5rem' }}><strong>ADHD:</strong> {surveyData.mentalExperienceLevel.adhd}</p>
                      <p style={{ marginRight: '1.5rem' }}><strong>Schizophrenia:</strong> {surveyData.mentalExperienceLevel.schizophrenia}</p>
                      <p style={{ marginRight: '1.5rem' }}><strong>Personality Disorder:</strong> {surveyData.mentalExperienceLevel.personalityDisorders}</p>
                  </div>
                  { surveyData.hasPreferredClinic == "Yes" ?
                  <React.Fragment>
                      <div className={styles.infoRow}>
                          <p style={{ textDecoration: 'underline' }}><strong>Preferred Clinic</strong></p>
                      </div>
                      <div className={styles.infoRow}>
                          <p style={{ marginRight: '1.5rem' }}><strong>Clinic Name:</strong> {surveyData.preferredClinic.clinicName}</p>
                      </div>
                      <div className={styles.infoRow}>
                          <p style={{ marginRight: '1.5rem' }}><strong>Address:</strong> {surveyData.preferredClinic.address}</p>
                      </div>
                      <div className={styles.infoRow}>
                          <p style={{ marginRight: '1.5rem' }}><strong>Point of Contact:</strong> {surveyData.preferredClinic.poc}</p>
                          <p style={{ marginRight: '1.5rem' }}><strong>Phone Number:</strong> {surveyData.preferredClinic.phone}</p>
                          <p><strong>Email:</strong> {surveyData.preferredClinic.email}</p>
                      </div>
                  </React.Fragment>
                  : null }
                  <div className={styles.infoRow}>
                    <p style={{ marginRight: '1.5rem' }}><strong>Other Work Experience:</strong> {surveyData.otherExperience}</p>
                    <p><strong>Other Interesting Facts:</strong> {surveyData.otherFacts}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.data} style={{ marginTop: '1rem' }}>
                <div className={styles.bioTitle}>
                  <h4>{student.firstName} {student.lastName}'s Clinical Placement</h4>
                </div>
                <p>Nothing has been assigned to this student so far!</p>
            </div>
            <div className={styles.noteData}>
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', paddingTop: '2rem', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ width: '95%', display: 'flex', marginBottom: '2rem' }}>
                  <p className="titleClinics" style={{ width: '80%', margin: 0, display: 'flex', alignItems: 'center' }}>{student.firstName} {student.lastName}'s Notes</p>
                  <div style={{ width: '20%', display: 'flex', justifyContent: 'flex-end' }}>
                    <div className={"editButton"} onClick={() => setOpenNewNote(true)}>+ Add Notes</div>
                  </div>
                </div>
                <div style={{ width: '90%' }}>
                  {
                    student.notes.length !== 0 ? student.notes.map((x, ind) => {
                      return (<Accordion x={x} ind={ind} />)
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