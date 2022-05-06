import styles from './DisplayProfile.module.css'
import { IoArrowBack } from "react-icons/io5";
import { removeStudentFromPreceptor } from '../../api-lib/azure/azureOps';
import React from 'react';

export default function StudentPreview(props) {
    const student = props.data
    const surveyData = student.survey.data
    const clinic_id_1 = student.assignment.primary_choice.clinic_id
    const precep_id_1 = student.assignment.primary_choice.preceptor_id
    const date_assigned_1 = student.assignment.primary_choice.date_assigned

    const clinic_id_2 = student.assignment.secondary_choice.clinic_id
    const precep_id_2 = student.assignment.secondary_choice.preceptor_id
    const date_assigned_2 = student.assignment.secondary_choice.date_assigned

    const clinic_id_3 = student.assignment.tertiary_choice.clinic_id
    const precep_id_3 = student.assignment.tertiary_choice.preceptor_id
    const date_assigned_3 = student.assignment.tertiary_choice.date_assigned

    const getAssignedClinic = (id) => {
        return props.clinic_data.filter(x => x.id == id)[0]
    }

    const getAssignedPreceptor = (id) => {
        return props.preceptor_data.filter(x => x.id == id)[0]
    }

    const removeAssignment = async(clinic_id, preceptor_id, choiceRank) => {
        props.setUpdating(true)
        await removeStudentFromPreceptor(student.id, clinic_id, preceptor_id, choiceRank)
        props.reload()
        props.setUpdating(false)
        return
    }

    return (
        <div className={styles.data}>
            <div className={ styles.goBackBar }>
                <div className={ styles.goBackBtn } onClick={ () => { props.setMatching(null); props.setStudent(null) } } >
                    <IoArrowBack size={20} style={{ marginRight: '1rem' }} />
                    Back to selection
                </div>
            </div>
            <div className={styles.bioTitle}>
                <h4>General Profile Information</h4>
            </div>
            <div className={styles.bioTitle}>
                <div className={styles.profileInfo}>
                    <div className={styles.infoRow}>
                        <p style={{ marginRight: '1.5rem' }}><strong>Name:</strong> {student.firstName} {student.middleName} {student.lastName}</p>
                        <p style={{ marginRight: '1.5rem' }}><strong>Campus:</strong> {student.location_affiliation}</p>
                        <p><strong>County:</strong> {student.county}</p>
                    </div>
                    <div className={styles.infoRow}>
                        <p style={{ marginRight: '1.5rem' }}><strong>Address:</strong> { `${student.addressLine1}, ${student.addressLine2 == "" ? "" : student.addressLine2 + ', '}${student.city}, ${student.state} ${student.postal}` }</p>
                        <p><strong>Phone Number:</strong> ({student.phoneNumber.substring(0, 3)}) {student.phoneNumber.substring(3, 6)}-{student.phoneNumber.substring(6, 10)}</p>
                    </div>
                    <div className={styles.infoRow}>
                        <p style={{ marginRight: '1.5rem' }}><strong>UC Email:</strong> {student.affiliated_email ? student.affiliated_email : "Not yet assigned"}</p>
                        <p style={{ marginRight: '1.5rem' }}><strong>US Citizen:</strong> {student.usCitizen}</p>
                    </div>
                </div>
            </div>
            <div className={styles.bioTitle}>
                <h4>Survey Data</h4>
            </div>

            {
                surveyData.homeEmail ?
                <div className={styles.bioTitle}>
                    <div className={styles.profileInfo}>
                        <div className={styles.infoRow}>
                            <p style={{ marginRight: '1.5rem' }}><strong>Other Language(s) Spoken:</strong> {surveyData.otherLanguages.join(", ")}</p>
                        </div>
                        <div className={styles.infoRow}>
                            <p style={{ marginRight: '1.5rem' }}><strong>Preferred Location (Primary):</strong> {`${surveyData.preferredLocation.firstCity}, ${surveyData.preferredLocation.firstCounty}`}</p>
                        </div>
                        <div className={styles.infoRow}>
                            <p><strong>Preferred Location (Secondary):</strong> {`${surveyData.preferredLocation.secondCity}, ${surveyData.preferredLocation.secondCounty}`}</p>
                        </div>
                        <div className={styles.infoRow}>
                            <p><strong>Top-3 Practice Setting:</strong> {surveyData.practiceSetting.slice(0, 3).join(", ")}</p>
                        </div>
                        <div className={styles.infoRow}>
                            <p><strong>Top-3 Patient Population:</strong> {surveyData.patientPopulation.slice(0, 3).join(", ")}</p>
                        </div>
                        <div className={styles.infoRow}>
                            <p><strong>Top-3 Age Group:</strong> {surveyData.ageGroup.slice(0, 3).join(", ")}</p>
                        </div>
                        <div className={styles.infoRow}>
                            <p style={{ marginRight: '1.5rem' }}><strong>Current Certification:</strong> {surveyData.currentCert}</p>
                            <p style={{ marginRight: '1.5rem' }}><strong>Primary Clinic Certification:</strong> {surveyData.primaryCert}</p>
                            {surveyData.secondaryCert ? <p><strong>Secondary Clinic Certification:</strong> {surveyData.secondaryCert}</p> : null}
                        </div>
                        <div className={styles.infoRow}>
                            <p><strong>APRN Years of Experience:</strong> {surveyData.aprnWorkDuration}</p>
                        </div>
                        <div className={styles.infoRow}>
                            <p><strong>Average Patient Volume:</strong> {surveyData.avgPatientVol}</p>
                        </div>
                        <div className={styles.infoRow}>
                            <p><strong>PMHNP Time Commitment:</strong> {surveyData.planToWork}</p>
                        </div>
                        <div className={styles.infoRow}>
                            <p><strong>Availability:</strong> {surveyData.daysAvailable}</p>
                        </div>
                        <div className={styles.infoRow}>
                            <p><strong>Plans After Graduation:</strong> {surveyData.planAfterGraduate}</p>
                        </div>
                        <div className={styles.infoRow}>
                            <p><strong>Current Working at Mental Health Facility:</strong> {surveyData.isWorkingAtMentalHealth}</p>
                        </div>
                        <div className={styles.infoRow}>
                            <p><strong style={{ textDecoration: 'underline' }}>Experience Working With</strong></p>
                        </div>
                        <div className={styles.infoRow}>
                            <p style={{ marginRight: '1.5rem' }}><strong>Depression:</strong> {surveyData.mentalExperienceLevel.depression}</p>
                            <p><strong>Anxiety:</strong> {surveyData.mentalExperienceLevel.anxiety}</p>
                        </div>
                        <div className={styles.infoRow}>
                            <p style={{ marginRight: '1.5rem' }}><strong>Bipolar Disorder:</strong> {surveyData.mentalExperienceLevel.bipolarDisorder}</p>
                            <p><strong>Eating Disorder:</strong> {surveyData.mentalExperienceLevel.eatingDisorders}</p>
                        </div>
                        <div className={styles.infoRow}>
                            <p style={{ marginRight: '1.5rem' }}><strong>ADHD:</strong> {surveyData.mentalExperienceLevel.adhd}</p>
                            <p><strong>Schizophrenia:</strong> {surveyData.mentalExperienceLevel.schizophrenia}</p>
                        </div>
                        <div className={styles.infoRow}>
                            <p><strong>Personality Disorder:</strong> {surveyData.mentalExperienceLevel.personalityDisorders}</p>
                        </div>
                        <div className={styles.infoRow}>
                            <p><strong>Other Work Experience:</strong> {surveyData.otherExperience}</p>
                        </div>
                        { surveyData.hasPreferredClinic == "Yes" ?
                        <React.Fragment>
                            <div className={styles.infoRow}>
                                <p style={{ textDecoration: 'underline' }}><strong>Preferred Clinic</strong></p>
                            </div>
                            <div className={styles.infoRow}>
                                <p style={{ marginRight: '1.5rem' }}><strong>Clinic Name:</strong> {surveyData.preferredClinic.clinicName}</p>
                            </div>
                            <div className={styles.infoRow}>
                                <p style={{ marginRight: '1.5rem' }}><strong>Address:</strong> {surveyData.preferredClinic.address}</p>
                            </div>
                            <div className={styles.infoRow}>
                                <p style={{ marginRight: '1.5rem' }}><strong>Point of Contact:</strong> {surveyData.preferredClinic.poc}</p>
                                <p style={{ marginRight: '1.5rem' }}><strong>Phone Number:</strong> {surveyData.preferredClinic.phone}</p>
                                <p><strong>Email:</strong> {surveyData.preferredClinic.email}</p>
                            </div>
                        </React.Fragment>
                        : null }
                        <div className={styles.infoRow}>
                            <p><strong>Other Interesting Facts:</strong> {surveyData.otherFacts}</p>
                        </div>
                    </div>
                </div>
                :
                <div className={ styles.noResponse }>
                    Student still hasn't responded to the survey
                </div>
            }
            <div className={ styles.bioTitle }>
            <h4>{student.firstName} {student.lastName}'s Clinical Placement</h4>
            </div>
            <div className={ styles.choice }>
                <div className={ styles.choiceTitle }>
                    <h4>Primary Choice</h4>
                    {clinic_id_1 ? <div className={ styles.unassignBtn } onClick={() => removeAssignment(clinic_id_1, precep_id_1, "Primary")}>Unassign</div> : null}
                </div>
                <p><strong>Clinic: </strong>{ clinic_id_1 == "" ? 'Unassigned' : getAssignedClinic(clinic_id_1).name }</p>
                <p><strong>Preceptor: </strong>{ precep_id_1 == "" ? 'Unassigned' : `${getAssignedPreceptor(precep_id_1).firstname} ${getAssignedPreceptor(precep_id_1).lastname}` }</p>
                <p><strong>Date Assigned: </strong>{ date_assigned_1 == "" ? 'Unknown' : date_assigned_1 }</p>
            </div>
            <div className={ styles.choice }>
                <div className={ styles.choiceTitle }>
                    <h4>Secondary Choice</h4>
                    {clinic_id_2 ? <div className={ styles.unassignBtn } onClick={() => removeAssignment(clinic_id_2, precep_id_2, "Secondary")}>Unassign</div> : null}
                </div>
                <p><strong>Clinic: </strong>{ clinic_id_2 == "" ? 'Unassigned' : getAssignedClinic(clinic_id_2).name }</p>
                <p><strong>Preceptor: </strong>{ precep_id_2 == "" ? 'Unassigned' : `${getAssignedPreceptor(precep_id_2).firstname} ${getAssignedPreceptor(precep_id_2).lastname}` }</p>
                <p><strong>Date Assigned: </strong>{ date_assigned_2 == "" ? 'Unknown' : date_assigned_2 }</p>
            </div>
            <div className={ styles.choice } style={{ marginBottom: '2rem' }}>
                <div className={ styles.choiceTitle }>
                    <h4>Tertiary Choice</h4>
                    {clinic_id_3 ? <div className={ styles.unassignBtn } onClick={() => removeAssignment(clinic_id_3, precep_id_3, "Tertiary")}>Unassign</div> : null}
                </div>
                <p><strong>Clinic: </strong>{ clinic_id_3 == "" ? 'Unassigned' : getAssignedClinic(clinic_id_3).name }</p>
                <p><strong>Preceptor: </strong>{ precep_id_3 == "" ? 'Unassigned' : `${getAssignedPreceptor(precep_id_2).firstname} ${getAssignedPreceptor(precep_id_2).lastname}` }</p>
                <p><strong>Date Assigned: </strong>{ date_assigned_3 == "" ? 'Unknown' : date_assigned_3 }</p>
            </div>
        </div>
    )
}