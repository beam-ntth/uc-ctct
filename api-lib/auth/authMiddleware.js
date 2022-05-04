// Base middleware NextConnect handler.
// Follows guidelines from documentation to avoid utilizing
// same instance of NC to avoid bugs. https://github.com/hoangvvo/next-connect#common-errors

import nc from "next-connect";
import setup from "./passportSetup"


function base() {
  return nc().use(...setup)
}

export function runAuthMiddleware(req, res) {
  return base().run(req, res)
}

// Creates JSON object to route back to login page on unsuccessful login.
export function redirectLogin() {
  return {
    redirect: {
      permanent: false,
      destination: '/',
    },
  }
}

