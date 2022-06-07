"use strict";
import { client } from "./azureConfig";
import { v4 as uuidv4 } from "uuid";

const db = client.database("uc-ctct");
const Master = db.container("Master");
const Preceptors = db.container("Preceptors");
const Students = db.container("Students");
const Admins = db.container("Admins");

// SQL Query Literals
// TODO: Get better naming scheme to differentiate literals from the functions.
const selectAllQuery = "SELECT * FROM c";
const getSitesConnectedToRegion =
  `SELECT * FROM c WHERE c.type = "site" AND c.region_id = @region_id ORDER BY c.name ASC`;
const getClinicsConnectedToSite =
  `SELECT * FROM c where c.type = "clinic" AND c.site_id = @site_id ORDER BY c.name ASC`;
const regionTypeQuery = `SELECT DISTINCT VALUE c.name FROM c WHERE c.type = "affiliation" ORDER by c.name ASC`;
const distinctClinicStatusQuery = `SELECT DISTINCT VALUE c.status FROM c WHERE c.type = "clinic" ORDER by c.status ASC`;
const distinctSiteNameQuery = "SELECT DISTINCT VALUE c.name FROM c ORDER by c.name ASC";
const distinctAffiliationQuery = `SELECT DISTINCT VALUE c.affiliation FROM c WHERE c.type = "site" ORDER by c.affiliation ASC`;
const queryPreceptor = "SELECT * from c WHERE c.preceptor_id = @preceptor_id";

const SURVEY_ID = `93910270-ea7a-4a5d-9646-6e57f004b647`

// TODO: CREATE BETTER METHOD OF ERROR HANDLING. 
// PERHAPS RETURN THE RESPONSE CODE AS WELL AS DATA, THEN CHECK THE CODE TO SEE IF NEEDING TO RENDER ERROR PAGE.

/** GETTERS */

/**
 * Query all Region items in a container
 */
export const getAllRegions = async () => {
  try {
    const { resources: data } = await Master.items.query(`${selectAllQuery} WHERE c.type = "affiliation" ORDER BY c.name ASC`).fetchAll();
    return data;
  } catch (error) {
    throw new Error(`Issue fetching Regions: ${error}`);
  }
};

/**
 * Query all Site items in a container
 */
export const getAllSites = async () => {
  try {
    const { resources: data } = await Master.items.query(`${selectAllQuery} WHERE c.type = "site" ORDER BY c.name ASC`).fetchAll();
    return data;
  } catch (error) {
    throw new Error(`Issue with fetching sites: ${error}`);
  }
};

/**
 * Query all Clinic items in a container
 */
export const getAllClinics = async () => {
  try {
    const { resources: data } = await Master.items.query(`${selectAllQuery} WHERE c.type = "clinic" ORDER BY c.name ASC`).fetchAll();
    return data;
  } catch (error) {
    throw new Error(`Issue fetching Clinics: ${error}`);
  }
};

/**
 * Query all Preceptor items in a container
 */
export const getAllPreceptors = async () => {
  try {
    const { resources: data } = await Preceptors.items.query(`${selectAllQuery} ORDER BY c.lastname ASC`).fetchAll();
    return data;
  } catch (error) {
    throw new Error(`Issue getting all preceptors: ${error}`);
  }
}

/**
 * Query all Student items in a container
 */
export const getAllStudents = async () => {
  try {
    const { resources: data } = await Students.items.query(`${selectAllQuery} ORDER by c.firstName ASC`).fetchAll();
    return data;
  } catch (error) {
    throw new Error(`Issue getting all students: ${error}`);
  }
}

/**
 * Query for singular clinic.
 * @param {String} id - UUID of clinic to query.
 * getClinicSiteReg, choose one to get either Clinic Site or Region
 */

export const getClinicOrSiteOrRegion = async (id) => {
  try {
    const { resource: data } = await Master.item(id, id).read();
    return data;
  } catch (error) {
    throw new Error(`Issue fetching clinic with id (${id}). Error is: ${error}`);
  }
}

export const getClinicsFromSite = async (id) => {
  try {
    const { resources: data } = await Master.items.query({
      query: getClinicsConnectedToSite,
      parameters: [{ name: "@site_id", value: id }]
    }).fetchAll();
    return data;
  } catch (error) {
    throw new Error(`Issue fetching clinics connected to site ${id}. Error is: ${error}`);
  }
}

/**
 * Get all sites connected to a specfic region.
 * @param {String} id - UUID of region to query get all sites from. 
 */
export const getSitesFromRegion = async (id) => {
  try {
    const { resources: data } = await Master.items.query({
      query: getSitesConnectedToRegion,
      parameters: [{ name: "@region_id", value: id }]
    }).fetchAll();
    return data;
  } catch (error) {
    throw new Error(`Issue getting sites with region_id ${id}. Error is: ${error}`);
  }
}

export const getPreceptor = async (id) => {
  try {
    const { resource: data } = await Preceptors.item(id, id).read();
    return data;
  } catch (error) {
    throw new Error(`Issue getting preceptor with id (${id}). Error is: ${error}`);
  }
}

export const getStudent = async (id) => {
  try {
    const { resource: data } = await Students.item(id, id).read();
    return data;
  } catch (error) {
    throw new Error(`Issue getting student with id (${id}). Error is: ${error}`);
  }
}

/**
 * Returns all distinct region names in Region container.
 * Useful for avoding hardcoding possible region names for use in filters, etc.
 * @returns List of all distinct regions.
 */
export const getDistinctRegions = async () => {
  try {
    const res = await Master.items.query(regionTypeQuery).fetchAll();
    const data = res.resources;
    return data;
  } catch (error) {
    throw new Error(`Issue getting all distinct regions. Error is: ${error}`);
  }
}

export const getDistinctClinicStatuses = async () => {
  try {
    const { resources: data } = await Master.items.query(distinctClinicStatusQuery).fetchAll();
    return data;
  } catch (error) {
    throw new Error(`Issue getting all distinct clinic statuses. Error is: ${error}`);
  }
}

export const getDistinctSiteAffiliations = async () => {
  try {
    const { resources: data } = await Master.items.query(distinctAffiliationQuery).fetchAll();
    return data;
  } catch (error) {
    throw new Error(`Issue getting all distinct site affiliations. Error is: ${error}`);
  }
}



/** CREATE OPERATIONS */

/** */
export const addNewClinic = async (clinic_data, site_id) => {
  try {
    // 1. Create clinic
    await Master.items.create(clinic_data)

    // 2. Increment clinic count
    const site = await getClinicOrSiteOrRegion(site_id)
    const cur_clinic_ct = site.total_clinics
    const replaceOperation = [
      {
        op: "replace",
        path: "/total_clinics",
        value: cur_clinic_ct + 1
      },
    ];
    await Master.item(site_id, site_id).patch(replaceOperation);
  } catch (error) {
    throw new Error(`Issue while creating new clinic. Error is: ${error}`);
  }
}

/**
 * Expects JSON of preceptor_info with name, position, phone, and email.
 * @param  preceptor Information about the preceptor, created before the function call.
 * @returns preceptor - Preceptor that was recently added to Preceptors container.
 */
const createNewPreceptor = async (preceptor) => {
  try {
    await Preceptors.items.create(preceptor);
    return preceptor;
  } catch (error) {
    throw new Error(`Issue while creating new preceptor profile. Error is: ${error}`);
  }
}

/**
 * Adds a preceptor to both a clinics document and creates a new preceptor in Preceptors container.
 * @param id - ID of the clinic you are adding a preceptor to.
 * @param 
 */
export const addPreceptorFromClinicsPage = async (id, preceptor_info) => {
  try {
    // Create new preceptor doc with passed in preceptor.
    const preceptor = await createNewPreceptor(preceptor_info);

    // Get clinic data to access array of preceptors.
    const clinic = await getClinicOrSiteOrRegion(id);
    let preceptors = clinic.preceptorInfo;

    // Add new id of the recently created preceptor to array. 
    preceptors.push(preceptor.id);
    const replaceOperation = [
      {
        op: "replace",
        path: "/preceptorInfo",
        value: preceptors
      },
    ];

    // Replace and update with newly added preceptor id.
    await Master.item(id, id).patch(replaceOperation);
  } catch (error) {
    throw new Error(`Issue while adding preceptor to clinic with id (${id}). Error is: ${error}`);
  }
}

/**
 * Updates a site's note with newly inputted data. 
 * @param {String} id UUID of site where note is attached.
 * @param {JSON} note_data New JSON data of the note to patch to the DB.
 * @deprecated - Function has been converted to Sprocs
 */
export async function updateSiteNote(id, note_data) {
  try {
    const replaceOperation =
      [
        {
          op: "replace",
          path: "/notes",
          value: note_data
        }
      ];
    await Master.item(id, id).patch(replaceOperation);
  } catch (error) {
    throw new Error(`Issue while updating note to site with id (${id}). Error is: ${error}`);
  }
}

/** DELETION OPERATIONS */

/**
 * Removes clinic with passed in ID.
 * @param {String} id - UUID of clinic that is being removed
 */
export const removeClinic = async (id, siteId) => {
  try {
    // 1. Unlink all of the clinics and preceptors
    const clinic_obj = await getClinicOrSiteOrRegion(id)
    const students = clinic_obj.students
    for (let i = 0; i < students.length; i++) {
      const student_data = await getStudent(students[i])
      console.log(student_data)
      await removeStudentFromPreceptor(students[i], id, student_data.assignment.primary_choice.preceptor_id, "Primary")
    }

    // 2. Delete clinic object
    await Master.item(id, id).delete();

    // 3. Update total number of clinics
    const { resource: previous_num_clinics } = await Master.item(siteId, siteId).read()
    const replaceOperation =
      [{
        op: "replace",
        path: "/total_clinics",
        value: previous_num_clinics["total_clinics"] - 1
      }]
    await Master.item(siteId, siteId).patch(replaceOperation)
  } catch (error) {
    throw new Error(`Issue deleting clinic. Error is: ${error}`);
  }
}

/**
 * Removes data related to site in bottom up way. First removes clinics connected to this site. 
 * Then will remove the site itself.
 * @param {String} id - UUID of the site that is being removed. 
 */
export const removeSite = async (id, status, regionId) => {
  try {
    // Query all related clinics
    const clinics = await getClinicsFromSite(id);

    // Iterate through all clinics and delete
    for (const clinic of clinics) {
      await removeClinic(clinic.id);
    }

    // Remove site itself. 
    await Master.item(id, id).delete();

    // Update number of active sites left in region, only if the site was active
    if (status == 8 || status == 10) {
      const { resource: previous_num_sites } = await Master.item(regionId, regionId).read()
      const replaceOperation =
        [{
          op: "replace",
          path: "/total_sites",
          value: previous_num_sites["total_sites"] - 1
        }]
      await Master.item(regionId, regionId).patch(replaceOperation)
    }
  } catch (error) {
    throw new Error(`Issue deleting site with id (${id}). Error is: ${error}`);
  }
}

/**
 * Deletes data in a bottom up form, i.e from clinic to site to region finally.
 * @param {String} id - ID of the region that is being removed.
 * @throws {Error} Error if any operation is unable to be completed.
 * @deprecated - Users should no longer have the ability to remove a region/affiliation
 */
export const removeRegion = async (id) => {
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
    await Master.item(id, id).delete();

  } catch (error) {
    throw new Error(`Issue deleting region with id (${id}). Error is: ${error}`);
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
    const { resource: clinic_obj } = await Master.item(id, id).read()
    let clinic_admins = [...clinic_obj.adminInfo]
    clinic_admins.splice(index, 1)
    const replaceOperation =
      [{
        op: "replace",
        path: "/adminInfo",
        value: clinic_admins
      }]
    await Master.item(id, id).patch(replaceOperation)
    return

  } catch (error) {
    throw new Error(`Issue deleting clinic admin with id ${id} at position ${index}. Error is: ${error}`);
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
    const { resource: clinic_obj } = await Master.item(id, id).read()
    const preceptor_id = clinic_obj.preceptorInfo[index]
    let clinic_preceptors = [...clinic_obj.preceptorInfo]
    clinic_preceptors.splice(index, 1)
    const replaceClinicOperation =
      [{
        op: "replace",
        path: "/preceptorInfo",
        value: clinic_preceptors
      }]
    await Master.item(id, id).patch(replaceClinicOperation)

    // EDIT Preceptor Information
    const { resource: precep_obj } = await Preceptors.item(preceptor_id, preceptor_id).read()
    let preceptor_clinics = [...precep_obj.clinics]
    const index_to_remove = preceptor_clinics.indexOf(id)
    preceptor_clinics.splice(index_to_remove, 1)
    if (preceptor_clinics.length === 0) {
      await Preceptors.item(preceptor_id, preceptor_id).delete()
    } else {
      const replacePreceptorOperation =
        [{
          op: "replace",
          path: "/clinics",
          value: preceptor_clinics
        }]
      await Preceptors.item(preceptor_id, preceptor_id).patch(replacePreceptorOperation)
    }
    return
  } catch (error) {
    throw new Error(`Issue deleting clinic preceptor with clinic id: [${id}] or preceptor's clinic. Error is:  ${error}`);
  }
}


export async function addStudentToPreceptor(student_id, clinic_id, preceptor_id, choice) {
  try {
    const date = new Date();
    const today_date = `${date.getMonth() + 1 < 10 ? '0' : ''}${date.getMonth() + 1}/${date.getDate() < 10 ? '0' : ''}${date.getDate()}/${date.getFullYear()}`

    const { resource: student_obj } = await Students.item(student_id, student_id).read()
    const { resource: clinic_obj } = await Master.item(clinic_id, clinic_id).read()
    const { resource: preceptor_obj } = await Preceptors.item(preceptor_id, preceptor_id).read()

    // Update student information
    let new_student_assignment = { ...student_obj.assignment }

    if (choice == "Primary") {
      new_student_assignment.isAssigned = true
      new_student_assignment.primary_choice.clinic_id = clinic_id
      new_student_assignment.primary_choice.preceptor_id = preceptor_id
      new_student_assignment.primary_choice.date_assigned = today_date
    } else if (choice == "Secondary") {
      new_student_assignment.secondary_choice.clinic_id = clinic_id
      new_student_assignment.secondary_choice.preceptor_id = preceptor_id
      new_student_assignment.secondary_choice.date_assigned = today_date
    } else {
      new_student_assignment.tertiary_choice.clinic_id = clinic_id
      new_student_assignment.tertiary_choice.preceptor_id = preceptor_id
      new_student_assignment.tertiary_choice.date_assigned = today_date
    }

    const replaceStudentOperation =
      [
        {
          op: "replace",
          path: "/assignment",
          value: new_student_assignment
        }
      ]

    const studentRes = await Students.item(student_id, student_id).patch(replaceStudentOperation)

    if (choice == "Primary") {
      // Update Preceptor Information
      let new_preceptor_assignment = [...preceptor_obj.students]
      new_preceptor_assignment.push(student_id)
      const replacePreceptorOperation =
        [
          {
            op: "replace",
            path: "/students",
            value: new_preceptor_assignment
          }
        ]

      const preceptorRes = await Preceptors.item(preceptor_id, preceptor_id).patch(replacePreceptorOperation)

      // Update Clinic Information
      let new_clinic_assignment = [...clinic_obj.students]
      new_clinic_assignment.push(student_id)
      const replaceClinicOperation =
        [
          {
            op: "replace",
            path: "/students",
            value: new_clinic_assignment
          }
        ]

      const clinicRes = await Master.item(clinic_id, clinic_id).patch(replaceClinicOperation)
      return [studentRes, preceptorRes, clinicRes]
    }
    return [studentRes]
  } catch (error) {
    throw new Error(`Error happens when trying to assign a student to the preceptor. Error is: ${error}`)
  }
}

/**
 * This function removes the assignment of a student from the preceptor and clinic
 * @param {*} student_id : UUID of the assigned student
 * @param {*} clinic_id : UUID of the assigned clinic
 * @param {*} preceptor_id : UUID of the assigned preceptor
 * @param {*} choice : The priority to remove = first_choice, second_choice, ...
 * @returns A list of the response status after updated student, preceptor, and clinic records
 */
export async function removeStudentFromPreceptor(student_id, clinic_id, preceptor_id, choice) {
  try {
    const { resource: student_obj } = await Students.item(student_id, student_id).read()
    const { resource: clinic_obj } = await Master.item(clinic_id, clinic_id).read()
    const { resource: preceptor_obj } = await Preceptors.item(preceptor_id, preceptor_id).read()

    // Update student information
    let new_student_assignment = { ...student_obj.assignment }

    if (choice == "Primary") {
      new_student_assignment.isAssigned = false
      new_student_assignment.primary_choice.clinic_id = ""
      new_student_assignment.primary_choice.preceptor_id = ""
      new_student_assignment.primary_choice.date_assigned = ""
    } else if (choice == "Secondary") {
      new_student_assignment.secondary_choice.clinic_id = ""
      new_student_assignment.secondary_choice.preceptor_id = ""
      new_student_assignment.secondary_choice.date_assigned = ""
    } else {
      new_student_assignment.tertiary_choice.clinic_id = ""
      new_student_assignment.tertiary_choice.preceptor_id = ""
      new_student_assignment.tertiary_choice.date_assigned = ""
    }

    const replaceStudentOperation =
      [
        {
          op: "replace",
          path: "/assignment",
          value: new_student_assignment
        }
      ]

    const studentRes = await Students.item(student_id, student_id).patch(replaceStudentOperation)

    if (choice == "Primary") {
      // Update Preceptor Information
      let new_preceptor_assignment = [...preceptor_obj.students]
      new_preceptor_assignment.splice(new_preceptor_assignment.indexOf(student_id), 1)
      const replacePreceptorOperation =
        [
          {
            op: "replace",
            path: "/students",
            value: new_preceptor_assignment
          }
        ]

      const preceptorRes = await Preceptors.item(preceptor_id, preceptor_id).patch(replacePreceptorOperation)

      // Update Clinic Information
      let new_clinic_assignment = [...clinic_obj.students]
      new_clinic_assignment.splice(new_clinic_assignment.indexOf(student_id), 1)
      const replaceClinicOperation =
        [
          {
            op: "replace",
            path: "/students",
            value: new_clinic_assignment
          }
        ]

      const clinicRes = await Master.item(clinic_id, clinic_id).patch(replaceClinicOperation)
      return [studentRes, preceptorRes, clinicRes]
    }
    return [studentRes]
  } catch (error) {
    throw new Error(`Error happens when trying to assign a student to the preceptor. Error is: ${error}`)
  }
}

/**
 * This function queries the survey's metadata such as last_updated, ...
 * @returns All the metadata correlated to the survey
 */
export async function getSurveyStatus() {
  try {
    const { resource: data } = await Master.item(SURVEY_ID, SURVEY_ID).read();
    return data;
  } catch (error) {
    throw new Error(`Error happens when querying Survey Metadata. Error is: ${error}`)
  }
}

/**
 * 
 */
export async function updateSurveyLink(type, newLink) {
  try {
    const replaceClinicOperation =
      [
        {
          op: "replace",
          path: `/links/${type}`,
          value: newLink
        }
      ]
    await Master.item(SURVEY_ID, SURVEY_ID).patch(replaceClinicOperation)
  } catch (error) {

  }
}

/**
 * This function updates the survey's last_updated metadata to
 * the current date & time
 */
export async function updateSurveyStatus() {
  const date = new Date()
  const day = `${date.getDate() < 10 ? '0' : ''}${date.getDate()}`
  const month = `${date.getMonth() + 1 < 10 ? '0' : ''}${date.getMonth() + 1}`
  const hours = `${date.getHours() < 10 ? '0' : ''}${date.getHours()}`
  const mins = `${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`
  const secs = `${date.getSeconds() < 10 ? '0' : ''}${date.getSeconds()}`
  const newDate = `${month}/${day}/${date.getFullYear()} - ${hours}:${mins}:${secs}`
  try {
    const replaceClinicOperation =
      [
        {
          op: "replace",
          path: "/metadata/last_updated",
          value: newDate
        }
      ]
    await Master.item(SURVEY_ID, SURVEY_ID).patch(replaceClinicOperation)
  } catch (error) {
    throw new Error(`Error happens when updating Survey Metadata. Error is: ${error}`)
  }
}

/**
 * This function checks whether the student's record has already existed within our system
 * @param email : student's home email that we want to check against
 * @returns true if the record exist and false if it's brand new
 */
export async function checkIfStudentExisted(email) {
  try {
    const { resources: data } = await Students.items.query(`${selectAllQuery} WHERE c.email = "${email}"`).fetchAll();
    return data.length > 0;
  } catch (error) {
    throw new Error(`Error happens while fetching student data. Error is: ${error}`)
  }
}

export async function editPreceptorInfo(id, new_data) {
  try {
    const replaceOperation =
      [
        {
          op: "replace",
          path: "", // This means replace the entire thing
          value: new_data
        }
      ]
    await Preceptors.item(id, id).patch(replaceOperation)
  } catch (error) {
    throw new Error(`Error happens while updating preceptor data. Error is: ${error}`)
  }
}

export async function editStudentInfo(id, new_data) {
  try {
    const replaceOperation =
      [
        {
          op: "replace",
          path: "", // This means replace the entire thing
          value: new_data
        }
      ]
    await Students.item(id, id).patch(replaceOperation)
  } catch (error) {
    throw new Error(`Error happens while updating student data. Error is: ${error}`)
  }
}

export async function editPreceptorNote(id, new_data) {
  try {
    const replaceOperation =
      [
        {
          op: "replace",
          path: "/notes",
          value: new_data
        }
      ]
    await Preceptors.item(id, id).patch(replaceOperation)
  } catch (error) {
    throw new Error(`Error happens while updating preceptor data. Error is: ${error}`)
  }
}

export async function editStudentNote(id, new_data) {
  try {
    const replaceOperation =
      [
        {
          op: "replace",
          path: "/notes",
          value: new_data
        }
      ]
    await Students.item(id, id).patch(replaceOperation)
  } catch (error) {
    throw new Error(`Error happens while updating preceptor data. Error is: ${error}`)
  }
}

export async function getStudentFromEmail(email) {
  try {
    const { resources: data } = await Students.items.query(`${selectAllQuery} WHERE c.email = "${email}"`).fetchAll();
    return data;
  } catch (error) {
    throw new Error(`Error happens while finding a student matched to the email. Error is: ${error}`)
  }
}

export async function getPreceptorFromEmail(email) {
  try {
    const { resources: data } = await Preceptors.items.query(`${selectAllQuery} WHERE c.email = "${email}"`).fetchAll();
    return data;
  } catch (error) {
    throw new Error(`Error happens while finding a student matched to the email. Error is: ${error}`)
  }
}

export async function updatePreceptorStatus(id, new_status) {
  try {
    const replaceOperation =
      [
        {
          op: "replace",
          path: "/status",
          value: new_status
        }
      ]
    await Preceptors.item(id, id).patch(replaceOperation)
  } catch (error) {
    throw new Error(`Error happens while updating a preceptor's status. Error is: ${error}`)
  }
}

export async function incrementRegionSiteCount(region_id) {
  try {
    const data = await getClinicOrSiteOrRegion(region_id)
    const cur_site_ct = data.total_sites
    const replaceOperation =
      [{
        op: "replace",
        path: "/total_sites",
        value: cur_site_ct + 1
      }];
    await Master.item(region_id, region_id).patch(replaceOperation)
  } catch (error) {
    throw new Error(`Error happens while incrementing region's site count. Error is: ${error}`)
  }
}

export async function decrementRegionSiteCount(region_id) {
  try {
    const data = await getClinicOrSiteOrRegion(region_id)
    const cur_site_ct = data.total_sites
    const replaceOperation =
      [{
        op: "replace",
        path: "/total_sites",
        value: cur_site_ct - 1
      }];
    await Master.item(region_id, region_id).patch(replaceOperation)
  } catch (error) {
    throw new Error(`Error happens while incrementing region's site count. Error is: ${error}`)
  }
}

export async function checkIfAdminExist(admin_email) {
  try {
    console.log("ADMIN EMAIL", admin_email);
    const { resources: data } = await Admins.items.query(`${selectAllQuery} WHERE c.email = "${admin_email}"`).fetchAll();
    console.log("DATA", data);
    return data.length > 0;
  } catch (error) {
    throw new Error(`Error happens while checking for admin's credential. Error is: ${error}`)
  }
}

/**
 * Temporary Function
 * @deprecated - should only be used once during the initial data transferring
 */
export async function convertAllSitesToActive() {
  const sites = await getAllSites()
  for (let i = 0; i < sites.length; i++) {
    const replaceOperation =
      [{
        op: "replace",
        path: "/status",
        value: "8"
      }];
    await Master.item(sites[i].id, sites[i].id).patch(replaceOperation)
  }
  return 0
}

/**
 * Temporary Function
 * @deprecated - should only be used once during the initial data transferring
 */
export async function convertAllClinicsToActive() {
  const clinics = await getAllClinics()
  for (let i = 0; i < clinics.length; i++) {
    const replaceOperation =
      [{
        op: "replace",
        path: "/status",
        value: "7"
      }];
    await Master.item(clinics[i].id, clinics[i].id).patch(replaceOperation)
  }
  return 0
}

/**
 * Temporary Function
 * @deprecated - should only be used once during the initial data transferring
 */
 export async function addLastUpdatedToAllClinics() {
  const clinics = await getAllClinics()
  for (let i = 0; i < clinics.length; i++) {
    const replaceOperation =
      [{
          op: "replace",
          path: "/last_updated",
          value: "April 14, 2022"
      }];
    await Master.item(clinics[i].id, clinics[i].id).patch(replaceOperation)
  }
  return 0
}

/**
 * Temporary Function
 * @deprecated - should only be used once during the initial data transferring
 */
export async function insertClinicInitialData() {
  const schema = [
    { "title": "Clerance Timeline", "note": "" },
    { "title": "Clerance Requirement", "note": "" },
    { "title": "Orientation", "note": "" },
    { "title": "Tips & Tricks", "note": "" },
    { "title": "Attire", "note": "" }
  ]
  const clinics = await getAllClinics()
  for (let i = 0; i < clinics.length; i++) {
    const replaceOperation =
      [{
        op: "replace",
        path: "/clinicPlacementDetail",
        value: schema
      }];
    await Master.item(clinics[i].id, clinics[i].id).patch(replaceOperation)
  }
  return 0
}