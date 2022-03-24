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

  const [submittingForm, setSubmittingForm] = useState(false)

  const [coorLoading, setCoorLoading] = useState(false)
  const [errorText, setErrorText] = useState(false)
  const [successText, setSuccessText] = useState(false)

  async function searchCoordinates() {
    const genInfo = generalInfo
    const addr = `${genInfo.addressLine1}%20${genInfo.addressLine2 ? genInfo.addressLine2 + '%20' : ''}${genInfo.city}%20${genInfo.state}%20${genInfo.postal}`
    const res = await (await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${addr}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}`)).json()
    console.log(res)
    // Set the flags whether to show error text or not
    if (res.status == "ZERO_RESULTS") {
      setErrorText(true)
      setCoorLoading(false)
      return
    }
    const location = res.results[0].geometry.location
    let newInfo = { ...generalInfo }
    newInfo.lat = location.lat
    newInfo.long = location.lng
    setGeneralInfo(newInfo)
    // Hide loading icon back
    setErrorText(false)
    setSuccessText(true)
    setCoorLoading(false)
  }

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
              <p style={{ textAlign: 'center' }}>Submitting the form. Please wait.</p>
            </div>
            :
            (<React.Fragment>
              <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                <p className="editTitle">General Information</p>
                <IoClose color={hover ? "#CD0000" : "#C4C4C4"} size={hover ? 38 : 35} style={{ transition: '0.2s linear', cursor: 'pointer' }}
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
                <p><strong>Fax Number:</strong><input value={generalInfo.faxNumber} onChange={(e) => {
                  let newInfo = { ...generalInfo }
                  newInfo.faxNumber = e.target.value
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
                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                  <div className="coorSearchBtn" onClick={() => {setCoorLoading(true); searchCoordinates(); return;}}>Search Coordinates</div>
                  { coorLoading ? <CircularProgress color="primary" size={'1.5rem'} /> : null }
                  { ( !errorText && !successText ) ? <p style={{ color: '#000', fontSize: '0.8rem', margin: 0 }}>Click after editing in the address, if you do not know the coordinates</p> : null}
                  { errorText ? <p style={{ color: 'red', fontSize: '0.8rem', margin: 0 }}>Cannot find coordinates! Please check the address again.</p> : null}
                  { successText ? <p style={{ color: 'green', fontSize: '0.8rem', margin: 0 }}>Coordinates Found!</p> : null}
                </div>
                <p><strong>Latitude:</strong><input value={generalInfo.lat} onChange={(e) => {
                  let newInfo = { ...generalInfo }
                  newInfo.lat = e.target.value
                  setGeneralInfo(newInfo)
                }} /></p>
                <p><strong>Longitude:</strong><input value={generalInfo.long} onChange={(e) => {
                  let newInfo = { ...generalInfo }
                  newInfo.long = e.target.value
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
                <div className="saveBtn" onClick={async () => {
                  await updateInfo()
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

                .coorSearchBtn {
                  height: 2rem;
                  width: 22%;
                  font-size: 0.8rem;
                  background-color: #444444;
                  cursor: pointer;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  color: #fff;
                  border-radius: 0.5rem;
                  margin-right: 1rem;
                }
                `
        }
      </style>
    </React.Fragment>
  )
}