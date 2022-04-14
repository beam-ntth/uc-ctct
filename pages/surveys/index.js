import Head from 'next/head'
import styles from '../../styles/Surveys.module.css'
import Link from 'next/link'

import Navbar from '../../components/shared/navbar/navbar';
import Header from '../../components/shared/header/header';
import { MdScience, MdOutlineEmojiPeople } from 'react-icons/md'
import { FiUpload } from 'react-icons/fi';

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
                        <div className={styles.mainOption}>
                            <Link href="/surveys/student">
                                <div className={styles.menuOption}>
                                    <MdOutlineEmojiPeople size={100} color='#079CDB' />
                                    <h1>Manage Student Surveys</h1>
                                </div>
                            </Link>
                            <div className={styles.uploadOption}>
                                <FiUpload color={ "#079CDB" } size={ 35 } style={{ marginRight: '1rem' }} />
                                <p>Upload Student Survey Responses</p>
                            </div>
                        </div>
                        <div className={styles.mainOption}>
                            <Link href="/surveys/preceptor">
                                <div className={styles.menuOption}>
                                    <MdScience size={100} color='#079CDB'/>
                                    <h1>Manage Preceptor Surveys</h1>
                                </div>
                            </Link>
                            <div className={styles.uploadOption}>
                                <FiUpload color={ "#079CDB" } size={ 35 } style={{ marginRight: '1rem' }} />
                                <p>Upload Preceptor Survey Responses</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}