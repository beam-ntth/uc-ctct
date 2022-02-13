"use strict";
import { client } from "./azureConfig";

const db = client.database("uc-ctct");
const Regions = db.container("Regions");
const Sites = db.container("Sites");
const Clinics = db.container("Clinics");

// console.log("Getting sites: ", sites);

// SQL Query Literals
const selectAll = "SELECT * FROM c";
const deleteSitesConnectedToRegion =
  "DELETE * FROM c WHERE c.region_id = @region_id";
const getSitesConnectedToRegion =
  "SELECT * FROM c WHERE c.region_id = @region_id";
const getClinicsConnectedToSite =
  "SELECT * FROM c where c.site_id = @site_id";

/** GETTERS */

export const getAllRegions = async () => {
  try {
    const { resources: data } = await Regions.items.query(selectAll).fetchAll();
    return data;
  } catch (error) {
    console.log("Error is", error.code);
    throw new Error("Issue fetching Regions");
  }
};


export const getAllSites = async () => {
  try {
    const { resources: data } = await Sites.items.query(selectAll).fetchAll();
    return data;
  } catch (error) {
    console.log("Error is: ", error.code);
    throw new Error("Issue with fetching sites");
  }
};

/**
 *
 * @param {String} id - UUID of site
 */
export const getSite = async (id) => {
  try {
    const { resources: data } = await Sites.item(id, id).read();
    return data;
  } catch (error) {
    console.log("Error is: ", error.code);
    throw new Error("Issue with fetching the site: ", id);
  }
};

export const getAllClinics = async () => {
  try {
    const { resources: data } = await Regions.items.query(selectAll).fetchAll();
    return data;
  } catch (error) {
    console.log("Error is", error.code);
    throw new Error("Issue fetching Clinics");
  }
};

/**
 *
 * @param {String} id - UUID of clinic
 */
export const getClinic = async (id) => {
  try {
    const { resources: data } = await Regions.item(id, id).read();
    return data;
  } catch (error) {
    console.log("Error is", error.code);
    throw new Error("Issue fetching clinic with id", id);
  }
}


/** DELETION OPERATIONS */

/**
 * Removes clinic with passed in ID.
 * @param {String} id - UUID of clinic that is being removed
 */
export const removeClinic = async (id) => {
  try {
    await Clinics.item(id, id).delete();
  } catch (error) {
    console.log("Error is", error.code);
    throw new Error("Issue deleting clinc with id", id);
  }
}

/**
 * Removes data related to site in bottom up way. First removes clinics connected to this site. 
 * Then will remove the site itself.
 * @param {String} id - UUID of the site that is being removed. 
 */
export const removeSite = async (id) => {
  try {
    // Query all related clinics
    const { resources: clinics } = await Clinics.items.query({
      query: getClinicsConnectedToSite,
      parameters: [{ name: "@site_id", value: id }]
    }).fetchAll();

    // Iterate through all clinics and delete
    for (const clinic of clinics) {
      console.log("Removing clinc with id", clinic.id)
      removeClinic(clinic.id);
    }

    // Remove site itself. 
    await Sites.item(id, id).delete();
  } catch (error) {
    throw new Error("Issue deleting site with id", id);
  }
}

/**
 * Deletes data in a bottom up form, i.e from clinic to site to region finally.
 * @param {String} id - ID of the region that is being removed.
 * @throws {Error} Error if any operation is unable to be completed.
 */
export const removeRegion = async (id) => {
  console.log("Passing");
  try {
    // Fetch all sites related to the current region. 
    const { resources: sites } = await Sites.items.query({
      query: getSitesConnectedToRegion,
      parameters: [{ name: "@region_id", value: id }]
    }).fetchAll();

    // Iterate through all sites and and remove accordingly. 
    // If no sites are found no error will be thrown. 
    for (const site of sites) {
      removeSite(site.id);
    }

    // Delete the specified region.
    await Regions.item(id, id).delete();

  } catch (error) {
    throw new Error("Issue deleting region with id", id);
  }
}
// export const removeRegion = async (id) => {
//   console.log("Removing Region: ", id);
//   try {
//     // Get all sites connected to region to delete.
//     const { resources: sites } = await Sites.items
//       .query({
//         query: getSitesConnectedToRegion,
//         parameters: [{ name: "@region_id", value: id }],
//       })
//       .fetchAll();

//     let clinics = [];
//     // TODO: CREATE FUNCTIONS FOR REMOVING SITE AND REMOVING REGION, THEN USE THEM HERE.
//     for (const site of sites) {
//       clinics.push();
//     }

//     // Delete all clinics connected to relevant sites, if sites exist.
//     if (sites) {
//     }

//     for (const site of sites) {
//       console.log("Site id is", site.id);
//       let siteID = site.id;
//       console.log(siteID);
//       Clinics.items.query({
//         query: deleteClinicsConnectedToSite,
//         parameters: [{ name: "@site_id", value: siteID }],
//       });
//     }

//     console.log("Past");

//     // Delete all sites connected to relevant region.
//     Sites.items.query({
//       query: deleteSitesConnectedToRegion,
//       parameters: [{ name: "@region_id", value: id }],
//     });

//     // Delete the current site.
//     await Regions.item(id, id).delete();
//   } catch (error) {
//     console.log("Error is", error.code);
//     throw new Error(`Issue deleting region. Please contact IT.`);
//     // continue;
//   }
// };