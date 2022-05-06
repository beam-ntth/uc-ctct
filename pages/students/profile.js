// Import React & Next modules
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "../../styles/Preceptor.module.css";

// Import Next Components
import Navbar from "../../components/shared/navbar/navbar";
import Header from "../../components/shared/header/header";
import AddNewNote from "../../components/clinicPage/addNewNote";
import Accordion from "../../components/clinicPage/accordion";

// Import DB component
import { client } from '../../api-lib/azure/azureConfig';

// Import third-party icons
import { getAllClinics, getAllPreceptors, getStudent } from "../../api-lib/azure/azureOps";

import EditStudentProfile from "../../components/shared/forms/editStudentProfile";
import EditStudentNote from "../../components/shared/forms/editStudentNote";
import { runAuthMiddleware } from "../../api-lib/auth/authMiddleware";

export async function getServerSideProps(context) {
  const redirect = await runAuthMiddleware(context.req, context.res);
  // If the user is invalid then we redirect them back to the index.js page
  if (redirect) return redirect;

  const student = await getStudent(context.query.id);
  return { props: { student, user: context.req.user } }
}

export default function StudentProfile({ student, user }) {
  const surveyData = student.survey.data
  const clinic_id_1 = student.assignment.primary_choice.clinic_id
  const precep_id_1 = student.assignment.primary_choice.preceptor_id
  const date_assigned_1 = student.assignment.primary_choice.date_assigned

  const clinic_id_2 = student.assignment.secondary_choice.clinic_id
  const precep_id_2 = student.assignment.secondary_choice.preceptor_id
  const date_assigned_2 = student.assignment.secondary_choice.date_assigned

  const clinic_id_3 = student.assignment.tertiary_choice.clinic_id
  const precep_id_3 = student.assignment.tertiary_choice.preceptor_id
  const date_assigned_3 = student.assignment.tertiary_choice.date_assigned

  /**
   * States to keep track of the clinic and preceptor info
   * to display the corresponding clinic and preceptor
   */
  const [clinicData, setClinicData] = useState(null)
  const [preceptorData, setPreceptorData] = useState(null)

  const getAssignedClinic = (id) => {
    return clinicData.filter(x => x.id == id)[0]
  }

  const getAssignedPreceptor = (id) => {
    return preceptorData.filter(x => x.id == id)[0]
  }

  /**
   * Load the clinic and preceptor data
   */
  async function loadClinicAndPrecepData() {
    const clinic = await getAllClinics();
    const precep = await getAllPreceptors();
    setClinicData(clinic)
    setPreceptorData(precep)
  }
  useEffect(() => loadClinicAndPrecepData(), [])

  /**
   * States to keep track of all the pop-ups
   */
  const [openNewNote, setOpenNewNote] = useState(false)
  const [openEditNote, setOpenEditNote] = useState(false)
  const [openEditInfo, setOpenEditInfo] = useState(false)

  /**
   * Router object is used to reload the page
   */
  const router = useRouter()

  async function removeNoteEntry(remove_index) {
    const database = client.database("uc-ctct");
    const container = database.container("Students");
    student.notes.splice(remove_index, 1)
    const replaceOperation =
      [
        {
          op: "replace",
          path: "/notes",
          value: student.notes
        }
      ]
    await container.item(student.id, student.id).patch(replaceOperation)
    router.reload()
  }

  return (
    <React.Fragment>
      { openNewNote ? <AddNewNote open={openNewNote} setOpen={setOpenNewNote} reload={router.reload} type="Students" id={student.id} /> : null }
      { openEditNote ? <EditStudentNote open={openEditNote} setOpen={setOpenEditNote} reload={router.reload} /> : null }
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
            <Header header={`Student: ${student.firstName} ${student.lastName}`} imgSrc={user.photo ? user.photo : "/asset/images/user-image.png"} back={router.back} />
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
                {
                  clinicData && preceptorData ? 
                  <React.Fragment>
                    <div className={ styles.choice }>
                        <div className={ styles.choiceTitle }>
                            <h4>Primary Choice |</h4>
                        </div>
                        <p><strong>Clinic: </strong>{ clinic_id_1 == "" ? 'Unassigned' : getAssignedClinic(clinic_id_1).name }</p>
                        <p><strong>Preceptor: </strong>{ precep_id_1 == "" ? 'Unassigned' : `${getAssignedPreceptor(precep_id_1).firstname} ${getAssignedPreceptor(precep_id_1).lastname}` }</p>
                        <p><strong>Date Assigned: </strong>{ date_assigned_1 == "" ? 'Unknown' : date_assigned_1 }</p>
                    </div>
                    <div className={ styles.choice }>
                        <div className={ styles.choiceTitle }>
                            <h4>Secondary Choice |</h4>
                        </div>
                        <p><strong>Clinic: </strong>{ clinic_id_2 == "" ? 'Unassigned' : getAssignedClinic(clinic_id_2).name }</p>
                        <p><strong>Preceptor: </strong>{ precep_id_2 == "" ? 'Unassigned' : `${getAssignedPreceptor(precep_id_2).firstname} ${getAssignedPreceptor(precep_id_2).lastname}` }</p>
                        <p><strong>Date Assigned: </strong>{ date_assigned_2 == "" ? 'Unknown' : date_assigned_2 }</p>
                    </div>
                    <div className={ styles.choice } style={{ marginBottom: '2rem' }}>
                        <div className={ styles.choiceTitle }>
                            <h4>Tertiary Choice |</h4>
                        </div>
                        <p><strong>Clinic: </strong>{ clinic_id_3 == "" ? 'Unassigned' : getAssignedClinic(clinic_id_3).name }</p>
                        <p><strong>Preceptor: </strong>{ precep_id_3 == "" ? 'Unassigned' : `${getAssignedPreceptor(precep_id_2).firstname} ${getAssignedPreceptor(precep_id_2).lastname}` }</p>
                        <p><strong>Date Assigned: </strong>{ date_assigned_3 == "" ? 'Unknown' : date_assigned_3 }</p>
                    </div> 
                  </React.Fragment>
                  : null
                }
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
                      return (<Accordion x={x} ind={ind} open={openEditNote} setOpen={setOpenEditNote} id={student.id} remove={removeNoteEntry} />)
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