import Head from 'next/head'
import { useState } from 'react';
import styles from '../styles/Home.module.css'


export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>UC-CTCT: Sign-In</title>
        <meta name="description" content="University of California - Clinic Coordination Tools" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {/* Logo Side */}
        <div className={styles.logo}>
          <div className={styles.subLogo}>
            <img key='logo1' className={styles.fadeInAndOut} src="/asset/images/uc-seal.png" alt='UC Davis Logo' style={{height: 'auto', width: '30%', marginBottom: '5%'}} />
            <h1 className={styles.logoTitle}>Welcome to UC Coordination Tools</h1>
          </div>
        </div>
        {/* Login Side */}
        <div className={styles.login}>
          <div className={styles.subLogin}>
            <h1 className={styles.title}>
              Sign In / Register
            </h1>
            <a className={styles.signinBtn} href="/main">
              <img style={{height: '60%', width: 'auto', paddingRight: '1rem'}} src='/asset/images/google-logo.png' alt='Google Logo'/>
              Sign in with Google
            </a>
            <a className={styles.signinBtn} href="/main">
              <img style={{height: '60%', width: 'auto', paddingRight: '1rem'}} src='/asset/images/outlook-logo.png' alt='Google Logo'/>
              Sign in with Outlook
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
