import React from "react";

export default function DescriptionGenerator(field) {
    if (field === "settingLocation") {
        return <React.Fragment>
            <option value="In-patient">In-patient</option>
            <option value="Out-patient">Out-patient</option>
            <option value="Long-term Care">Long-term Care</option>
        </React.Fragment>
    }
    if (field === "settingPopulation") {
        return <React.Fragment>
            <option value="County Behavioral Health - Adult">County Behavioral Health - Adult</option>
            <option value="County Behavioral Health - Child/ Adolescent">County Behavioral Health - Child/ Adolescent</option>
            <option value="Crisis Intervention">Crisis Intervention</option>
            <option value="Homeless Outreach">Homeless Outreach</option>
            <option value="Community Based Organization/ Non-profit">Community Based Organization/ Non-profit</option>
            <option value="FQHC">FQHC</option>
            <option value="VA">VA</option>
            <option value="Jail / Prison - Adult">Jail / Prison - Adult</option>
            <option value="Juvenile Justice">Juvenile Justice</option>
            <option value="School-based K-12">School-based K-12</option>
            <option value="University Student Health">University Student Health</option>
            <option value="Native American Health">Native American Health</option>
            <option value="Women's Health">Women's Health</option>
            <option value="LGBTQIA+">LGBTQIA+</option>
            <option value="HIV">HIV</option>
            <option value="For-profit Agency">For-profit Agency</option>
            <option value="Academic Medical Center">Academic Medical Center</option>
            <option value="Psychiatric Emergency">Psychiatric Emergency</option>
        </React.Fragment>
    }
    if (field === "population") {
        return <React.Fragment>
            <option value="Adult">Adult</option>
            <option value="Child/Adolescent">Child/Adolescent</option>
            <option value="Transitional Age Youth">Transitional Age Youth</option>
            <option value="Older Adult">Older Adult</option>
        </React.Fragment>
    }
    if (field === "visitType") {
        return <React.Fragment>
            <option value="In-Person">In-Person</option>
            <option value="Video Visits">Video Visits</option>
        </React.Fragment>
    }
    if (field === "patientAcuity") {
        return <React.Fragment>
            <option value="Acute Care Emergency">Acute Care Emergency</option>
            <option value="Acute Care In-patient Psychiatry">Acute Care In-patient Psychiatry</option>
            <option value="Acute Care In-patient Consultation Liaison">Acute Care In-patient Consultation Liaison</option>
            <option value="Intensive Out-patient">Intensive Out-patient</option>
            <option value="Partial Hospital Program">Partial Hospital Program</option>
            <option value="Out-patient high volume average &gt;10 patients per day">Out-patient high volume average &gt;10 patients per day</option>
            <option value="Out-patient low volume average &lt;10 patients per day">Out-patient low volume average &lt;10 patients per day</option>
        </React.Fragment>
    }
    if (field === "documentation") {
        return <React.Fragment>
            <option value="Student does not document in the EMR/chart (notes provided to preceptor for input in the EMR/chart)">Student does not document in the EMR/chart (notes provided to preceptor for input in the EMR/chart)</option>
            <option value="Student documents in the EMR, preceptor cosigns">Out-patient</option>
        </React.Fragment>
    }
    if (field === "orders") {
        return <React.Fragment>
            <option value="Student enters orders, preceptor cosigns">Student enters orders, preceptor cosigns</option>
            <option value="Student does not enter orders, preceptor must enter">Student does not enter orders, preceptor must enter</option>
        </React.Fragment>
    }
    if (field === "apptTemplate") {
        return <React.Fragment>
            <option value="Student has a separate template and schedule of patients">Student has a separate template and schedule of patients</option>
            <option value="Student is integrated into preceptor template">Student is integrated into preceptor template</option>
        </React.Fragment>
    }
    return <option value="N/A">N/A</option>
}