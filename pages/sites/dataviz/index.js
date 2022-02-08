import Head from 'next/head'
import styles from '../../../styles/Visualization.module.css'
import Link from 'next/link'

import Navbar from '../../../components/shared/navbar/navbar';
import Header from '../../../components/shared/header/header';

// export async function getServerSideProps() {
//     const res = await fetch(`http://localhost:3000/api/dataviz/visualization`)
//     const data = await res.json()
//     return { props: { data } }
//   }

export default function Visualization() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Data Analytics</title>
                <meta name="description" content="University of California - Clinic Coordination Tools" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <Navbar icons={[false, true, false, false, false]} />
                <div className={styles.content}>
                    <Header header="Data Analytics" date="Today: Febuary 2, 2022" imgSrc="/asset/images/user-image.png" />
                    <div className={styles.data}>
                        <div className={styles.row}>
                            <p className='col1DV' style={{marginLeft: '2rem'}}>Clinic Name</p>
                            <p className='col2DV'>Training Type</p>
                            <p className='col3DV'>Affiliation</p>
                            <p className='col4DV'>Region</p>
                            <p className='col5DV'>Status</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}