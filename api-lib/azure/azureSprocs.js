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
 * @param {String} siteID UUIDV4 string of site's ID.
 */
export const addClinicSproc = {
  id: "addClinic",
  body: function addClinic(clinicData, siteID) {
    let context = getContext();
    let collection = context.getCollection();
    let collectionLink = collection.getSelfLink();
    let response = context.getResponse();
    clinicData.type = "clinic";

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
    // Get a 
  }
}


//NEW FORMAT ADD FUNCTION
export const addPreceptorSproc = {
  id: "addPreceptor",
  body: function addPreceptor(receptorData, clinicID) {

    let context = getContext();
    let collection = context.getCollection();
    let collectionLink = collection.getSelfLink();
    let response = context.getResponse();
    preceptorData.type = "preceptor";

    function tryCreate(preceptorData, callback) {
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
 
export const updateSiteNote = {
  id: "siteNote",
  body: function updateSite(siteData){
    {
      let context = getContext();
      let collection = context.getCollection();
      let collectionLink = collection.getSelfLink();
      let response = context.getResponse();
      //siteData.type = "note";

      function tryCreate(callback) {
        var options = {
          disableAutomaticIdGeneration: true
        };
        var isAccepted = collection.createDocument(collectionLink, siteData, options, callback);
        if (!isAccepted) response.setBody("DID NOT WORK");
      }
      function callback(err, item, options) {
        if (err) { throw new Error("ERROR") };
        getContext().getResponse().setBody("WORKED");
      }
  }

}
}


