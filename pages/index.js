import Head from 'next/head'
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
        <h1 className={styles.title}>
          Register or Login here!
        </h1>
        <a className={styles.signinBtn} href="/api/app">Sign In with Google</a>
      </main>
    </div>
  )
}
