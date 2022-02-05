import Head from "next/head";
import Link from "next/link";

import React, { useEffect } from "react";
import Navbar from "../../../../components/shared/navbar/navbar";
import Header from "../../../../components/shared/header/header";
import styles from "../../../../styles/Database.module.css";

export async function getServerSideProps(context) {
  const query = context.query
  const res = await fetch(`http://localhost:3000/api/clinic?location=${query['location']}`)
  const data = await res.json()
  return { props: { data } }
}

export default function Clinics({ data }) {
  return (
    <React.Fragment>
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
          <Navbar icons = {[false, true, false, false, false]} />
          <div className={styles.content}>
          <Header header="Management Overview - Clinics" date = "Today: February 2, 2022"/>
            <div className={styles.data}>
              <div className={styles.row}>
                <p>Clinic Name</p>
                <p>Last Updated</p>
                <p>Status</p>
              </div>
              {
              data.map((x, ind) => {
                return(
                  <Link href={`/sites/database/clinics/clinic`}>
                    <div key={`clinic_${ind}`} className="displayRow">
                      <p style={{marginLeft: '2rem'}}>{x['name']}</p>
                      <p>{x['lastUpdated']}</p>
                      <p style={{marginRight: '5rem'}}>{x['status']}</p>
                    </div>
                  </Link>
                )
              })
              }
            </div>
          </div>
        </main>
      </div>
      <style jsx>
          {
              `
              .displayRow, .addRow {
                  display: flex;
                  flex-direction: row;
                  justify-content: space-between;
                  align-items: center;
                  padding: 0.5rem;
                  background-color: #fff;
                  height: auto;
                  width: 90%;
                  margin: 0.4rem 0;
                  border-radius: 1rem;
                  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
                  font-family: 'Lato', sans-serif;
                  font-weight: 600;
                  font-size: 1.2rem;
                  cursor: pointer;
              }

              .displayRow:hover {
                  color: #079CDB;
                  width: 91%;
                  transition: linear 0.3s;
              }

              .addRow {
                  opacity: 0.75;
                  border: 1px solid #CACACA;
              }
              `
          }
      </style>
    </React.Fragment>
  );
}
