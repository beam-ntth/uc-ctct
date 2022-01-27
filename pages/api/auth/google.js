import passport from 'passport'
import nextConnect from 'next-connect';
import setup from '../../../api-lib/auth/passportSetup'
import cookieSession from 'cookie-session';
import { getSession } from "../../../api-lib/auth/session"
import next from 'next';

const handler = nextConnect();

handler.use(...setup);
// Valid example of using next-connect. Call to google.js when clicking login button was hanging
// because next() was not included.
handler.get('api/auth/google',
  async (req, res, next) => {
    next()
  },
  passport.authenticate("google", { scope: ['profile', 'email'] }));
export default handler;