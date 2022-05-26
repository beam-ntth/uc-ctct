import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FiCheck, FiEdit } from "react-icons/fi";
import { updateSurveyLink } from "../../api-lib/azure/azureOps";

export default function PopUp(props) {
  /**
   * States for button hovering
   */
  const [hover, setHover] = useState({
    edit: false,
    check: false
  })

  /**
   * State management when editing links
   */
  const [isEditing, setIsEditing] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  const [newLink, setNewLink] = useState(props.url)
  /**
   * Update anonymous survey link for students or preceptors
   */
  const updateLink = async () => {
    setIsUpdating(true)
    await updateSurveyLink(props.choice, newLink)
    setIsUpdating(false)
    setIsEditing(false)
  }
  
  useEffect(() => setNewLink(props.url), [props.url])

  return (
    <React.Fragment>
      <div className="backDrop" onClick={() => { props.open(false); props.setEmailList([]); props.setUrl("") }}></div>
      <div className="editScreen">
        <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignContent: 'center', justifyContent: "flex-start" }}>
          <h4>Here is the list of all unresponded emails</h4>
          <p className="instruction">Please copy the emails below and paste them on to the "Recipients" section of your mailing system</p>
          <p>{props.emailList.length == 0 ? "Everybody responded to the email!" : props.emailList.join(", ")}</p>
          <h4>Here is the anonymous survey link to attach to your email</h4>
          <div className="linkSection">
            { isEditing ? <input className="editUrl" type={'text'} value={newLink} onChange={e => setNewLink(e.target.value)} /> : <p className="url">{newLink}</p> }
            { isUpdating ? <CircularProgress color="primary" style={{ margin: '0 1rem' }} size={ 20 } /> : null }
            <FiEdit style={{ cursor: 'pointer', marginRight: '1rem', transition: '0.2s linear' }}
            color={hover.edit ? "rgb(7, 156, 219)" : "#5D5D5D"}
            onClick={() => setIsEditing(true)}
            onMouseEnter={() => setHover({ edit: true, check: false })}
            onMouseLeave={() => setHover({ edit: false, check: false })} 
            size={hover.edit ? 35 : 30} />
            <FiCheck style={{ cursor: 'pointer', transition: '0.2s linear' }}
            onClick={() => updateLink()}
            color={hover.check ? "green" : "#5D5D5D"}
            onMouseEnter={() => setHover({ edit: false, check: true })}
            onMouseLeave={() => setHover({ edit: false, check: false })} 
            size={hover.check ? 35 : 30} />
          </div>
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
            
            .editScreen input {
              margin-left: 0.4rem;
              border-radius: 0.5rem;
              border: solid 1px #c4c4c4;
              padding: 0.5rem;
              width: 50%;
            }

            .instruction {
              color: #5D5D5D;
            }

            .url {
              color: blue;
              text-decoration: underline;
              margin-right: 1rem;
            }

            .editUrl {
              margin-right: 1rem;
            }

            .linkSection {
              display: flex;
              flex-direction: row;
              justify-content: flex-start;
              align-items: center;
            }
          `
        }
      </style>
    </React.Fragment>
  )
}