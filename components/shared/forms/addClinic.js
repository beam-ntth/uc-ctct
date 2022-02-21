import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { v4 as uuidv4 } from 'uuid';
import { client } from '../../../api-lib/azure/azureConfig';
import DescriptionGenerator from "../../clinicPage/description";
import StatusParser from "../status";

export default function AddNewClinic(props) {
  const currentdate = new Date();
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  const datetime = `${monthNames[currentdate.getMonth()]} ${currentdate.getDate()}, ${currentdate.getFullYear()}`

  const [hover, setHover] = useState(false)
  const [clinic, setClinic] = useState({
    id: uuidv4().toString(),
    site_id: props.siteId,
    name: '',
    last_updated: datetime,
    total_clinics: 0,
    status: 0,
    "generalInformation": {
      "site": "",
      "phoneNumber": "",
      "faxNumber": "",
      "addressLine1": "",
      "addressLine2": null,
      "city": "",
      "state": "",
      "postal": ""
    },
    "description": {
      "settingLocation": "In-patient",
      "settingPopulation": "Women's Health",
      "population": "Child/Adolescent",
      "visitType": "50% In-person | 50% Video Visits",
      "patientAcuity": "Acute Care In-patient psychiatry",
      "documentation": "Student does not document in the EMR/chart (notes provided to preceptor for in-put in the EMR/chart)",
      "orders": "Student does not enter orders, preceptor must enter",
      "apptTemplate": "Student has a separate template and schedule of patients"
    },
    "adminInfo": [],
    "preceptorInfo": [],
    "clinicPlacementDetail": [
      {
        "title": "Clerance Timeline",
        "note": ""
      },
      {
        "title": "Clerance Requirement",
        "note": ""
      },
      {
        "title": "Orientation",
        "note": ""
      },
      {
        "title": "Tips & Tricks",
        "note": ""
      },
      {
        "title": "Attire",
        "note": ""
      }
    ],
    "notes": [],
    "map": {
      "displayUrl": ""
    }
  }
  )

  async function addClinic() {
    // TODO: CLEAN AND REPLACE WITH OWN OP.
    const database = client.database("uc-ctct");
    const site_container = database.container("Sites");
    const { resource: previous_num_clinics } = await site_container.item(props.siteId, props.siteId).read()
    const clinic_container = database.container("Clinics");
    clinic_container.items.create(clinic)
    const replaceOperation =
      [{
        op: "replace",
        path: "/total_clinics",
        value: previous_num_clinics["total_clinics"] + 1
      }];
    await site_container.item(props.siteId, props.siteId).patch(replaceOperation)
    setTimeout(() => props.reload(), 500)
  }

  // Allow the user to use 'Enter' to submit changes, on top of clicking 'Save'
  // useEffect(() => {
  //     document.addEventListener("keydown", e => {
  //         if (e.key === 'Enter') {
  //             createNewRegion()
  //             props.setOpen(false)
  //             return
  //         }
  //     })
  // })

  return (
    <React.Fragment>
      <div className="backDrop" onClick={() => props.setOpen(false)}></div>
      <div className="editScreen">
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
          <p className="editTitle">Add New Clinic</p>
          <IoClose color={hover ? "#CD0000" : "#C4C4C4"} size={hover ? 38 : 35} style={{ transition: '0.2s linear', cursor: 'pointer' }}
            onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={() => props.setOpen(false)} />
        </div>
        <div style={{ width: '90%' }}>
          <p><strong>Name:</strong><input placeholder="Clinic Name" onChange={(e) => {
            let newClinic = { ...clinic }
            newClinic.name = e.target.value
            setClinic(newClinic)
            return
          }} /> </p>
          <p className="editSubTitle">General Information</p>
          <p style={{ marginRight: '2rem', width: "90%" }}><strong>Site:</strong><input style={{ width: "80%" }} value={clinic.generalInformation.site} onChange={(e) => {
            let newInfo = { ...clinic }
            newInfo.generalInformation.site = e.target.value

            setClinic(newInfo)
          }} /> </p>
          <p><strong>Phone Number:</strong><input value={clinic.generalInformation.phoneNumber} onChange={(e) => {
            let newInfo = { ...clinic }
            newInfo.generalInformation.phoneNumber = e.target.value
            setClinic(newInfo)
          }} /></p>
          <p><strong>Address Line 1:</strong><input value={clinic.generalInformation.addressLine1} onChange={(e) => {
            let newInfo = { ...clinic }
            newInfo.generalInformation.addressLine1 = e.target.value
            setClinic(newInfo)
          }} /></p>
          <p><strong>Address Line 2:</strong><input value={clinic.generalInformation.addressLine2} onChange={(e) => {
            let newInfo = { ...clinic }
            newInfo.generalInformation.addressLine2 = e.target.value
            setClinic(newInfo)
          }} /></p>
          <p><strong>City:</strong><input value={clinic.generalInformation.city} onChange={(e) => {
            let newInfo = { ...clinic }
            newInfo.generalInformation.city = e.target.value
            setClinic(newInfo)
          }} /></p>
          <p><strong>State (Abbreviated, CA):</strong> <input value={clinic.generalInformation.state} onChange={(e) => {
            let newInfo = { ...clinic }
            newInfo.generalInformation.state = e.target.value
            setClinic(newInfo)
          }} /></p>
          <p><strong>Postal Code:</strong><input value={clinic.generalInformation.postal} onChange={(e) => {
            let newInfo = { ...clinic }
            newInfo.generalInformation.postal = e.target.value
            setClinic(newInfo)
          }} /></p>
          <p><strong>Fax Number:</strong><input value={clinic.generalInformation.faxNumber} onChange={(e) => {
            let newInfo = { ...clinic }
            newInfo.generalInformation.faxNumber = e.target.value
            setClinic(newInfo)
          }} /></p>
          <p>
            <strong>Current Status:</strong>
            <select value={clinic.status} onChange={(e) => {
              let newInfo = { ...clinic }
              newInfo.status = e.target.value
              setClinic(newInfo)
            }}>
              {StatusParser("clinics", -1)}
            </select>
          </p>
          <p className="editSubTitle">Clinic Descriptions</p>
          <p style={{ marginRight: '2rem', width: "90%" }}>
            <strong>Setting (Location):</strong>
            <select value={clinic.description.settingLocation} onChange={(e) => {
              let newInfo = { ...clinic }
              newInfo.description.settingLocation = e.target.value
              setClinic(newInfo)
            }}>
              {DescriptionGenerator("settingLocation")}
            </select>
          </p>
          <p>
            <strong>Setting (Population):</strong>
            <select value={clinic.description.settingPopulation} onChange={(e) => {
              let newInfo = { ...clinic }
              newInfo.description.settingPopulation = e.target.value
              setClinic(newInfo)
            }}>
              {DescriptionGenerator("settingPopulation")}
            </select>
          </p>
          <p>
            <strong>Population:</strong>
            <select value={clinic.description.population} onChange={(e) => {
              let newInfo = { ...clinic }
              newInfo.description.population = e.target.value
              setClinic(newInfo)
            }}>
              {DescriptionGenerator("population")}
            </select>
          </p>
          <p>
            <strong>Visit Type:</strong>
            <select value={clinic.description.visitType} onChange={(e) => {
              let newInfo = { ...clinic }
              newInfo.description.visitType = e.target.value
              setClinic(newInfo)
            }}>
              {DescriptionGenerator("visitType")}
            </select>
          </p>
          <p>
            <strong>Patient Acuity:</strong>
            <select value={clinic.description.patientAcuity} onChange={(e) => {
              let newInfo = { ...clinic }
              newInfo.description.patientAcuity = e.target.value
              setClinic(newInfo)
            }}>
              {DescriptionGenerator("patientAcuity")}
            </select>
          </p>
          <p>
            <strong>Documentation:</strong>
            <select value={clinic.description.documentation} onChange={(e) => {
              let newInfo = { ...clinic }
              newInfo.description.documentation = e.target.value
              setClinic(newInfo)
            }}>
              {DescriptionGenerator("documentation")}
            </select>
          </p>
          <p>
            <strong>Orders:</strong>
            <select value={clinic.description.orders} onChange={(e) => {
              let newInfo = { ...clinic }
              newInfo.description.orders = e.target.value
              setClinic(newInfo)
            }}>
              {DescriptionGenerator("orders")}
            </select>
          </p>
          <p>
            <strong>Appointment Template:</strong>
            <select value={clinic.description.apptTemplate} onChange={(e) => {
              let newInfo = { ...clinic }
              newInfo.description.apptTemplate = e.target.value
              setClinic(newInfo)
            }}>
              {DescriptionGenerator("apptTemplate")}
            </select>
          </p>
          <p className="editSubTitle">Clinic Placement Details</p>
          {clinic.clinicPlacementDetail.map((x, ind) => {
            return (
              <React.Fragment>
                <p key={`title_${ind}`}><strong>Title:</strong><input value={x.title} disabled /></p>
                <div key={`note_${ind}`} style={{ display: 'flex' }}>
                  <strong>Note:</strong>
                  <textarea value={clinic.clinicPlacementDetail[ind] ? clinic.clinicPlacementDetail[ind].note : ""}
                    onChange={e => {
                      let newInfo = { ...clinic }
                      newInfo.clinicPlacementDetail[ind].note = (e.target.value ? e.target.value : "")
                      setClinic(newInfo)
                      return
                    }
                    }
                  ></textarea>
                </div>
              </React.Fragment>
            )
          })}
          <p className="editSubTitle">Map Direction</p>
          <p>
            <strong>Map Code:</strong>
            <input placeholder="<iframe> ... </iframe>" onChange={(e) => {
              let newClinic = { ...clinic }
              newClinic.map.displayUrl = e.target.value
              setClinic(newClinic)
              return
            }} />
          </p>
          <span style={{ marginTop: '0.4rem', fontSize: '0.8rem' }}>Learn how to extract code from Google Map <a>HERE</a></span>
        </div>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '1rem' }}>
          <div className="saveBtn" onClick={() => {
            addClinic()
            props.setOpen(false)
            return
          }}>Create Clinic</div>
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

                .editSubTitle {
                    color: #444444;
                    font-size: 1.1rem;
                    font-weight: bold;
                    margin-top: 2rem;
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

                .editScreen strong {
                    font-weight: 500;
                    font-size: 0.8rem;
                }
                
                .editScreen input, .editScreen select {
                    margin-left: 0.4rem;
                    border-radius: 0.5rem;
                    border: solid 1px #c4c4c4;
                    padding: 0.5rem;
                    width: 50%;
                }

                .editScreen textarea {
                    margin-left: 0.4rem;
                    border-radius: 0.5rem;
                    border: solid 1px #c4c4c4;
                    padding: 0.5rem;
                    width: 80%;
                    height: 10rem;
                }

                .editScreen a {
                    cursor: pointer;
                    text-decoration: underline;
                }

                .editScreen a:hover {
                    color: #079CDB;
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