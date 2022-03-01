import React, { useState } from 'react'

export default function Marker(props) {
    const [hover, setHover] = useState(false)
    return (
        <React.Fragment>
            <div className='map-container'>
                {
                    props.type == 'clinic' ? 
                    <img height={hover ? '35px' : '30px'} width="auto" style={{zIndex: 50}} src="/asset/images/clinic-pin.png"
                    onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} />
                    :
                    <img height={hover ? '35px' : '30px'} width="auto" style={{zIndex: 50}} src="/asset/images/student-pin.png"
                    onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} />
                }
                {hover ? <div className='map-text'>
                    <p>{props.data}</p>
                </div> : null}
            </div>
            <style jsx>
                {
                    `
                        .map-container {
                            display: flex;
                            flex-direction: row;
                            height: 100px;
                            width: 200px;
                        }

                        .map-text {
                            width: 100%;
                            padding: 10px;
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