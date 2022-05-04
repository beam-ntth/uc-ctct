import { CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { client } from "../../api-lib/azure/azureConfig";
import { checkIfStudentExisted } from "../../api-lib/azure/azureOps";
import { mapCityToCounty } from "../shared/cityToCounty";
import { mapCountyToLocationAffi } from "../shared/countyToAffiliation";

export default function ValidateStudentDetails(props) {
  const [hover, setHover] = useState(false)

  const [submittingForm, setSubmittingForm] = useState(false)
  const [loadCount, setLoadCount] = useState(0)
  const [cleaningFlag, setCleaningFlag] = useState(true)
  const [cleanCount, setCleanCount] = useState(0)

  async function createProfile() {
    const database = client.database("uc-ctct");
    const container = database.container("Students");
    const newData = []
    // Get the corrdinates for all the student's address
    for (let i = 0; i < props.data.length; i++) {
      setCleanCount(cleanCount++)
      const addr = `${props.data[i].addressLine1}, ${props.data[i].addressLine2 == "" ? "" : props.data[i].addressLine2 + ', '}${props.data[i].city}, ${props.data[i].state} ${props.data[i].postal}`.replaceAll(", ", "%20").replaceAll(" ", "%20")
      const res = await (await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${addr}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}`)).json()
      let newInfo = { ...props.data[i], lat: "38", "long": "-121" }
      // If the API denied our request, we will retry it again
      if (res.status == "REQUEST_DENIED") {
        const retryRes = await (await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${addr}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}`)).json()
        if (retryRes.status != "OK") {
          continue
        }
      }
      // If the address is invalid, then set it to a default value
      if (res.status == "ZERO_RESULTS") {
        newData.push(newInfo)
        continue
      }
      const location = res.results[0].geometry.location
      newInfo.lat = location.lat
      newInfo.long = location.lng
      newInfo.county = mapCityToCounty(newInfo.city)
      newInfo.location_affiliation = mapCountyToLocationAffi(newInfo.county)
      newData.push(newInfo)
    }
    // Indicate to the user that we're done cleaning up data
    setCleaningFlag(false)
    
    // Create new student item and add it to the container, ONLY when the student
    // record is brand new
    for (let i = 0; i < newData.length; i++) {
      setLoadCount(loadCount++)
      const studentExist = await checkIfStudentExisted(newData[i].email)
      if (!studentExist) {
        await container.items.create(newData[i])
      }
    }
    props.setOpen(false);
    props.setCsv(null);
    props.reload();
    return; 
  }

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
              <p style={{ textAlign: 'center' }}>{`Please wait. ${cleaningFlag ? `Finished cleaning up data for ${cleanCount}/${props.data.length} student${cleanCount > 1 ? 's' : ''}` 
              : `We're uploading ${loadCount}/${props.data.length} student profile${loadCount > 1 ? 's' : ''} to the database.`}`}</p>
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
