import React, { useState } from "react";

export default function ClinicInfoEdit(props) {

    return (
    <React.Fragment>
        <div className="backDrop" onClick={() => props.setOpen(false)}></div>
        <div className="editScreen">
            <p className="editTitle">Edit General Clinic Information</p>
            <div>
                <p style={{marginRight: '2rem'}}><strong>Site:</strong><input value={props.data.site} /> </p>
                <p><strong>Phone Number:</strong><input value={props.data.phoneNumber} /></p>
            </div>
            <div>
                <p><strong>Address Line 1:</strong><input value={props.data.addressLine1} /></p>
                <p><strong>Address Line 2:</strong><input value={props.data.addressLine2} /></p>
                <p><strong>City:</strong><input value={props.data.city} /></p>
                <p><strong>State (Abbreviated, CA):</strong> <input value={props.data.state} /></p>
                <p><strong>Postal Code:</strong><input value={props.data.postal} /></p>
                <p><strong>Fax Number:</strong><input value={props.data.faxNumber} /></p>
            </div>
            <div>
                <p>
                    <strong>Current Status:</strong>
                    <select>
                        <option value={0}>Need to contact</option>
                        <option value={1}>Need to follow up</option>
                        <option value={2}>Contacted</option>
                        <option value={3}>Connected</option>
                    </select>
                </p>
            </div>
            <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '1rem'}}>
                <div className="saveBtn" onClick={() => props.setOpen(false)}>Save</div>
            </div>
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
                    height: 80vh;
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
                }
                
                .saveBtn {
                    background-color: #1AACFE;
                    height: 3rem;
                    width: 4rem;
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