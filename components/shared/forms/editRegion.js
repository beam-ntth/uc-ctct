import React, { useState, useEffect } from "react";
import { client } from '../../../api-lib/azure/azureConfig';

export default function EditRegion(props) {
  const [name, setName] = useState("")

  async function editElement() {
    console.log(props.open)
    const database = client.database("uc-ctct");
    const container = database.container("Regions");
    const replaceOperation =
      [{
        op: "replace",
        path: "/name",
        value: name
      }];
    await container.item(props.open, props.open).patch(replaceOperation);
    props.reload()
    return
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

  return (
    <React.Fragment>
      <div className="backDrop" onClick={() => props.setOpen(false)}></div>
      <div className="editScreen">
        <p className="editTitle">Edit Region Name</p>
        <div style={{ width: '90%' }}>
          <p><strong>Name:</strong><input placeholder="New Region Name" onChange={(e) => {
            setName(e.target.value)
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
                    height: 30vh;
                    width: 50vw;
                    background-color: #fff;
                    opacity: 100%;
                    top: 20vh;
                    left: 25vw;
                    z-index: 901;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
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