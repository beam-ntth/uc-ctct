// Import React & Next modules
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
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
import { removeClini, getPreceptor } from "../../../../api-lib/azure/azureOps";

import PreceptorInfoEdit from "../../../../components/clinicPage/preceptorInfoEdit";

// export async function getServerSideProps(context) {
// const location = context.query.location;
// const database = client.database("uc-ctct");
// const site_container = database.container("Sites");
// const clinic_container = database.container("Clinics");
// const { resources: data } = await clinic_container.items.query(`SELECT * from c WHERE c.site_id = '${location}'`).fetchAll();
// const { resource: note_data } = await site_container.item(location, location).read();
// return { props: { data, note_data } }
// }

export async function getServerSideProps(context) {
  const preceptor = await getPreceptor(context.query.preceptor_id);
  return { props: { preceptor } }
}


/* export async function getServerSideProps(context) {
    const clinicName = context.query.name
    const database = client.database("uc-ctct");
    const container = database.container("Preceptors");
    const data = await getClinic(clinicName);
    let all_preceptor_data = []
    for (let i = 0; i < data.preceptorInfo.length; i++) {
      const { resource: preceptor_data } = await container.item(data.preceptorInfo[i], data.preceptorInfo[i]).read()
      all_preceptor_data.push(preceptor_data)
    }
    
    return { props: { data, all_preceptor_data } }
  } */

//export default function ClinicDetails({ data, all_preceptor_data }) {
// if (errorCode) {
//   return <Error statusCode={errorCode} />
// }

//export default function ClinicDetails({ data, all_preceptor_data }) {
// if (errorCode) {


export default function Preceptors({ data, note_data }) {
  const [openNote, setOpenNote] = useState(false)
  //const data = await getClinic(clinicName);
  // const [openEditForm, setOpenEditForm] = useState(false)
  // const [openAddClinic, setOpenAddClinic] = useState(false)

  const router = useRouter()
  // const [hover, setHover] = useState(false)
  // const [trashHover, setTrashHover] = useState(Array(data.length).fill(false))
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
    setTimeout(() => refreshData(), 300)
  }

  async function removeElement(id) {
    removeClinic(id, note_data.id)
    setTimeout(() => refreshData(), 400)
    return
  }

  return (
    <React.Fragment>
      {openNote ? <NoteEdit open={openNote} setOpen={setOpenNote} reload={refreshData} type="Sites" id={note_data.id} /> : null}
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
            <Header header={`Preceptor: `} imgSrc="/asset/images/user-image.png" back={router.back} />
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
                    <p style={{ marginRight: '2.5rem' }}><strong>Name:</strong> </p>
                    <p><strong>Clinic:</strong> </p>
                  </div>
                  <div className={styles.infoRow}>
                    <p style={{ marginRight: '2.5rem' }}><strong>Status:</strong> </p>
                    <p><strong>Credentials:</strong> </p>
                  </div>
                  <div className={styles.infoRow}>
                    <p style={{ marginRight: '2.5rem' }}><strong>Position:</strong> </p>
                    <p><strong>Email:</strong> </p>
                  </div>
                  <p><strong>Phone Number:</strong> </p>
                </div>
              </div>
            </div>
            <div className={styles.noteData}>
              <div style={{ width: '90%', display: 'flex', flexDirection: 'column', paddingTop: '2rem' }}>
                <div style={{ width: '100%', display: 'flex', marginBottom: '2rem' }}>
                  <p className="titleClinics" style={{ width: '80%', paddingLeft: '2rem', margin: 0, display: 'flex', alignItems: 'center' }}>Preceptor Notes</p>
                  <div style={{ width: '20%', display: 'flex', justifyContent: 'center' }}>
                    <div className={styles.editButton} onClick={() => setNoteOpen(true)}>+ Add Notes</div>
                    <div>
                      <div style={{ marginTop: '2rem' }}>

                        {/*  {
                                        data.notes.map((x, ind) => {
                                        return (<Accordion x={x} ind={ind} />)
                                        })
                                    } */}
                      </div>
                    </div>
                  </div>

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