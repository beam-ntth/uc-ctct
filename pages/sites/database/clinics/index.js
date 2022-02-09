import Head from "next/head";
import Link from "next/link";

import React, { useEffect, useState } from "react";
import Navbar from "../../../../components/shared/navbar/navbar";
import Header from "../../../../components/shared/header/header";
import styles from "../../../../styles/Database.module.css";
import NoteEdit from "../../../../components/clinicPage/noteEdit";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const query = context.query
  const res = await fetch(`${process.env.LOCAL_URL}api/clinic?location=${query['location']}`)
  const data = await res.json()
  return { props: { data } }
}

export default function Clinics({ data }) {
  const [openNote, setOpenNote] = useState(false)

  const router = useRouter()

  return (
    <React.Fragment>
      {openNote ? <NoteEdit open={openNote} setOpen={setOpenNote} /> : null}
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
            <Header header="Management Overview - Site 1" imgSrc="/asset/images/user-image.png" back={router.back} />
            <div className={styles.data}>
              <div style={{width: '90%', display: 'flex', paddingTop: '2rem'}}>
                <p className="titleClinics" style={{width: '80%', paddingLeft: '2rem', margin: 0, display: 'flex', alignItems: 'center'}}>Site Notes</p>
                <div style={{width: '20%', display: 'flex', justifyContent: 'center'}}>
                  <div className='editButton' onClick={() => setOpenNote(true)}>+ Add Note</div>
                </div>
              </div>
            </div>
            <div className={styles.data}>
              <div className={styles.row}>
                <p className="row1Clinics" style={{marginLeft: '2rem'}}>Clinic Name</p>
                <p className="row2Clinics">Last Updated</p>
                <p className="row3Clinics">Status</p>
              </div>
              {
                data.map((x, ind) => {
                  let statusText = 'N/A'

                  if (x['status'] === 0) {
                    statusText = 'Need To Contact'
                  }
                  if (x['status'] === 1) {
                    statusText = 'Need To Follow Up'
                  }
                  if (x['status'] === 2) {
                    statusText = 'Contacted'
                  }
                  if (x['status'] === 3) {
                    statusText = 'Connected'
                  }

                  return (
                    <Link href={`/sites/database/clinics/clinic?name=${x['id']}`}>
                      <div key={`clinic_${ind}`} className="displayRow">
                        <div className="rowContentClinics">
                          <p className="row1Clinics" style={{ marginLeft: '2rem' }}>{x['name']}</p>
                          <p className="row2Clinics" >{x['lastUpdated']}</p>
                          <p className="row3Clinics">{statusText}</p>
                        </div>
                        <div className={`tag${x['status']}`}></div>
                      </div>
                    </Link>
                  )
                })
              }
            </div>
          </div>
        </main>
      </div>
    </React.Fragment>
  );
}
