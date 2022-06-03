import { CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { editStudentInfo } from "../../../api-lib/azure/azureOps";
import { mapCityToCounty } from "../cityToCounty";
import StatusParser from "../status";
import { removeAllAlphabets, removeAllNumbers } from "./formUtils";

export default function EditStudentProfile(props) {
    const [closeHover, setCloseHover] = useState(false)
    const [data, setData] = useState(props.data)
    const [submittingForm, setSubmittingForm] = useState(false)
    const [error, setError] = useState({
        birthday: false
    })
    
    async function editElement() {
        await editStudentInfo(props.data.id, data);
        props.setOpen(false)
        props.reload()
    }

    const checkForErrors = () => {
        let containsError = false
        if (!/(\d{2}[/]\d{2}[/]\d{4})/.test(data.dob)) {
            setError({
                birthday: true
            })
            containsError = true
        }
        return containsError   
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
                        <p className="editTitle">Edit Student Information</p>
                        <IoClose color={closeHover ? "#CD0000" : "#C4C4C4"} size={closeHover ? 38 : 35} style={{transition: '0.2s linear', cursor: 'pointer'}} 
                        onMouseEnter={() => setCloseHover(true)} onMouseLeave={() => setCloseHover(false)} onClick={() => props.setOpen(false)} />
                    </div>
                    <div style={{ width: '90%' }}>
                        <p><strong>First Name:</strong><input value={data.firstName} onChange={(e) => {
                            let newData = {...data}
                            newData.firstName = removeAllNumbers(e.target.value)
                            setData(newData)
                            return
                        }} /> </p>
                    </div>
                    <div style={{ width: '90%' }}>
                        <p><strong>Middle Name:</strong><input value={data.middleName} onChange={(e) => {
                            let newData = {...data}
                            newData.middleName = removeAllNumbers(e.target.value)
                            setData(newData)
                            return
                        }} /> </p>
                    </div>
                    <div style={{ width: '90%' }}>
                        <p><strong>Last Name:</strong><input value={data.lastName} onChange={(e) => {
                            let newData = {...data}
                            newData.lastName = removeAllNumbers(e.target.value)
                            setData(newData)
                            return
                        }} /> </p>
                    </div>
                    <div style={{ width: '90%' }}>
                        <p><strong>Date of Birth:</strong><input value={data.dob} onChange={(e) => {
                            let newData = {...data}
                            newData.dob = e.target.value
                            setData(newData)
                            return
                        }} /> </p>
                    </div>
                    {error.birthday ? <p className="errorText">Invalid Birthday Format. Please make sure it is: mm/dd/yyyy.</p> : null}
                    <div style={{ width: '90%' }}>
                        <p>
                            <strong>Status:</strong>
                            <select onChange={e => {
                                let newData = {...data}
                                newData.status = e.target.value
                                setData(newData)
                                return
                            }}>
                                <option value='Active'>Active</option>
                                <option value='Inactive'>Inactive</option>
                            </select>
                        </p>
                    </div>
                    <div style={{ width: '90%' }}>
                        <p><strong>Address Line 1:</strong><input value={data.addressLine1} onChange={(e) => {
                            let newData = {...data}
                            newData.addressLine1 = e.target.value
                            setData(newData)
                            return
                        }} /> </p>
                    </div>
                    <div style={{ width: '90%' }}>
                        <p><strong>Address Line 2:</strong><input value={data.addressLine2} onChange={(e) => {
                            let newData = {...data}
                            newData.addressLine2 = e.target.value
                            setData(newData)
                            return
                        }} /> </p>
                    </div>
                    <div style={{ width: '90%' }}>
                        <p><strong>City:</strong><input value={data.city} onChange={(e) => {
                            let newData = {...data}
                            newData.city = e.target.value
                            newData.county = mapCityToCounty(e.target.value)
                            setData(newData)
                            return
                        }} /> </p>
                    </div>
                    <div style={{ width: '90%' }}>
                        <p><strong>County:</strong><input disabled value={data.county} onChange={(e) => {
                            let newData = {...data}
                            newData.county = removeAllNumbers(e.target.value)
                            setData(newData)
                            return
                        }} /> </p>
                    </div>
                    <div style={{ width: '90%' }}>
                        <p><strong>Postal:</strong><input value={data.postal} onChange={(e) => {
                            let newData = {...data}
                            newData.postal = removeAllAlphabets(e.target.value).substring(0, 5)
                            setData(newData)
                            return
                        }} /> </p>
                    </div>
                    <div style={{ width: '90%' }}>
                        <p><strong>Phone Number:</strong><input value={data.phoneNumber} onChange={(e) => {
                            let newData = {...data}
                            newData.phoneNumber = removeAllAlphabets(e.target.value).substring(0, 10)
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
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '1rem' }}>
                        <div className="saveBtn" 
                            onClick={async () => {
                                if (checkForErrors()) {
                                    return
                            }
                            editElement()
                            setSubmittingForm(true)
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
                    height: 90vh;
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

                .errorText {
                    font-size: 0.8rem;
                    color: red;
                }
                `
        }
        </style>
    </React.Fragment>
    )
}