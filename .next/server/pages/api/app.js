"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/app";
exports.ids = ["pages/api/app"];
exports.modules = {

/***/ "cookie-session":
/*!*********************************!*\
  !*** external "cookie-session" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("cookie-session");

/***/ }),

/***/ "passport":
/*!***************************!*\
  !*** external "passport" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("passport");

/***/ }),

/***/ "passport-google-oauth20":
/*!******************************************!*\
  !*** external "passport-google-oauth20" ***!
  \******************************************/
/***/ ((module) => {

module.exports = require("passport-google-oauth20");

/***/ }),

/***/ "next-connect":
/*!*******************************!*\
  !*** external "next-connect" ***!
  \*******************************/
/***/ ((module) => {

module.exports = import("next-connect");;

/***/ }),

/***/ "./pages/api/app.js":
/*!**************************!*\
  !*** ./pages/api/app.js ***!
  \**************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__) => {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! passport */ \"passport\");\n/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(passport__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_connect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-connect */ \"next-connect\");\n/* harmony import */ var passport_google_oauth20__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! passport-google-oauth20 */ \"passport-google-oauth20\");\n/* harmony import */ var passport_google_oauth20__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(passport_google_oauth20__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var cookie_session__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cookie-session */ \"cookie-session\");\n/* harmony import */ var cookie_session__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(cookie_session__WEBPACK_IMPORTED_MODULE_3__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([next_connect__WEBPACK_IMPORTED_MODULE_1__]);\nnext_connect__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? await __webpack_async_dependencies__ : __webpack_async_dependencies__)[0];\n\n\n\n\nconst hiddenClientID = \"304769669090-jbm2d80nfpp83j1bgkvrj80cpr0qv7oq.apps.googleusercontent.com\";\nconst hiddenClientSecret = \"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\";\nconst handler = (0,next_connect__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\npassport__WEBPACK_IMPORTED_MODULE_0___default().use(new passport_google_oauth20__WEBPACK_IMPORTED_MODULE_2__.Strategy({\n    clientID: hiddenClientID,\n    clientSecret: hiddenClientSecret,\n    callbackURL: \"http://localhost:3000/api/auth/accepted\"\n}, function(accessToken, refreshToken, profile, cb) {\n    User.findOrCreate({\n        googleId: profile.id\n    }, function(err, user) {\n        return cb(err, user);\n    });\n}));\n// handler.use(cookieSession({\n//   maxAge: 6 * 60 * 60 * 1000, // Six hours in milliseconds\n//   // after this user is logged out.\n//   // meaningless random string used by encryption\n//   keys: ['hanger waldo mercy dance']\n// }));\n// handler.use(express.json());\nhandler.use(passport__WEBPACK_IMPORTED_MODULE_0___default().initialize());\n// If there is a valid cookie, this stage will ultimately call deserializeUser(),\n// which we can use to check for a profile in the database\n// handler.use(passport.session());\nhandler.get('/api/app', passport__WEBPACK_IMPORTED_MODULE_0___default().authenticate(\"google\", {\n    scope: [\n        'profile',\n        'email'\n    ]\n}));\n// handler.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));\n// handler.get('/auth/google',\n// // for educational purposes\n// function (req, res, next) {\n//     console.log(\"at auth/accepted\");\n//     next();\n// },\n// // This will issue Server's own HTTPS request to Google\n// // to access the user's profile information with the \n// // temporary key we got in the request. \n// passport.authenticate('google'),\n// // then it will run the \"gotProfile\" callback function,\n// // set up the cookie, call serialize, whose \"done\" \n// // will come back here to send back the response\n// // ...with a cookie in it for the Browser! \n// function (req, res) {\n//     console.log('Logged in and using cookies!')\n//     // tell browser to get the hidden main page of the app\n//     res.redirect('/main');\n// });\n// handler.get('/auth/accepted',\n//   passport.authenticate('google', { failureRedirect: '/', failureMessage: true }),\n//   function(req, res) {\n//     res.redirect('/');\n//   });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handler);\n\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9hcGkvYXBwLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStCO0FBQ087QUFDOEI7QUFDMUI7QUFFMUMsS0FBSyxDQUFDSyxjQUFjLEdBQUdDLDBFQUFxQjtBQUM1QyxLQUFLLENBQUNHLGtCQUFrQixHQUFHSCxxQ0FBeUI7QUFFcEQsS0FBSyxDQUFDSyxPQUFPLEdBQUdWLHdEQUFXO0FBRTNCRCxtREFBWSxDQUFDLEdBQUcsQ0FBQ0csNkRBQWMsQ0FBQyxDQUFDO0lBQy9CVSxRQUFRLEVBQUVSLGNBQWM7SUFDeEJTLFlBQVksRUFBRUwsa0JBQWtCO0lBQ2hDTSxXQUFXLEVBQUUsQ0FBeUM7QUFDeEQsQ0FBQyxFQUNELFFBQVEsQ0FBQ0MsV0FBVyxFQUFFQyxZQUFZLEVBQUVDLE9BQU8sRUFBRUMsRUFBRSxFQUFFLENBQUM7SUFDaERDLElBQUksQ0FBQ0MsWUFBWSxDQUFDLENBQUM7UUFBQ0MsUUFBUSxFQUFFSixPQUFPLENBQUNLLEVBQUU7SUFBQyxDQUFDLEVBQUUsUUFBUSxDQUFFQyxHQUFHLEVBQUVDLElBQUksRUFBRSxDQUFDO1FBQ2hFLE1BQU0sQ0FBQ04sRUFBRSxDQUFDSyxHQUFHLEVBQUVDLElBQUk7SUFDckIsQ0FBQztBQUNILENBQUM7QUFHRCxFQUE4QjtBQUM5QixFQUE2RDtBQUM3RCxFQUFzQztBQUN0QyxFQUFvRDtBQUNwRCxFQUF1QztBQUN2QyxFQUFPO0FBRVAsRUFBK0I7QUFFL0JkLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDWiwwREFBbUI7QUFFL0IsRUFBaUY7QUFDakYsRUFBMEQ7QUFDMUQsRUFBbUM7QUFFbkNXLE9BQU8sQ0FBQ2dCLEdBQUcsQ0FBQyxDQUFVLFdBQUUzQiw0REFBcUIsQ0FBQyxDQUFRLFNBQUUsQ0FBQzZCO0lBQUFBLEtBQUssRUFBRSxDQUFDO1FBQUEsQ0FBUztRQUFFLENBQU87SUFBQSxDQUFDO0FBQUEsQ0FBQztBQUVyRixFQUF3RjtBQUV4RixFQUE4QjtBQUM5QixFQUE4QjtBQUM5QixFQUE4QjtBQUM5QixFQUF1QztBQUN2QyxFQUFjO0FBQ2QsRUFBSztBQUNMLEVBQTBEO0FBQzFELEVBQXdEO0FBQ3hELEVBQTJDO0FBQzNDLEVBQW1DO0FBQ25DLEVBQTBEO0FBQzFELEVBQXNEO0FBQ3RELEVBQW1EO0FBQ25ELEVBQThDO0FBQzlDLEVBQXdCO0FBQ3hCLEVBQWtEO0FBQ2xELEVBQTZEO0FBQzdELEVBQTZCO0FBQzdCLEVBQU07QUFFTixFQUFnQztBQUNoQyxFQUFxRjtBQUNyRixFQUF5QjtBQUN6QixFQUF5QjtBQUN6QixFQUFRO0FBRVIsaUVBQWVsQixPQUFPLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly91Yy1jdGN0Ly4vcGFnZXMvYXBpL2FwcC5qcz8zNmQ2Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwYXNzcG9ydCBmcm9tICdwYXNzcG9ydCdcbmltcG9ydCBuZXh0Q29ubmVjdCBmcm9tICduZXh0LWNvbm5lY3QnO1xuaW1wb3J0IHsgU3RyYXRlZ3kgYXMgR29vZ2xlU3RyYXRlZ3kgfSBmcm9tICdwYXNzcG9ydC1nb29nbGUtb2F1dGgyMCc7XG5pbXBvcnQgY29va2llU2Vzc2lvbiBmcm9tICdjb29raWUtc2Vzc2lvbic7XG5cbmNvbnN0IGhpZGRlbkNsaWVudElEID0gcHJvY2Vzcy5lbnYuQ0xJRU5UX0lEXG5jb25zdCBoaWRkZW5DbGllbnRTZWNyZXQgPSBwcm9jZXNzLmVudi5DTElFTlRfU0VDUkVUXG5cbmNvbnN0IGhhbmRsZXIgPSBuZXh0Q29ubmVjdCgpO1xuXG5wYXNzcG9ydC51c2UobmV3IEdvb2dsZVN0cmF0ZWd5KHtcbiAgY2xpZW50SUQ6IGhpZGRlbkNsaWVudElELFxuICBjbGllbnRTZWNyZXQ6IGhpZGRlbkNsaWVudFNlY3JldCxcbiAgY2FsbGJhY2tVUkw6IFwiaHR0cDovL2xvY2FsaG9zdDozMDAwL2FwaS9hdXRoL2FjY2VwdGVkXCJcbn0sXG5mdW5jdGlvbihhY2Nlc3NUb2tlbiwgcmVmcmVzaFRva2VuLCBwcm9maWxlLCBjYikge1xuICBVc2VyLmZpbmRPckNyZWF0ZSh7IGdvb2dsZUlkOiBwcm9maWxlLmlkIH0sIGZ1bmN0aW9uIChlcnIsIHVzZXIpIHtcbiAgICByZXR1cm4gY2IoZXJyLCB1c2VyKTtcbiAgfSk7XG59XG4pKTtcblxuLy8gaGFuZGxlci51c2UoY29va2llU2Vzc2lvbih7XG4vLyAgIG1heEFnZTogNiAqIDYwICogNjAgKiAxMDAwLCAvLyBTaXggaG91cnMgaW4gbWlsbGlzZWNvbmRzXG4vLyAgIC8vIGFmdGVyIHRoaXMgdXNlciBpcyBsb2dnZWQgb3V0LlxuLy8gICAvLyBtZWFuaW5nbGVzcyByYW5kb20gc3RyaW5nIHVzZWQgYnkgZW5jcnlwdGlvblxuLy8gICBrZXlzOiBbJ2hhbmdlciB3YWxkbyBtZXJjeSBkYW5jZSddXG4vLyB9KSk7XG5cbi8vIGhhbmRsZXIudXNlKGV4cHJlc3MuanNvbigpKTtcblxuaGFuZGxlci51c2UocGFzc3BvcnQuaW5pdGlhbGl6ZSgpKTtcblxuLy8gSWYgdGhlcmUgaXMgYSB2YWxpZCBjb29raWUsIHRoaXMgc3RhZ2Ugd2lsbCB1bHRpbWF0ZWx5IGNhbGwgZGVzZXJpYWxpemVVc2VyKCksXG4vLyB3aGljaCB3ZSBjYW4gdXNlIHRvIGNoZWNrIGZvciBhIHByb2ZpbGUgaW4gdGhlIGRhdGFiYXNlXG4vLyBoYW5kbGVyLnVzZShwYXNzcG9ydC5zZXNzaW9uKCkpO1xuXG5oYW5kbGVyLmdldCgnL2FwaS9hcHAnLCBwYXNzcG9ydC5hdXRoZW50aWNhdGUoXCJnb29nbGVcIiwge3Njb3BlOiBbJ3Byb2ZpbGUnLCAnZW1haWwnXX0pKTtcblxuLy8gaGFuZGxlci5nZXQoJy9hdXRoL2dvb2dsZScsIHBhc3Nwb3J0LmF1dGhlbnRpY2F0ZSgnZ29vZ2xlJywgeyBzY29wZTogWydwcm9maWxlJ10gfSkpO1xuXG4vLyBoYW5kbGVyLmdldCgnL2F1dGgvZ29vZ2xlJyxcbi8vIC8vIGZvciBlZHVjYXRpb25hbCBwdXJwb3Nlc1xuLy8gZnVuY3Rpb24gKHJlcSwgcmVzLCBuZXh0KSB7XG4vLyAgICAgY29uc29sZS5sb2coXCJhdCBhdXRoL2FjY2VwdGVkXCIpO1xuLy8gICAgIG5leHQoKTtcbi8vIH0sXG4vLyAvLyBUaGlzIHdpbGwgaXNzdWUgU2VydmVyJ3Mgb3duIEhUVFBTIHJlcXVlc3QgdG8gR29vZ2xlXG4vLyAvLyB0byBhY2Nlc3MgdGhlIHVzZXIncyBwcm9maWxlIGluZm9ybWF0aW9uIHdpdGggdGhlIFxuLy8gLy8gdGVtcG9yYXJ5IGtleSB3ZSBnb3QgaW4gdGhlIHJlcXVlc3QuIFxuLy8gcGFzc3BvcnQuYXV0aGVudGljYXRlKCdnb29nbGUnKSxcbi8vIC8vIHRoZW4gaXQgd2lsbCBydW4gdGhlIFwiZ290UHJvZmlsZVwiIGNhbGxiYWNrIGZ1bmN0aW9uLFxuLy8gLy8gc2V0IHVwIHRoZSBjb29raWUsIGNhbGwgc2VyaWFsaXplLCB3aG9zZSBcImRvbmVcIiBcbi8vIC8vIHdpbGwgY29tZSBiYWNrIGhlcmUgdG8gc2VuZCBiYWNrIHRoZSByZXNwb25zZVxuLy8gLy8gLi4ud2l0aCBhIGNvb2tpZSBpbiBpdCBmb3IgdGhlIEJyb3dzZXIhIFxuLy8gZnVuY3Rpb24gKHJlcSwgcmVzKSB7XG4vLyAgICAgY29uc29sZS5sb2coJ0xvZ2dlZCBpbiBhbmQgdXNpbmcgY29va2llcyEnKVxuLy8gICAgIC8vIHRlbGwgYnJvd3NlciB0byBnZXQgdGhlIGhpZGRlbiBtYWluIHBhZ2Ugb2YgdGhlIGFwcFxuLy8gICAgIHJlcy5yZWRpcmVjdCgnL21haW4nKTtcbi8vIH0pO1xuXG4vLyBoYW5kbGVyLmdldCgnL2F1dGgvYWNjZXB0ZWQnLFxuLy8gICBwYXNzcG9ydC5hdXRoZW50aWNhdGUoJ2dvb2dsZScsIHsgZmFpbHVyZVJlZGlyZWN0OiAnLycsIGZhaWx1cmVNZXNzYWdlOiB0cnVlIH0pLFxuLy8gICBmdW5jdGlvbihyZXEsIHJlcykge1xuLy8gICAgIHJlcy5yZWRpcmVjdCgnLycpO1xuLy8gICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgaGFuZGxlcjsiXSwibmFtZXMiOlsicGFzc3BvcnQiLCJuZXh0Q29ubmVjdCIsIlN0cmF0ZWd5IiwiR29vZ2xlU3RyYXRlZ3kiLCJjb29raWVTZXNzaW9uIiwiaGlkZGVuQ2xpZW50SUQiLCJwcm9jZXNzIiwiZW52IiwiQ0xJRU5UX0lEIiwiaGlkZGVuQ2xpZW50U2VjcmV0IiwiQ0xJRU5UX1NFQ1JFVCIsImhhbmRsZXIiLCJ1c2UiLCJjbGllbnRJRCIsImNsaWVudFNlY3JldCIsImNhbGxiYWNrVVJMIiwiYWNjZXNzVG9rZW4iLCJyZWZyZXNoVG9rZW4iLCJwcm9maWxlIiwiY2IiLCJVc2VyIiwiZmluZE9yQ3JlYXRlIiwiZ29vZ2xlSWQiLCJpZCIsImVyciIsInVzZXIiLCJpbml0aWFsaXplIiwiZ2V0IiwiYXV0aGVudGljYXRlIiwic2NvcGUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/api/app.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/api/app.js"));
module.exports = __webpack_exports__;

})();