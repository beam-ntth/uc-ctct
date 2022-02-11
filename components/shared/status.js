export default function StatusParser(type, id) {
    let text = "Undetermined"
    if (type === "sites") {
        switch (id) {
            case 0:
                text = "Initial Lead"
                break
            case 1:
                text = "Outreach"
                break
            case 2:
                text = "Waiting For Response"
                break
            case 3:
                text = "Scheduled Meeting"
                break
            case 4:
                text = "TAA Request"
                break
            case 5:
                text = "TAA Site Signature Pending"
                break
            case 6:
                text = "TAA University Signature Pending"
                break
            case 7:
                text = "Site Active TAA"
                break
            case 8:
                text = "TAA Amendment Pending"
                break
            case 9:
                text = "TAA Expiring Soon"
                break
            case 10:
                text = "No Go"
                break
            case 11:
                text = "No Go For Now - Follow Up"
                break
            case 12:
                text = "Follow Up Needed"
                break
            case 13:
                text = "Site Inactive"
                break
            default:
                text = "Undetermined"
                break
        }
        return text;
    }
    if (type === "clinics") {
        switch (id) {
            case 0:
                text = "Administrative Outreach"
                break
            case 1:
                text = "Waiting For Response"
                break
            case 2:
                text = "Scheduled Meeting"
                break
            case 3:
                text = "No Go"
                break
            case 4:
                text = "No Go For Now - Follow Up"
                break
            case 5:
                text = "Follow Up Needed"
                break
            case 6:
                text = "Clinic Profile in Process"
                break
            case 7:
                text = "Clinic Active"
                break
            case 8:
                text = "Clinic Inactive"
                break
            case 9:
                text = "Site Visit Needed"
                break
            default:
                text = "Undetermined"
                break
        }
        return text;
    }
    if (type === "preceptors") {
        switch (id) {
            case 0:
                "Preceptor Outreach"
                break
            case 1:
                "Preceptor Credentialling"
                break
            case 2:
                "Waiting for Response "
                break
            case 3:
                "Scheduled Meeting"
                break
            case 4:
                "Follow Up Needed"
                break
            case 5:
                "No Go"
                break
            case 6:
                "No Go For Now - Follow Up"
                break
            case 7:
                "Preceptor Active"
                break
            case 8:
                "Preceptor Inactive"
                break
            case 9:
                "Site Visit Needed"
                break
            default:
                text = "Undetermined"
                break
        }
        return text;
    }
    return text;
}