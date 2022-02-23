import React from "react";
import styles from "./Accordion.module.css"

// import { Accordion, Card, Button} from 'react-bootstrap'

// export default function Accordion(props) {
//     return (
//         <React.Fragment>
//             <div className={styles.section}>
//                 <button className={styles.accordion}>
//                     <p className={styles.title}>{props.title}</p>
//                 </button>
//                 <div className={styles.content}>
//                     <div className={styles.text}>

//                     </div>
//                 </div>
//             </div>
//         </React.Fragment>
//     )
// }

export default function Accordion(props) {
    return (
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Accordion Item #1</Accordion.Header>
                <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                    commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                    velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                    cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                    est laborum.
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>Accordion Item #2</Accordion.Header>
                <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                    commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                    velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                    cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                    est laborum.
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}