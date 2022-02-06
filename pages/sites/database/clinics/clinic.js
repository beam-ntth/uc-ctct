import Head from "next/head";
import Link from "next/link";

import React, { useEffect } from "react";
import Navbar from "../../../../components/shared/navbar/navbar";
import Header from "../../../../components/shared/header/header";
import styles from "../../../../styles/Clinic.module.css";

export default function Database({ data }) {
    return (
        <React.Fragment>
            <div className={styles.container}>
                <Head>
                    <title>UC-CTCT: Site Management Systems</title>
                    <meta name="description" content="University of California - Clinic Coordination Tools" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <main className={styles.main}>
                    <Navbar icons={[false, true, false, false, false]} /> 
                    <div className={styles.content}>
                        <Header header="Clinic Details" date="Today: Febuary 2, 2022" imgSrc="" />
                        <div className={styles.generalBox}>
                            <div className={styles.generalContent}>
                                <div className={styles.generalTitle}>
                                    <div>
                                        <p>General Clinic Information</p>
                                        <p>Last Updated: 26 January 2021</p>
                                    </div>
                                    <div>Edit Information</div>
                                </div>
                                <div className={styles.generalDetail}>
                                    <p style={{marginRight: '2rem'}}>Site:</p>
                                    <p>Phone Number:</p>
                                </div>
                                <div className={styles.generalDetail}>
                                    <p style={{marginRight: '2rem'}}>Address:</p>
                                    <p>Fax Number:</p>
                                </div>
                                <div className={styles.generalDetail}>
                                    <p>Current Status:</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.generalBox}>
                            <div className={styles.generalContent}>
                                <div className={styles.generalTitle}>
                                    <div>
                                        <p>Administrative and Other Contact Information</p>
                                    </div>
                                    <div>Edit Information</div>  
                                </div>
                                <div className="displayRow">
                                    <p>Name</p>
                                    <p>Phone</p>
                                    <p>Email</p>
                                </div>
                                <div className="displayRow">
                                    <p>Name</p>
                                    <p>Phone</p>
                                    <p>Email</p>
                                </div>
                                <div className="displayRow">
                                    <p>Name</p>
                                    <p>Phone</p>
                                    <p>Email</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.generalBox}>
                            <div className={styles.generalContent}>
                                <div className={styles.generalTitle}>
                                    <div>
                                        <p>Preceptors Information</p>
                                    </div>
                                    <div>Edit Information</div>
                                </div>
                                <div className="displayRow">
                                    <p>Name</p>
                                    <p>Phone</p>
                                    <p>Email</p>
                                </div>
                                <div className="displayRow">
                                    <p>Name</p>
                                    <p>Phone</p>
                                    <p>Email</p>
                                </div>
                                <div className="displayRow">
                                    <p>Name</p>
                                    <p>Phone</p>
                                    <p>Email</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.generalBox}>
                            <div className={styles.generalContent}>
                                <div className={styles.generalTitle}>
                                    <div>
                                        <p>Clinical Placement Details</p>
                                    </div>
                                    <div>Edit Information</div>
                                </div>
                                <div className="displayRow">
                                    <p>Name</p>
                                    <p>Phone</p>
                                    <p>Email</p>
                                </div>
                                <div className="displayRow">
                                    <p>Name</p>
                                    <p>Phone</p>
                                    <p>Email</p>
                                </div>
                                <div className="displayRow">
                                    <p>Name</p>
                                    <p>Phone</p>
                                    <p>Email</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.generalBox}>
                            <div className={styles.generalContent}>
                                <div className={styles.generalTitle}>
                                    <div>
                                        <p>Clinical Notes</p>
                                    </div>
                                    <div>Edit Information</div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.generalBox}>
                            <div className={styles.generalContent}>
                                <div className={styles.generalTitle}>
                                    <div>
                                        <p>Map & Direction</p>
                                    </div>
                                </div>
                                <div className={styles.generalDetail}>
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3120.690806215745!2d-121.77333398432486!3d38.540894979627275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085285671d81bc3%3A0xa9b2b5f9232535d6!2sSol%20at%20West%20Village!5e0!3m2!1sen!2sus!4v1644113659546!5m2!1sen!2sus" width="600" height="450" style={{border: 0}} allowfullscreen="" loading="lazy"></iframe>
                                </div>
                                <div className={styles.generalDetail}>
                                    <p>Show on Google Maps</p>
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
                        justify-content: space-between;
                        align-items: center;
                        background-color: #fff;
                        height: auto;
                        width: 100%;
                        margin: 0.4rem 0;
                        border-radius: 1rem;
                        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
                        font-family: 'Lato', sans-serif;
                        font-weight: 600;
                        font-size: 1.2rem;
                        cursor: pointer;
                    }
                    `
                }
            </style>
        </React.Fragment>
    )
}