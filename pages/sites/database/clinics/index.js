// Import React & Next modules
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "../../../../styles/Database.module.css";

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
import { removeClinic } from "../../../../api-lib/azure/azureOps";
import SearchString from "../../../../components/shared/search";

export async function getServerSideProps(context) {
  // TODO: JT - FIX AND GET RID OF ANY CODE NOT USING AZURE OP FUNC.
  const location = context.query.location;
  const database = client.database("uc-ctct");
  const site_container = database.container("Sites");
  const clinic_container = database.container("Clinics");
  const { resources: data } = await clinic_container.items.query(`SELECT * from c WHERE c.site_id = '${location}'`).fetchAll();
  const { resource: note_data } = await site_container.item(location, location).read();
  return { props: { data, note_data } }
}



export default function Clinics({ data, note_data }) {
  const [filteredData, setFilteredData] = useState(data)
  const [openNote, setOpenNote] = useState(false)
  const [openEditForm, setOpenEditForm] = useState(false)
  const [openAddClinic, setOpenAddClinic] = useState(false)

  const router = useRouter()
  const [hover, setHover] = useState(false)
  const [trashHover, setTrashHover] = useState(Array(data.length).fill(false))
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
    refreshData()
    return 
  }

  async function removeElement(id) {
    await removeClinic(id, note_data.id)
    refreshData()
    return
  }

  function searchClinicName(substr) {
    setFilteredData(SearchString(data, substr))
  }

  // Reinitialized displayed data when there are any changes to the DB data
  useEffect(() => {
    setFilteredData(data)
  }, [data])

  return (
    <React.Fragment>
      {openNote ? <NoteEdit open={openNote} setOpen={setOpenNote} reload={refreshData} type="Sites" id={note_data.id} /> : null}
      {openEditForm ? <EditSiteNote open={openEditForm} setOpen={setOpenEditForm} reload={refreshData} /> : null}
      {openAddClinic ? <AddNewClinic open={openAddClinic} setOpen={setOpenAddClinic} reload={refreshData} siteId={note_data.id} /> : null}
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
            <Header header={`${note_data.name} - All Clinics`} imgSrc="/asset/images/user-image.png" back={router.back} />
            <div className={styles.data}>
              <div style={{ width: '90%', display: 'flex', flexDirection: 'column', paddingTop: '2rem' }}>
                <div style={{ width: '100%', display: 'flex', marginBottom: '2rem' }}>
                  <p className="titleClinics" style={{ width: '80%', paddingLeft: '2rem', margin: 0, display: 'flex', alignItems: 'center' }}>Site Notes</p>
                  <div style={{ width: '20%', display: 'flex', justifyContent: 'center' }}>
                    <div className='editButton' onClick={() => setOpenNote(true)}>+ Add Note</div>
                  </div>
                </div>
                {
                  note_data.notes.map((x, ind) => {
                    return (<Accordion x={x} ind={ind} open={openEditForm} setOpen={setOpenEditForm} id={note_data.id} remove={removeNoteEntry} />)
                  })
                }
              </div>
            </div>
            <div className={styles.data}>
              <div className={styles.searchBar}>
                <input className={styles.searchInput} placeholder="Search Clinic Name..." onChange={(x) => searchClinicName(x.target.value)} />
              </div>
              <div className={styles.row}>
                <p className="row1Clinics" style={{ marginLeft: '2rem' }}>Clinic Name</p>
                <p className="row2Clinics">Last Updated</p>
                <p className="row3Clinics">Status</p>
                <IoMdAdd color={hover ? "#079CDB" : "#C4C4C4"} size={hover ? 45 : 40} style={{ cursor: 'pointer', transition: '0.2s linear' }}
                  onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={() => setOpenAddClinic(true)} />
              </div >
              {
                filteredData.map((x, ind) => {
                  const statusText = StatusParser("clinics", parseInt(x.status))

                  return (
                    <div style={{ width: '100%', height: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Link href={`/sites/database/clinics/clinic?name=${x['id']}`}>
                        <div key={`clinic_${ind}`} className="displayRow">
                          <div className="rowContentClinics">
                            <p className="row1Clinics" style={{ marginLeft: '2rem' }}>{x['name']}</p>
                            <p className="row2Clinics" >{x['last_updated']}</p>
                            <p className="row3Clinics">{statusText}</p>
                          </div>
                          <div className={`clinicTag${parseInt(x.status)}`}></div>
                        </div>
                      </Link>
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
                        } onClick={() => removeElement(x.id)} />
                    </div>
                  )
                })
              }
            </div >
          </div >
        </main >
      </div >
    </React.Fragment >
  );
}
