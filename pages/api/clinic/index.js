export default function handler(req, res) {
  const clinic1 = {
    id: 'clinic1',
    name: 'Clinic 1',
    lastUpdated: '01/21/2019',
    status: 0,
  }

  const clinic2 = {
    id: 'clinic2',
    name: 'Clinic 2',
    lastUpdated: '01/22/2019',
    status: 2,
  }

  const clinic3 = {
    id: 'clinic4',
    name: 'Clinic 4',
    lastUpdated: '01/23/2019',
    status: 1,
  }

  const clinic4 = {
    id: 'clinic5',
    name: 'Clinic 5',
    lastUpdated: '02/23/2019',
    status: 3,
  }

  if (req.query.location == 'site1') {
    res.status(200).json([clinic1, clinic3, clinic2, clinic4])
    return;
  }

  if (req.query.location == 'site2') {
    res.status(200).json([clinic4, clinic2])
    return;
  }

  if (req.query.location == 'site3') {
    res.status(200).json([clinic1])
    return;
  }

  res.status(400).json("400: Bad Request")
}

// handler.get('/api/clinic/getClinic1', (req, res) => {
//   const genInfo = {
//     pOrg: 'UC Davis Site',
//     initDate: '01/22/2022',
//     currentStatus: 'needToContact'
//   }

//   // Need two tables, one with strictly personnel and one with personnel attached to clinics.
//   // Create a
//   const adminInfo = {
//     personnel : [
//       {uid: 1, name: 'John Doe', }
//     ]
//   }
// });

// handler.get((req, res) => {
//   res.send({sent : 'yes'});
// })

// handler.get('api/clinic/getAdminContact', (req, res) => {
//   const adminContact = {
//     contactName: {

//     }
//   }
// })
