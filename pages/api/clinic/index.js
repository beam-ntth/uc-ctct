import nextConnect from 'next-connect'
let handler = nextConnect()

const clinic1 = {
  name: 'Clinic 1',
  lastUpdated: '01/21/2019',
  status: 0,
}

const clinic2 = {
  name: 'Clinic 2',
  lastUpdated: '01/22/2019',
  status: 2,
}

const clinic3 = {
  name: 'Clinic 4',
  lastUpdated: '01/23/2019',
  status: 1,
}

const clinic4 = {
  name: 'Clinic 5',
  lastUpdated: '02/23/2019',
  status: 4,
}

handler.get((req, res) => {
  if (req.query.site == 'Site 1') {
    res.json([clinic1, clinic3])
  } else if (req.query.site == 'Site 2') {
    res.json([clinic4, clinic2])
  } else {
    res.json(clinic1)
  }
})

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

export default handler

// handler.get('api/clinic/getAdminContact', (req, res) => {
//   const adminContact = {
//     contactName: {

//     }
//   }
// })
