import nextConnect from 'next-connect';
import passport from 'passport'
import setup from '../../../api-lib/auth/passportSetup'

const handler = nextConnect();

handler.use(...setup);

// Redirection to the Google login page. 
// handler.get('api/auth/outlook',
//   passport.authenticate("windowslive", { scope: ['openid', 'profile', 'https://outlook.office.com/Mail.Read'] }));

handler.get('api/auth/outlook',
  passport.authenticate('azure_ad_oauth2'));
export default handler;