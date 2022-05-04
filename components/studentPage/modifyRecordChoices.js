import { CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { client } from "../../api-lib/azure/azureConfig";

export default function ModifyStudentRecordChoices(props) {
  const [hover, setHover] = useState(false)

  const [submittingForm, setSubmittingForm] = useState(false)
  const [loadCount, setLoadCount] = useState(0)
  const [cleaningFlag, setCleaningFlag] = useState(true)
  const [cleanCount, setCleanCount] = useState(0)

  return (
    <React.Fragment>
      <div className="backDrop" onClick={() => {props.setOpen(false); props.setCsv(null); return;}}></div>
      <div className="editScreen">
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <p className="editTitle">Please choose your option</p>
                </div>
            </div>
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
