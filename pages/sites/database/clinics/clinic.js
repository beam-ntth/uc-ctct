// Import React & Next modules
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import GoogleMapReact from 'google-map-react';

// Import Next Components
import Navbar from "../../../../components/shared/navbar/navbar";
import Header from "../../../../components/shared/header/header";
import styles from "../../../../styles/Clinic.module.css";
import Accordion from "../../../../components/clinicPage/accordion";
import StatusParser from "../../../../components/shared/status";

const ClinicInfoEdit = dynamic(() => import("../../../../components/clinicPage/generalInfoEdit"));
const AdminInfoAdd = dynamic(() => import("../../../../components/clinicPage/adminInfoAdd"));
const PreceptorInfoEdit = dynamic(() => import("../../../../components/clinicPage/preceptorInfoEdit"));
const PlacementInfoEdit = dynamic(() => import("../../../../components/clinicPage/placementInfoEdit"));
const NoteEdit = dynamic(() => import("../../../../components/clinicPage/noteEdit"));
const AdminInfoEdit = dynamic(() => import("../../../../components/clinicPage/adminInfoEdit"));

// Import DB component
import { client } from '../../../../api-lib/azure/azureConfig';
import { FiEdit } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { getClinic, getRegion, removeAdmin, removePreceptor } from "../../../../api-lib/azure/azureOps";
import Marker from "../../../../components/shared/marker/marker";

export async function getServerSideProps(context) {
  const clinicName = context.query.name
  const data = await getClinic(clinicName);
  return { props: { data } }
}

export default function ClinicDetails({ data }) {
  /**
   * Create a refresh data function to reload page when there 
   * is any changes to the database
   */
  const router = useRouter()
  const refreshData = () => {
    router.replace(router.asPath);
  }

  /**
   * Convert the encoded status to text
   */
  const statusText = StatusParser("clinics", parseInt(data.status))

  /**
   * Status of all the forms in this page
   * true = open form, false = close form
   */
  const [generalOpen, setGeneralOpen] = useState(false);
  const [adminAddOpen, setAdminAddOpen] = useState(false);
  const [adminEditOpen, setAdminEditOpen] = useState(false);
  const [preceptorOpen, setPreceptorOpen] = useState(false);
  const [placementOpen, setPlacementOpen] = useState(false);
  const [noteOpen, setNoteOpen] = useState(false);

  /**
   * Status of all the forms in this page
   * true = open form, false = close form
   */
  const [adminEditHover, setAdminEditHover] = useState(Array(data.adminInfo.length).fill(false))
  const [adminTrashHover, setAdminTrashHover] = useState(Array(data.adminInfo.length).fill(false))
  const [precepTrashHover, setPrecepTrashHover] = useState(Array(data.preceptorInfo.length).fill(false))

  /**
   * Lazy loading data to speed up clinic page
   * Call useEffect() to initiate loading
   */
  const [clinicRegion, setClinicRegion] = useState("")
  const [preceptorData, setPreceptorData] = useState(null)
  async function clientLoadPreceptor() {
    const database = client.database("uc-ctct");
    const container = database.container("Preceptors");
    let all_preceptor_data = []
    for (let i = 0; i < data.preceptorInfo.length; i++) {
      const { resource: preceptor_data } = await container.item(data.preceptorInfo[i], data.preceptorInfo[i]).read()
      all_preceptor_data.push(preceptor_data)
    }
    const region_data = await getRegion(data.region_id)
    setPreceptorData(all_preceptor_data)
    setClinicRegion(region_data.name)
  }
  useEffect(() => clientLoadPreceptor(), [data])

  /**
   * Remove admin data from clinic
   * @param {String} index - index of the admin in the list
   */
  async function removeAdminElement(index) {
    await removeAdmin(data.id, index)
    refreshData()
    return
  }

  /**
   * Remove preceptor data from clinic
   * @param {String} index - index of the preceptor in the list
   * @
   */
  async function removePreceptorElement(index) {
    await removePreceptor(data.id, index)
    refreshData()
    return
  }

  /**
   * Initiate variables for Google Maps functionality
   */
  const center = {
    lat: parseFloat(data.generalInformation.lat),
    lng: parseFloat(data.generalInformation.long)
  }
  const zoom = 14

  return (
    <React.Fragment>
      {generalOpen ? <ClinicInfoEdit data={data} open={generalOpen} setOpen={setGeneralOpen} reload={refreshData} id={data.id} /> : null}
      {adminAddOpen ? <AdminInfoAdd open={adminAddOpen} setOpen={setAdminAddOpen} reload={refreshData} id={data.id} /> : null}
      {adminEditOpen ? <AdminInfoEdit open={adminEditOpen} setOpen={setAdminEditOpen} reload={refreshData} id={data.id} /> : null}
      {preceptorOpen ? <PreceptorInfoEdit open={preceptorOpen} setOpen={setPreceptorOpen} reload={refreshData} id={data.id} region={clinicRegion} /> : null}
      {placementOpen ? <PlacementInfoEdit data={data} open={placementOpen} setOpen={setPlacementOpen} reload={refreshData} id={data.id} /> : null}
      {noteOpen ? <NoteEdit open={noteOpen} setOpen={setNoteOpen} reload={refreshData} type="Clinics" id={data.id} /> : null}
      <div className={styles.container}>
        <Head>
          <title>UC-CTCT: Site Management Systems</title>
          <meta name="description" content="University of California - Clinic Coordination Tools" />
          <link rel="icon" href="/favicon.ico" />e
        </Head>
        <main className={styles.main}>
          <Navbar icons={[false, true, false, false, false]} />
          <div className={styles.content}>
            <Header header={`${data.name} - Details`} imgSrc="/asset/images/user-image.png" back={router.back} />
            <div className={styles.generalBox} style={{ marginTop: '3rem' }}>
              <div className={styles.generalContent}>
                <div className={styles.generalTitle}>
                  <div>
                    <p className={styles.generalTitleHeader}>Clinic Profile</p>
                    <p className={styles.generalTitleSubHeader}>Last Updated: 26 January 2021</p>
                  </div>
                  <div className={styles.editButton} onClick={() => setGeneralOpen(true)}>Edit Information</div>
                </div>
                <Accordion x={{ title: "General Information", note: null }} ind={`profile0`} disabledEdit disabledTrash>
                  <div className={styles.generalDetail}>
                    <p style={{ marginRight: '2rem' }}><strong>Site:</strong> {data.generalInformation.site}</p>
                    <p style={{ marginRight: '2rem' }}><strong>Phone Number:</strong> {data.generalInformation.phoneNumber}</p>
                    <p><strong>Fax Number:</strong> {data.generalInformation.faxNumber}</p>
                  </div>
                  <div className={styles.generalDetail}>
                    <p style={{ marginRight: '2rem' }}><strong>Address:</strong> {`${data.generalInformation.addressLine1}, ${data.generalInformation.addressLine2 ? `${data.generalInformation.addressLine2}, ` : ''}${data.generalInformation.city}, ${data.generalInformation.state}, ${data.generalInformation.postal}`}</p>
                    <p><strong>Current Status:</strong> {statusText}</p>
                  </div>
                </Accordion>
                <Accordion x={{ title: "Clinic Details", note: null }} ind={`profile1`} disabledEdit disabledTrash>
                  <div className={styles.generalDetail}>
                    <p style={{ marginRight: '2rem' }}><strong>Setting (Location):</strong> {data.description.settingLocation} </p>
                    <p style={{ marginRight: '2rem' }}><strong>Setting (Population):</strong> {data.description.settingPopulation} </p>
                    <p><strong>Population:</strong> {data.description.population} </p>
                  </div>
                  <div className={styles.generalDetail}>
                    <p style={{ marginRight: '2rem' }}><strong>Visit Type:</strong> {data.description.visitType} </p>
                    <p><strong>Patient Acuity:</strong> {data.description.patientAcuity} </p>
                  </div>
                  <div className={styles.generalDetail}>
                    <p><strong>Documentation:</strong> {data.description.documentation} </p>
                  </div>
                  <div className={styles.generalDetail}>
                    <p><strong>Orders:</strong> {data.description.orders} </p>
                  </div>
                  <div className={styles.generalDetail}>
                    <p><strong>Appointment Template:</strong> {data.description.apptTemplate} </p>
                  </div>
                </Accordion>
              </div>
            </div>
            <div className={styles.generalBox}>
              <div className={styles.generalContent}>
                <div className={styles.generalTitle}>
                  <div>
                    <p className={styles.generalTitleHeader}>Administrative and Other Contact Information</p>
                  </div>
                  <div className={styles.editButton} onClick={() => setAdminAddOpen(true)}>+ Add New Admin</div>
                </div>
                <div style={{ marginTop: '2rem' }}>
                  {
                    data.adminInfo.map((x, ind) => {
                      return (
                        <div style={{ width: '100%', height: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }} key={x.id} >
                          <div className="displayDetailRow">
                            <p className="adminCol1">{`${x.name} - ${x.position}`}</p>
                            <p className="adminCol2">{x.phone}</p>
                            <p className="adminCol3">{x.email}</p>
                          </div>
                          <FiEdit color={adminEditHover[ind] ? "#079CDB" : "#C4C4C4"} size={adminEditHover[ind] ? 40 : 35} style={{ cursor: 'pointer', transition: '0.2s linear', marginLeft: '1rem' }}
                            onMouseEnter={() => {
                              let newStatus = [...adminEditHover]
                              newStatus[ind] = true
                              setAdminEditHover(newStatus)
                              return
                            }
                            } onMouseLeave={() => {
                              let newStatus = [...adminEditHover]
                              newStatus[ind] = false
                              setAdminEditHover(newStatus)
                              return
                            }}
                            onClick={() => setAdminEditOpen([true, ind])} />
                          <FaRegTrashAlt color={adminTrashHover[ind] ? "#CD0000" : "#C4C4C4"} size={adminTrashHover[ind] ? 38 : 35}
                            style={{ cursor: 'pointer', transition: '0.2s linear', marginLeft: '1rem' }}
                            onMouseEnter={() => {
                              let newStatus = [...adminTrashHover]
                              newStatus[ind] = true
                              setAdminTrashHover(newStatus)
                              return
                            }
                            } onMouseLeave={() => {
                              let newStatus = [...adminTrashHover]
                              newStatus[ind] = false
                              setAdminTrashHover(newStatus)
                              return
                            }
                            } onClick={() => removeAdminElement(ind)} />
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </div>
            <div className={styles.generalBox}>
              <div className={styles.generalContent}>
                <div className={styles.generalTitle}>
                  <div>
                    <p className={styles.generalTitleHeader}>Preceptors Information</p>
                  </div>
                  <div className={styles.editButton} style={{ width: '12rem' }} onClick={() => setPreceptorOpen(true)}>+ Add New Preceptor</div>
                </div>
                <div style={{ marginTop: '2rem' }}>
                  {
                    preceptorData == null ? <p>Loading...</p> : (preceptorData.map((x, ind) => {
                      console.log(preceptorData)
                      const status = StatusParser('preceptors', parseInt(x.status))
                      return (
                        <div style={{ width: '100%', height: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }} key={x.id} >
                          <Link href={`/sites/database/clinics/preceptor?preceptor_id=${x.id}`}>
                            <div key={`preceptor_${ind}`} className="displayPrecepRow">
                              <p className="preceptorCol1">{x.firstname} {x.lastname}</p>
                              <p className="preceptorCol2">{x.credential}</p>
                              <p className="preceptorCol3">{x.phoneNumber}</p>
                              <p className="preceptorCol4">{x.email}</p>
                              <p className="preceptorCol5">{status}</p>
                              <div className={`clinicTag${x['status']}`}></div>
                            </div>
                          </Link>
                          <FaRegTrashAlt color={precepTrashHover[ind] ? "#CD0000" : "#C4C4C4"} size={precepTrashHover[ind] ? 38 : 35}
                            style={{ cursor: 'pointer', transition: '0.2s linear', marginLeft: '1rem' }}
                            onMouseEnter={() => {
                              let newStatus = [...precepTrashHover]
                              newStatus[ind] = true
                              setPrecepTrashHover(newStatus)
                              return
                            }
                            } onMouseLeave={() => {
                              let newStatus = [...precepTrashHover]
                              newStatus[ind] = false
                              setPrecepTrashHover(newStatus)
                              return
                            }
                            } onClick={() => removePreceptorElement(ind)} />
                        </div>
                      )
                    }))
                  }
                </div>
              </div>
            </div>
            <div className={styles.generalBox}>
              <div className={styles.generalContent}>
                <div className={styles.generalTitle}>
                  <div>
                    <p className={styles.generalTitleHeader}>Clinical Placement Details</p>
                  </div>
                  <div className={styles.editButton} onClick={() => setPlacementOpen(true)}>Edit Information</div>
                </div>
                <div style={{ marginTop: '2rem' }}>
                  {
                    data.clinicPlacementDetail.map((x, ind) => {
                      return (<Accordion x={x} ind={ind} key={`placement_${ind}`} disabledEdit disabledTrash />)
                    })
                  }
                </div>
              </div>
            </div>
            <div className={styles.generalBox}>
              <div className={styles.generalContent}>
                <div className={styles.generalTitle}>
                  <div>
                    <p className={styles.generalTitleHeader}>Clinical Notes</p>
                  </div>
                  <div className={styles.editButton} onClick={() => setNoteOpen(true)}>+ Add Notes</div>
                </div>
                <div style={{ marginTop: '2rem' }}>
                  {
                    data.notes.length == 0 ?
                    <p style={{ marginBottom: '2rem' }}> Currently, you do not have any notes! </p>
                    :
                    data.notes.map((x, ind) => {
                      return (<Accordion x={x} ind={ind} key={`notes_${ind}`} setOpen={setNoteOpen} />)
                    })
                  }
                </div>
              </div>
            </div>
            <div className={styles.generalBox} style={{ marginBottom: '3rem' }}>
              <div className={styles.generalContent}>
                <div className={styles.generalTitle}>
                  <div>
                    <p className={styles.generalTitleHeader}>Map & Direction</p>
                  </div>
                </div>
                <div className={styles.generalDetail} style={{ height: '50vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '1rem 0' }}>
                  <div style={{height: '95%', width: '90%'}}>
                    <GoogleMapReact bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY }} defaultCenter={center} defaultZoom={zoom} >
                        <Marker lat={data.generalInformation.lat} lng={data.generalInformation.long} type={'clinic'} name={data.name}
                        addr={`${data.generalInformation.addressLine1}, ${data.generalInformation.addressLine2 ? `${data.generalInformation.addressLine2}, ` : ''}${data.generalInformation.city}, ${data.generalInformation.state}, ${data.generalInformation.postal}`}
                        phoneNumber={data.generalInformation.phoneNumber} />
                    </GoogleMapReact>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <style jsx>
        {
          `
            .displayDetailRow, .displayPrecepRow {
              display: flex;
              flex-direction: row;
              justify-content: flex-start;
              align-items: center;
              background-color: #fff;
              height: auto;
              width: 100%;
              margin: 0.4rem 0;
              border-radius: 1rem;
              box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
              font-family: 'Lato', sans-serif;
              font-weight: 500;
              font-size: 1rem;
            }

            .displayPrecepRow {
              height: 3.1rem;
              cursor: pointer;
              transition: 0.2s linear;
            }

            .displayPrecepRow:hover {
              color: #079CDB;
            }

            .adminCol1 {
                width: 50%;
            }
            
            .adminCol2 {
                width: 25%;
            }
            
            .adminCol3 {
                width: 25%;
            }
            
            .preceptorCol1 {
                width: 25%;
            }
            
            .preceptorCol2 {
                width: 10%
            }
            
            .preceptorCol3 {
                width: 15%;
            }
            
            .preceptorCol4 {
                width: 25%;
            }

            .preceptorCol5 {
                width: 25%;
            }
            
            .placementCol1 {
                width: 80%;
            }
            
            .adminCol1, .preceptorCol1 {
                padding-left: 2rem;
            }
            `
        }
      </style>
    </React.Fragment>
  )
}