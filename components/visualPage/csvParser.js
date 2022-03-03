import { parse } from 'json2csv';

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
  })
}

/**
 * Used in a page to create a downloadable csv file in the browser.
 * @param {JSON} data Data that will be parsed into a CSV file.  
 * @param {String} name The name we wish to give the csv file on download.
 */
export function createDownloadLink(data, name) {
  removeMetaTags(data);
  // Turn JSON into csv.
  const csv = parse(data);
  // Create hidden element for download.
  const hiddenElement = document.createElement('a');
  hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
  hiddenElement.target = '_blank';
  const date = new Date();
  hiddenElement.download = `${name}-${date.getFullYear()}.csv`;
  // Download element.
  hiddenElement.click();
}
