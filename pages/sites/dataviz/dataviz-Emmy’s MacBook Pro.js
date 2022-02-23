import Head from 'next/head'
import styles from '../../styles/Sites.module.css'
import Link from 'next/link'

import Navbar from '../../../components/shared/navbar/navbar';
import Header from '../../../components/shared/header/header';

export default function Visualization() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Data Analytics</title>
            </Head>
        </div>
    )
}