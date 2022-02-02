import React from 'react';
import styles from '../styles/navbar.css'
import UCSealBlue from '/asset/images/uc_seal_blue.png';


export default function Navbar() {
    return (
        <div className={styles.navbar}>
            {/* Logo Side */}
            <div className={styles.logo}>
                <div className={styles.subLogo}>
                    <img src={UCSealBlue} alt="UC Seal"/>;
                </div>
            </div>
        </div>
    )
}
