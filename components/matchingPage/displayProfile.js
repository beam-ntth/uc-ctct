import styles from './DisplayProfile.module.css'
import { IoArrowBack } from "react-icons/io5";

export default function StudentPreview(props) {
    const student = props.data
    return (
        <div className={styles.data}>
            <div className={ styles.goBackBar }>
                <div className={ styles.goBackBtn } onClick={ () => props.setMatching(null) } >
                    <IoArrowBack size={20} style={{ marginRight: '1rem' }} />
                    Back to selection
                </div>
            </div>
            <div className={styles.bioTitle}>
            <h4>General Profile Information</h4>
            </div>
            <div className={styles.bioTitle}>
            {/* <div className={styles.profileImg}>
                <img src="/asset/images/user-image.png" />
            </div> */}
            <div className={styles.profileInfo}>
                <div className={styles.infoRow}>
                <p style={{ marginRight: '2.5rem' }}><strong>Name:</strong> {student.firstName} {student.middleName} {student.lastName}</p>
                <p><strong>Date of Birth:</strong> {student.dob}</p>
                </div>
                <div className={styles.infoRow}>
                <p style={{ marginRight: '2.5rem' }}><strong>Address:</strong> { `${student.addressLine1}, ${student.addressLine2 == "" ? "" : student.addressLine2 + ', '}${student.city}, ${student.state} ${student.postal}` }</p>
                <p><strong>Ethnicity:</strong> {student.ethnic}</p>
                </div>
                <div className={styles.infoRow}>
                <p style={{ marginRight: '2.5rem' }}><strong>Sexual Orientation:</strong> {student.sex}</p>
                <p><strong>Gender Preference:</strong> {student.gender}</p>
                </div>
                <div className={styles.infoRow}>
                <p style={{ marginRight: '2.5rem' }}><strong>Phone Number:</strong> ({student.phoneNumber.substring(0, 3)}) {student.phoneNumber.substring(3, 6)}-{student.phoneNumber.substring(6, 10)}</p>
                <p><strong>Email:</strong> {student.email}</p>
                </div>
                <div className={styles.infoRow}>
                <p style={{ marginRight: '2.5rem' }}><strong>Previously Served in Military:</strong> {student.militaryService}</p>
                <p><strong>From Medically Underserved Community:</strong> {student.medically_underserved}</p>
                </div>
                <div className={styles.infoRow}>
                <p style={{ marginRight: '2.5rem' }}><strong>Primary Degree:</strong> {student.primary_degree}</p>
                <p><strong>Primary Major:</strong> {student.primary_major}</p>
                </div>
                <div className={styles.infoRow}>
                <p style={{ marginRight: '2.5rem' }}><strong>US Citizen:</strong> {student.usCitizen}</p>
                <p><strong>English is the Native Language:</strong> {student.englishNative}</p>
                </div>
            </div>
            </div>
        </div>
    )
}