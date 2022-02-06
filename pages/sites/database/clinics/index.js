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
                <p className="row1">Clinic Name</p>
                <p className="row2">Last Updated</p>
                <p className="row3" style={{paddingLeft: '1rem'}}>Status</p>
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
                
                return(
                  <Link href={`/sites/database/clinics/clinic`}>
                      <div key={`clinic_${ind}`} className="displayRow">
                        <div className="rowContent">
                          <p className="row1" style={{marginLeft: '2rem'}}>{x['name']}</p>
                          <p className="row2" >{x['lastUpdated']}</p>
                          <p className="row3">{statusText}</p>
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
      <style jsx>
          {
              `
              .displayRow {
                  display: flex;
                  flex-direction: row;
                  justify-content: space-between;
                  align-items: center;
                  background-color: #fff;
                  height: 4.2rem;
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

              .rowContent {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                height: 100%;
              }

              .row1 {
                width: 50%;
              }
              
              .row2 {
                width: 25%;
              }

              .row3 {
                width: 20%;
              }

              .tag0 {
                background-color: #FF8B8B;
                height: 100%;
                width: 3%;
                border-start-end-radius: 1rem;
                border-end-end-radius: 1rem 
              }

              .tag1 {
                background-color: #FFD88B;
                height: 100%;
                width: 3%;
                border-start-end-radius: 1rem;
                border-end-end-radius: 1rem 
              }

              `
          }
      </style>
    </React.Fragment>
  );
}
