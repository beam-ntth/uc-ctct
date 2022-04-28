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
 * 
 */

/**
 * Adds a clinic to a site. 
 * Commonly used in areas like addClinic.js component. 
 * @param {JSON} clinicData JSON data of a clinic.
 * @param {String} siteID UUIDV4 string of site's ID.
 */
export const addClinicSproc = {
  id: "addClinic",
  body: function addClinic(items) {
    const [clinicData, siteId] = items

    // Add Clinic
    let context = getContext();
    let collection = context.getCollection();
    let collectionLink = collection.getSelfLink();
    let response = context.getResponse();

    tryCreate(clinicData, callback);

    function tryCreate(item, callback) {
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

    // Edit Site's Total Number of Clinic Count
    // 1. Get the old document
    var siteDocument = null;
    var isAccepted = collection.queryDocuments(
        collection.getSelfLink(),
        {
          'query': 'SELECT * FROM Master m where m.id = "@siteId"',
          'parameters' : [{'name':'@siteId', 'value': siteId}]
        },
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
        site_doc.total_clinics = site_doc.total_clinics + 1;
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

//NEW FORMAT ADD FUNCTION
export const createNewPreceptorSproc = {
  id: "addPreceptor",
  body: function addPreceptor(preceptor) {

    let context = getContext();
    let collection = context.getCollection();
    let collectionLink = collection.getSelfLink();
    let response = context.getResponse();

    // Generate random id
    const id = uuidv4().toString();
    const actualPreceptor = {
      id: id,
      ...preceptor
    }

    function tryCreate(callback) {
      var options = {
        disableAutomaticIdGeneration: true
      };
      var isAccepted = collection.createDocument(collectionLink, actualPreceptor, options, callback);
      if (!isAccepted) response.setBody("DID NOT WORK");
    }

    function callback(err, item, options) {
      if (err) { throw new Error("ERROR") };
      getContext().getResponse().setBody("WORKED");
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


//NEW FORMAT ADD FUNCTION
// export const addPreceptorFromClinicsPage = {
//   id: "addPreceptor",
//   body: function addPreceptor(preceptorData, clinicID){
//     let context = getContext();
//     let collection = context.getCollection();
//     let collectionLink = collection.getSelfLink();
//     let response = context.getResponse();
//     preceptorData.type = "preceptor";

//     tryCreate(preceptorData, callback){
//       var options = {
//       disableAutomaticIdGeneration : true
//       };
//       var isAccepted = collection.createDocument (collectionLink, clinicData, options, callback);
//       if (!isAccepted) response.setBody("DID NOT WORK");
//     }function callback(err, item, options) {
//       if (err) { throw new Error("ERROR") };
//       getContext().getResponse().setBody("WORKED");
//     }


//     }

//   }
 

export const updateSiteNoteSproc = {
  id: "updatesiteNote",
  body: function updateSite(siteData, noteData){
    var collection = getContext().getCollection();
    
    // 1. Get the old document
    var siteDocument = null;
    var isAccepted = collection.queryDocuments(
        collection.getSelfLink(),
        {
          'query': 'SELECT * FROM Master m where m.id = "@siteId"',
          'parameters' : [{'name':'@siteId', 'value': siteData.id}]
        },
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


