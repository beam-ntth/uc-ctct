// Import React & Next modules
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "../../../../styles/Preceptor.module.css";

// Import Next Components
import Navbar from "../../../../components/shared/navbar/navbar";
import Header from "../../../../components/shared/header/header";
import NoteEdit from "../../../../components/clinicPage/noteEdit";
import Accordion from "../../../../components/clinicPage/accordion";
import StatusParser from "../../../../components/shared/status";

// Import DB component
import { client } from '../../../../api-lib/azure/azureConfig';

// Import third-party icons
import { IoMdAdd } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import EditSiteNote from "../../../../components/shared/forms/editSiteNote";
import AddNewClinic from "../../../../components/shared/forms/addClinic";
import { removeClinic, getPreceptor, getClinic } from "../../../../api-lib/azure/azureOps";

import PreceptorInfoEdit from "../../../../components/clinicPage/preceptorInfoEdit";

export async function getServerSideProps(context) {
  const preceptor = await getPreceptor(context.query.preceptor_id);
  return { props: { preceptor } }
}

export default function Preceptors({ preceptor }) {
  const [openNote, setOpenNote] = useState(false)
  // const data = await getClinic(clinicName);
  // const [openEditForm, setOpenEditForm] = useState(false)
  // const [openAddClinic, setOpenAddClinic] = useState(false)

  const router = useRouter()
  // const [hover, setHover] = useState(false)
  // const [trashHover, setTrashHover] = useState(Array(data.length).fill(false))

  const [allClinics, setAllClinics] = useState(null)
  async function lazyLoadClinic() {
    const all_clinics = []
    for (let i = 0; i < preceptor.clinics.length; i++) {
      all_clinics.push(await getClinic(preceptor.clinics[i]))
    }
    setAllClinics(all_clinics)
  }
  useEffect(() => lazyLoadClinic(), [])

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
      {openNote ? <NoteEdit open={openNote} setOpen={setOpenNote} reload={refreshData} type="Preceptors" id={preceptor.id} /> : null}
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
          <Navbar icons={[false, true, false, false, false]} />
          <div className={styles.content}>
            <Header header={`Preceptor: ${preceptor.firstname} ${preceptor.lastname}`} imgSrc="/asset/images/user-image.png" back={router.back} />
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
                    <p style={{ marginRight: '2.5rem' }}><strong>Name:</strong> {preceptor.firstname} {preceptor.lastname}</p>
                    <p><strong>National Provider Identifier (NPI):</strong> {preceptor.npi}</p>
                  </div>
                  <div className={styles.infoRow}>
                    <p style={{ marginRight: '2.5rem' }}><strong>Status:</strong> {StatusParser('preceptors', preceptor.status)}</p>
                    <p><strong>Credentials:</strong> {preceptor.credential}</p>
                  </div>
                  <div className={styles.infoRow}>
                    <p style={{ marginRight: '2.5rem' }}><strong>Position:</strong> {preceptor.position}</p>
                    <p><strong>Email:</strong> {preceptor.email}</p>
                  </div>
                  <p><strong>Phone Number:</strong> {preceptor.phoneNumber}</p>
                  <p>
                    <strong>Clinic (s):</strong>
                    {
                      (allClinics == null ? <p>Loading...</p> : allClinics.map(x => x ? <p style={{ margin: '0.4rem 0' }}>{x.name}</p> : <p>Clinic Unknown</p>))
                    }
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.noteData}>
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
            </div>
          </div >
        </main >
      </div >
    </React.Fragment >
  );
}


////<div className='editButton' onClick={() => setOpenNote(true)}>+ Add Note</div>