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

export async function getServerSideProps(context) {
    const student = await getStudent(context.query.id);
    return { props: { student } }
}

export default function StudentProfile({ student }) {
  const [openNote, setOpenNote] = useState(false)

  const router = useRouter()
  const refreshData = () => {
    router.replace(router.asPath);
  }

  async function removeNoteEntry(remove_index) {
    const database = client.database("uc-ctct");
    const site_container = database.container("Sites");
    console.log("Remove index is:", remove_index)
    note_data.notes.splice(remove_index, 1)
    console.log(note_data.notes)
    const replaceOperation =
      [
        {
          op: "replace",
          path: "/notes",
          value: note_data.notes
        }
      ]
    await site_container.item(note_data.id, note_data.id).patch(replaceOperation)
    setTimeout(() => refreshData(), 400)
  }

  async function removeElement(id) {
    removeClinic(id, note_data.id)
    setTimeout(() => refreshData(), 400)
    return
  }

  return (
    <React.Fragment>
      {openNote ? <NoteEdit open={openNote} setOpen={setOpenNote} reload={refreshData} type="Preceptors" id={student.id} /> : null}
      {/* {openEditForm ? <EditSiteNote open={openEditForm} setOpen={setOpenEditForm} reload={refreshData} /> : null}
            {openAddClinic ? <AddNewClinic open={openAddClinic} setOpen={setOpenAddClinic} reload={refreshData} siteId={note_data.id} /> : null} */}
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
              </div>
              <div className={styles.bioTitle}>
                <div className={styles.profileImg}>
                  <img src="/asset/images/user-image.png" />
                </div>
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
                    <p style={{ marginRight: '2.5rem' }}><strong>Phone Number:</strong> {student.phoneNumber}</p>
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
                <h4>Course Schedule</h4>
                </div>
                <p>Nothing has been assigned to this student so far!</p>
            </div>
            {/* <div className={styles.noteData}>
              <div style={{ width: '90%', display: 'flex', flexDirection: 'column', paddingTop: '2rem' }}>
                <div style={{ width: '100%', display: 'flex', marginBottom: '2rem' }}>
                  <p className="titleClinics" style={{ width: '80%', paddingLeft: '2rem', margin: 0, display: 'flex', alignItems: 'center' }}>Preceptor Notes</p>
                  <div style={{ width: '20%', display: 'flex', justifyContent: 'center' }}>
                    <div className={"editButton"} onClick={() => setOpenNote(true)}>+ Add Notes</div>
                  </div>
                </div>
                <div>
                  {
                    preceptor.notes.length !== 0 ? preceptor.notes.map((x, ind) => {
                      return (<Accordion x={x} ind={ind} />)
                    }) : <p style={{ width: '100%', textAlign: 'center' }}>Currently, you do not have any notes!</p>
                  }
                </div>
              </div>
            </div> */}
          </div >
        </main >
      </div >
    </React.Fragment >
  );
}