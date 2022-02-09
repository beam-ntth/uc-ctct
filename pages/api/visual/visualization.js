export default function handler(req, res) {
    const query = req.query;
    // Simulate waiting time
    setTimeout(() => {
      1000;
    });
    // /api/site/visual
    if (Object.keys(query).length === 0) {
      //res.status(200).json({test : "Hello world"})
    res.status(200).json([
         {
            id: "clinic1",
             name: "Clinic 1",
             training_type: "FNP",
             affiliation: "UCSF",
             region: "Southern",
            status: "Need to contact", 
        },
        {
            id: "clinic2",
            name: "Clinic 2",
            training_type: "FNP",
            affiliation: "UCSF",
            region: "Southern",
            status: "Alert",
          
        },
        {
            id: "clinic3",
            name: "Clinic 3",
            training_type: "NPHMP",
            affiliation: "UCSF",
            region: "Southern",
            status: "Active",
         
        },
      ]);
      return;
    }
  }


  
    