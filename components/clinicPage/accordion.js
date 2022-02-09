import { useState } from 'react'
import styles from './Accordion.module.css'

import { IoIosArrowDown } from 'react-icons/io'

export default function Accordion(props) {
    const [accordion, setAccordion] = useState(false)
    return (
        <div key={`placement_${props.ind}`} className={styles.noteContainer} onClick={() => setAccordion(!accordion)} style={{cursor: 'pointer'}}>
            <div className={styles.noteTitle} style={accordion ? {color: '#1AACFE', transition: '0.3s linear'} : {color: '#000', transition: '0.3s linear'}}>
                <p className={styles.placementCol1}>{props.x.title}</p>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
                    <p style={{paddingRight: '1rem'}}>Full Detail</p>
                    <IoIosArrowDown size={20} color={accordion ? '#1AACFE' : '#000'} style={accordion ? {transform: 'rotate(180deg)', transition: '0.3s linear'} : {transform: 'rotate(0deg)', transition: '0.3s linear'}}/>
                </div>
            </div>
            <div className={styles.noteContent} style={accordion ? {} : {display: 'none'}}>
                {props.x.note ? props.x.note : props.children}
            </div>
        </div>
    )
}