import { CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { editPreceptorInfo } from "../../../api-lib/azure/azureOps";
import StatusParser from "../status";

export default function EditPreceptorProfile(props) {
    const [hover, setHover] = useState(false)
    const [data, setData] = useState(props.data)
    const [submittingForm, setSubmittingForm] = useState(false)
    
    async function editElement() {
        await editPreceptorInfo(props.data.id, data);
        props.setOpen(false)
        props.reload()
    }
 
    return (
    <React.Fragment>
        <div className="backDrop" onClick={() => props.setOpen(false)}></div>
        <div className="editScreen">
            {
                submittingForm ?
                <div style={{height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignContent: 'center', justifyContent: "center"}}>
                    <div style={{textAlign: 'center', marginBottom: '1rem'}}>
                    <CircularProgress color="primary" size={120} />
                    </div>
                    <p style={{textAlign: 'center'}}>Submitting the form. Please wait.</p>
                </div>
                :
                (<React.Fragment>
                    <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem'}}>
                        <p className="editTitle">Edit Preceptor Information</p>
                        <IoClose color={hover ? "#CD0000" : "#C4C4C4"} size={hover ? 38 : 35} style={{transition: '0.2s linear', cursor: 'pointer'}} 
                        onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={() => props.setOpen(false)} />
                    </div>
                    <div style={{ width: '90%' }}>
                        <p><strong>First Name:</strong><input value={data.firstname} onChange={(e) => {
                            let newData = {...data}
                            newData.firstname = e.target.value
                            setData(newData)
                            return
                        }} /> </p>
                    </div>
                    <div style={{ width: '90%' }}>
                        <p><strong>Last Name:</strong><input value={data.lastname} onChange={(e) => {
                            let newData = {...data}
                            newData.lastname = e.target.value
                            setData(newData)
                            return
                        }} /> </p>
                    </div>
                    <div style={{ width: '90%' }}>
                        <p><strong>National Provider Identifier (NPI):</strong><input value={data.npi} onChange={(e) => {
                            let newData = {...data}
                            newData.npi = e.target.value
                            setData(newData)
                            return
                        }} /> </p>
                    </div>
                    <div style={{ width: '90%' }}>
                        <p>
                            <strong>Status:</strong>
                            <select onChange={e => {
                                let newData = {...data}
                                newData.status = e.target.value
                                setData(newData)
                                return
                            }}>
                                { StatusParser("preceptors", -1) }
                            </select>
                        </p>
                    </div>
                    <div style={{ width: '90%' }}>
                        <p><strong>Credential:</strong><input value={data.credential} onChange={(e) => {
                            let newData = {...data}
                            newData.credential = e.target.value
                            setData(newData)
                            return
                        }} /> </p>
                    </div>
                    <div style={{ width: '90%' }}>
                        <p><strong>Position:</strong><input value={data.position} onChange={(e) => {
                            let newData = {...data}
                            newData.position = e.target.value
                            setData(newData)
                            return
                        }} /> </p>
                    </div>
                    <div style={{ width: '90%' }}>
                        <p><strong>Email:</strong><input value={data.email} onChange={(e) => {
                            let newData = {...data}
                            newData.email = e.target.value
                            setData(newData)
                            return
                        }} /> </p>
                    </div>
                    <div style={{ width: '90%' }}>
                        <p><strong>Phone Number:</strong><input value={data.phoneNumber} onChange={(e) => {
                            let newData = {...data}
                            newData.phoneNumber = e.target.value
                            setData(newData)
                            return
                        }} /> </p>
                    </div>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '1rem' }}>
                        <div className="saveBtn" onClick={async () => {
                            editElement()
                            setSubmittingForm(true)
                            return
                        }}>Save</div>
                    </div>
                </React.Fragment>)
            }
        </div>
        <style jsx>
        {
            `
                .backDrop {
                    height: 100vh;
                    width: 100vw;
                    background-color: rgba(0, 0, 0, 0.2);
                    position: absolute;
                    z-index: 900;
                }
                
                .editTitle {
                    font-size: 1.3rem;
                    font-weight: bold;
                }
                
                .editScreen {
                    position: absolute;
                    height: 85vh;
                    width: 70vw;
                    background-color: #fff;
                    opacity: 100%;
                    top: 5vh;
                    left: 15vw;
                    z-index: 901;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: flex-start;
                    border-radius: 1rem;
                    padding: 2rem;
                    overflow-y: scroll;
                }
                
                .editScreen input, .editScreen select {
                    margin-left: 0.4rem;
                    border-radius: 0.5rem;
                    border: solid 1px #c4c4c4;
                    padding: 0.5rem;
                    width: 50%;
                }
                
                .editScreen textarea {
                    margin-left: 0.4rem;
                    border-radius: 0.5rem;
                    border: solid 1px #c4c4c4;
                    padding: 0.5rem;
                    width: 80%;
                    height: 15rem;
                }
                
                .saveBtn {
                    background-color: #1AACFE;
                    height: 3rem;
                    width: 8rem;
                    border-radius: 1rem;
                    color: #fff;
                    font-size: 1rem;
                    font-weight: bold;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                }
                `
        }
        </style>
    </React.Fragment>
    )
}