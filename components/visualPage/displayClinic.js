import React, { useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io';
import styles from './DisplayClinic.module.css'
import Dropdown from './dropdown';
import SearchString from '../shared/search'

export async function getServerSideProps() {
    const database = client.database("uc-ctct");
    const container = database.container("Clinics");
    const { resources: data } = await container.items.query("SELECT * FROM c").fetchAll();
    return { props: { data } }
}

export default function DisplayClinic ({ data }) {
    const [filteredClinicData, setFilteredClinicData] = useState(data)
    const [showSiteDropdown, setShowSiteDropdown] = useState(false)

    function searchClinicName(substr) {
        setFilteredClinicData(SearchString(data, substr))
    }

    return (
        <React.Fragment>
            <div className={styles.filterRow}>
                <div className={styles.searchBar}>
                    <input className={styles.searchInput} placeholder="Enter Clinic Name ..." onChange={(x) => searchClinicName(x.target.value)} />
                </div>
                <div className={styles.regionForm}>
                    <div className={styles.formTitle}>
                        <p>Region</p>
                        <IoIosArrowDown color='#079CDB' />
                    </div>
                </div>
                <div className={styles.siteForm}>
                  <div className={styles.formTitle} onClick={() => setShowSiteDropdown(!showSiteDropdown)}>
                    <p>Site</p>
                    <IoIosArrowDown color='#079CDB' style={showSiteDropdown ? {transform: 'rotate(180deg)', transition: '0.3s linear'} : {transform: 'rotate(0deg)', transition: '0.3s linear'}} />
                  </div>
                  <Dropdown open={showSiteDropdown} setOpen={setShowSiteDropdown} />
                </div>
                <div className={styles.statusForm}>
                  <div className={styles.formTitle}>
                    <p>Status</p>
                    <IoIosArrowDown color='#079CDB' />
                  </div>
                  <Dropdown />
                </div>
            </div>
            <div className={styles.row}>
                <p className={styles.titleCol1}>Clinic Name</p>
                <p className={styles.titleCol2}>Affiliation</p>
                <p className={styles.titleCol3}>Region</p>
                <p className={styles.titleCol4}>Status</p>
            </div>  
            {filteredClinicData.map((x, ind) => {
            const statusText = StatusParser("clinics", parseInt(x.status))
            return (
                <Link href={`/sites/database/clinics/clinic?name=${x.id}`}>
                <div key={`clinics_${ind}`} className='displayRow'>
                    <div className="rowContentClinics">
                        <p className={styles.dataCol1} style={{ marginLeft: '2rem' }}>{x.name}</p>
                        <p className={styles.dataCol2}>{x.affiliation}</p>
                        <p className={styles.dataCol3}>{x.region}</p>
                        <p className={styles.dataCol4} style={{ marginRight: '2rem' }}>{statusText}</p>
                    </div>
                    <div className={`tag${x['status']}`}></div>
                </div>
            </Link>
            )}
            )
            }
        </React.Fragment>
    )
}