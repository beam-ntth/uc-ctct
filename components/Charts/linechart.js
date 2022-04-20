import React from 'react';
import { Bar } from 'react-chartjs-2';


const state = {
  labels: ['UCD', 'UCLA', 'UCSF',
           'UCI'],
  datasets: [
    {
      label: 'Matching Goal Percentage per Affiliation',
      backgroundColor:['RGB(0, 142, 170)' , 'RGB(241, 138, 0)','RGB(61, 174, 43)','RGB(118, 8, 130)'],
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 0,
      data: [65, 59, 80, 81, 56],
      barThickness:5
    },
  ]
}

export default function LineChart() {
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
          }
        }
        }}
        />
      </React.Fragment>
    );
}
