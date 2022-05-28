import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { Strategy as OutlookStrategy } from 'passport-outlook'
import { Strategy as AzureAdOauth2Strategy } from 'passport-azure-ad-oauth2'

let googleLoginData = {
  clientID: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
  callbackURL: `${process.env.NEXT_PUBLIC_LOCAL_URL}api/auth/accepted`,
  proxy: true
};

// let outlookLoginData = {
//   clientID: process.env.NEXT_PUBLIC_OUTLOOK_CLIENT_ID,
//   clientSecret: process.env.NEXT_PUBLIC_OUTLOOK_CLIENT_SECRET,
//   callbackURL: `${process.env.NEXT_PUBLIC_LOCAL_URL}api/auth/accepted`,
//   userProfileURL: "https://graph.microsoft.com/v1.0/me/",
//   passReqToCallback: true,
//   name: 'msgraph',
//   proxy: true
// }

// passport.use(new OutlookStrategy({
//   clientID: process.env.NEXT_PUBLIC_OUTLOOK_CLIENT_ID,
//   clientSecret: process.env.NEXT_PUBLIC_OUTLOOK_CLIENT_SECRET,
//   callbackURL: `${process.env.NEXT_PUBLIC_LOCAL_URL}api/auth/accepted`,
//   userProfileURL: "https://graph.microsoft.com/v1.0/me/",
//   passReqToCallback: true,
//   name: 'msgraph'
// },
//   gotProfile
// ));



passport.serializeUser(async (user, done) => {
  // For debug purposes:
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  console.log("USer", user);
  console.log("Deserializing user.")
  const shortUser = {
    name: user.displayName,
    photo: user._json.picture,
    email: user._json.email
  }
  console.log("Deserialized user:", shortUser)
  done(null, shortUser);
});


passport.use(new OutlookStrategy({
  clientID: process.env.NEXT_PUBLIC_OUTLOOK_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_OUTLOOK_CLIENT_SECRET,
  callbackURL: `${process.env.NEXT_PUBLIC_LOCAL_URL}api/auth/accepted`,
  passReqToCallback: true
},
  function (req, accessToken, refreshToken, profile, done) {
    console.log("PROFILE", profile);
    var user = {
      _json: {
        email: profile._json.EmailAddress,
        displayName: profile._json.DisplayName,
        picture: null
      }
    }
    // var user = {
    //   outlookId: profile.id,
    //   name: profile.DisplayName,
    //   email: profile.EmailAddress,
    //   accessToken: accessToken
    // };
    // if (refreshToken)
    //   user.refreshToken = refreshToken;
    // if (profile.MailboxGuid)
    //   user.mailboxGuid = profile.MailboxGuid;
    // if (profile.Alias)
    //   user.alias = profile.Alias;
    console.log("USER", user);
    done(null, user);
  }
));

// passport.use(new OutlookStrategy({
//   clientID: process.env.NEXT_PUBLIC_OUTLOOK_CLIENT_ID,
//   clientSecret: process.env.NEXT_PUBLIC_OUTLOOK_CLIENT_SECRET,
//   callbackURL: `${process.env.NEXT_PUBLIC_LOCAL_URL}api/auth/accepted`,
//   passReqToCallback: true,
//   userProfileURL: 'https://graph.microsoft.com/v1.0/me',
//   name: 'msgraph',
// }, function (req, accessToken, refreshToken, profile, done) {
//   console.log("USING");
//   var user = {
//     outlookId: profile.id,
//     name: profile.DisplayName,
//     email: profile.EmailAddress,
//     accessToken: accessToken
//   };
//   if (refreshToken)
//     user.refreshToken = refreshToken;
//   if (profile.MailboxGuid)
//     user.mailboxGuid = profile.MailboxGuid;
//   if (profile.Alias)
//     user.alias = profile.Alias;
//   // User.findOrCreate(user, function (err, user) {
//   //   return done(err, user);
//   // });
// }))

passport.use(new GoogleStrategy(googleLoginData, gotProfile));


// passport.use(new OutlookStrategy(outlookLoginData, gotProfile));


// Call back function used when passport gets a request. 
// Used to insert profile data for use in the pipeline later. 
async function gotProfile(accessToken, refreshToken, profile, done) {
  console.log("User profile has arrived.", profile);
  // let userid = profile.id;
  done(null, profile);
};

export default passport;