import React from 'react';
import styles from './Navbar.module.css';
import { MdHomeFilled } from 'react-icons/md'
import { HiOfficeBuilding } from 'react-icons/hi'
import { IoPerson } from 'react-icons/io5'
import { RiSurveyFill } from 'react-icons/ri'
import { FaPeopleArrows } from 'react-icons/fa'

export default function Navbar() {
    return (
        <React.Fragment>
            <div className={styles.navbar}>
                {/* Logo Side */}
                <div className={styles.logo}>
                    <img src="/asset/images/uc-seal-blue.png" alt="UC Seal" style={{height: 'auto', width: '100%'}}/>
                </div>
                <div className={styles.dashboard}>
                    <MdHomeFilled size={40} color='#079CDB' />
                    <p>Dashboard</p>
                </div>
                <div className={styles.dashboard}>
                    <HiOfficeBuilding size={30} color='#E0E0E0' />
                    <p style={{textAlign: 'center'}}>Site<br />Management</p>
                </div>
                <div className={styles.dashboard}>
                    <IoPerson size={30} color='#E0E0E0' />
                    <p style={{textAlign: 'center'}}>Client<br />Management</p>
                </div>
                <div className={styles.dashboard}>
                    <RiSurveyFill size={30} color='#E0E0E0' />
                    <p>Surveys</p>
                </div>
                <div className={styles.dashboard}>
                    <FaPeopleArrows size={30} color='#E0E0E0' />
                    <p>Matching</p>
                </div>
            </div>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;1,400;1,500&display=swap');
            </style>
        </React.Fragment>
    )
}
