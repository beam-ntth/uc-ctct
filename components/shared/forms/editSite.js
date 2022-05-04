import { CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { client } from '../../../api-lib/azure/azureConfig';
import { decrementRegionSiteCount, getClinicOrSiteOrRegion, incrementRegionSiteCount } from "../../../api-lib/azure/azureOps";
import StatusParser from "../status";

export default function EditSite(props) {
    const [hover, setHover] = useState(false)
    const [site, setSite] = useState({ name: 'Loading...', generalInformation: { phoneNumber: 'Loading...' } })
    const [prevSiteStatus, setPrevSiteStatus] = useState(null)

    async function getCurrentData() {
        const data = await getClinicOrSiteOrRegion(props.open)
        setSite(data)
        setPrevSiteStatus(data.status)
    }

    async function editElement() {
        const database = client.database("uc-ctct");
        const site_container = database.container("Master");
        const replaceOperation =
        [
            {
                op: "replace",
                path: "",
                value: site
            }
        ];
        await site_container.item(props.open, props.open).patch(replaceOperation);

        if ((prevSiteStatus != 8 || prevSiteStatus != 10) && (site.status == 8 || site.status == 10)) {
            await incrementRegionSiteCount(site.region_id)
        }
        if ((prevSiteStatus == 8 || prevSiteStatus == 10) && (site.status != 8 || site.status != 10)) {
            await decrementRegionSiteCount(site.region_id)
        }
        props.setOpen(false)
        props.reload()
    }

    // Filled in the form with pre-existing data
    useEffect(() => {
        getCurrentData()
    }, [])

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
                    <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <p className="editTitle">Edit Site Information</p>
                        <IoClose color={hover ? "#CD0000" : "#C4C4C4"} size={hover ? 38 : 35} style={{transition: '0.2s linear', cursor: 'pointer'}} 
                        onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={() => props.setOpen(false)} />
                    </div>
                    <div style={{ width: '90%' }}>
                        <p><strong>Name:</strong><input value={site.name} onChange={(e) => {
                        let newSite = {...site}
                        newSite.name = e.target.value
                        setSite(newSite)
                        return
                        }} /> </p>
                    </div>
                    <div style={{ width: '90%' }}>
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
                    </div>
                    <p className="editSubTitle">General Information</p>
                    <div style={{ width: '90%' }}>
                        <p><strong>Phone Number:</strong><input value={site.generalInformation.phoneNumber} onChange={(e) => {
                        let newSite = {...site}
                        newSite.generalInformation.phoneNumber = e.target.value
                        setSite(newSite)
                        return
                        }} /> </p>
                    </div>
                    <div style={{ width: '90%' }}>
                        <p><strong>Fax Number:</strong><input value={site.generalInformation.faxNumber} onChange={(e) => {
                        let newSite = {...site}
                        newSite.generalInformation.faxNumber = e.target.value
                        setSite(newSite)
                        return
                        }} /> </p>
                    </div>
                    <div style={{ width: '90%' }}>
                        <p><strong>Address Line 1:</strong><input value={site.generalInformation.addressLine1} onChange={(e) => {
                        let newSite = {...site}
                        newSite.generalInformation.addressLine1 = e.target.value
                        setSite(newSite)
                        return
                        }} /> </p>
                    </div>
                    <div style={{ width: '90%' }}>
                        <p><strong>Address Line 2:</strong><input value={site.generalInformation.addressLine2} onChange={(e) => {
                        let newSite = {...site}
                        newSite.generalInformation.addressLine2 = e.target.value
                        setSite(newSite)
                        return
                        }} /> </p>
                    </div>
                    <div style={{ width: '90%' }}>
                        <p><strong>City:</strong><input value={site.generalInformation.city} onChange={(e) => {
                        let newSite = {...site}
                        newSite.generalInformation.city = e.target.value
                        setSite(newSite)
                        return
                        }} /> </p>
                    </div>
                    <div style={{ width: '90%' }}>
                        <p><strong>State:</strong><input value={site.generalInformation.state} onChange={(e) => {
                        let newSite = {...site}
                        newSite.generalInformation.state = e.target.value
                        setSite(newSite)
                        return
                        }} /> </p>
                    </div>
                    <div style={{ width: '90%' }}>
                        <p><strong>Postal:</strong><input value={site.generalInformation.postal} onChange={(e) => {
                        let newSite = {...site}
                        newSite.generalInformation.postal = e.target.value
                        setSite(newSite)
                        return
                        }} /> </p>
                    </div>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '1rem' }}>
                        <div className="saveBtn" onClick={() => {
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

                .editSubTitle {
                    font-size: 1rem;
                    font-weight: bold;
                    margin: 0.5rem 0 0 0;
                    color: #626262;
                }
                
                .editScreen {
                    position: absolute;
                    height: 75vh;
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
                `
        }
        </style>
    </React.Fragment>
    )
}