import nextConnect from 'next-connect';
import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import setup from '../../../api-lib/auth/passportSetup'


const handler = nextConnect();
handler.use(...setup);

handler.get('api/auth/accepted', passport.authenticate('google'),
  (req, res) => {
    res.redirect('/main')
  });

export default handler;
