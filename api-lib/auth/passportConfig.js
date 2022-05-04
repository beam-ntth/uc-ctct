import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'

let googleLoginData = {
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: `${process.env.LOCAL_URL}api/auth/accepted`,
  proxy: true
};

passport.serializeUser(async (user, done) => {
  // For debug purposes:
  console.log("Beginning user serialization:")
  console.log("Serialized user:", user);
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  console.log("Deserializing user.")
  const shortUser = {
    name: user.displayName,
    photo: user._json.picture,
    email: user._json.email
  }
  console.log("Deserialized user:", shortUser)
  done(null, shortUser);
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