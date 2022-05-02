import { CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { createNewPreceptor } from "../../api-lib/azure/azureExecute";
import { addPreceptorFromClinicsPage, getClinic } from "../../api-lib/azure/azureOps";
import { v4 as uuidv4 } from "uuid";
import StatusParser from "../shared/status";

export default function PreceptorInfoAdd(props) {
  const [hover, setHover] = useState(false);

  const [info, setInfo] = useState({
    id: uuidv4().toString(),
    type: 'preceptor',
    firstname: null,
    lastname: null,
    email: null,
    npi: "",
    phoneNumber: null,
    status: 0,
    location_affiliation: props.region,
    survey: {
      hasResponded: false,
      responseDate: "",
      data: {}
    },
    students: [],
    notes: [],
    availability: {
      from: "",
      to: ""
  },
    clinics: [
      props.id
    ]
  });

  async function updateInfo() {
    const data = await getClinic(props.id)
    let newData = [...data.preceptorInfo].push(info)
    data.preceptorInfo = newData
    // await createNewPreceptor(data, info)
    await addPreceptorFromClinicsPage(props.id, info);
    props.setOpen(false);
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
              <p style={{ textAlign: 'center' }}>Submitting the form. Please wait.</p>
            </div>
            :
            (<React.Fragment>
              <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                <p className="editTitle">Add Preceptor Contact Information</p>
                <IoClose color={hover ? "#CD0000" : "#C4C4C4"} size={hover ? 38 : 35} style={{ transition: '0.2s linear', cursor: 'pointer' }}
                  onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={() => props.setOpen(false)} />
              </div>
              <div style={{ width: '90%' }}>
                <p><strong>First Name:</strong><input placeholder="Ex: John"
                  onChange={(e) => {
                    let newInfo = { ...info }
                    newInfo.firstname = e.target.value
                    setInfo(newInfo);
                    return;
                  }} />
                </p>
                <p><strong>Last Name:</strong><input placeholder="Ex: Doe"
                  onChange={(e) => {
                    let newInfo = { ...info }
                    newInfo.lastname = e.target.value
                    setInfo(newInfo);
                    return;
                  }} />
                </p>
                <p><strong>National Provider Identifier (NPI):</strong><input placeholder="NPI: (0000000000)"
                  onChange={(e) => {
                    let newInfo = { ...info }
                    newInfo.npi = e.target.value
                    setInfo(newInfo);
                    return;
                  }} />
                </p>
                <p><strong>Phone Number:</strong><input placeholder="0000000000"
                  onChange={(e) => {
                    let newInfo = { ...info }
                    newInfo.phoneNumber = e.target.value
                    setInfo(newInfo);
                    return;
                  }} />
                </p>
                <p><strong>Email Address:</strong><input placeholder="Email Address"
                  onChange={(e) => {
                    let newInfo = { ...info }
                    newInfo.email = e.target.value
                    setInfo(newInfo);
                    return;
                  }} />
                </p>
                <p><strong>Availability </strong><br />
                from:
                <input type={'date'}
                  onChange={(e) => {
                    const val = e.target.value
                    let newInfo = { ...info }
                    newInfo.availability.from = `${val.substring(5, 7)}/${val.substring(8, 10)}/${val.substring(0, 4)}`
                    setInfo(newInfo);
                    return;
                  }} />
                <br />
                to:
                <input type={'date'}
                  onChange={(e) => {
                    const val = e.target.value
                    let newInfo = { ...info }
                    newInfo.availability.to = `${val.substring(5, 7)}/${val.substring(8, 10)}/${val.substring(0, 4)}`
                    setInfo(newInfo);
                    return;
                  }} />
                </p>
                <p><strong>Status:</strong>
                  <select
                    value={info.status}
                    onChange={(e) => {
                      let newInfo = { ...info }
                      newInfo.status = e.target.value
                      setInfo(newInfo);
                      return;
                    }} >
                    { StatusParser('preceptors', -1) }
                  </select>
                </p>
              </div>
              <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '1rem' }}>
                <div className="saveBtn" onClick={async () => {
                  await updateInfo();
                  setSubmittingForm(true)
                }}>Add Contact</div>
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
                    width: 80vw;
                    background-color: #fff;
                    opacity: 100%;
                    top: 10vh;
                    left: 10vw;
                    z-index: 901;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
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