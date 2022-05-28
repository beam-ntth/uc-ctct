import nextConnect from 'next-connect';
import passport from 'passport'
import setup from '../../../api-lib/auth/passportSetup'

const handler = nextConnect();

handler.use(...setup);

// Redirection to the Google login page. 
handler.get('api/auth/outlook',
  passport.authenticate("windowslive", { scope: ['openid', 'profile', 'offline_access', 'https://outlook.office.com/Mail.Read'] }));

// handler.get('api/auth/outlook',
//   passport.authenticate('msgraph', {
//     scope: [
//       'openid',
//       'profile',
//       'offline_access',
//       'email',
//       'https://graph.microsoft.com/Mail.Read'
//     ]
//   }))
export default handler;