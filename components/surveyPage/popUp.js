import React from "react";

export default function PopUp(props) {
    return (
        <React.Fragment>
        <div className="backDrop" onClick={() => {props.open(false); props.setEmailList([]); props.setUrl("")}}></div>
        <div className="editScreen">
            <div style={{height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignContent: 'center', justifyContent: "flex-start"}}>
                <h4>Here is the list of all unresponded emails</h4>
                <p className="instruction">Please copy the emails below and paste them on to the "Recipients" section of your mailing system</p>
                <p>{props.emailList.length == 0 ? "Everybody responded to the email!" : props.emailList.join(", ")}</p>
                <h4>Here is the anonymous survey link to attach to your email</h4>
                <p className="url">{props.url}</p>
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
                }
                `
            }
        </style>
    </React.Fragment>
    )
}