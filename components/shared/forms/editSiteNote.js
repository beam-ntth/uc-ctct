import { CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { client } from '../../../api-lib/azure/azureConfig';
import StatusParser from "../status";

export default function EditSiteNote(props) {
    const [hover, setHover] = useState(false)
    const [id, index, data] = props.open
    const [siteNote, setSiteNote] = useState("")
    // Filled in the form with pre-existing data
    useEffect(() => {
        setSiteNote(data)
    }, [])

    async function editElement() {
        const database = client.database("uc-ctct");
        const site_container = database.container("Sites");
        const { resource: prev_data } = await site_container.item(id, id).read();
        let new_data = prev_data.notes
        new_data[index] = siteNote
        const replaceOperation =
        [
            {
                op: "replace",
                path: "/notes",
                value: new_data
            }
        ];
        await site_container.item(id, id).patch(replaceOperation);
        props.reload()
    }

    // Allow the user to use 'Enter' to submit changes, on top of clicking 'Save'
    // useEffect(() => {
    //   document.addEventListener("keydown", e => {
    //     if (e.key === 'Enter') {
    //       editElement()
    //       props.setOpen(false)
    //       return
    //     }
    //   })
    // })

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
                        <p className="editTitle">Edit Region Name</p>
                        <IoClose color={hover ? "#CD0000" : "#C4C4C4"} size={hover ? 38 : 35} style={{transition: '0.2s linear', cursor: 'pointer'}} 
                        onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={() => props.setOpen(false)} />
                    </div>
                    <div style={{ width: '90%' }}>
                        <p><strong>Title:</strong><input value={siteNote.title} onChange={(e) => {
                        let newSite = {...siteNote}
                        newSite.title = e.target.value
                        setSiteNote(newSite)
                        return
                        }} /> </p>
                    </div>
                    <div style={{ width: '90%'}}>
                        <p style={{display: 'flex'}}><strong>Note:</strong><textarea value={siteNote.note} onChange={(e) => {
                        let newSite = {...siteNote}
                        newSite.note = e.target.value
                        setSiteNote(newSite)
                        return
                        }} /> </p>
                    </div>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '1rem' }}>
                        <div className="saveBtn" onClick={() => {
                        editElement()
                        props.setOpen(false)
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
                    height: 65vh;
                    width: 50vw;
                    background-color: #fff;
                    opacity: 100%;
                    top: 20vh;
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
                
                .editScreen input {
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