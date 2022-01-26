import nextConnect from 'next-connect';
import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

const hiddenClientID = process.env.CLIENT_ID
const hiddenClientSecret = process.env.CLIENT_SECRET

// const handler = nextConnect();

// handler.get('/auth/accepted',
//   function(req, res) {
//     res.redirect('/main');
//   });

// export default handler;

// handler.get('/auth/google',
// // for educational purposes
// function (req, res, next) {
//     console.log("at auth/accepted");
//     next();
// },
// // This will issue Server's own HTTPS request to Google
// // to access the user's profile information with the 
// // temporary key we got in the request. 
// passport.authenticate('google'),
// // then it will run the "gotProfile" callback function,
// // set up the cookie, call serialize, whose "done" 
// // will come back here to send back the response
// // ...with a cookie in it for the Browser! 
// function (req, res) {
//     console.log('Logged in and using cookies!')
//     // tell browser to get the hidden main page of the app
//     res.redirect('/main');
// });

export default function handler(req, res) {
    res.status(200).redirect("/main")
}