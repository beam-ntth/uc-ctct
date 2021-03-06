import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { v4 as uuidv4 } from 'uuid';
import { client } from '../../../api-lib/azure/azureConfig';
import StatusParser from "../status";
import { CircularProgress } from "@mui/material";
import { incrementRegionSiteCount } from "../../../api-lib/azure/azureOps";
import { cleanFormName, removeAllAlphabets, removeAllNumbers } from "./formUtils";

export default function AddNewSite(props) {
    const [hover, setHover] = useState(false)
    const [site, setSite] = useState(
        { 
            id: uuidv4().toString(), 
            type: 'site',
            region_id: props.regionId, 
            name: '', 
            total_clinics: 0,
            total_preceptors: 0, 
            status: 0, 
            generalInformation: {
                phoneNumber: '',
                faxNumber: '',
                addressLine1: '',
                addressLine2: '',
                city: '',
                state: '',
                postal: ''
            }, 
            adminInfo: [],
            notes: []
        }
    )

    /**
     * States for error checking
     */
    const [requiredName, setRequiredName] = useState(false)

    const checkForErrors = () => {
        let errorExist = false
        if (site.name === "") {
          errorExist = true
          setRequiredName(true)
        }
        return errorExist
    }

    async function addSite() {
        try {
            const database = client.database("uc-ctct");
            const site_container = database.container("Master");
            await site_container.items.create(site)
            if (site.status == 8 || site.status == 10) {
                await incrementRegionSiteCount(props.regionId)
            }
            props.setOpen(false)
            props.reload()
        } catch (error) {
            props.setOpen(false)
            props.displayError(true)
            props.humanText("There seems to be a problem with the database at this time.")
            props.errorText(`${error}`)
        }
    }

    const [submittingForm, setSubmittingForm] = useState(false)

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
                        <p className="editTitle">Add New Site</p>
                        <IoClose color={hover ? "#CD0000" : "#C4C4C4"} size={hover ? 38 : 35} style={{transition: '0.2s linear', cursor: 'pointer'}} 
                        onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={() => props.setOpen(false)} />
                    </div>
                    <div style={{width: '90%'}}>
                        <p>
                            <strong>Name:</strong>
                            <input placeholder="Site Name" value={site.name} onChange={(e) => {
                                let newSite = {...site}
                                newSite.name = cleanFormName(e.target.value)
                                setSite(newSite)
                                return
                            }} /> 
                        </p>
                        {requiredName ? <p className="errorText">This field is required!</p> : null}
                        <p>
                            <strong>Status:</strong>
                            <select value={site.status} onChange={(e) => {
                                let newSite = {...site}
                                newSite.status = e.target.value
                                setSite(newSite)
                                return 
                            }}>
                                { StatusParser("sites", -1) }
                            </select>
                        </p>
                        <p className="editSubTitle">General Information</p>
                        <p className="editCaption">You do not need to add everything right now</p>
                        <div style={{ width: '90%' }}>
                            <p><strong>Phone Number:</strong><input value={site.generalInformation.phoneNumber} 
                            onChange={(e) => {
                                let newSite = {...site}
                                newSite.generalInformation.phoneNumber = removeAllAlphabets(e.target.value).substring(0, 10)
                                setSite(newSite)
                                return
                            }} /></p>
                        </div>
                        <div style={{ width: '90%' }}>
                            <p><strong>Fax Number:</strong><input value={site.generalInformation.faxNumber} 
                            onChange={(e) => {
                                let newSite = {...site}
                                newSite.generalInformation.faxNumber = removeAllAlphabets(e.target.value).substring(0, 10)
                                setSite(newSite)
                                return
                            }} /> </p>
                        </div>
                        <div style={{ width: '90%' }}>
                            <p><strong>Address Line 1:</strong><input value={site.generalInformation.addressLine1} 
                            onChange={(e) => {
                                let newSite = {...site}
                                newSite.generalInformation.addressLine1 = cleanFormName(e.target.value)
                                setSite(newSite)
                                return
                            }} /> </p>
                        </div>
                        <div style={{ width: '90%' }}>
                            <p><strong>Address Line 2:</strong><input value={site.generalInformation.addressLine2} 
                            onChange={(e) => {
                                let newSite = {...site}
                                newSite.generalInformation.addressLine2 = cleanFormName(e.target.value)
                                setSite(newSite)
                                return
                            }} /> </p>
                        </div>
                        <div style={{ width: '90%' }}>
                            <p><strong>City:</strong><input value={site.generalInformation.city} 
                            onChange={(e) => {
                                let newSite = {...site}
                                newSite.generalInformation.city = cleanFormName(removeAllNumbers(e.target.value))
                                setSite(newSite)
                                return
                            }} /> </p>
                        </div>
                        <div style={{ width: '90%' }}>
                            <p><strong>State (Abbv.):</strong><input value={site.generalInformation.state} 
                            onChange={(e) => {
                                let newSite = {...site}
                                newSite.generalInformation.state = removeAllNumbers(e.target.value).toUpperCase()
                                setSite(newSite)
                                return
                            }} /> </p>
                        </div>
                        <div style={{ width: '90%' }}>
                            <p><strong>Postal:</strong><input value={site.generalInformation.postal} 
                            type='number'
                            onChange={(e) => {
                                let newSite = {...site}
                                newSite.generalInformation.postal = removeAllAlphabets(e.target.value).substring(0, 5)
                                setSite(newSite)
                                return
                            }} /> </p>
                        </div>
                    </div>
                    <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '1rem'}}>
                        <div className="saveBtn" onClick={() => {
                            if (checkForErrors()) {
                                return
                            }
                            addSite()
                            setSubmittingForm(true)
                            return
                    }}>Create Site</div>
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

                .editSubTitle {
                    font-size: 1rem;
                    font-weight: bold;
                    margin: 0;
                }

                .editCaption {
                    font-size: 0.8rem;
                    margin-bottom: 0.5rem;
                    color: #C4C4C4;
                }
                
                .editScreen {
                    position: absolute;
                    height: 85vh;
                    width: 50vw;
                    background-color: #fff;
                    opacity: 100%;
                    top: 10vh;
                    left: 25vw;
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