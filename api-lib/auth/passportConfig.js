import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'

// Mock data for dev
// let googleLoginData = {
//   clientID: 'my_id',
//   clientSecret: 'my_secret',
//   callbackURL: `call_me_maybe`,
//   proxy: true
// };

let googleLoginData = {
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: `${process.env.LOCAL_URL}api/auth/accepted`,
  proxy: true
};

passport.serializeUser((user, done) => {
  // console.log("Serializing User. Input is: ", user);
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  // console.log("Deserializing user: ", user);
  // const testObject = {
  //   userName: 'testUSerName'
  // }
  done(null, user);
});

passport.use(new GoogleStrategy(googleLoginData, gotProfile));

// Call back function used when passport gets a request. 
// Used to insert profile data for use in the pipeline later. 
async function gotProfile(accessToken, refreshToken, profile, done) {
  console.log("User profile has arrived.", profile);
  // let userid = profile.id;
  done(null, profile);
};

export default passport;