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
// Using async await in sprocs https://thomaslevesque.com/2019/07/15/using-typescript-to-write-cosmos-db-stored-procedures-with-async-await/

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


// Structure of Microsoft's serverside programming functions
// Functions include queryDocuments, createDocument, etc.
// (by order of args)
// (selfLink, query, options, callback)

// Structure of a callback (by order of args)
// (err, resource, options)

/**
 * Adds a clinic to a site. 
 * Commonly used in areas like addClinic.js component. 
 * @param {JSON} clinicData JSON data of a clinic.
 */
export const addClinicSproc = {
  id: "addClinic",
  body: function addClinic(clinicData) {
    // Add Clinic
    const clinicContext = getContext();
    const clinicCollection = clinicContext.getCollection();
    const clinicCL = clinicCollection.getSelfLink();
    const cinicRes = clinicContext.getResponse();

    tryCreate(callback);

    function tryCreate(callback) {
      var options = {
        disableAutomaticIdGeneration: true
      };
      var isAccepted = clinicCollection.createDocument(clinicCL, clinicData, options, callback);
      if (!isAccepted) cinicRes.setBody("DID NOT WORK");
    }

    function callback(err) {
      if (err) { throw new Error("ERROR") };
      getContext().getResponse().setBody("WORKED");
    }
  }
}

/**
 * Adds a clinic to a site. 
 * Gets called after the clinic has been created. This function
 * increments the total number of site's clinic
 * @param {String} siteID UUIDV4 string of site's ID.
 */
export const incrementClinicCountSproc = {
  id: "incrementClinicCount",
  body: function incrementClinicCount(site_id) {
    const siteContext = getContext();
    const siteCollection = siteContext.getCollection();
    const siteCL = siteCollection.getSelfLink();
    // Edit Site's Total Number of Clinic Count
    // 1. Get the old document
    var siteDocument = null;
    var isAccepted = siteCollection.queryDocuments(
        siteCL,
        `SELECT * FROM sprocTest s WHERE s.id = "${site_id}"`,
        function (err, item, _) {
            if (err || item.length == 0) {
                throw err;
            }
            siteDocument = item[0];
            // Calling a Callback Function
            updateData(siteDocument)
        }
    );
    // Callback Function
    function updateData(site_doc) {
        // 2. Update the field
        site_doc.total_clinics = site_doc.total_clinics + 1;
        // 3. Replace old document with new document
        var accept = siteCollection.replaceDocument(site_doc._self, site_doc,
            function (err, _) {
                if (err) throw "Unable to update clinic, abort";
            }
        )
        if (!accept) throw "Unable to update clinic, abort";
    }
    if (!isAccepted) throw new Error('The query was not accepted by the server.');
  }
}

/**
 * Update Site's Note
 * @param {Object} siteData Site Object Data
 * @param {Object} noteData New Note Object Data
 */
export const updateSiteNoteSproc = {
  id: "updateSiteNote",
  body: function updateSiteNote(siteData, noteData) {
    var collection = getContext().getCollection();
    // 1. Get the old document
    var siteDocument = null;
    var isAccepted = collection.queryDocuments(
        collection.getSelfLink(),
        `SELECT * FROM Master m where m.id = "${siteData.id}"`,
        function (err, item, _) {
            if (err) {
                throw err;
            }
            siteDocument = item[0];
            // Calling a Callback Function
            updateData(siteDocument)
        }
    );
    
    // Callback Function
    function updateData(site_doc) {
        // 2. Update the field
        site_doc.notes = noteData;
        // 3. Replace old document with new document
        var accept = collection.replaceDocument(site_doc._self, site_doc,
            function (err, _) {
                if (err) throw "Unable to update clinic, abort";
            }
        )
        if (!accept) throw "Unable to update clinic, abort";
    }
    if (!isAccepted) throw new Error('The query was not accepted by the server.');
  }
}

/**
 * Add New Preceptor Data to Clinic
 * Usage: This function gets called in clinicPage/preceptorInfoEdit.js
 * @param {Object} preceptor New Preceptor Object Data
 */
export const createNewPreceptorSproc = {
  id: "addPreceptor",
  body: function addPreceptor(clinic_id, preceptor) {
    async function main() {
      await createPreceptorProfile(preceptor);
      const { feed, _ } = await getClinicObject(clinic_id)
      await updateClinicPreceptorList(feed)
    }
    main().catch((err) => getContext().abort(err));

    function createPreceptorProfile(precep) {
      var options = {
        disableAutomaticIdGeneration: true
      };
      return new Promise((resolve, reject) => {
          let isAccepted = __.createDocument(__.getSelfLink(), precep, options, 
            (err, feed, opts) => {
                if (err) reject(err);
                else resolve({
                    feed,
                    options: opts
                });
            });
          if (!isAccepted) reject(new Error(429, "createDocument was not accepted."));
        }
      )
    }

    function getClinicObject(id) {
      const sqlQuery = `SELECT * FROM Master m where m.id = "${id}"`
      return new Promise((resolve, reject) => {
        let isAccepted = __.queryDocuments(__.getSelfLink(), sqlQuery, options, (err, feed, opts)=>{
            if (err) reject(err);
            else resolve({
                feed,
                options: opts
            });
        });
        if (!isAccepted) reject(new Error(429, "queryDocuments was not accepted."));
      });
    }

    function updateClinicPreceptorList(clinic) {
      clinic.preceptorInfo = clinic.preceptorInfo.push(preceptor.id)
      return new Promise((resolve, reject) => {
        let isAccepted = __.replaceDocument(clinic._self, clinic, (err, result, opts)=>{
            if (err) reject(err);
            else resolve({
                result,
                options: opts
            });
        });
        if (!isAccepted) reject(new Error(429, "replaceDocument was not accepted."));
      });
    }
  }
}

export const updateClinicSproc =  {
  id: "addClinicSproc",
  body: function UpdateClinic() {


    async function main() {

    }

    function queryDocuments(query, options) {
      return new Promise((resolve, reject) => {
        // let isAccepted = 
      })

    }
  }
}