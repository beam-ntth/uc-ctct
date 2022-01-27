import passport from 'passport'
import nextConnect from 'next-connect';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import cookieSession from 'cookie-session';

const hiddenClientID = process.env.CLIENT_ID
const hiddenClientSecret = process.env.CLIENT_SECRET

const handler = nextConnect();

passport.use(new GoogleStrategy({
  clientID: hiddenClientID,
  clientSecret: hiddenClientSecret,
  // TODO: Will need to change this to the real URL
  callbackURL: "http://localhost:3000/api/auth/accepted",
  proxy: true
},
  function (accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

// handler.use(cookieSession({
//   maxAge: 6 * 60 * 60 * 1000, // Six hours in milliseconds
//   // after this user is logged out.
//   // meaningless random string used by encryption
//   keys: ['hanger waldo mercy dance']
// }));

handler.use(passport.initialize());

// If there is a valid cookie, this stage will ultimately call deserializeUser(),
// which we can use to check for a profile in the database
// handler.use(passport.session());

handler.get('/api/app', passport.authenticate("google", { scope: ['profile', 'email'] }));

export default handler;