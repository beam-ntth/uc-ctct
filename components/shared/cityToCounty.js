export const mapCityToCounty = (city_name) => {
    const clean_name = city_name.trim().toLowerCase().replaceAll(" ", "_").replaceAll("-", "_")
    // In the case where the user still hasn't fully filled out the form
    if (city_name == "") {
        return ""
    }
    if (clean_name in mapper) {
        return mapper[clean_name]
    }
    return "undefined"
}

const mapper = {
    alameda: "Alameda",
    albany: "Alameda",
    berkeley: "Alameda",
    dublin: "Alameda",
    emeryville: "Alameda",
    fremont: "Alameda",
    hayward: "Alameda",
    livermore: "Alameda",
    newark: "Alameda",
    oakland: "Alameda",
    piedmont: "Alameda",
    pleasanton: "Alameda",
    san_leandro: "Alameda",
    union_city: "Alameda",
    amador: "Amador",
    ione: "Amador",
    jackson: "Amador",
    plymouth: "Amador",
    sutter_creek: "Amador",
    biggs: "Butte",
    chico: "Butte",
    gridley: "Butte",
    oroville: "Butte",
    paradise: "Butte",
    angels_camp: "Calaveras",
    colusa: "Colusa",
    williams: "Colusa",
    antioch: "Contra Costa",
    brentwood: "Contra Costa",
    clayton: "Contra Costa",
    concord: "Contra Costa",
    danville: "Contra Costa",
    el_cerrito: "Contra Costa",
    hercules: "Contra Costa",
    lafayette: "Contra Costa",
    martinez: "Contra Costa",
    moraga: "Contra Costa",
    oakley: "Contra Costa",
    orinda: "Contra Costa",
    pinole: "Contra Costa",
    pittsburg: "Contra Costa",
    pleasant_hill: "Contra Costa",
    richmond: "Contra Costa",
    san_pablo: "Contra Costa",
    san_ramon: "Contra Costa",
    walnut_creek: "Contra Costa",
    crescent_city: "Del Norte",
    placerville: "El Dorado",
    south_lake_tahoe: "El Dorado",
    adelanto: "San Bernardino",
    agoura_hills: "Los Angeles",
    alhambra: "Los Angeles",
    aliso_viejo: "Orange",
    alturas: "Modoc",
    american_canyon: "Napa",
    anaheim: "Orange",
    anderson: "Shasta",
    apple_valley: "San Bernardino",
    arcadia: "Los Angeles",
    arcata: "Humboldt",
    arroyo_grande: "San Luis Obispo",
    artesia: "Los Angeles",
    arvin: "Kern",
    atascadero: "San Luis Obispo",
    atherton: "San Mateo",
    atwater: "Merced",
    auburn: "Placer",
    avalon: "Los Angeles",
    avenal: "Kings",
    azusa: "Los Angeles",
    bakersfield: "Kern",
    baldwin_park: "Los Angeles",
    banning: "Riverside",
    barstow: "San Bernardino",
    beaumont: "Riverside",
    bell: "Los Angeles",
    bell_gardens: "Los Angeles",
    bellflower: "Los Angeles",
    belmont: "San Mateo",
    belvedere: "Marin",
    benicia: "Solano",
    beverly_hills: "Los Angeles",
    big_bear_lake: "San Bernardino",
    bishop: "Inyo",
    blue_lake: "Humboldt",
    blythe: "Riverside",
    bradbury: "Los Angeles",
    brawley: "Imperial",
    brea: "Orange",
    brisbane: "San Mateo",
    buellton: "Santa Barbara",
    buena_park: "Orange",
    burbank: "Los Angeles",
    burlingame: "San Mateo",
    calabasas: "Los Angeles",
    calexico: "Imperial",
    california_city: "Kern",
    calimesa: "Riverside",
    calipatria: "Imperial",
    calistoga: "Napa",
    camarillo: "Ventura",
    campbell: "Santa Clara",
    canyon_lake: "Riverside",
    capitola: "Santa Cruz",
    carlsbad: "San Diego",
    carmel_by_the_sea: "Monterey",
    carpinteria: "Santa Barbara",
    carson: "Los Angeles",
    cathedral_city: "Riverside",
    ceres: "Stanislaus",
    cerritos: "Los Angeles",
    chino: "San Bernardino",
    chino_hills: "San Bernardino",
    chowchilla: "Madera",
    chula_vista: "San Diego",
    citrus_heights: "Sacramento",
    claremont: "Los Angeles",
    clearlake: "Lake",
    cloverdale: "Sonoma",
    clovis: "Fresno",
    coachella: "Riverside",
    coalinga: "Fresno",
    colfax: "Placer",
    colma: "San Mateo",
    colton: "San Bernardino",
    commerce: "Los Angeles",
    compton: "Los Angeles",
    corcoran: "Kings",
    corning: "Tehama",
    corona: "Riverside",
    coronado: "San Diego",
    corte_madera: "Marin",
    costa_mesa: "Orange",
    cotati: "Sonoma",
    covina: "Los Angeles",
    cudahy: "Los Angeles",
    culver_city: "Los Angeles",
    cupertino: "Santa Clara",
    cypress: "Orange",
    daly_city: "San Mateo",
    dana_point: "Orange",
    davis: "Yolo",
    del_mar: "San Diego",
    del_rey_oaks: "Monterey",
    delano: "Kern",
    desert_hot_springs: "Riverside",
    diamond_bar: "Los Angeles",
    dinuba: "Tulare",
    dixon: "Solano",
    dorris: "Siskiyou",
    dos_palos: "Merced",
    downey: "Los Angeles",
    duarte: "Los Angeles",
    dunsmuir: "Siskiyou",
    east_palo_alto: "San Mateo",
    eastvale: "Riverside",
    el_cajon: "San Diego",
    el_centro: "Imperial",
    el_granada: "San Mateo",
    el_monte: "Los Angeles",
    el_paso_de_robles: "San Luis Obispo",
    el_segundo: "Los Angeles",
    elk_grove: "Sacramento",
    encinitas: "San Diego",
    escalon: "San Joaquin",
    escondido: "San Diego",
    etna: "Siskiyou",
    eureka: "Humboldt",
    exeter: "Tulare",
    fairfax: "Marin",
    fairfield: "Solano",
    fallbrook: "San Diego",
    farmersville: "Tulare",
    ferndale: "Humboldt",
    fillmore: "Ventura",
    firebaugh: "Fresno",
    folsom: "Sacramento",
    fontana: "San Bernardino",
    fort_bragg: "Mendocino",
    fort_jones: "Siskiyou",
    fortuna: "Humboldt",
    foster_city: "San Mateo",
    fountain_valley: "Orange",
    fowler: "Fresno",
    fresno: "Fresno",
    fullerton: "Orange",
    galt: "Sacramento",
    garden_grove: "Orange",
    gardena: "Los Angeles",
    gilroy: "Santa Clara",
    glendale: "Los Angeles",
    glendora: "Los Angeles",
    goleta: "Santa Barbara",
    gonzales: "Monterey",
    grand_terrace: "San Bernardino",
    grass_valley: "Nevada",
    greenfield: "Monterey",
    grover_beach: "San Luis Obispo",
    guadalupe: "Santa Barbara",
    gustine: "Merced",
    half_moon_bay: "San Mateo",
    hanford: "Kings",
    hawaiian_gardens: "Los Angeles",
    hawthorne: "Los Angeles",
    healdsburg: "Sonoma",
    hemet: "Riverside",
    hermosa_beach: "Los Angeles",
    hesperia: "San Bernardino",
    hidden_hills: "Los Angeles",
    highland: "San Bernardino",
    hillsborough: "San Mateo",
    hollister: "San Benito",
    holtville: "Imperial",
    hughson: "Stanislaus",
    huntington_beach: "Orange",
    huntington_park: "Los Angeles",
    huron: "Fresno",
    imperial: "Imperial",
    imperial_beach: "San Diego",
    indian_wells: "Riverside",
    indio: "Riverside",
    industry: "Los Angeles",
    inglewood: "Los Angeles",
    inverness: "Marin",
    irvine: "Orange",
    irwindale: "Los Angeles",
    isleton: "Sacramento",
    jurupa_valley: "Riverside",
    kerman: "Fresno",
    king_city: "Monterey",
    kingsburg: "Fresno",
    la_canada_flintridge: "Los Angeles",
    la_habra: "Orange",
    la_habra_heights: "Los Angeles",
    la_mesa: "San Diego",
    la_mirada: "Los Angeles",
    la_palma: "Orange",
    la_puente: "Los Angeles",
    la_quinta: "Riverside",
    la_verne: "Los Angeles",
    laguna_beach: "Orange",
    laguna_hills: "Orange",
    laguna_niguel: "Orange",
    laguna_woods: "Orange",
    lake_elsinore: "Riverside",
    lake_forest: "Orange",
    lakeport: "Lake",
    lakewood: "Los Angeles",
    lancaster: "Los Angeles",
    larkspur: "Marin",
    lathrop: "San Joaquin",
    lawndale: "Los Angeles",
    lemon_grove: "San Diego",
    lemoore: "Kings",
    lincoln: "Placer",
    lindsay: "Tulare",
    live_oak: "Sutter",
    livingston: "Merced",
    lodi: "San Joaquin",
    loma_linda: "San Bernardino",
    lomita: "Los Angeles",
    lompoc: "Santa Barbara",
    long_beach: "Los Angeles",
    loomis: "Placer",
    los_alamitos: "Orange",
    los_altos: "Santa Clara",
    los_altos_hills: "Santa Clara",
    los_angeles: "Los Angeles",
    los_banos: "Merced",
    los_gatos: "Santa Clara",
    loyalton: "Sierra",
    lynwood: "Los Angeles",
    madera: "Madera",
    malibu: "Los Angeles",
    mammoth_lakes: "Mono",
    manhattan_beach: "Los Angeles",
    manteca: "San Joaquin",
    maricopa: "Kern",
    marina: "Monterey",
    marysville: "Yuba",
    maywood: "Los Angeles",
    mcfarland: "Kern",
    mendota: "Fresno",
    menifee: "Riverside",
    menlo_park: "San Mateo",
    merced: "Merced",
    mill_valley: "Marin",
    millbrae: "San Mateo",
    milpitas: "Santa Clara",
    mission_viejo: "Orange",
    modesto: "Stanislaus",
    monrovia: "Los Angeles",
    montague: "Siskiyou",
    montclair: "San Bernardino",
    monte_sereno: "Santa Clara",
    montebello: "Los Angeles",
    monterey: "Monterey",
    monterey_park: "Los Angeles",
    moorpark: "Ventura",
    moreno_valley: "Riverside",
    morgan_hill: "Santa Clara",
    morro_bay: "San Luis Obispo",
    mount_shasta: "Siskiyou",
    mountain_view: "Santa Clara",
    murrieta: "Riverside",
    napa: "Napa",
    national_city: "San Diego",
    needles: "San Bernardino",
    nevada_city: "Nevada",
    newman: "Stanislaus",
    newport_beach: "Orange",
    no_cities: "Trinity",
    norco: "Riverside",
    norwalk: "Los Angeles",
    novato: "Marin",
    oakdale: "Stanislaus",
    oceanside: "San Diego",
    ojai: "Ventura",
    ontario: "San Bernardino",
    orange: "Orange",
    orange_cove: "Fresno",
    orland: "Glenn",
    oxnard: "Ventura",
    pacific_grove: "Monterey",
    pacific_palisades: "Los Angeles",
    pacifica: "San Mateo",
    palm_desert: "Riverside",
    palm_springs: "Riverside",
    palmdale: "Los Angeles",
    palo_alto: "Santa Clara",
    palos_verdes_estates: "Los Angeles",
    paramount: "Los Angeles",
    parlier: "Fresno",
    pasadena: "Los Angeles",
    patterson: "Stanislaus",
    perris: "Riverside",
    petaluma: "Sonoma",
    pico_rivera: "Los Angeles",
    pismo_beach: "San Luis Obispo",
    placentia: "Orange",
    point_arena: "Mendocino",
    pomona: "Los Angeles",
    port_hueneme: "Ventura",
    porter_ranch: "Los Angeles",
    porterville: "Tulare",
    portola: "Plumas",
    portola_valley: "San Mateo",
    poway: "San Diego",
    rancho_cordova: "Sacramento",
    rancho_cucamonga: "San Bernardino",
    rancho_mirage: "Riverside",
    rancho_palos_verdes: "Los Angeles",
    rancho_santa_margarita: "Orange",
    red_bluff: "Tehama",
    redding: "Shasta",
    redlands: "San Bernardino",
    redondo_beach: "Los Angeles",
    redwood_city: "San Mateo",
    reedley: "Fresno",
    rialto: "San Bernardino",
    ridgecrest: "Kern",
    rio_dell: "Humboldt",
    rio_vista: "Solano",
    ripon: "San Joaquin",
    riverbank: "Stanislaus",
    riverside: "Riverside",
    rocklin: "Placer",
    rohnert_park: "Sonoma",
    rolling_hills: "Los Angeles",
    rolling_hills_estates: "Los Angeles",
    rosemead: "Los Angeles",
    roseville: "Placer",
    ross: "Marin",
    sacramento: "Sacramento",
    salinas: "Monterey",
    san_anselmo: "Marin",
    san_bernardino: "San Bernardino",
    san_bruno: "San Mateo",
    san_carlos: "San Mateo",
    san_clemente: "Orange",
    san_diego: "San Diego",
    san_dimas: "Los Angeles",
    san_fernando: "Los Angeles",
    san_francisco: "San Francisco",
    san_gabriel: "Los Angeles",
    san_jacinto: "Riverside",
    san_joaquin: "Fresno",
    san_jose: "Santa Clara",
    san_juan_bautista: "San Benito",
    san_juan_capistrano: "Orange",
    san_luis_obispo: "San Luis Obispo",
    san_marcos: "San Diego",
    san_marino: "Los Angeles",
    san_mateo: "San Mateo",
    san_rafael: "Marin",
    sand_city: "Monterey",
    sanger: "Fresno",
    santa_ana: "Orange",
    santa_barbara: "Santa Barbara",
    santa_clara: "Santa Clara",
    santa_clarita: "Los Angeles",
    santa_cruz: "Santa Cruz",
    santa_fe_springs: "Los Angeles",
    santa_maria: "Santa Barbara",
    santa_monica: "Los Angeles",
    santa_paula: "Ventura",
    santa_rosa: "Sonoma",
    santee: "San Diego",
    saratoga: "Santa Clara",
    sausalito: "Marin",
    scotts_valley: "Santa Cruz",
    seal_beach: "Orange",
    seaside: "Monterey",
    sebastopol: "Sonoma",
    selma: "Fresno",
    shafter: "Kern",
    shasta_lake: "Shasta",
    sierra_madre: "Los Angeles",
    signal_hill: "Los Angeles",
    simi_valley: "Ventura",
    solana_beach: "San Diego",
    soledad: "Monterey",
    solvang: "Santa Barbara",
    sonoma: "Sonoma",
    sonora: "Tuolumne",
    south_el_monte: "Los Angeles",
    south_gate: "Los Angeles",
    south_pasadena: "Los Angeles",
    south_san_francisco: "San Mateo",
    st_helena: "Napa",
    stanton: "Orange",
    stockton: "San Joaquin",
    suisun_city: "Solano",
    sunnyvale: "Santa Clara",
    susanville: "Lassen",
    taft: "Kern",
    tehachapi: "Kern",
    tehama: "Tehama",
    temecula: "Riverside",
    temple_city: "Los Angeles",
    thousand_oaks: "Ventura",
    tiburon: "Marin",
    topanga: "Los Angeles",
    torrance: "Los Angeles",
    tracy: "San Joaquin",
    trinidad: "Humboldt",
    truckee: "Nevada",
    tulare: "Tulare",
    tulelake: "Siskiyou",
    turlock: "Stanislaus",
    tustin: "Orange",
    twentynine_palms: "San Bernardino",
    ukiah: "Mendocino",
    upland: "San Bernardino",
    vacaville: "Solano",
    vallejo: "Solano",
    ventura: "Ventura",
    vernon: "Los Angeles",
    victorville: "San Bernardino",
    villa_park: "Orange",
    visalia: "Tulare",
    vista: "San Diego",
    walnut: "Los Angeles",
    wasco: "Kern",
    waterford: "Stanislaus",
    watsonville: "Santa Cruz",
    weed: "Siskiyou",
    west_covina: "Los Angeles",
    west_hollywood: "Los Angeles",
    west_hills: "Los Angeles",
    west_sacramento: "Yolo",
    westlake_village: "Los Angeles",
    westminster: "Orange",
    westmorland: "Imperial",
    wheatland: "Yuba",
    whittier: "Los Angeles",
    wildomar: "Riverside",
    willits: "Mendocino",
    willows: "Glenn",
    windsor: "Sonoma",
    winters: "Yolo",
    woodlake: "Tulare",
    woodland: "Yolo",
    woodside: "San Mateo",
    yorba_linda: "Orange",
    yountville: "Napa",
    yreka: "Siskiyou",
    yuba_city: "Sutter",
    yucaipa: "San Bernardino",
    yucca_valley: "San Bernardino"
}