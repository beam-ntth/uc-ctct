// Base middleware NextConnect handler.
// Follows guidelines from documentation to avoid utilizing
// same instance of NC to avoid bugs. https://github.com/hoangvvo/next-connect#common-errors

import nc from "next-connect";
import setup from "./passportSetup"
import { checkIfAdminExist } from "../azure/azureOps";

export const noUserRedirect = {
  redirect: {
    permanent: false,
    destination: '/',
  },
}

const unauthorizedRedirect = {
  redirect: {
    permanent: false,
    destination: '/?auth=failed',
  },
}

function base() {
  return nc().use(...setup)
}

// export async function runAuthMiddleware(req, res) {
//   await base().run(req, res);
//   let user = req.user;
//   console.log("User is", req);


//   const adminExists = await checkIfAdminExist(user.email);

//   if (!user) {
//     return noUserRedirect
//   } else if (user && !adminExists) {
//     return noUserRedirect;
//   } else {
//     return null;
//   }

//   // return base().run(req, res)
// }

/**
 * Using the base version of our NextConnect handler, run and initialize passport setup. 
 * @param {Request} req 
 * @param {Response} res 
 */
async function initMiddleware(req, res) {
  return base().run(req, res);
}

/**
 * Runs auth middleware with passport logic. 
 * Checks for authentication, and if user exists. 
 * If failing any authentication, then returns redirect.
 * Used in getServerSideProps()
 * @param {Request} req 
 * @param {Response} res 
 * @returns Redirect if no user or user is not authorized. Otherwise null.
 */
export async function runAuthMiddleware(req, res) {
  await initMiddleware(req, res);
  const user = req.user;
  if (!user) {
    return noUserRedirect;
  } else if (user && !await checkIfAdminExist(user.email)) {
    return unauthorizedRedirect;
  } else {
    return null;
  }
}

/**
 * Creates JSON object to route back to login page on unsuccessful login.
 * @param {JSON} user
 * @returns JSON object of where to redirect, or void
 */
export async function redirectLogin(user) {
  let name = user.name;
  console.log("NAMES", name);
  const adminExists = await checkIfAdminExist(user.email)
  if (!user) {
    return noUserRedirect
  } else if (user && !adminExists) {
    return noUserRedirect;
  } else {
    return null;
  }

}