import nextConnect from 'next-connect';
import passport from 'passport'
import setup from '../../../api-lib/auth/passportSetup'

const handler = nextConnect();

handler.use(...setup);

// Redirection to the public page once logged in with Google. 
handler.get('api/auth/accepted', passport.authenticate('google'),
    (req, res) => {
        res.redirect('/main')
    });

export default handler;
