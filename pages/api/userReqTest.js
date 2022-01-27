import nextConnect from 'next-connect';
import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import setup from '../../api-lib/auth/passportSetup'

const handler = nextConnect();
handler.use(...setup);
handler.get((req, res) => {
  console.log(`User ${req.user} has logged in and is using cookies`);
  // console.log(req);
});

export default handler;