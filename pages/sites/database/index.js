import { useEffect, useState } from 'react';
import Head from 'next/head'
import styles from '../../../styles/Sites.module.css'
import Link from 'next/link'
import GoogleMapReact from 'google-map-react';

import Navbar from '../../../components/shared/navbar/navbar';
import Header from '../../../components/shared/header/header';
import { FaChartPie, FaDatabase } from 'react-icons/fa';
import Marker from '../../../components/shared/marker/marker';
import { useRouter } from 'next/router';

// Import DB component
import { getClinicOrSiteOrRegion, getSitesFromRegion, removeSite } from '../../../api-lib/azure/azureOps';
import { getAllClinics, getAllStudents } from '../../../api-lib/azure/azureOps';
import { runAuthMiddleware } from '../../../api-lib/auth/authMiddleware';

export async function getServerSideProps(context) {
    const redirect = await runAuthMiddleware(context.req, context.res);
    // If the user is invalid then we redirect them back to the index.js page
    if (redirect) return redirect;
    // ID for the region location, passed in as query param by previous page. 
    const location = context.query.location
    // TODO: CREATE GETTERS FOR REGION AND CLINIC -> THEN IMPLEMENT ERROR HANDLING WITH ERROR PAGE BY NEXTJS
    if (location) {
        const region_data = await getClinicOrSiteOrRegion(location);
        return { props: { region_data, location, user: context.req.user } }
    } 
    return { props: { user: context.req.user } }
  }

export default function SiteMgmt({ region_data, location, user }) {
    const [clinicData, setClinicData] = useState(null)
    const [studentData, setStudentData] = useState(null)
    const [mapIsLoading, setMapIsLoading] = useState(true)
  
    const center = {
      lat: 36.427590,
      lng: -120.388835
    }
    const zoom = 9
  
    async function loadData() {
      const cData = await getAllClinics();
      const sData = await getAllStudents();
      setClinicData(cData)
      setStudentData(sData)
      setMapIsLoading(false)
    }
  
    useEffect(() => {
      loadData()
    }, [])

    const router = useRouter()

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
                    <Header header={`Site Management Tools: ${region_data ? region_data.name : "All Affiliations"}`} imgSrc={user.photo ? user.photo : "/asset/images/user-image.png"} back={router.back} />
                    <div className={styles.menu}>
                        <Link href={location ? `/sites/database/site?location=${location}` : `/sites/database/site`}>
                            <div className={styles.menuOptionTop}>
                                <div className={styles.rowCenter}>
                                    <FaDatabase size={30} color='#079CDB'/>
                                    <h1>Manage Clinical Sites</h1>
                                </div>
                                <p style={{ marginBottom: '1rem'}}>Add more clinics, sites, or regions and edit existing information</p>
                            </div>
                        </Link>
                        <Link href={location ? `/sites/visual?location=${location}` : `/sites/visual`}>
                            <div className={styles.menuOptionBottom}>
                                <div className={styles.rowCenter}>
                                    <FaChartPie size={30} color='#079CDB'/>
                                    <h1>Clinical Site Overview</h1>
                                </div>
                                <p style={{ marginBottom: '1rem'}}>Quick overview of all the clinics and chart analysis</p>
                            </div>
                        </Link>
                    </div>
                    <div className={styles.activities}>
                        <div className={styles.activityBox}>
                        <h1 className={styles.actTitle}>Map Overview for { region_data ? region_data.name : "All Affiliations" }</h1>
                        <h4 className={styles.legend}>
                            <img src='/asset/images/clinic-pin.png' /> Clinic <span style={{marginRight: '2rem'}} />
                            <img src='/asset/images/student-pin.png' />  Student (Assigned) <span style={{marginRight: '2rem'}} />
                            <img src="/asset/images/student-unassigned-pin.png" /> Student (Unassigned)
                            </h4>
                        {mapIsLoading ? <p style={{ margin: '1rem 0 0 2rem', padding: 0 }}>Loading student and clinic data. Please wait...</p> : null}
                        <div className={styles.mapFrame}>
                            <div className={styles.mapContainer}>
                            <GoogleMapReact bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY }} defaultCenter={center} defaultZoom={zoom} >
                                {
                                    clinicData != null ?
                                    clinicData.map((x) => {
                                    const genInfo = x.generalInformation
                                    return <Marker lat={genInfo.lat} lng={genInfo.long} id={x.id}
                                    type={'clinic'} name={x.name} phoneNumber={genInfo.phoneNumber}
                                    addr={`${genInfo.addressLine1}, ${genInfo.addressLine2 ? `${genInfo.addressLine2}, ` : ''}${genInfo.city}, ${genInfo.state}, ${genInfo.postal}`} />
                                    })
                                    :
                                    null
                                }
                                {
                                    studentData != null ?
                                    studentData.map(x => {
                                    const addr = `${x.addressLine1}, ${x.addressLine2 == "" ? "" : x.addressLine2 + ', '}${x.city}, ${x.state} ${x.postal}`
                                    return <Marker lat={x.lat} lng={x.long} type={x.assignment.isAssigned ? 'student-assigned' : 'student-unassigned'} 
                                    id={x.id} name={`${x.firstName} ${x.lastName}`} phoneNumber={x.phoneNumber} addr={addr} />
                                    })
                                    :
                                    null
                                }
                            </GoogleMapReact>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}