import {Pie, Doughnut} from 'react-chartjs-2';

const state = {
  labels: ['Active', 'Pending', 'Cold Called',
           'Onboarding', 'Inactive'],
  datasets: [
    {
      label: 'Rainfall',
      backgroundColor: [
        '#4682B4',
        '#6B8E23',
        '#FF7F50',
        '#BDB76B',
        '#483D8B'
      ],
      hoverBackgroundColor: [
      '#501800',
      '#4B5000',
      '#175000',
      '#003350',
      '#35014F'
      ],
      data: [65, 59, 80, 81, 56]
    }
  ]
}

export default function PieChart() {
    return (
      <div>
        <Doughnut
          data={state}
          width={"30%"}
          options={{ maintainAspectRatio: false,
            title:{
              display:true,
              text:'Clinic Status',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
    );
}
