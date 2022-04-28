"use strict";

import { client } from "./azureConfig";
import { v4 as uuidv4 } from "uuid";

// Stored procedures to promote atomicity and ACID with the DB. 
// Functions based off azureOps functions. Consider any functions that mutate the 
// DB in azureOps deprecated and no longer in use. 

// Functions should be used with the Proxy pattern to allow easy updating of code 
// if clients move onto a new DB provider.

// Important documents for sprocs can be found below:
// https://docs.microsoft.com/en-us/azure/cosmos-db/sql/how-to-write-stored-procedures-triggers-udfs?tabs=javascript
// https://docs.microsoft.com/en-us/azure/cosmos-db/sql/how-to-use-stored-procedures-triggers-udfs
// JS Serverside Programming documentation https://azure.github.io/azure-cosmosdb-js-server
// https://docs.microsoft.com/en-us/azure/cosmos-db/sql/javascript-query-api
// Documentation for JS SDK https://docs.microsoft.com/en-us/javascript/api/@azure/cosmos/storedprocedures?view=azure-node-latest

const DB = client.database("uc-ctct");
export const CONTAINER = DB.container("sprocTest");
// CONTAINER.scripts
/** POST FUNCTIONS */

/** 
 * Each sproc is written in JSON, with properties sprocID and sprocBody. 
 * Each object will be exported to be used with Proxy pattern to call that sproc. 
 * Example of formatting: 
 * 
 * var helloWorldStoredProc = {  
 *  id: "helloWorld",  
 *   body: function () {  
 *      var context = getContext();  
 *       var response = context.getResponse();   
 *       response.setBody("Hello, World");  
 *   }  
 * }  
 */

/**
 * Formatting of writing our sprocs: 
 * All sprocs should return a completed property in their body. 
 * This is because a sproc may return without actually completing. This data will be used
 * to alert clients if a function did not complete for any reason.
 */

// /**
//  * Adding one clinic's data to a specific site.
//  * @param {JSON} clinicData JSON data of a clinic.
//  * @param {String} siteID UUIDV4 string of a site's ID. 
//  */
// export function addClinic(clinicData,  siteID)

/**
 * Adds a clinic to a site. 
 * Commonly used in areas like addClinic.js component. 
 * @param {JSON} clinicData JSON data of a clinic.
 */
export const addClinicSproc = {
  id: "addClinic",
  body: function addClinic(clinicData) {
    let context = getContext();
    let collection = context.getCollection();
    let collectionLink = collection.getSelfLink();
    let response = context.getResponse();

    tryCreate(clinicData, callback);

    function tryCreate(callback) {
      var options = {
        disableAutomaticIdGeneration: true
      };
      var isAccepted = collection.createDocument(collectionLink, clinicData, options, callback);
      if (!isAccepted) response.setBody("DID NOT WORK");
    }

    function callback(err, item, options) {
      if (err) { throw new Error("ERROR") };
      getContext().getResponse().setBody("WORKED");
    }
  }
}

/**
 * General patch operation to update a clinic. 
 * @param {JSON} newClinicData New data clinic to update DB with.
 * @returns 
 */
export const updateClinicSproc = {
  id: "updateClinic", 
  body: function updateClinic(newClinicData) {
    var context = getContext();
    var container = context.getCollection();
    var response = context.getResponse();

    // Document to be updated with clinic
    let clinicDoc;
    // Query for the clinic to replace
    let filterQuery = {
      query: 'SELECT * FROM c WHERE c.id = @siteID', 
      parameter: [{name: '@siteID', value: newClinicData.id}]
    }

    var accept = container.queryDocument(container.getSelfLink(), filterQuery, {}, tryQuery(err, clinicDoc))
  }

  // updateClinicSproc.updateClinic.catch
}