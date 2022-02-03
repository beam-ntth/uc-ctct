export default function handler(req, res) {
    const query = req.query
    // Simulate waiting time
    setTimeout(() => {1000})

    // /api/site
    if (query.length == 0) {
        res.status(200).json(
            { 
                region1: {
                    name: "Northern & Central Region",
                    num_sites: 1
                },
                region2: {
                    name: "Coastal Region",
                    num_sites: 1
                },
                region3: {
                    name: "Southern Region",
                    num_sites: 1
                },
            }
        )
        return;
    }

    // /api/site?region=north
    if (query["region"] == 'north') {
        res.status(200).json(
            { 
                site1: {
                    name: "Site 1",
                    affiliation: "UCSF",
                    num_clinics: 3
                },
                site2: {
                    name: "Site 2",
                    affiliation: "UCSF",
                    num_clinics: 1
                },
                site3: {
                    name: "Site 3",
                    affiliation: "No Affiliation",
                    num_clinics: 2
                },
            }
        )
        return;
    }
    res.status(400).json("400: Bad Request")
}