import React from "react";
import Link from 'next/link'
import styles from './Display.module.css'
import { IoArrowBack } from "react-icons/io5";

export default function DisplayALL (props) {
    return (
        <React.Fragment>
            <div className={styles.data}>
              <div style={{ width: '100%', paddingLeft: '2rem', display: 'flex', alignItems: 'center', marginTop: '1rem' }}>
                <div className={ styles.goBack } onClick={() => props.setPage('Default')} >
                  <IoArrowBack size={30} style={{ width: '10%', marginRight: '0.5rem' }} /> 
                  <p style={{ margin: 0 }}>Back to selection</p>
                </div>
                <p style={{ marginRight: '1rem' }}>Cohort: </p>
                <select style={{ borderRadius: '0.5rem', border: 'solid 1px #c4c4c4', padding: '0 0.5rem', height: '2rem' }}>
                  {
                    <option value={'2022'}>2022</option>
                  }
                </select>
              </div>
                <div className={styles.row}>
                  <div style={{ display: 'flex', width: '90%' }}>
                    <p className={styles.titleCol1}>Name</p>
                    <p className={styles.titleCol2}>Primary Site</p>
                    <p className={styles.titleCol3}>Status  </p>
                    <p className={styles.titleCol4}>Secondary Site</p>
                    <p className={styles.titleCol3}>Status  </p>
                    <p className={styles.titleCol6}>Affiliation</p>
                  </div>
                </div >
                {
                  props.students.map((x, ind) => {
                    return (
                      <div style={{ width: '100%', height: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <Link href={`/students/profile?id=${x.id}`}>
                          <div className='displayStudentRow' key={`elem_${ind}`}>
                            <p style={{ marginLeft: '1rem', width: '40%' }}>{x.firstName} {x.middleName} {x.lastName}</p>
                            <p style={{  marginRight: '5rem', width: '10%' }}>{x.primaryClinic ? x.primaryClinic : "Unassigned"}</p>
                            <p style={{ marginRight: '2rem',width: '20%' }}>{x.status ? x.status : "Unassigned"}</p>
                            <p style={{ marginRight: '7rem', width: '3%' }}>{x.secondaryClinic ? x.secondaryClinic : "Unassigned"}</p>
                            <p style={{ marginRight: '7rem', width: '3%' }}>{x.status ? x.status : "Unassigned"}</p>
                            <p style={{ marginRight: '1rem', width: '9%'}}>{x.affiliation ? x.affiliation : "Unassigned"}</p>
                          </div>
                        </Link>
                      </div >
                    )
                  })
                }
            </div >
        </React.Fragment>
    )
}