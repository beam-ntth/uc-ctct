import { parse } from 'json2csv';
import StatusParser from '../../components/shared/status'
// Documentation: https://www.npmjs.com/package/json2csv

/**
 * Removes meta data related to the Cosmos DB. 
 * @param {*} data Data returned from the DB. Usually consists of all values from a container.
 */
function removeMetaTags(data) {
  data.map((x) => {
    delete x._rid;
    delete x._self;
    delete x._etag;
    delete x._attachments;
    delete x._ts;
    delete x.type;
    delete x.notes;
    delete x.id;
  })
}

/**
 * Used in a page to create a downloadable csv file in the browser.
 * @param {JSON} data Data that will be parsed into a CSV file.  
 * @param {String} name The name we wish to give the csv file on download.
 * @param {JSON} opts Options to pass to parser. Used to set order of fields. 
 */
export function createDownloadLink(data, name, opts) {
  removeMetaTags(data);
  // Turn JSON into csv.
  const csv = parse(data, opts);
  // Create hidden element for download.
  const hiddenElement = document.createElement('a');
  hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
  hiddenElement.target = '_blank';
  const date = new Date();
  hiddenElement.download = `${name}-${date.getFullYear()}.csv`;
  // Download element.
  hiddenElement.click();
}

/**
 * Used to create CSV file for site data.
 * @param {JSON} data Site data from DB to parse into JSON. 
 */
export function createSiteCSV(data) {
  // Convert general info object into separate fields. 
  data.map((x) => {
    x.phone_number = x.generalInformation.phoneNumber;
    x.fax_number = x.generalInformation.faxNumber;
    x.address_line_1 = x.generalInformation.addressLine1;
    x.address_line_2 = x.generalInformation.addressLine2;
    x.City = x.generalInformation.city;
    x.State = x.generalInformation.state;
    x.Postal = x.generalInformation.postal;
    delete x.generalInformation;
    delete x.region_id;
    x.Status = StatusParser("sites", parseInt(x.status))
    x.Admin = x.adminInfo;
  })

  // Set the order of fields.
  const fields = ["name", "status", { label: 'Num of Clinics', value: "total_clinics" },
    { label: 'Num of Preceptors', value: "total_preceptors" },
    { label: "Address Line 1", value: "address_line_1" },
    { label: "Address Line 2", value: "address_line_2" }, "City", "State", "Postal", { label: "Phone Number", value: "phone_number" }, { label: "Fax Number", value: "fax_number" }, "Admin"]
  const opts = { fields }
  createDownloadLink(data, "site-overview", opts);
}

export function createClinicCSV(data) {

}






