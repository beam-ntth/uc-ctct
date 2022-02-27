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
          <option value={5}>TAA Site Signature Pending</option>
          <option value={6}>TAA University Signature Pending</option>
          <option value={7}>Site Active TAA</option>
          <option value={8}>TAA Amendment Pending</option>
          <option value={9}>TAA Expiring Soon</option>
          <option value={10}>No Go</option>
          <option value={11}>No Go For Now - Follow Up</option>
          <option value={12}>Follow Up Needed</option>
          <option value={13}>Site Inactive</option>
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
  }
  return text;
}