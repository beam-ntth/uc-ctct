"use strict";
import { client } from "./azureConfig";

const db = client.database("uc-ctct");
const Regions = db.container("Regions");
const Sites = db.container("Sites");
const Clinics = db.container("Clinics");
const Preceptors = db.container("Preceptors");

// console.log("Getting sites: ", sites);

// SQL Query Literals
// TODO: Get better naming scheme to differentiate literals from the functions.
const selectAllQuery = "SELECT * FROM c";
const getSitesConnectedToRegion =
  "SELECT * FROM c WHERE c.region_id = @region_id";
const getClinicsConnectedToSite =
  "SELECT * FROM c where c.site_id = @site_id";
const regionTypeQuery = "SELECT DISTINCT VALUE c.name FROM c ORDER by c.name ASC";
const distinctClinicStatusQuery = "SELECT DISTINCT VALUE c.status FROM c ORDER by c.status ASC ";
const distinctSiteNameQuery = "SELECT DISTINCT VALUE c.name FROM c ORDER by c.name ASC";
const distinctAffiliationQuery = "SELECT DISTINCT VALUE c.affiliation from c ORDER by c.affiliation ASC";
const queryPreceptor = "SELECT * from c WHERE c.preceptor_id = @preceptor_id";

// TODO: CREATE BETTER METHOD OF ERROR HANDLING. 
// PERHAPS RETURN THE RESPONSE CODE AS WELL AS DATA, THEN CHECK THE CODE TO SEE IF NEEDING TO RENDER ERROR PAGE.

/** GETTERS */

export const getAllRegions = async () => {
  try {
    const { resources: data } = await Regions.items.query(selectAllQuery).fetchAll();
    return data;
  } catch (error) {
    console.log("Error is", error.code);
    throw new Error("Issue fetching Regions");
  }
};

export const getAllSites = async () => {
  try {
    const { resources: data } = await Sites.items.query(selectAllQuery).fetchAll();
    return data;
  } catch (error) {
    console.log("Error is: ", error.code);
    throw new Error("Issue with fetching sites");
  }
};


export const getAllClinics = async () => {
  try {
    const { resources: data } = await Clinics.items.query(selectAllQuery).fetchAll();
    return data;
  } catch (error) {
    console.log("Error is", error.code);
    throw new Error("Issue fetching Clinics");
  }
};

/**
 * Query for singular region.
 * @param {String} id - UUID of region to query. 
 */
export const getRegion = async (id) => {
  try {
    const { resource: data } = await Regions.item(id, id).read();
    return data;
  } catch (error) {
    console.log("Error is", error);
    throw new Error("Issue fetching region with id", id);
  }
}

/**
 * Query for singular clinic.
 * @param {String} id - UUID of clinic to query.
 */
export const getClinic = async (id) => {
  try {
    const { resource: data } = await Clinics.item(id, id).read();
    return data;
  } catch (error) {
    console.log("Error is", error.code);
    throw new Error("Issue fetching clinic with id", id);
  }
}

export const getClinicsFromSite = async (id) => {
  try {
    const { resources: data } = await Clinics.items.query({
      query: getClinicsConnectedToSite,
      parameters: [{ name: "@site_id", value: id }]
    }).fetchAll();
    return data;
  } catch (error) {
    throw new Error(`Issue fetching clinics connected to site ${id}`);
  }
}

/**
 * Query for singular site.
 * @param {String} id - UUID of site to query.
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

/**
 * Get all sites connected to a specfic region.
 * @param {String} id - UUID of region to query get all sites from. 
 */
export const getSitesFromRegion = async (id) => {
  try {
    const { resources: data } = await Sites.items.query({
      query: getSitesConnectedToRegion,
      parameters: [{ name: "@region_id", value: id }]
    }).fetchAll();
    return data;
  } catch (error) {
    console.log();
    throw new Error(`Issue getting sites with region_id ${id}.`);
  }
}

export const getAllPreceptors = async () => {
  try {
    const { resources: data } = await Preceptors.items.query(selectAllQuery).fetchAll();
    return data;
  } catch (error) {
    throw new Error("Issue getting all preceptors.");
  }
}

export const getPreceptor = async (id) => {
  try {
    const { resource: data } = await Preceptors.item(id, id).read();
    return data;
  } catch (error) {
    throw new Error("Issue getting preceptor with id", id);
  }
}

/**
 * Returns all distinct region names in Region container.
 * Useful for avoding hardcoding possible region names for use in filters, etc.
 * @returns List of all distinct regions.
 */
export const getDistinctRegions = async () => {
  try {
    const res = await Regions.items.query(regionTypeQuery).fetchAll();
    const data = res.resources;
    console.log("Getting all distinct regions", res);
    // const { resources: data } = await Regions.items.query(regionTypeQuery).fetchAll();
    return data;
  } catch (Error) {
    throw new Error("Issue getting all distinct regions.");
  }
}

export const getDistinctClinicStatuses = async () => {
  try {
    const { resources: data } = await Clinics.items.query(distinctClinicStatusQuery).fetchAll();
    return data;
  } catch (Error) {
    throw new Error("Issue getting all distinct clinic statuses.");
  }
}

export const getDistinctSiteAffiliations = async () => {
  try {
    const { resources: data } = await Sites.items.query(distinctAffiliationQuery).fetchAll();
    console.log("Getting distinct affiliations: ", data);
    return data;
  } catch (Error) {
    throw new Error("Issue getting all distinct site affiliations.");
  }
}



/** PUT OPERATIONS */

/** */

// TODO: CREATE BETTER FUNCTION FOR ADDING NEW CLINIC. 
export const addClinic = async (clinic_data, site_id) => {

}

/** DELETION OPERATIONS */

/**
 * Removes clinic with passed in ID.
 * @param {String} id - UUID of clinic that is being removed
 */
export const removeClinic = async (id, siteId) => {
  try {
    await Clinics.item(id, id).delete();

    // Update total number of clinics
    const { resource: previous_num_clinics } = await Sites.item(siteId, siteId).read()
    const replaceOperation =
      [{
        op: "replace",
        path: "/total_clinics",
        value: previous_num_clinics["total_clinics"] - 1
      }]
    await Sites.item(siteId, siteId).patch(replaceOperation)

  } catch (error) {
    console.log("Error is", error.code);
    throw new Error("Issue deleting clinic with id", id);
  }
}

/**
 * Removes data related to site in bottom up way. First removes clinics connected to this site. 
 * Then will remove the site itself.
 * @param {String} id - UUID of the site that is being removed. 
 */
export const removeSite = async (id, regionId) => {
  try {
    // Query all related clinics
    const clinics = await getClinicsFromSite(id);
    // const { resources: clinics } = await Clinics.items.query({
    //   query: getClinicsConnectedToSite,
    //   parameters: [{ name: "@site_id", value: id }]
    // }).fetchAll();

    // Iterate through all clinics and delete
    for (const clinic of clinics) {
      console.log("Removing clinc with id", clinic.id)
      removeClinic(clinic.id);
    }

    // Remove site itself. 
    await Sites.item(id, id).delete();

    // Update number of sites left in region
    const { resource: previous_num_sites } = await Regions.item(regionId, regionId).read()
    const replaceOperation =
      [{
        op: "replace",
        path: "/total_sites",
        value: previous_num_sites["total_sites"] - 1
      }]
    await Regions.item(regionId, regionId).patch(replaceOperation)

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
    const sites = await getSitesFromRegion(id);

    // const { resources: sites } = await Sites.items.query({
    //   query: getSitesConnectedToRegion,
    //   parameters: [{ name: "@region_id", value: id }]
    // }).fetchAll();

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

/**
 * Deletes admin contact information from Clinics container.
 * @param {String} id - ID of the clinic that the admin belongs to.
 * @param {String} index - Index of the admin in the list.
 * @throws {Error} Error if any operation is unable to be completed.
 */
export const removeAdmin = async (id, index) => {
  try {
    const { resource: clinic_obj } = await Clinics.item(id, id).read()
    let clinic_admins = [...clinic_obj.adminInfo]
    clinic_admins.splice(index, 1)
    const replaceOperation =
      [{
        op: "replace",
        path: "/adminInfo",
        value: clinic_admins
      }]
    await Clinics.item(id, id).patch(replaceOperation)
    return

  } catch (error) {
    throw new Error(`Issue deleting clinic admin with id ${id} at position ${index}`);
  }
}

/**
 * Deletes preceptor contact information from Clinics container 
 * AND deletes clinic from Preceptors container.
 * @param {String} id - ID of the clinic that the admin belongs to.
 * @param {String} index - Index of the preceptor in the list.
 * @throws {Error} Error if any operation is unable to be completed.
 */
export const removePreceptor = async (id, index) => {
  try {
    // EDIT Clinic Information
    const { resource: clinic_obj } = await Clinics.item(id, id).read()
    const preceptor_id = clinic_obj.preceptorInfo[index]
    let clinic_preceptors = [...clinic_obj.preceptorInfo]
    clinic_preceptors.splice(index, 1)
    const replaceClinicOperation =
      [{
        op: "replace",
        path: "/preceptorInfo",
        value: clinic_preceptors
      }]
    await Clinics.item(id, id).patch(replaceClinicOperation)

    // EDIT Preceptor Information
    const { resource: precep_obj } = await Preceptors.item(preceptor_id, preceptor_id).read()
    let preceptor_clinics = [...precep_obj.clinics]
    const index_to_remove = preceptor_clinics.indexOf(id)
    preceptor_clinics.splice(index_to_remove, 1)
    const replacePreceptorOperation =
      [{
        op: "replace",
        path: "/clinics",
        value: preceptor_clinics
      }]
    await Preceptors.item(preceptor_id, preceptor_id).patch(replacePreceptorOperation)
    return
  } catch (error) {
    throw new Error(`Issue deleting clinic preceptor with clinic id: [${id}] or preceptor's clinic`);
  }
}