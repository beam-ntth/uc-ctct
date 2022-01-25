import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Main() {
    return (
        <div className={styles.container}>
            <Head>
                <title>UC-CTCT: Main</title>
                <meta name="description" content="University of California - Clinic Coordination Tools" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1 className={styles.title}>You made it!</h1>
        </div>
    )
}