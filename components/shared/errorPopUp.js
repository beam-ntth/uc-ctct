import React from "react";

export default function ErrorPopUp(props) {
    return (
        <React.Fragment>
        <div className="backDrop" onClick={() => props.open(false)}></div>
        <div className="editScreen">
            <h4>An Error has Occured. Don't panic!</h4>
            <p>{ props.text }</p>
            <p>Please contact your IT and show this error message</p>
            <p className="errorMsg">{ props.error }</p>
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
                
                .editScreen {
                    position: absolute;
                    height: 70vh;
                    width: 60vw;
                    background-color: #fff;
                    opacity: 100%;
                    top: 15vh;
                    left: 20vw;
                    z-index: 901;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: flex-start;
                    border-radius: 1rem;
                    padding: 2rem;
                    overflow-y: scroll;
                }

                .editScreen h4 {
                    font-size: 1.3rem;
                }

                .errorMsg {
                    font-size: 1rem;
                    color: grey;
                }
                `
            }
        </style>
    </React.Fragment>
    )
}