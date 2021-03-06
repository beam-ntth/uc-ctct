import nextConnect from 'next-connect';
import passport from 'passport'
import setup from '../../../api-lib/auth/passportSetup'

const handler = nextConnect();

handler.use(...setup);

// Redirection to the public page once logged in with Google. 
handler.get('api/auth/outlookAccepted', passport.authenticate('windowslive'),
  (req, res) => {
    res.redirect('/main')
  });

export default handler;
