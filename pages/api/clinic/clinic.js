import nextConnect from "next-connect";
let handler = nextConnect();
handler.get('/api/clinic/getClinic1', (req, res) => {
  const genInfo = {
    pOrg: 'UC Davis Site', 
    initDate: '01/22/2022', 
    currentStatus: 'needToContact'
  } 

  // Need two tables, one with strictly personnel and one with personnel attached to clinics. 
  // Create a 
  const adminInfo = {
    personnel : [
      {uid: 1, name: 'John Doe', }
    ]
  }
});

// handler.get('api/clinic/getAdminContact', (req, res) => {
//   const adminContact = {
//     contactName: {

//     }
//   }
// })