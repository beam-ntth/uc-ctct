// Main Packages
import Head from 'next/head'
import styles from '../styles/Home.module.css'

// DB Functions
import nextConnect from 'next-connect';
import setup from '../api-lib/auth/passportSetup';
import { checkIfAdminExist } from '../api-lib/azure/azureOps';

export async function getServerSideProps(context) {
  // Check if the cookie exist, if so we do not require them to login
  const handler = nextConnect().use(...setup);
  await handler.run(context.req, context.res);
  const user = context.req.user;
  if (user) {
    const adminExist = await checkIfAdminExist(user.email)
    if (adminExist) {
      return {
        redirect: {
          permanent: false,
          destination: '/main',
        },
      }
    }
  }

  // If the user didn't login properly, we redirect them and give them a warning
  const authValue = context.query.auth
  let displayWarning = null;
  if (authValue == "failed") {
    displayWarning = true
  } else {
    displayWarning = false
  }
  return { props: { displayWarning } }
}

export default function Home({ displayWarning }) {
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
            <img key='logo1' className={styles.fadeInAndOut} src="/asset/images/uc-seal.png" alt='UC Davis Logo' style={{ height: 'auto', width: '30%', marginBottom: '5%' }} />
            <h1 className={styles.logoTitle}>Welcome to UC Coordination Tools</h1>
          </div>
        </div>
        {/* Login Side */}
        <div className={styles.login}>
          <div className={styles.subLogin}>
            <h1 className={styles.title}>
              Sign In / Register
            </h1>
            <a className={styles.signinBtn} href="/api/auth/google">
              <img style={{ height: '60%', width: 'auto', paddingRight: '1rem' }} src='/asset/images/google-logo.png' alt='Google Logo' />
              Sign in with Google
            </a>
            <a className={styles.signinBtn} href="/main">
              <img style={{ height: '60%', width: 'auto', paddingRight: '1rem' }} src='/asset/images/outlook-logo.png' alt='Google Logo' />
              Sign in with Outlook
            </a>
          </div>
          {displayWarning ? <p className={styles.warning} >PERMISSION DENIED. Please make sure you use the correct email address or contact IT for support.</p> : null}
        </div >
      </main >
    </div >
  )
}
