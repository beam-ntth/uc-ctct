export default function handler(req, res) {
  const query = req.query;
  // Simulate waiting time
  setTimeout(() => {
    1000;
  });

  // /api/site/region
  if (Object.keys(query).length === 0) {
    res.status(200).json([
      {
        id: "north",
        name: "Northern & Central Region",
        num_sites: 1,
      },
      {
        id: "coastal",
        name: "Coastal Region",
        num_sites: 1,
      },
      {
        id: "south",
        name: "Southern Region",
        num_sites: 1,
      },
    ]);
    return;
  }

  // /api/site/region?location=north

  if (query["location"] == "north") {
    res.status(200).json([
      {
        id: "site1",
        name: "Site 1",
        affiliation: "UCSF",
        num_clinics: 3,
        status: 0
      },
      {
        id: "site2",
        name: "Site 2",
        affiliation: "UCSF",
        num_clinics: 1,
        status: 1
      },
      {
        id: "site3",
        name: "Site 3",
        affiliation: "No Affiliation",
        num_clinics: 2,
        status: 2
      },
    ]);
    return;
  }
  // /api/site/region?location=coastal
  if (query["location"] == "coastal") {
    res.status(200).json([
      {
        id: "site1",
        name: "Site 3",
        affiliation: "UCSF",
        num_clinics: 3,
        status: 0
      },
      {
        id: "site2",
        name: "Site 4",
        affiliation: "UCSF",
        num_clinics: 1,
        status: 1
      },
      {
        id: "site3",
        name: "Site 5",
        affiliation: "No Affiliation",
        num_clinics: 2,
        status: 2
      },
    ]);
    return;
  }
  // /api/site/region?location=south
  if (query["location"] == "south") {
    res.status(200).json([
      {
        id: "site1",
        name: "Site 6",
        affiliation: "UCSF",
        num_clinics: 3,
        status: 0
      },
      {
        id: "site2",
        name: "Site 6",
        affiliation: "UCSF",
        num_clinics: 1,
        status: 1
      },
      {
        id: "site3",
        name: "Site 6",
        affiliation: "No Affiliation",
        num_clinics: 2,
        status: 2
      },
    ]);
    return;
  }
  res.status(400).json("400: Bad Request");
}
