export default function handler(req, res) {
    const query = req.query
    // Simulate waiting time
    setTimeout(() => {500})
    if (query["region"] = 'all') {
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
        return
    }
    res.status(404).json("404: Not Found")
    return
}