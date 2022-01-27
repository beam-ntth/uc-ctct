import passport from './passportConfig';
import cookieSession from "cookie-session";
// import { session } from "./session.js"
const session = cookieSession({
  maxAge: 6 * 60 * 60 * 1000,
  keys: ['random dancing my guy']
});

// const session = await getSession(req, res);

let setup = [session, passport.initialize(), passport.session()]

export default setup;