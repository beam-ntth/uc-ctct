import React, { useState, useEffect } from "react";
import { client } from "../../api-lib/azure/azureConfig";
import { getClinic, getSite } from "../../api-lib/azure/azureOps";

export default function AdminInfoEdit(props) {
    const [info, setInfo] = useState({
        name: null,
        position: null,
        phone: null,
        email: null,
    });

    async function updateInfo() {
        // const database = client.database("uc-ctct");
        // const container = database.container("Clinics");
        // const { resource: clinic_data } = await container.item(props.id, props.id).read();
        const clinic_data = getClinic(props.id);
        let adminInfo = clinic_data.adminInfo;
        info.phone =
            info.phone.substring(0, 3) +
            "-" +
            info.phone.substring(3, 6) +
            "-" +
            info.phone.substring(6, 10);
        adminInfo.push(info);
        const replaceOperation = [
            {
                op: "replace",
                path: "/adminInfo",
                value: adminInfo,
            },
        ];
        const { resource: patchRes } = await container
            .item(props.id, props.id)
            .patch(replaceOperation);
        props.reload();
    }

    // Allow the user to use 'Enter' to submit changes, on top of clicking 'Save'
    useEffect(() => {
        document.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                updateInfo();
                props.setOpen(false);
                return;
            }
        });
    });

    return (
        <React.Fragment>
            <div className="backDrop" onClick={() => props.setOpen(false)}></div>
            <div className="editScreen">
                <p className="editTitle">Add Contact Information</p>
                <div style={{ width: "90%" }}>
                    <p>
                        <strong>Name:</strong>
                        <input
                            placeholder="First Last"
                            onChange={(e) => {
                                let newInfo = { ...info };
                                newInfo.name = e.target.value;
                                setInfo(newInfo);
                                return;
                            }}
                        />{" "}
                    </p>
                    <p>
                        <strong>Position:</strong>
                        <input
                            placeholder="Position"
                            onChange={(e) => {
                                let newInfo = { ...info };
                                newInfo.position = e.target.value;
                                setInfo(newInfo);
                                return;
                            }}
                        />
                    </p>
                    <p>
                        <strong>Phone Number:</strong>
                        <input
                            placeholder="0000000000"
                            value={info.phone}
                            onChange={(e) => {
                                let newInfo = { ...info };
                                newInfo.phone = e.target.value
                                    .replace(/\D/g, "")
                                    .substring(0, 10);
                                setInfo(newInfo);
                                return;
                            }}
                        />
                    </p>
                    <p>
                        <strong>Email Address:</strong>
                        <input
                            placeholder="Email Address"
                            type={"email"}
                            onChange={(e) => {
                                let newInfo = { ...info };
                                newInfo.email = e.target.value;
                                setInfo(newInfo);
                                return;
                            }}
                        />
                    </p>
                </div>
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        marginTop: "1rem",
                    }}
                >
                    <div
                        className="saveBtn"
                        onClick={() => {
                            updateInfo();
                            props.setOpen(false);
                            return;
                        }}
                    >
                        Add Contact
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
            height: 45vh;
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
            background-color: #1aacfe;
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
        `}
            </style>
        </React.Fragment>
    );
}
