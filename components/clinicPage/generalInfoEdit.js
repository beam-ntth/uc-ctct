import React, { useState, useEffect } from "react";
import StatusParser from "../shared/status";
import DescriptionGenerator from "./description";
import { client } from '../../api-lib/azure/azureConfig';
import { IoClose } from "react-icons/io5";
import { CircularProgress } from "@mui/material";

export default function ClinicInfoEdit(props) {
  const [hover, setHover] = useState(false)
  const [info, setInfo] = useState(props.data)
  const [generalInfo, setGeneralInfo] = useState(props.data.generalInformation)
  const [descriptionInfo, setDescriptionInfo] = useState(props.data.description)

  async function updateInfo() {
    const database = client.database("uc-ctct");
    const container = database.container("Clinics");
    const { resource: clinic_data } = await container.item(props.id, props.id).read();
    const replaceOperation =
      [{
        op: "replace",
        path: "/generalInformation",
        value: generalInfo
      },
      {
        op: "replace",
        path: "/status",
        value: info.status
      },
      {
        op: "replace",
        path: "/description",
        value: descriptionInfo
      }];
    await container.item(props.id, props.id).patch(replaceOperation)
    props.setOpen(false)
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
                <p className="editTitle">General Information</p>
                <IoClose color={hover ? "#CD0000" : "#C4C4C4"} size={hover ? 38 : 35} style={{transition: '0.2s linear', cursor: 'pointer'}} 
                        onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={() => props.setOpen(false)} />
            </div>
            <div style={{ width: "100%" }}>
              <p style={{ marginRight: '2rem', width: "90%" }}><strong>Site:</strong><input style={{ width: "80%" }} value={generalInfo.site} onChange={(e) => {
                let newInfo = { ...generalInfo }
                newInfo.site = e.target.value
                setGeneralInfo(newInfo)
              }} /> </p>
              <p><strong>Phone Number:</strong><input value={generalInfo.phoneNumber} onChange={(e) => {
                let newInfo = { ...generalInfo }
                newInfo.phoneNumber = e.target.value
                setGeneralInfo(newInfo)
              }} /></p>
              <p><strong>Address Line 1:</strong><input value={generalInfo.addressLine1} onChange={(e) => {
                let newInfo = { ...generalInfo }
                newInfo.addressLine1 = e.target.value
                setGeneralInfo(newInfo)
              }} /></p>
              <p><strong>Address Line 2:</strong><input value={generalInfo.addressLine2} onChange={(e) => {
                let newInfo = { ...generalInfo }
                newInfo.addressLine2 = e.target.value
                setGeneralInfo(newInfo)
              }} /></p>
              <p><strong>City:</strong><input value={generalInfo.city} onChange={(e) => {
                let newInfo = { ...generalInfo }
                newInfo.city = e.target.value
                setGeneralInfo(newInfo)
              }} /></p>
              <p><strong>State (Abbreviated, CA):</strong> <input value={generalInfo.state} onChange={(e) => {
                let newInfo = { ...generalInfo }
                newInfo.state = e.target.value
                setGeneralInfo(newInfo)
              }} /></p>
              <p><strong>Postal Code:</strong><input value={generalInfo.postal} onChange={(e) => {
                let newInfo = { ...generalInfo }
                newInfo.postal = e.target.value
                setGeneralInfo(newInfo)
              }} /></p>
              <p><strong>Fax Number:</strong><input value={generalInfo.faxNumber} onChange={(e) => {
                let newInfo = { ...generalInfo }
                newInfo.faxNumber = e.target.value
                setGeneralInfo(newInfo)
              }} /></p>
              <p>
                <strong>Current Status:</strong>
                <select value={info.status} onChange={(e) => {
                  let newInfo = { ...info }
                  console.log(e.target.value)
                  newInfo.status = e.target.value
                  setInfo(newInfo)
                }}>
                  {StatusParser("clinics", -1)}
                </select>
              </p>
            </div>
            <p className="editTitle">Clinic Description</p>
            <div style={{ width: "100%" }}>
              <p style={{ marginRight: '2rem', width: "90%" }}>
                <strong>Setting (Location):</strong>
                <select value={descriptionInfo.settingLocation} onChange={(e) => {
                  let newInfo = { ...descriptionInfo }
                  newInfo.settingLocation = e.target.value
                  setDescriptionInfo(newInfo)
                }}>
                  {DescriptionGenerator("settingLocation")}
                </select>
              </p>
              <p>
                <strong>Setting (Population):</strong>
                <select value={descriptionInfo.settingPopulation} onChange={(e) => {
                  let newInfo = { ...descriptionInfo }
                  newInfo.settingPopulation = e.target.value
                  setDescriptionInfo(newInfo)
                }}>
                  {DescriptionGenerator("settingPopulation")}
                </select>
              </p>
              <p>
                <strong>Population:</strong>
                <select value={descriptionInfo.population} onChange={(e) => {
                  let newInfo = { ...descriptionInfo }
                  newInfo.population = e.target.value
                  setDescriptionInfo(newInfo)
                }}>
                  {DescriptionGenerator("population")}
                </select>
              </p>
              <p>
                <strong>Visit Type:</strong>
                <select value={descriptionInfo.visitType} onChange={(e) => {
                  let newInfo = { ...descriptionInfo }
                  newInfo.visitType = e.target.value
                  setDescriptionInfo(newInfo)
                }}>
                  {DescriptionGenerator("visitType")}
                </select>
              </p>
              <p>
                <strong>Patient Acuity:</strong>
                <select value={descriptionInfo.patientAcuity} onChange={(e) => {
                  let newInfo = { ...descriptionInfo }
                  newInfo.patientAcuity = e.target.value
                  setDescriptionInfo(newInfo)
                }}>
                  {DescriptionGenerator("patientAcuity")}
                </select>
              </p>
              <p>
                <strong>Documentation:</strong>
                <select value={descriptionInfo.documentation} onChange={(e) => {
                  let newInfo = { ...descriptionInfo }
                  newInfo.documentation = e.target.value
                  setDescriptionInfo(newInfo)
                }}>
                  {DescriptionGenerator("documentation")}
                </select>
              </p>
              <p>
                <strong>Orders:</strong>
                <select value={descriptionInfo.orders} onChange={(e) => {
                  let newInfo = { ...descriptionInfo }
                  newInfo.orders = e.target.value
                  setDescriptionInfo(newInfo)
                }}>
                  {DescriptionGenerator("orders")}
                </select>
              </p>
              <p>
                <strong>Appointment Template:</strong>
                <select value={descriptionInfo.apptTemplate} onChange={(e) => {
                  let newInfo = { ...descriptionInfo }
                  newInfo.apptTemplate = e.target.value
                  setDescriptionInfo(newInfo)
                }}>
                  {DescriptionGenerator("apptTemplate")}
                </select>
              </p>
            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '1rem' }}>
              <div className="saveBtn" onClick={() => {
                updateInfo()
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
                    width: 35%;
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