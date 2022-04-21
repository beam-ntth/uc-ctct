import { CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { client } from '../../../api-lib/azure/azureConfig';

/**
 * @deprecated Since 04/21/2022, the board has decided that 
 * there can only be 4 non-mutable affiliations
 */
export default function EditRegion(props) {
  const [regionId, regionName] = props.open
  const [hover, setHover] = useState(false)
  const [name, setName] = useState(regionName)

  async function editElement() {
    console.log(regionId)
    const database = client.database("uc-ctct");
    const container = database.container("Regions");
    const replaceOperation =
      [{
        op: "replace",
        path: "/name",
        value: name
      }];
    await container.item(regionId, regionId).patch(replaceOperation);
    props.setOpen(false)
    props.reload()
    return
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
              <p className="editTitle">Edit Region Name</p>
              <IoClose color={hover ? "#CD0000" : "#C4C4C4"} size={hover ? 38 : 35} style={{transition: '0.2s linear', cursor: 'pointer'}} 
                      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={() => props.setOpen(false)} />
            </div>
            <div style={{ width: '90%' }}>
              <p><strong>Name:</strong><input value={name} onChange={(e) => {
                setName(e.target.value)
                return
              }} /> </p>
            </div>
            <span style={{marginTop: '0.4rem', fontSize: '0.8rem'}}>DO NOT: add the word 'Region' after the name. The system will automatically add that for you.</span>
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
                
                .editScreen {
                    position: absolute;
                    height: 40vh;
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