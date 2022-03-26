import Link from 'next/link';
import React, { useState } from 'react'

export default function Marker(props) {
    const [hover, setHover] = useState(false)
    return (
        <React.Fragment>
            <div className='map-container'>
                {
                    props.type == 'clinic' ? 
                    <Link href={`/sites/database/clinics/clinic?name=${props.id}`}>
                        <img height={hover ? '35px' : '30px'} width="auto" style={{ zIndex: 50, transform: 'translateY(-30px)' }} src="/asset/images/clinic-pin.png"
                        onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} />
                    </Link>
                    :
                    <Link href={`/students/profile?id=${props.id}`}>
                        <img height={hover ? '35px' : '30px'} width="auto" style={{ zIndex: 50, transform: 'translateY(-30px)' }} src="/asset/images/student-pin.png"
                        onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} />
                    </Link>
                }
                { hover ? 
                <div className='map-text'>
                    <h4 style={{ fontSize: '18px', margin: 0 }}>{props.type == 'clinic' ? 'Clinic Information' : 'Student Information'}</h4>
                    <p style={{ fontSize: '13px', marginTop: '10px' }}><strong>Name:</strong> {props.name}</p>
                    <p style={{ fontSize: '13px', marginTop: '10px' }}><strong>Address:</strong> {props.addr ? props.addr : 'Unknown'}</p>
                    <p style={{ fontSize: '13px', marginTop: '10px' }}><strong>Phone Number:</strong> {props.phoneNumber ? props.phoneNumber : 'Unknown'}</p>
                </div> 
                : null }
            </div>
            <style jsx>
                {
                    `
                        .map-container {
                            display: flex;
                            flex-direction: row;
                            height: 170px;
                            width: 350px;
                        }

                        .map-text {
                            width: 100%;
                            padding: 15px;
                            background-color: #fff;
                            border-radius: 10px;
                            z-index: 100;
                        }
                    `
                }
            </style>
        </React.Fragment>
    )
}