import passport from 'passport'
import nextConnect from 'next-connect';
import setup from '../../../api-lib/auth/passportSetup'
import cookieSession from 'cookie-session';
import { getSession } from "../../../api-lib/auth/session"
import next from 'next';

const handler = nextConnect();
// handler.use(cookieSession({
//   maxAge: 6 * 60 * 60 * 1000, // Six hours in milliseconds
//   // after this user is logged out.
//   // meaningless random string used by encryption
//   keys: ['hanger waldo mercy dance']
// }));
// handler.use(await getSession(req, res));
// handler.use(async (req, res) => { const session = await getSession(req, res); next(); });
// handler.use(...setup);

// handler.use(cookieSession({
//   maxAge: 6 * 60 * 60 * 1000, // Six hours in milliseconds
//   // after this user is logged out.
//   // meaningless random string used by encryption
//   keys: ['hanger waldo mercy dance']
// }));

// handler.use(passport.initialize());
// handler.use(passport.session());

// handler.get((req, res) => { console.log("GOT LOGIN REQ"); passport.authenticate("google", { scope: ['profile', 'email'] }) });
handler.use(...setup);
// Valid example of using next-connect. Call to google.js when clicking login button was hanging
// because next() was not included.
handler.get('api/auth/google',
  async (req, res, next) => {
    next()
  },
  passport.authenticate("google", { scope: ['profile', 'email'] }));
// handler.get((req, res, next) => {

// },
//   passport.authenticate("google", { scope: ['profile', 'email'] }));
export default handler;