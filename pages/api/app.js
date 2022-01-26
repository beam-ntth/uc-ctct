import passport from 'passport'
import {Strategy as GoogleStrategy} from 'passport-google-oauth';

const express = require('express');
const cookieSession = require('cookie-session');

export default function App() {
  const hiddenClientID = process.env.CLIENT_ID
  const hiddenClientSecret = process.env.CLIENT_SECRET

  const googleLoginData = {
    consumerKey: hiddenClientID,
    consumerSecret: hiddenClientSecret,
    callbackURL: '/auth/accepted',
    proxy: true
  };

  async function gotProfile(accessToken, refreshToken, profile, done) {
    console.log("Google profile has arrived", profile);
    // here is a good place to check if user is in DB,
    // and to store him in DB if not already there. 
    // Second arg to "done" will be passed into serializeUser,
    // should be key to get user out of database.

    let userid = profile.id;
    // Get first name from data given by google.
    let firstName = profile.name.givenName;
    console.log("First name is: "+  firstName);
    // userid = parseInt(userid);

    done(null, userid);
  }

  passport.use(new GoogleStrategy(googleLoginData, gotProfile));

  const app = express();

  app.use(cookieSession({
    maxAge: 6 * 60 * 60 * 1000, // Six hours in milliseconds
    // after this user is logged out.
    // meaningless random string used by encryption
    keys: ['hanger waldo mercy dance']
  }));

  app.use((_, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
  })

  app.use(express.json());

  app.use(passport.initialize());

  // If there is a valid cookie, this stage will ultimately call deserializeUser(),
  // which we can use to check for a profile in the database
  app.use(passport.session());

  app.get('/auth/google',
      passport.authenticate('google', { scope: ['profile'] }));

  app.get('/auth/accepted',
  // for educational purposes
  function (req, res, next) {
      console.log("at auth/accepted");
      next();
  },
  // This will issue Server's own HTTPS request to Google
  // to access the user's profile information with the 
  // temporary key we got in the request. 
  passport.authenticate('google'),
  // then it will run the "gotProfile" callback function,
  // set up the cookie, call serialize, whose "done" 
  // will come back here to send back the response
  // ...with a cookie in it for the Browser! 
  function (req, res) {
      console.log('Logged in and using cookies!')
      // tell browser to get the hidden main page of the app
      res.redirect('/main');
  });
}