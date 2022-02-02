import Head from 'next/head'
import styles from '../styles/Main.module.css'

// Authentication Packages
import { isAuthenticated } from './api/auth/isAuthenticated';
import passport from 'passport';
import nextConnect from 'next-connect';
import setup from '../api-lib/auth/passportSetup';

// Component Packages
import Navbar from '../components/shared/navbar';
import Header from '../components/shared/header';

/* Suppress just for development */
// Example code from https://github.com/hoangvvo/next-connect at .run
// export async function getServerSideProps({ req, res }) {
//   const handler = nextConnect().use(...setup);
//   await handler.run(req, res);
//   const user = req.user;
//   console.log("Getting user: ", user)
//   if (!user) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: '/',
//       },
//     }
//   }
//   return {
//     props: { user: req.user },
//   };
// }


export default function Main() {
  return (
    <div className={styles.container}>
      <Head>
        <title>UC-CTCT: Main</title>
        <meta name="description" content="University of California - Clinic Coordination Tools" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Navbar />
        <Header props={{name: "Welcome, Rosalind De Lisser!", date: "Today: Febuary 2, 2022", img: ""}} />
      </main>
    </div>
  )
}