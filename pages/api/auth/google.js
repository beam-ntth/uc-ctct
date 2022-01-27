import passport from 'passport'
import nextConnect from 'next-connect';
import setup from '../../../api-lib/auth/passportSetup'

const handler = nextConnect();

handler.use(...setup);

// Redirection to the Google login page. 
handler.get('api/auth/google',
  passport.authenticate("google", { scope: ['profile', 'email'] }));
export default handler;