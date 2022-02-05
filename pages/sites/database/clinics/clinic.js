import Head from "next/head";
import Link from "next/link";

import React, { useEffect } from "react";
import Navbar from "../../../../components/shared/navbar/navbar";
import Header from "../../../../components/shared/header/header";
import styles from "../../../../styles/Database.module.css";

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
                    </div>
                </main>
            </div>
        </React.Fragment>
    )
}