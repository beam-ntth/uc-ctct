import React from "react";
import Link from 'next/link'
import styles from './Display.module.css'
import { IoArrowBack } from "react-icons/io5";

export default function DisplayUCLA (props) {
    return (
        <React.Fragment>
            <div className={styles.data}>
              <div style={{ width: '100%', paddingLeft: '2rem', display: 'flex', alignItems: 'center', marginTop: '1rem' }}>
                <div className={ styles.goBack } onClick={() => props.setPage('Default')} >
                  <IoArrowBack size={30} style={{ width: '10%', marginRight: '0.5rem' }} /> 
                  <p style={{ margin: 0 }}>Back to selection</p>
                </div>
                <p style={{ marginRight: '1rem' }}>Please select students year: </p>
                <select style={{ borderRadius: '0.5rem', border: 'solid 1px #c4c4c4', padding: '0 0.5rem', height: '2rem' }}>
                  {
                    <option value={'2022'}>2022</option>
                  }
                </select>
                </div>
                <div className={styles.row}>
                  <div style={{ display: 'flex', width: '93%' }}>
                    <p className={styles.titleCol1}>Name</p>
                    <p className={styles.titleCol4}>Primary Site</p>
                    <p className={styles.titleCol2}>Status</p>
                    <p className={styles.titleCol5}>Secondary Site</p>
                    <p className={styles.titleCol4}>  Status</p>
                  </div>
                </div >
                {
                  props.students.map((x, ind) => {
                    return (
                      <div style={{ width: '100%', height: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <Link href={`/students/profile?id=${x.id}`}>
                          <div className='displayStudentRow' key={`elem_${ind}`}>
                            <p style={{ marginLeft: '2rem', width: '25%' }}>{x.firstName} {x.middleName} {x.lastName}</p>
                            <p style={{marginLeft: '3em', width: '10%' }}>{x.primaryClinic ? x.primaryClinic : "Unassigned"}</p>
                            <p style={{marginLeft: '4rem', width: '11%'  }}>{x.status ? x.status : "Unassigned"}</p>
                            <p style={{marginLeft: '5rem', width: '11%'  }}>{x.secondaryClinic ? x.secondaryClinic : "Unassigned"}</p>
                            <p style={{marginLeft: '2rem', width: '3%'  }}>{x.status ? x.status : "Unassigned"}</p>
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