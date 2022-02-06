import nextConnect from "next-connect";
let handler = nextConnect();


const clinic1Data = {
  uid: 54,
  name: 'Clinic 1',
  lastUpdated: '2/5/2022',
  status: 0
}

const clinic2Data = {
  uid: 23,
  name: 'Clinic 2',
  lastUpdated: '2/7/2022',
  status: 1
}

const clinic3Data = {
  uid: 43,
  name: 'Clinic 3',
  lastUpdated: '2/7/2022',
  status: 3
}

handler.get((req, res) => {
  console.log(req.query)
  const region = req.query.site;
  if (region == 1) {
    res.json({
      clinic2Data, clinic3Data
    })
  } else if (region == 2) {
    res.json({ clinic1Data })
  }
});

export default handler;



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

// handler.get('api/clinic/getAdminContact', (req, res) => {
//   const adminContact = {
//     contactName: {

//     }
//   }
// })