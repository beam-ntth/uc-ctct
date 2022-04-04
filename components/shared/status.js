import React from "react";

export default function StatusParser(type, id) {
  let text = "Undetermined"
  if (type === "sites") {
    switch (id) {
      case -1:
        text = <React.Fragment>
          <option value={0}>Initial Lead</option>
          <option value={1}>Outreach</option>
          <option value={2}>Waiting For Response</option>
          <option value={3}>Scheduled Meeting</option>
          <option value={4}>TAA Request</option>
          <option value={5}>TAA Negotiation</option>
          <option value={6}>TAA Site Signature Pending</option>
          <option value={7}>TAA University Signature Pending</option>
          <option value={8}>Site Active TAA</option>
          <option value={9}>TAA Amendment Pending</option>
          <option value={10}>TAA Expiring Soon</option>
          <option value={11}>No Go</option>
          <option value={12}>No Go For Now - Follow Up</option>
          <option value={13}>Follow Up Needed</option>
          <option value={14}>Site Inactive</option>
        </React.Fragment>
        break
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
        text = "TAA Negotiation"
        break
      case 6:
        text = "TAA Site Signature Pending"
        break
      case 7:
        text = "TAA University Signature Pending"
        break
      case 8:
        text = "Site Active TAA"
        break
      case 9:
        text = "TAA Amendment Pending"
        break
      case 10:
        text = "TAA Expiring Soon"
        break
      case 11:
        text = "No Go"
        break
      case 12:
        text = "No Go For Now - Follow Up"
        break
      case 13:
        text = "Follow Up Needed"
        break
      case 14:
        text = "Site Inactive"
        break
      default:
        text = "Undetermined"
        break
    }
  }
  if (type === "clinics") {
    switch (id) {
      case -1:
        text = <React.Fragment>
          <option value={0}>Administrative Outreach</option>
          <option value={1}>Waiting For Response</option>
          <option value={2}>Scheduled Meeting</option>
          <option value={3}>No Go</option>
          <option value={4}>No Go For Now - Follow Up</option>
          <option value={5}>Follow Up Needed</option>
          <option value={6}>Clinic Profile in Process</option>
          <option value={7}>Clinic Active</option>
          <option value={8}>Clinic Inactive</option>
          <option value={9}>Site Visit Needed</option>
        </React.Fragment>
        break
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
  }
  if (type === "preceptors") {
    switch (id) {
      case -1:
        text = <React.Fragment>
          <option value={0}>Preceptor Outreach</option>
          <option value={1}>Preceptor Credentialing</option>
          <option value={2}>Waiting for Response</option>
          <option value={3}>Scheduled Meeting</option>
          <option value={4}>Follow Up Needed</option>
          <option value={5}>No Go</option>
          <option value={6}>No Go For Now - Follow Up</option>
          <option value={7}>Preceptor Active</option>
          <option value={8}>Preceptor Inactive</option>
          <option value={9}>Site Visit Needed</option>
        </React.Fragment>
        break
      case 0:
        text = "Preceptor Outreach"
        break
      case 1:
        text = "Preceptor Credentialling"
        break
      case 2:
        text = "Waiting for Response "
        break
      case 3:
        text = "Scheduled Meeting"
        break
      case 4:
        text = "Follow Up Needed"
        break
      case 5:
        text = "No Go"
        break
      case 6:
        text = "No Go For Now - Follow Up"
        break
      case 7:
        text = "Preceptor Active"
        break
      case 8:
        text = "Preceptor Inactive"
        break
      case 9:
        text = "Site Visit Needed"
        break
      default:
        text = "Undetermined"
        break
    }
  }
  return text;
}