import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
let googleLoginData = {
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: `${process.env.LOCAL_URL}/api/auth/accepted`,
  proxy: true
};

// TODO: DO SERIALIZATION, DESERIALIZATION, SETTING UP IN THIS FILE THEN IMPORT PASSPORT FROM HERE
passport.serializeUser((userid, done) => {
  console.log("Serializing User. Input is: ", userid);
  done(null, userid);
});

passport.deserializeUser(async (userid, done) => {
  console.log("Deserializing user: ", userid);
  done(null, { userData: "This is a test. Must create db function first" });
});

passport.use(new GoogleStrategy(googleLoginData, gotProfile));

// Call back function used when passport gets a request. 
// Used to insert profile data for use in the pipeline later. 
async function gotProfile(accessToken, refreshToken, profile, done) {
  console.log("User profile has arrived.", profile);
  let userid = profile.id;
  // let firstName = profile.name.givenName;
  done(null, userid);
};

// TODO: CAN ALSO DO THIS WITH HANDLER, EXPORT HANDLER WITH THE handler.use(cookieSession)
// OR CAN JUST DO THIS ALL IN AN ARRAY, one including cookie setup. example is of AUTHS by hoangvv

export default passport;