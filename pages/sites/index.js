import Head from 'next/head'
import styles from '../../styles/Sites.module.css'

import Navbar from '../../components/shared/navbar/navbar';
import Header from '../../components/shared/header/header';

export default function Sites() {
    return (
        <div className={styles.container}>
            <Head>
                <title>UC-CTCT: Site Management Systems</title>
                <meta name="description" content="University of California - Clinic Coordination Tools" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <Navbar icons={[false, true, false, false, false]} /> 
                <div className={styles.content}>
                    <Header header="Site Management Tools" date="Today: Febuary 2, 2022" imgSrc="" />
                    <div className={styles.menu}>
                        <div className={styles.chart}>
                            
                        </div>
                        <div className={styles.chart}>

                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}