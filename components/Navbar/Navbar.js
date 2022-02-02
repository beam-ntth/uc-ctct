import React from 'react';
import styles from '../styles/navbar.css'

import { Nav } from 'react-bootstrap';

import UCSealBlue from '/asset/images/uc_seal_blue.png';


export default function Navbar() {
    return (
        <div className={styles.navbar}>
            {/* Logo Side */}
            <div className={styles.logo}>
                <div className={styles.subLogo}>
                    <img src={UCSealBlue} alt="UC Seal" />;
                </div>
            </div>
            <Nav defaultActiveKey="/home" className="flex-column">
                <Nav.Link href="/home">Active</Nav.Link>
                <Nav.Link eventKey="link-1">Link</Nav.Link>
                <Nav.Link eventKey="link-2">Link</Nav.Link>
                <Nav.Link eventKey="disabled" disabled>
                    Disabled
                </Nav.Link>
            </Nav>
        </div>
    )
}
