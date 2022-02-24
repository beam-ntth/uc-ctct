import React from "react";

export default function StatusParser(type, id) {
  let text = "Undetermined"
  if (type === "sites") {
    switch (id) {
      case -1:
        text = <React.Fragment>
          <option value={0}>Initial Lead</option>
          <option value={1}>Outreach/Cold Call</option>
          <option value={2}>No Go - Future Possibility</option>
          <option value={3}>No Go</option>
          <option value={4}>Meeting Scheduled</option>
          <option value={5}>In Process</option>
          <option value={6}>Waiting for Response</option>
          <option value={7}>Follow Up Needed</option>
          <option value={8}>Active</option>
          <option value={9}>Inactive</option>
        </React.Fragment>
        break
      case 0:
        text = "Initial Lead"
        break
      case 1:
        text = "Outreach"
        break
      case 2:
        text = "No Go - Future Possibility"
        break
      case 3:
        text = "No Go"
        break
      case 4:
        text = "Meeting Scheduled"
        break
      case 5:
        text = "In Process"
        break
      case 6:
        text = "Waiting For Response"
        break
      case 7:
        text = "Follow Up Needed"
        break
      case 8:
        text = "Active"
        break
      case 9:
        text = "Inactive"
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