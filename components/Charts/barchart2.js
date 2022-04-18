import React from 'react';
import { Bar } from 'react-chartjs-2';

const state = {
  labels: ['UCD', 'UCLA', 'UCSF',
           'UCI'],
  datasets: [
    {
      label: ' active students',
      backgroundColor: 'RGB(70, 130, 180)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 0,
      data: [65, 59, 80, 81, 56]
    }
  ]
}

export default function BarChart() {
    return (
      <React.Fragment>
        <Bar data={state} options={{
          responsive: true,
          maintainAspectRatio: false,
          legend:{
            display:true,
            position:'right'
          }
        }}
        />
      </React.Fragment>
    );
}