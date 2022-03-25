import { CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { client } from "../../api-lib/azure/azureConfig";
import { getClinic, getSite } from "../../api-lib/azure/azureOps";

export default function ValidateStudentDetails(props) {
  const [hover, setHover] = useState(false)

  async function createProfile() {
    const database = client.database("uc-ctct");
    const container = database.container("Students");
    for (let i = 0; i < props.data.length; i++) {
      await container.items.create(props.data[i])
    }
    props.setOpen(false);
    props.setCsv(null);
    props.reload();
    return; 
  }

  const [submittingForm, setSubmittingForm] = useState(false)

  return (
    <React.Fragment>
      <div className="backDrop" onClick={() => {props.setOpen(false); props.setCsv(null); return;}}></div>
      <div className="editScreen">
        {
          submittingForm ?
            <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignContent: 'center', justifyContent: "center" }}>
              <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <CircularProgress color="primary" size={120} />
              </div>
              <p style={{ textAlign: 'center' }}>Please wait. We're uploading new data to the database.</p>
            </div>
            :
            (<React.Fragment>
              <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <p className="editTitle">Students Information</p>
                    <p style={{marginBottom: '1rem'}}>Please review the uploaded information</p>
                </div>
                <IoClose color={hover ? "#CD0000" : "#C4C4C4"} size={hover ? 38 : 35} style={{ transition: '0.2s linear', cursor: 'pointer' }}
                  onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={() => { props.setOpen(false); props.setCsv(null); return; }} />
              </div>
              <div style={{ width: '100%', height: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', fontWeight: 'bold' }}>
                <p style={{ marginLeft: '2rem', width: '10%' }}>Name</p>
                <p style={{ marginLeft: '1rem', width: '15%' }}>Email</p>
                <p style={{ marginLeft: '1rem', width: '8%' }}>Phone</p>
                <p style={{ marginLeft: '1rem', width: '15%' }}>Address</p>
                <p style={{ marginLeft: '1rem', width: '6%' }}>DOB</p>
                <p style={{ marginLeft: '1rem', width: '12%' }}>Ethnicity</p>
                <p style={{ marginLeft: '1rem', width: '8%' }}>Sexual Orientation</p>
                <p style={{ marginLeft: '1rem', width: '4%' }}>Military Services</p>
                <p style={{ marginLeft: '1rem', width: '4%' }}>US Citizenship</p>
              </div>
              <div style={{ width: "100%" }}>
                {
                    props.data.map((x, ind) => {
                    return (
                        <div key={`record_${ind}`} style={{ width: 'auto', height: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div className='displayStudentValidateRow' key={`elem_${ind}`}>
                                <p style={{ marginLeft: '2rem', width: '10%' }}>{x.firstName} {x.middleName} {x.lastName}</p>
                                <p style={{ marginLeft: '1rem', width: '15%' }}>{x.email}</p>
                                <p style={{ marginLeft: '1rem', width: '8%' }}>{x.phoneNumber}</p>
                                <p style={{ marginLeft: '1rem', width: '15%' }}>{`${x.addressLine1}, ${x.addressLine2 == "" ? "" : x.addressLine2 + ', '}${x.city}, ${x.state} ${x.postal}`}</p>
                                <p style={{ marginLeft: '1rem', width: '6%' }}>{x.dob}</p>
                                <p style={{ marginLeft: '1rem', width: '12%' }}>{x.ethnic}</p>
                                <p style={{ marginLeft: '1rem', width: '8%' }}>{x.sex}</p>
                                <p style={{ marginLeft: '1rem', width: '4%' }}>{x.militaryService}</p>
                                <p style={{ marginLeft: '1rem', width: '4%' }}>{x.usCitizen}</p>
                            </div>
                        </div >
                    )
                    })
                }
              </div>
              <div style={{ width: "100%", display: "flex", justifyContent: "flex-end", alignItems: "center", marginTop: "1rem" }}>
              <div>
                <div className="saveBtn"
                  onClick={ async () => {
                    setSubmittingForm(true)
                    await createProfile();
                    return;
                  }} >
                  Yes, looks good!
                </div>
              </div>
              <div style={{marginLeft: '2rem'}}>
                <div className="exitBtn"
                  onClick={() => {
                    props.setOpen(false)
                    props.setCsv(null)
                    return;
                  }} >
                  No, still need to edit
                </div>
              </div>
              </div>
            </React.Fragment>)
        }
      </div>
      <style jsx>
        {`
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
            width: 90vw;
            background-color: #fff;
            opacity: 100%;
            top: 5vh;
            left: 5vw;
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

          .displayStudentValidateRow {
            font-weight: normal;
            font-size: 0.8rem;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            background-color: #fff;
            height: 3.6rem;
            width: 100%;
            margin: 0.4rem 0;
            border-radius: 1rem;
            box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
            font-family: 'Lato', sans-serif;
            cursor: pointer;
            z-index: 99;
            flex-wrap: wrap;
          }

          .saveBtn, .exitBtn {
            height: 3rem;
            width: 12rem;
            border-radius: 1rem;
            color: #fff;
            font-size: 1rem;
            font-weight: normal;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
          }

          .saveBtn {
            background-color: #1aacfe;
          }

          .exitBtn {
            background-color: red;
          }
        `}
      </style>
    </React.Fragment>
  );
}
