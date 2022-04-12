import Head from 'next/head'
import styles from '../../styles/Sites.module.css'
import Link from 'next/link'

import Navbar from '../../components/shared/navbar/navbar';
import Header from '../../components/shared/header/header';
import { MdScience, MdOutlineEmojiPeople } from 'react-icons/md'

export default function StudentMgmt() {
    return (
        <div className={styles.container}>
            <Head>
                <title>UC-CTCT: Site Management Systems</title>
                <meta name="description" content="University of California - Clinic Coordination Tools" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <Navbar icons={[false, false, false, true, false]} /> 
                <div className={styles.content}>
                    <Header header="Site Management Tools" imgSrc="/asset/images/user-image.png" />
                    <div className={styles.menu}>
                        <Link href="/surveys/student">
                            <div className={styles.menuOption}>
                                <MdOutlineEmojiPeople size={100} color='#079CDB' />
                                <h1>Manage Student Surveys</h1>
                            </div>
                        </Link>
                        <Link href="/surveys/preceptor">
                            <div className={styles.menuOption}>
                                <MdScience size={100} color='#079CDB'/>
                                <h1>Manage Preceptor Surveys</h1>
                            </div>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    )
}