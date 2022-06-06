import React, { useState } from 'react'
import styles from './Accordion.module.css'

import { IoIosArrowDown } from 'react-icons/io'
import { FiEdit } from 'react-icons/fi';
import { FaRegTrashAlt } from 'react-icons/fa';

export default function Accordion(props) {
    const [accordion, setAccordion] = useState(false)
    const [noteEditHover, setNoteEditHover] = useState(false)
    const [noteTrashHover, setNoteTrashHover] = useState(false)
    
    return (
        <div style={{width: '100%', height: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div key={`placement_${props.ind}`} className={styles.noteContainer} onClick={() => setAccordion(!accordion)} style={{cursor: 'pointer'}}>
                <div className={styles.noteTitle} style={accordion ? {color: '#1AACFE', transition: '0.3s linear'} : {color: '#000', transition: '0.3s linear'}}>
                    <p className={styles.placementCol1}>{props.x.title}</p>
                    <div className={styles.displayFullDetail} >
                        <p style={{paddingRight: '1rem'}}>Full Detail</p>
                        <IoIosArrowDown size={20} color={accordion ? '#1AACFE' : '#000'} style={accordion ? {transform: 'rotate(180deg)', transition: '0.3s linear'} : {transform: 'rotate(0deg)', transition: '0.3s linear'}}/>
                    </div>
                </div>
                <div style={accordion ? {width: '95%', border: '0.5px solid #EEEEEE', marginBottom: '1rem'} : {display: 'none'}}></div>
                <div className={styles.noteContent} style={accordion ? {} : {display: 'none'}}>
                    {props.x.note ? props.x.note : props.children}
                </div>
            </div>
            {props.disabledEdit ? null : <FiEdit color={noteEditHover ? "#079CDB" : "#C4C4C4"} size={noteEditHover ? 40 : 35} style={{cursor: 'pointer', transition: '0.2s linear', marginLeft: '1rem'}} 
            onMouseEnter={() => setNoteEditHover(true)} onMouseLeave={() => setNoteEditHover(false)} onClick={() => props.setOpen([props.id, props.ind, props.x])} />}
            {props.disabledTrash ? null : <FaRegTrashAlt color={noteTrashHover ? "#CD0000" : "#C4C4C4"} size={noteTrashHover ? 38 : 35}
            style={{ cursor: 'pointer', transition: '0.2s linear', marginLeft: '1rem' }}
            onMouseEnter={() => setNoteTrashHover(true)} onMouseLeave={() => setNoteTrashHover(false)} onClick={() => props.remove(props.ind)} />}
        </div>
    )
}