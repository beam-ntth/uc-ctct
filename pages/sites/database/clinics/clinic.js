import Head from "next/head";
import Link from "next/link";
import Error from 'next/error'

import React, { useState } from "react";
import Navbar from "../../../../components/shared/navbar/navbar";
import Header from "../../../../components/shared/header/header";
import styles from "../../../../styles/Clinic.module.css";
import Accordion from "../../../../components/clinicPage/accordion";
import { useRouter } from "next/router";
import ClinicInfoEdit from "../../../../components/clinicPage/generalInfoEdit";
import AdminInfoEdit from "../../../../components/clinicPage/adminInfoEdit";
import PreceptorInfoEdit from "../../../../components/clinicPage/preceptorInfoEdit";
import PlacementInfoEdit from "../../../../components/clinicPage/placementInfoEdit";
import NoteEdit from "../../../../components/clinicPage/noteEdit";

export async function getServerSideProps(context) {
  const clinicName = context.query.name
  const res = await fetch(`${process.env.LOCAL_URL}api/clinic/detail?name=${clinicName}`)
  const status = res.ok;
  // console.log(res.status)
  const errorCode = status ? false : res.status;
  console.log("Error code", errorCode)
  const data = await res.json()
  if (errorCode) {
    console.log("FOUND ERROR", errorCode)
    return {
      props: { errorCode }
    }
  }
  return { props: { data } }
}

export default function Database({ errorCode, data }) {
  if (errorCode) {
    return <Error statusCode={errorCode} />
  }
  const router = useRouter()
  let statusText = 'N/A'

  if (data['status'] === 0) {
    statusText = <span style={{ padding: '0.3rem 0.6rem', margin: '0', backgroundColor: '#FF3E3E', color: '#fff', borderRadius: '0.5rem' }}>Need To Contact</span>
  }
  if (data['status'] === 1) {
    statusText = <span style={{ padding: '0.3rem 0.6rem', margin: '0', backgroundColor: '#FFB23E', color: '#fff', borderRadius: '0.5rem' }}>Need To Follow Up</span>
  }
  if (data['status'] === 2) {
    statusText = <span style={{ padding: '0.3rem 0.6rem', margin: '0', backgroundColor: '#3EDCFF', color: '#fff', borderRadius: '0.5rem' }}>Contacted</span>
  }
  if (data['status'] === 3) {
    statusText = <span style={{ padding: '0.3rem 0.6rem', margin: '0', backgroundColor: '#34E23B', color: '#fff', borderRadius: '0.5rem' }}>Connected</span>
  }



  const [generalOpen, setGeneralOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [preceptorOpen, setPreceptorOpen] = useState(false);
  const [placementOpen, setPlacementOpen] = useState(false);
  const [noteOpen, setNoteOpen] = useState(false);



  return (
    <React.Fragment>
      {generalOpen ? <ClinicInfoEdit data={data} open={generalOpen} setOpen={setGeneralOpen} /> : null}
      {adminOpen ? <AdminInfoEdit open={adminOpen} setOpen={setAdminOpen} /> : null}
      {preceptorOpen ? <PreceptorInfoEdit open={preceptorOpen} setOpen={setPreceptorOpen} /> : null}
      {placementOpen ? <PlacementInfoEdit data={data} open={placementOpen} setOpen={setPlacementOpen} /> : null}
      {noteOpen ? <NoteEdit open={noteOpen} setOpen={setNoteOpen} /> : null}
      <div className={styles.container}>
        <Head>
          <title>UC-CTCT: Site Management Systems</title>
          <meta name="description" content="University of California - Clinic Coordination Tools" />
          <link rel="icon" href="/favicon.ico" />e
        </Head>
        <main className={styles.main}>
          <Navbar icons={[false, true, false, false, false]} />
          <div className={styles.content}>
            <Header header="Clinic Details" imgSrc="/asset/images/user-image.png" back={router.back} />
            <div className={styles.generalBox}>
              <div className={styles.generalContent}>
                <div className={styles.generalTitle}>
                  <div>
                    <p className={styles.generalTitleHeader}>General Clinic Information</p>
                    <p className={styles.generalTitleSubHeader}>Last Updated: 26 January 2021</p>
                  </div>
                  <div className={styles.editButton} onClick={() => setGeneralOpen(true)}>Edit Information</div>
                </div>
                <div className={styles.generalDetail}>
                  <p style={{ marginRight: '2rem' }}><strong>Site:</strong> {data.site}</p>
                  <p><strong>Phone Number:</strong> {data.phoneNumber}</p>
                </div>
                <div className={styles.generalDetail}>
                  <p style={{ marginRight: '2rem' }}><strong>Address:</strong> {`${data.addressLine1}, ${data.addressLine2 ? `${data.addressLine2}, ` : ''}${data.city}, ${data.state}, ${data.postal}`}</p>
                  <p><strong>Fax Number:</strong> {data.faxNumber}</p>
                </div>
                <div className={styles.generalDetail}>
                  <p><strong>Current Status:</strong> {statusText}</p>
                </div>
              </div>
            </div>
            <div className={styles.generalBox}>
              <div className={styles.generalContent}>
                <div className={styles.generalTitle}>
                  <div>
                    <p className={styles.generalTitleHeader}>Administrative and Other Contact Information</p>
                  </div>
                  <div className={styles.editButton} onClick={() => setAdminOpen(true)}>+ Add Information</div>
                </div>
                <div style={{ marginTop: '2rem' }}>
                  {
                    data.adminInfo.map((x, ind) => {
                      return (
                        <div key={`admin_${ind}`} className="displayRow">
                          <p className="adminCol1">{`${x.name} - ${x.position}`}</p>
                          <p className="adminCol2">{x.phone}</p>
                          <p className="adminCol3">{x.email}</p>
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
                  <div className={styles.editButton} onClick={() => setPreceptorOpen(true)}>+ Add Information</div>
                </div>
                <div style={{ marginTop: '2rem' }}>
                  {
                    data.preceptorInfo.map((x, ind) => {
                      return (
                        <div key={`preceptor_${ind}`} className="displayRow">
                          <p className="preceptorCol1">{x.name}</p>
                          <p className="preceptorCol2">{x.credential}</p>
                          <p className="preceptorCol3">{x.phone}</p>
                          <p className="preceptorCol4">{x.email}</p>
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
                    <p className={styles.generalTitleHeader}>Clinical Placement Details</p>
                  </div>
                  <div className={styles.editButton} onClick={() => setPlacementOpen(true)}>Edit Information</div>
                </div>
                <div style={{ marginTop: '2rem' }}>
                  {
                    data.clinicPlacementDetail.map((x, ind) => {
                      return (<Accordion x={x} ind={ind} />)
                    }
                    )
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
                <div className={styles.generalDetail} style={{ height: 'auto', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '1rem 0' }}>
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3120.690806215745!2d-121.77333398432486!3d38.540894979627275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085285671d81bc3%3A0xa9b2b5f9232535d6!2sSol%20at%20West%20Village!5e0!3m2!1sen!2sus!4v1644113659546!5m2!1sen!2sus" width='80%' height='400px' style={{ border: 0 }} allowfullscreen="" loading="lazy"></iframe>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <style jsx>
        {
          `
                    .displayRow {
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
                        font-size: 1.2rem;
                        padding: 0.4rem 0;
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
                        width: 40%;
                    }
                    
                    .preceptorCol2 {
                        width: 10%
                    }
                    
                    .preceptorCol3 {
                        width: 25%;
                    }
                    
                    .preceptorCol4 {
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