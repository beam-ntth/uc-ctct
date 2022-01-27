import passport from './passportConfig';
import cookieSession from "cookie-session";

// Creation of session
const session = cookieSession({
  maxAge: 6 * 60 * 60 * 1000,
  keys: ['random dancing my guy']
});

// Setup needed for passport
let setup = [session, passport.initialize(), passport.session()]

export default setup;