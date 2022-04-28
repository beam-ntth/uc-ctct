import React, { useEffect, useState } from "react";
import { getAllSites } from "../../api-lib/azure/azureOps";

export default function NumberChart() {
    const [data, setData] = useState([0, 0, 0])

    const redStatus = [0, 1, 3, 4, 9]
    const yellowStatus = [2, 5, 6, 8]
    const greenStatus = 7

    const loadData = async() => {
        const response = await getAllSites();
        const splitData = [0, 0, 0]
        response.forEach(x => {
            if (parseInt(x.status) == greenStatus) {
                splitData[0]++
            } else if (yellowStatus.includes(parseInt(x.status))) {
                splitData[1]++
            } else if (redStatus.includes(parseInt(x.status))) {
                splitData[2]++
            }
            return
        })
        setData(splitData)
    }
    
    useEffect(() => loadData(), [])

    return (
        <React.Fragment>
            <div className='chartData' >
                <p className='dataCol1' >{ data[0] }</p>
                <p className='dataCol2' >{ data[1] }</p>
                <p className='dataCol3' >{ data[2] }</p>
            </div>
            <div className='label'>
                <p className='siteCol' >Total Green</p>
                <p className='siteCol' >Total Yellow</p>
                <p className='siteCol' >Total Red</p>
            </div>
            <style jsx>
                {
                    `
                      .chartData {
                        display: flex;
                        height: 90%;
                        width: 90%;
                        font-size: 3.3rem;
                      }
                      
                      .chartData p, .label p {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                      }
                      
                      .dataCol1, .dataCol2, .dataCol3 {
                        width: 33.33%;
                      }

                      .dataCol1 {
                          color: green;
                      }

                      .dataCol2 {
                          color: #f4de02;
                      }

                      .dataCol3 {
                          color: red;
                      }
                      
                      .label {
                        width: 90%;
                        display: flex;
                        flex-direction: row;
                        justify-content: flex-start;
                        align-items: center;
                        font-family: "Lato", sans-serif;
                        font-weight: bold;
                        font-size: 1.2rem;
                      }

                      .siteCol {
                        width: 33.33%;
                      }
                    `
                }
            </style>
        </React.Fragment>
    ) 
}