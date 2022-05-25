export const mapCountyToLocationAffi = (county_name) => {
    if (county_name in mapper) {
        return mapper[county_name]
    }
    return "UC Davis"
}

const mapper = {	
    "Del Norte": "UC San Francisco",
    "Humboldt": "UC San Francisco",
    "Mendocino": "UC San Francisco",
    "Sonoma": "UC San Francisco",
    "Marin": "UC San Francisco",
    "Contra Costa": "UC San Francisco",
    "San Francisco": "UC San Francisco",
    "San Mateo": "UC San Francisco",
    "Santa Cruz": "UC San Francisco",
    "Monterey": "UC San Francisco",
    "Santa Clara": "UC San Francisco",
    "Alameda": "UC San Francisco",
    "Kern": "UC Los Angeles",
    "Los Angeles": "UC Los Angeles",
    "Santa Barbara": "UC Los Angeles",
    "San Luis Obispo": "UC Los Angeles",
    "Ventura": "UC Los Angeles",	
    "Imperial": "UC Irvine",	
    "Orange": "UC Irvine",
    "Riverside": "UC Irvine",
    "San Bernardino": "UC Irvine",
    "San Diego": "UC Irvine",
    "San Mateo": "UC San Francisco"
}