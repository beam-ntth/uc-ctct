import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { addPreceptorFromClinicsPage } from "../../api-lib/azure/azureOps";

export default function PreceptorInfoEdit(props) {
  const [hover, setHover] = useState(false);
  const [name, setName] = useState(null);
  const [position, setPostion] = useState(null);
  const [number, setNumber] = useState(null);
  const [email, setEmail] = useState(null);

  // Used to hold info of the state of inputs.
  // const [info, setInfo] = useState({
  //   name: null,
  //   position: null,
  //   phone: null,
  //   email: null
  // });

  // TODO - JT Change position to credential.

  async function updateInfo() {
    const preceptor = {
      name: name,
      position: position,
      phone: number,
      email: email
    }

    await addPreceptorFromClinicsPage(props.id, preceptor);

    props.reload();
  }

  return (
    <React.Fragment>
      <div className="backDrop" onClick={() => props.setOpen(false)}></div>
      <div className="editScreen">
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
          <p className="editTitle">Add Preceptor Contact Information</p>
          <IoClose color={hover ? "#CD0000" : "#C4C4C4"} size={hover ? 38 : 35} style={{ transition: '0.2s linear', cursor: 'pointer' }}
            onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={() => props.setOpen(false)} />
        </div>
        <div style={{ width: '90%' }}>
          <p><strong>Name:</strong><input placeholder="First Last"
            onChange={(e) => {
              setName(e.target.value);
              return;
            }} />
          </p>
          <p><strong>Position:</strong><input placeholder="Position"
            onChange={(e) => {
              setPostion(e.target.value);
              return;
            }} />
          </p>
          <p><strong>Phone Number:</strong><input placeholder="000-000-0000"
            onChange={(e) => {
              setNumber(e.target.value);
              return;
            }} />
          </p>
          <p><strong>Email Address:</strong><input placeholder="Email Address"
            onChange={(e) => {
              setEmail(e.target.value);
              return;
            }} />
          </p>
        </div>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '1rem' }}>
          <div className="saveBtn" onClick={async () => {
            await updateInfo();
            props.setOpen(false);
          }}>Add Contact</div>
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