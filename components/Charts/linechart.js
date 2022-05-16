import { Bar } from 'react-chartjs-2';
import React, { useEffect, useState } from 'react';
import { getAllStudents } from '../../api-lib/azure/azureOps';

export default function LineChart() {
  const [data, setData] = useState([0,0,0,0])

  const state = {
    labels: ['UCD', 'UCLA', 'UCSF',
            'UCI'],
    datasets: [
      {
        label: 'Matching Goal Percentage per Affiliation',
        backgroundColor:['RGB(0, 142, 170)' , 'RGB(241, 138, 0)','RGB(61, 174, 43)','RGB(118, 8, 130)'],
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 0,
        data: data,
        barThickness:5
      },
    ]
  }

  const loadData = async() => {
    const response = await getAllStudents();
    const splitData = [0, 0, 0, 0]
    const allStudentCt = [0, 0, 0, 0]
    response.forEach(x => {
        if (x.location_affiliation == "UC Davis") {
          if (x.assignment.isAssigned) {
            splitData[0]++
          }
          allStudentCt[0]++
        } else if (x.location_affiliation == "UC Los Angeles") {
          if (x.assignment.isAssigned) {
            splitData[1]++
          }
          allStudentCt[1]++
        } else if (x.location_affiliation == "UC San Francisco") {
          if (x.assignment.isAssigned) {
            splitData[2]++
          }
          allStudentCt[2]++
        } else {
          if (x.assignment.isAssigned) {
            splitData[3]++
          }
          allStudentCt[3]++
        }
    })
    const finalRatio = splitData.map((x, ind) => x/allStudentCt[ind])
    setData(finalRatio)
  }

  useEffect(() => loadData(), [])

  return (
    <React.Fragment>
      <Bar data={state} options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend:{
            boxWidth: 9,
            display:false,
            position:'top',
            pointStyle: "circle",
          },
          tooltip: {
            callbacks: {
                label: function(context) {
                    return `Matched: ${(parseFloat(context.parsed.y) * 100).toFixed(2)}%`;
                }
            }
          }
        },
        scales: {
          yAxes: {
            ticks: {
              callback: function (value) {
                return `${(value * 100).toFixed(2)}%`
              },
            }
          }
        }
      }}
      />
    </React.Fragment>
  );
}
