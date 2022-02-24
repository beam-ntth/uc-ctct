import React, { useState } from 'react';
import styles from './Navbar.module.css';
import { MdHomeFilled } from 'react-icons/md'
import { HiOfficeBuilding } from 'react-icons/hi'
import { IoPerson } from 'react-icons/io5'
import { RiSurveyFill } from 'react-icons/ri'
import { FaPeopleArrows } from 'react-icons/fa'
import Link from 'next/link';

export default function Navbar(props) {
  const icons = props.icons

  return (
    <React.Fragment>
      <div className={styles.navbar}>
        {/* Logo Side */}
        <Link href="/main">
          <div className={styles.logo}>
            <img src="/asset/images/uc-seal-blue.png" alt="UC Seal" style={{ height: 'auto', width: '80%' }} />
          </div>
        </Link>
        <Link href="/main">
          <div className={styles.dashboard}>
            <MdHomeFilled size={icons[0] ? 40 : 30} color={icons[0] ? '#079CDB' : '#E0E0E0'} />
            <p>Dashboard</p>
          </div>
        </Link>
        <Link href="/sites">
          <div className={styles.dashboard}>
            <HiOfficeBuilding size={icons[1] ? 40 : 30} color={icons[1] ? '#079CDB' : '#E0E0E0'} />
            <p style={{ textAlign: 'center' }}>Site<br />Management</p>
          </div>
        </Link>
        <Link href="/students">
          <div className={styles.dashboard}>
            <IoPerson size={icons[2] ? 40 : 30} color={icons[2] ? '#079CDB' : '#E0E0E0'} />
            <p style={{ textAlign: 'center' }}>Student<br />Management</p>
          </div>
        </Link>
        <Link href="/404">
          <div className={styles.dashboard}>
            <RiSurveyFill size={icons[3] ? 40 : 30} color={icons[3] ? '#079CDB' : '#E0E0E0'} />
            <p>Surveys</p>
          </div>
        </Link>
        <Link href="/404">
          <div className={styles.dashboard}>
            <FaPeopleArrows size={icons[4] ? 40 : 30} color={icons[4] ? '#079CDB' : '#E0E0E0'} />
            <p>Matching</p>
          </div>
        </Link>
      </div>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;1,400;1,500&display=swap');
      </style>
    </React.Fragment>
  )
}
