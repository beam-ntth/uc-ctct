// Import React modules
import { CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

// Import DB modules
import { client } from '../../api-lib/azure/azureConfig';
import { getClinicOrSiteOrRegion } from "../../api-lib/azure/azureOps";

const currentdate = new Date();

export default function AddNewNote(props) {
  const [hover, setHover] = useState(false)
  const [note, setNote] = useState({
    title: "",
    note: ""
  })

  /**
   * States for error checking
   */
  const [requiredTitle, setRequiredTitle] = useState(false)
  const [requiredNote, setRequiredNote] = useState(false)

  /**
   * @function checkForErrors : Check to see if the user filled out title and note sections properly
   * @returns Boolean - True if the error exists
   */
  const checkForErrors = () => {
    let errorExist = false
    if (note.title === "") {
      errorExist = true
      setRequiredTitle(true)
    }
    if (note.note === "") {
      errorExist = true
      setRequiredNote(true)
    }
    return errorExist
  }

  /**
   * @function updateInfo : Add new note to the database
   */
  async function updateInfo() {
    const database = client.database("uc-ctct");
    let container;
    let data;
    if (props.type == "Sites" || props.type == "Clinics") {
      container = database.container("Master");
      data = await getClinicOrSiteOrRegion(props.id)
    } else {
      container = database.container(props.type);
      const { resource: item } = await container.item(props.id, props.id).read();
      data = item
    }
    
    let noteInfo = data.notes
    noteInfo.unshift(note)
    const replaceOperation =
      [{
        op: "replace",
        path: "/notes",
        value: noteInfo
      }];
    await container.item(props.id, props.id).patch(replaceOperation)
    props.setOpen(false)
    props.reload()
  }

  const [submittingForm, setSubmittingForm] = useState(false)

  return (
    <React.Fragment>
      <div className="backDrop" onClick={() => props.setOpen(false)}></div>
      <div className="editScreen">
        {
          submittingForm ?
            <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignContent: 'center', justifyContent: "center" }}>
              <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <CircularProgress color="primary" size={120} />
              </div>
              <p style={{ textAlign: 'center' }}>Adding new note. Please wait.</p>
            </div>
            :
            (<React.Fragment>
              <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                <p className="editTitle">Add Additional Clinical Notes</p>
                <IoClose color={hover ? "#CD0000" : "#C4C4C4"} size={hover ? 38 : 35} style={{ transition: '0.2s linear', cursor: 'pointer' }}
                  onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={() => props.setOpen(false)} />
              </div>
              <div style={{ height: 'auto', width: '90%' }}>
                <p>
                  <strong>Title:</strong>
                  <input placeholder="Add Title Here" onChange={(x) => {
                    let newValue = { ...note }
                    newValue.title = x.target.value + ` | Added: ${currentdate.getMonth()}/${currentdate.getDate()}/${currentdate.getFullYear()}`
                    setNote(newValue)
                    return
                  }} />
                </p>
                {requiredTitle ? <p className="errorText">This field is required!</p> : null}
                <div style={{ display: 'flex' }}>
                  <strong>Note:</strong>
                  <textarea placeholder="Add Notes Here" onChange={(x) => {
                    let newValue = { ...note }
                    newValue.note = x.target.value
                    setNote(newValue)
                    return
                  }}></textarea>
                </div>
                {requiredNote ? <p className="errorText">This field is required!</p> : null}
              </div>
              <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '1rem' }}>
                <div className="saveBtn" onClick={async () => {
                  if (checkForErrors()) {
                    // If there is an error in the form, do not allow the user to submit
                    return
                  }
                  await updateInfo()
                  setSubmittingForm(true)
                  return
                }}>Add Note</div>
              </div>
            </React.Fragment>)}
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
                    height: 75vh;
                    width: 50vw;
                    background-color: #fff;
                    opacity: 100%;
                    top: 15vh;
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
                    height: 20rem;
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
                  color: #FF0000;
                }
                `
        }
      </style>
    </React.Fragment>
  )
}