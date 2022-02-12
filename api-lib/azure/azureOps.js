'use strict'
import { client } from './azureConfig';

const db = client.database("uc-ctct");
const regions = db.container("Regions");
const sites = db.container("Sites");
const clinics = db.container("Clinics");

console.log("Getting sites: ", sites);

// SQL Query Literals
const selectAll = "SELECT * FROM Container c"

/**
 * Get all sites from the Sites container.
 * 
 */
export const getAllSites = async () => {
  let data;
  // const {resources:data}
  try {
    data = await sites.items.query(selectAll).fetchAll();
  } catch (error) {
    console.log("Error is: ", error);
    throw new Error("Issue with fetching sites");
  }
  return data.resources;
}

