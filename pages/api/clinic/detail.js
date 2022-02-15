let clinicPlacementDetail = [
    {
        title: 'Clerance Timeline',
        note: 'Greatly cottage thought fortune no mention he. Of mr certainty arranging am smallness by conveying. Him plate you allow built grave. Sigh sang nay sex high yet door game. She dissimilar was favourable unreserved nay expression contrasted saw. Past her find she like bore pain open. Shy lose need eyes son not shot. Jennings removing are his eat dashwood. Middleton as pretended listening he smallness perceived. Now his but two green spoil drift.'
    },
    {
        title: 'Clerance Requirement',
        note: 'Wrote water woman of heart it total other. By in entirely securing suitable graceful at families improved. Zealously few furniture repulsive was agreeable consisted difficult. Collected breakfast estimable questions in to favourite it. Known he place worth words it as to. Spoke now noise off smart her ready.'
    },
    {
        title: 'Orientation',
        note: 'Behaviour we improving at something to. Evil true high lady roof men had open. To projection considered it precaution an melancholy or. Wound young you thing worse along being ham.'
    },
    {
        title: 'Tips & Tricks',
        note: 'Dissimilar of favourable solicitude if sympathize middletons at. Forfeited up if disposing perfectly in an eagerness perceived necessary. Belonging sir curiosity discovery extremity yet forfeited prevailed own off.'
    },
    {
        title: 'Attire',
        note: 'Travelling by introduced of mr terminated. Knew as miss my high hope quit. In curiosity shameless dependent knowledge up.'
    },
]

let adminInfo = [
    {
        name: "Admin 1",
        position: 'CEO',
        phone: '123-455-6789',
        email: 'jphnny.doe@email.com'
    },
    {
        name: "Admin 2",
        position: 'HR',
        phone: '123-455-6789',
        email: 'johnny.doe@email.com'
    }
]

export default function handler(req, res) {
    console.log(req)
    if (req.method === 'POST') {
        if (req.query.input === 'placement') {
            clinicPlacementDetail = req.body
            // console.log(`After: ${clinicPlacementDetail}`)
            res.status(200).json({ name: "200: HTTPS OK" })
            return
        }

        if (req.query.input === 'addAdmin') {
            adminInfo.push(req.body)
            // console.log(`After: ${adminInfo}`)
            res.status(200).json({ name: "200: HTTPS OK" })
            return
        }
        res.status(400).json({ name: "400: Bad Request" })
    }

    const clinicName = req.query.name;
    if (clinicName === 'clinic1') {
        res.status(200).json(
            {
                site: 'UC Davis',
                phoneNumber: '408-000-1111',
                faxNumber: '123-456-7890',
                addressLine1: '1 Shields Ave',
                addressLine2: null,
                city: 'Davis',
                state: 'CA',
                postal: '95616',
                status: 0,
                adminInfo: adminInfo,
                preceptorInfo: [
                    {
                        name: "Preceptor 1",
                        credential: 'FNP',
                        phone: '123-455-6789',
                        email: 'jphnny.doe@email.com'
                    },
                    {
                        name: "Preceptor 2",
                        credential: 'PMHP',
                        phone: '123-455-6789',
                        email: 'johnny.doe@email.com'
                    }
                ],
                clinicPlacementDetail: clinicPlacementDetail,
                clinicalNotes: [

                ],
                map: {
                    displayUrl: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3120.690806215745!2d-121.77333398432486!3d38.540894979627275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085285671d81bc3%3A0xa9b2b5f9232535d6!2sSol%20at%20West%20Village!5e0!3m2!1sen!2sus!4v1644113659546!5m2!1sen!2sus" width='80%' height='400px' style={{border: 0}} allowfullscreen="" loading="lazy"></iframe>`
                }
            }
        )
        return
    }
    res.status(400).json({ name: 'Bad Request' });
};

// handler.get('/api/clinic/getClinic1', (req, res) => {
//   const genInfo = {
//     pOrg: 'UC Davis Site',
//     initDate: '01/w22/2022',
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