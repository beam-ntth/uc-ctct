import Head from 'next/head'
import { useState } from 'react';
import styles from '../styles/Home.module.css'


export default function Home() {
  const [btn, useBtn] = useState([styles.circle1, styles.circle2, styles.circle3])
  let logoImage = <img className={styles.fadeInAndOut} src='/asset/images/ucd-logo.png' alt='UC Davis Logo' style={{height: 'auto', width: '100%'}} />
  if (btn[0] == styles.circle2) {
    logoImage = <img key='logo1' className={styles.fadeInAndOut} src="/asset/images/ucsf-logo.png" alt='UC Davis Logo' style={{height: 'auto', width: '75%'}} />
  } else if (btn[0] == styles.circle3) {
    logoImage = <img key='logo2' className={styles.fadeInAndOut} src="/asset/images/ucla-logo.png" alt='UC Davis Logo' style={{height: 'auto', width: '100%'}} />
  } else {
    logoImage = <img key='logo3' className={styles.fadeInAndOut} src='/asset/images/ucd-logo.png' alt='UC Davis Logo' style={{height: 'auto', width: '100%'}} />
  }

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
            <div className={styles.showImages}>
              {logoImage}
            </div>
            <h1 className={styles.logoTitle}>Welcome to UC Coordination Tools</h1>
            <p className={styles.logoSubTitle}>Click to see all organizations</p>
            <div className={styles.carosel}>
              <div className={btn[0]} onClick={() => useBtn([styles.circle1, styles.circle2, styles.circle3])}></div>
              <div className={btn[1]} onClick={() => useBtn([styles.circle2, styles.circle1, styles.circle3])}></div>
              <div className={btn[2]} onClick={() => useBtn([styles.circle3, styles.circle2, styles.circle1])}></div>
            </div>
          </div>
        </div>
        {/* Login Side */}
        <div className={styles.login}>
          <div className={styles.subLogin}>
            <h1 className={styles.title}>
              Sign In / Register
            </h1>
            <a className={styles.signinBtn} href="/api/auth/google">
              <img style={{height: '60%', width: 'auto', paddingRight: '1rem'}} src='/asset/images/google-logo.png' alt='Google Logo'/>
              Sign in with Google
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
