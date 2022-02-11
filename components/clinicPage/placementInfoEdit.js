import React, { useEffect, useState } from "react";
import { CosmosClient } from '@azure/cosmos';

// Setting up access to API
const endpoint = process.env.COSMOS_ENDPOINT;
const key = process.env.COSMOS_KEY;
const client = new CosmosClient({endpoint , key});

export default function PlacementInfoEdit(props) {
    const [info, setInfo] = useState(props.data.clinicPlacementDetail)

    async function updateInfo() {
        const database = client.database("uc-ctct");
        const container = database.container("Clinics");
        const { resource: clinic_data } = await container.item(props.id, props.id).read();
        let adminInfo = clinic_data.adminInfo
        adminInfo = info
        console.log(info)
        const replaceOperation = 
        [{ 
        op: "replace", 
        path: "/clinicPlacementDetail", 
        value: adminInfo
        }];
        const { resource: patchRes } = await container.item(props.id, props.id).patch(replaceOperation)
        props.reload()
    }

    // Allow the user to use 'Enter' to submit changes, on top of clicking 'Save'
    useEffect(() => {
        document.addEventListener("keydown", e => {
            if (e.key === 'Enter') {
                updateInfo()
                props.setOpen(false)
                return
            }
        })
    })

    return (
        <React.Fragment>
        <div className="backDrop" onClick={() => props.setOpen(false)}></div>
        <div className="editScreen" onKeyPress={(e) => {console.log(e.key)}}>
            <p className="editTitle">Edit Clinical Placement Information</p>
            <div style={{height: 'auto', width: '90%'}}>
                {props.data.clinicPlacementDetail.map((x, ind) => {
                    return (
                        <React.Fragment>
                            <p key={`title_${ind}`}><strong>Title:</strong><input value={x.title} disabled /></p>
                            <div key={`note_${ind}`} style={{display: 'flex'}}>
                                <strong>Note:</strong>
                                <textarea value={info[ind] ? info[ind].note : ""} 
                                onChange={e => {
                                    let newInfo = [...info]
                                    newInfo[ind].note = (e.target.value ? e.target.value : "")
                                    setInfo(newInfo)
                                    return
                                    }
                                }
                                ></textarea>
                            </div>
                        </React.Fragment>
                    )
                })}
            </div>
            <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '1rem'}}>
                <div className="saveBtn" onClick={() => {
                    updateInfo()
                    props.setOpen(false)
                    return
                    }
                }>Save</div>
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
                    height: 85vh;
                    width: 50vw;
                    background-color: #fff;
                    opacity: 100%;
                    top: 5vh;
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
                
                .editScreen input, .editScreen textarea {
                    margin-left: 0.4rem;
                    border-radius: 0.5rem;
                    border: solid 1px #c4c4c4;
                    padding: 0.5rem;
                    width: 50%;
                }

                .editScreen textarea {
                    width: 80%;
                    height: 10rem;
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