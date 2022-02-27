// Import React modules
import React, { useEffect, useState } from "react";

// Import DB modules
import { CosmosClient } from '@azure/cosmos';
import { client } from '../../api-lib/azure/azureConfig';
import { IoClose } from "react-icons/io5";
import { CircularProgress } from "@mui/material";

export default function PlacementInfoEdit(props) {
  const [hover, setHover] = useState(false)
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
    await container.item(props.id, props.id).patch(replaceOperation)
    props.setOpen(false)
    props.reload()
  }

  // Allow the user to use 'Enter' to submit changes, on top of clicking 'Save'
  // useEffect(() => {
  //   document.addEventListener("keydown", e => {
  //     if (e.key === 'Enter') {
  //       updateInfo()
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
              <p className="editTitle">Edit Clinical Placement Information</p>
              <IoClose color={hover ? "#CD0000" : "#C4C4C4"} size={hover ? 38 : 35} style={{transition: '0.2s linear', cursor: 'pointer'}} 
                    onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={() => props.setOpen(false)} />
            </div>
            <div style={{ height: 'auto', width: '90%' }}>
              {props.data.clinicPlacementDetail.map((x, ind) => {
                return (
                  <React.Fragment>
                    <p key={`title_${ind}`}><strong>Title:</strong><input value={x.title} disabled /></p>
                    <div key={`note_${ind}`} style={{ display: 'flex' }}>
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
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '1rem' }}>
              <div className="saveBtn" onClick={() => {
                updateInfo()
                setSubmittingForm(true)
                return
              }
              }>Save</div>
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