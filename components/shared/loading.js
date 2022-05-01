import { CircularProgress } from "@mui/material";
import React from "react";

export default function Loading(props) {
    return (
        <React.Fragment>
        <div className="backDrop"></div>
        <div className="editScreen">
            <div style={{height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignContent: 'center', justifyContent: "center"}}>
                <div style={{textAlign: 'center', marginBottom: '1rem'}}>
                    <CircularProgress color="primary" size={ 120 } />
                </div>
                <p style={{textAlign: 'center'}}>{props.text}</p>
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
                    height: 75vh;
                    width: 70vw;
                    background-color: #fff;
                    opacity: 100%;
                    top: 10vh;
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
                `
            }
        </style>
    </React.Fragment>
    )
}