import React from 'react';
import { Bar } from 'react-chartjs-2';

const state = {
  labels: ['FNP', 'PMHP', 'MEPN',
           'PA'],
  datasets: [
    {
      label: 'Training types',
      backgroundColor: 'RGB(70, 130, 180)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 0,
      data: [65, 59, 81, 56]
    }
  ]
}

export default function BarChart() {
    return (
      <React.Fragment>
        <Bar data={state} options={{
          responsive: true,
          maintainAspectRatio: false,
          title:{
            display:true,
            text:'Average Rainfall per month',
          },
          legend:{
            display:true,
            position:'right'
          }
        }}
        />
      </React.Fragment>
    );
}