import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { getAllStudents } from '../../api-lib/azure/azureOps';


export default function BarChart() {

  const [data, setData] = useState([0,0,0,0])

  const state = {
    labels: ['UCD', 'UCLA', 'UCSF',
            'UCI'],
    datasets: [
      {
        label: 'Number of  active students',
        boxWidth: 2,
        backgroundColor:['RGB(0, 142, 170)' , 'RGB(241, 138, 0)','RGB(61, 174, 43)','RGB(118, 8, 130)'],
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 0,
        data: data
      }
    ]
  }

  /**
   * @function loadData : Load all of the student data and assign them to the appropriate region
   */
  const loadData = async() => {
    const response = await getAllStudents();
    const splitData = [0, 0, 0, 0]
    response.forEach(x => {
      if (x.status == "Active") {
        if (x.location_affiliation == "UC Davis") {
          splitData[0]++
        } else if (x.location_affiliation == "UC Los Angeles") {
          splitData[1]++
        } else if (x.location_affiliation == "UC San Francisco") {
          splitData[2]++
        } else {
          splitData[3]++
        }
      }
      return
    })
    setData(splitData)
  }

  /**
   * Load data lazily by calling useEffect to initialize data after page is loaded
   */
  useEffect(() => loadData(), [])

  return (
    <React.Fragment>
      <Bar data={state} options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
        legend: {
          boxWidth: 10,
          display:false,
          position:'right',
          pointStyle: "circle",
        }
      }
      }}
      />
    </React.Fragment>
  );
}
