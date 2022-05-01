function capitalizeText(text) {
    return `${text.substring(0, 1).toUpperCase()}${text.substring(1, text.length).toLowerCase()}`
}

function cleanName(text) {
    return text.split(" ").map(x => capitalizeText(x)).join(" ")
}

export function parseStudentData(student) {
    const data = student.values
    let returnResult = {}

    // Add other languages field
    const languageQuestions = ["QID64_1", "QID64_2", "QID64_3"]
    let otherLangs = []
    for (let i = 0; i < languageQuestions.length; i++) {
        if (languageQuestions[i] in data) {
            otherLangs.push(capitalizeText(data[languageQuestions[i]]))
        }
    }
    returnResult.otherLanguages = otherLangs

    // Add preferred location
    const preferredLocation = {
        firstCity: cleanName(data.QID62_1),
        firstCounty: cleanName(data.QID62_2),
        secondCity: cleanName(data.QID63_1),
        secondCounty: cleanName(data.QID63_2)
    }
    returnResult.preferredLocation = preferredLocation

    // Add top-10 practice setting
    const settingMap = {
        QID45_1: "In-patient Acute Care",
        QID45_2: "In-patient Consult Liaison",
        QID45_3: "In-patient Long Term Care",
        QID45_4: "Partial Hospital Program",
        QID45_5: "Acute Stabilization Unit < 23 Hours",
        QID45_6: "Out-patient Community Mental Health",
        QID45_7: "Out-patient Integrated Care Setting (Primary or Specialty Care With Psychiatry)",
        QID45_8: "Out-patient Private or For-profit Practice",
        QID45_9: "Out-patient Urgent Care",
        QID45_10: "Intensive Outpatient",
    }
    let practiceSetting = Array(10)
    for (let i = 0; i < practiceSetting.length; i++) {
        practiceSetting[data[`QID45_${i+1}`]-1] = settingMap[`QID45_${i+1}`]
    }
    returnResult.practiceSetting = practiceSetting

    // Add top-15 patient population
    const patientPopulationMap = {
        QID47_1: "Mild / Moderate Mental Illness",
        QID47_2: "Severe and Persistent Mental Illness",
        QID47_3: "Substance Use / Addiction",
        QID47_4: "Homeless",
        QID47_5: "Adult Jail / Prison",
        QID47_6: "Juvenile Justice",
        QID47_7: "HIV",
        QID47_8: "LGBTQIA+",
        QID47_9: "Native American Health",
        QID47_10: "Private or For Profit Clinic",
        QID47_11: "Public Mental Health",
        QID47_12: "School-based K-12",
        QID47_13: "University Student Health",
        QID47_14: "Veterans Health Administration",
        QID47_15: "Women's Health",
    }
    let patientPopulation = Array(15)
    for (let i = 0; i < patientPopulation.length; i++) {
        patientPopulation[data[`QID47_${i+1}`]-1] = patientPopulationMap[`QID47_${i+1}`]
    }
    returnResult.patientPopulation = patientPopulation

    const ageGroupMap = {
        QID46_1: "Adult",
        QID46_2: "Transitional Age Youth",
        QID46_3: "Child / Adolescent",
        QID46_4: "Older Adult",
        QID46_5: "Across The Lifespan",
    }
    let ageGroup = Array(5)
    for (let i = 0; i < ageGroup.length; i++) {
        ageGroup[data[`QID46_${i+1}`]-1] = ageGroupMap[`QID46_${i+1}`]
    }
    returnResult.ageGroup = ageGroup

    returnResult.currentCert = data.QID54_1
    returnResult.primaryCert = data.QID54_4
    returnResult.secondaryCert = data.QID54_9 ? data.QID54_9 : ""

    const aprnMapping = ["0-2 years of experience", "3-5 years of experience", "6-10 years of experience", "11+ years of experience"]
    returnResult.aprnWorkDuration = aprnMapping[parseInt(data.QID52)-1]
    
    const patientVolMap = ["Low volume <5 patients per 8-hour day", "Low-Moderate volume 5-12 patients per 8-hour day", "Moderate volume 13-19 patients per day", "High volume >20 patients per day"]
    returnResult.avgPatientVol = patientVolMap[parseInt(data.QID50)-1]

    const planWorkMap = ["I plan to work full time", "I plan to work 32 hours", "I plan to work 24 hours", "I plan to work less than 16 hours", "I do not plan to work"]
    returnResult.planToWork = planWorkMap[parseInt(data.QID55)-1]

    const daysToWork = [
        "I am flexible and can be available any days of the week (MON-FRI)",
        "I am available on weekends (SAT-SUN)",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ]
    const daysAvailable = data.QID65.map(x => daysToWork[parseInt(x)-1]).join(", ")
    returnResult.daysAvailable = daysAvailable

    const planAfterGraduateMap = [
        "I plan to stay in my current job and role",
        "I plan to stay in my current job with an expanded role to include PMHNP practice",
        "I plan to stay in my current job and take on a totally new role as a PMHNP",
        "I plan to take on a 2nd job as a PMHNP",
        "I plan to leave my current job and role to become a PMHNP",
        "I plan to start a private practice PMHNP",
        "I don't know what I am going to do"
    ]
    const planAfterGraduate = data.QID69.map(x => planAfterGraduateMap[parseInt(x)-1]).join(", ")
    data.QID69_8_TEXT ? `${planAfterGraduate}, ${data.QID69_8_TEXT}` : null
    returnResult.planAfterGraduate = planAfterGraduate

    returnResult.isWorkingAtMentalHealth = data.QID66 == 2 ? "Yes" : "No"
    if (data.QID67) {
        let exp = []
        for (let i = 0; i < data.QID67.length; i++) {
            if (parseInt(data.QID67[i]) == 1) {
                exp.push(`Work at: ${data.QID67_1_TEXT}`)
            } else if (parseInt(data.QID67[i]) == 2) {
                exp.push(`Role: ${data.QID67_2_TEXT}`)
            } else if (parseInt(data.QID67[i]) == 3) {
                exp.push(`For Duration: ${data.QID67_3_TEXT}`)
            }
        }
        returnResult.mentalHealthExperience = exp.join(" | ")
    }

    const experienceMap = ["No Experience", "Some Experience", "Lots of Experience"]
    let mentalExperienceLevel = {
        depression: experienceMap[parseInt(data.QID49_1)-1],
        anxiety: experienceMap[parseInt(data.QID49_3)-1],
        bipolarDisorder: experienceMap[parseInt(data.QID49_2)-1],
        eatingDisorders: experienceMap[parseInt(data.QID49_4)-1],
        adhd: experienceMap[parseInt(data.QID49_5)-1],
        schizophrenia: experienceMap[parseInt(data.QID49_6)-1],
        personalityDisorders: experienceMap[parseInt(data.QID49_7)-1],
    }
    if (data.QID49_8) {
        mentalExperienceLevel.other = data.QID49_8_TEXT
    }
    returnResult.mentalExperienceLevel = mentalExperienceLevel

    const facilitatingMap = {
        "1": "No Experience",
        "4": "Some Experience",
        "3": "Lots of Experience"
    }
    returnResult.experienceFacilitatingGroup = facilitatingMap[data.QID57]

    returnResult.otherExperience = data.QID72_TEXT ? data.QID72_TEXT : "None"
    returnResult.hasPreferredClinic = parseInt(data.QID35) == 1 ? "Yes" : "No"
    if (parseInt(data.QID35) == 1) {
        returnResult.preferredClinic = {
            clinicName: data.QID68_1,
            poc: data.QID68_2,
            address: data.QID68_3,
            phone: data.QID68_4,
            email: data.QID68_5,
            other: data.QID68_6
        } 
    }

    returnResult.otherFacts = data.QID34_TEXT ? data.QID34_TEXT : "No"
    return returnResult
}