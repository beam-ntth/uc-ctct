import nextConnect from 'next-connect';
import passport from 'passport'
import setup from '../../../api-lib/auth/passportSetup'

const handler = nextConnect();

handler.use(...setup);

// API endpoint for redirects from Passport.
handler.get('api/auth/accepted', passport.authenticate('windowslive'),
  (req, res) => {
    res.redirect('/main')
  });

export default handler;
