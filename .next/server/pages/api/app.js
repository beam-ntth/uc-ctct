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

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "passport":
/*!***************************!*\
  !*** external "passport" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("passport");

/***/ }),

/***/ "passport-google-oauth":
/*!****************************************!*\
  !*** external "passport-google-oauth" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("passport-google-oauth");

/***/ }),

/***/ "./pages/api/app.js":
/*!**************************!*\
  !*** ./pages/api/app.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! passport */ \"passport\");\n/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(passport__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var passport_google_oauth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! passport-google-oauth */ \"passport-google-oauth\");\n/* harmony import */ var passport_google_oauth__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(passport_google_oauth__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst express = __webpack_require__(/*! express */ \"express\");\nconst cookieSession = __webpack_require__(/*! cookie-session */ \"cookie-session\");\nfunction App() {\n    const hiddenClientID = \"304769669090-jbm2d80nfpp83j1bgkvrj80cpr0qv7oq.apps.googleusercontent.com\";\n    const hiddenClientSecret = \"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\";\n    const googleLoginData = {\n        consumerKey: hiddenClientID,\n        consumerSecret: hiddenClientSecret,\n        callbackURL: '/auth/accepted',\n        proxy: true\n    };\n    async function gotProfile(accessToken, refreshToken, profile, done) {\n        console.log(\"Google profile has arrived\", profile);\n        // here is a good place to check if user is in DB,\n        // and to store him in DB if not already there. \n        // Second arg to \"done\" will be passed into serializeUser,\n        // should be key to get user out of database.\n        let userid = profile.id;\n        // Get first name from data given by google.\n        let firstName = profile.name.givenName;\n        console.log(\"First name is: \" + firstName);\n        // userid = parseInt(userid);\n        done(null, userid);\n    }\n    passport__WEBPACK_IMPORTED_MODULE_0___default().use(new passport_google_oauth__WEBPACK_IMPORTED_MODULE_1__.Strategy(googleLoginData, gotProfile));\n    const app = express();\n    app.use(cookieSession({\n        maxAge: 6 * 60 * 60 * 1000,\n        // after this user is logged out.\n        // meaningless random string used by encryption\n        keys: [\n            'hanger waldo mercy dance'\n        ]\n    }));\n    app.use((_, res, next)=>{\n        res.header('Access-Control-Allow-Origin', '*');\n        res.header('Access-Control-Allow-Headers', '*');\n        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');\n        next();\n    });\n    app.use(express.json());\n    app.use(passport__WEBPACK_IMPORTED_MODULE_0___default().initialize());\n    // If there is a valid cookie, this stage will ultimately call deserializeUser(),\n    // which we can use to check for a profile in the database\n    app.use(passport__WEBPACK_IMPORTED_MODULE_0___default().session());\n    app.get('/auth/google', passport__WEBPACK_IMPORTED_MODULE_0___default().authenticate('google', {\n        scope: [\n            'profile'\n        ]\n    }));\n    app.get('/auth/accepted', // for educational purposes\n    function(req, res, next) {\n        console.log(\"at auth/accepted\");\n        next();\n    }, // This will issue Server's own HTTPS request to Google\n    // to access the user's profile information with the \n    // temporary key we got in the request. \n    passport__WEBPACK_IMPORTED_MODULE_0___default().authenticate('google'), // then it will run the \"gotProfile\" callback function,\n    // set up the cookie, call serialize, whose \"done\" \n    // will come back here to send back the response\n    // ...with a cookie in it for the Browser! \n    function(req, res) {\n        console.log('Logged in and using cookies!');\n        // tell browser to get the hidden main page of the app\n        res.redirect('/main');\n    });\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0lBQzNDLFFBQVEsQ0FBRTRDLEdBQUcsRUFBRVQsR0FBRyxFQUFFLENBQUM7UUFDakJaLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLENBQThCO1FBQzFDLEVBQXNEO1FBQ3REVyxHQUFHLENBQUNVLFFBQVEsQ0FBQyxDQUFPO0lBQ3hCLENBQUM7QUFDSCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdWMtY3RjdC8uL3BhZ2VzL2FwaS9hcHAuanM/MzZkNiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGFzc3BvcnQgZnJvbSAncGFzc3BvcnQnXG5pbXBvcnQge1N0cmF0ZWd5IGFzIEdvb2dsZVN0cmF0ZWd5fSBmcm9tICdwYXNzcG9ydC1nb29nbGUtb2F1dGgnO1xuXG5jb25zdCBleHByZXNzID0gcmVxdWlyZSgnZXhwcmVzcycpO1xuY29uc3QgY29va2llU2Vzc2lvbiA9IHJlcXVpcmUoJ2Nvb2tpZS1zZXNzaW9uJyk7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEFwcCgpIHtcbiAgY29uc3QgaGlkZGVuQ2xpZW50SUQgPSBwcm9jZXNzLmVudi5DTElFTlRfSURcbiAgY29uc3QgaGlkZGVuQ2xpZW50U2VjcmV0ID0gcHJvY2Vzcy5lbnYuQ0xJRU5UX1NFQ1JFVFxuXG4gIGNvbnN0IGdvb2dsZUxvZ2luRGF0YSA9IHtcbiAgICBjb25zdW1lcktleTogaGlkZGVuQ2xpZW50SUQsXG4gICAgY29uc3VtZXJTZWNyZXQ6IGhpZGRlbkNsaWVudFNlY3JldCxcbiAgICBjYWxsYmFja1VSTDogJy9hdXRoL2FjY2VwdGVkJyxcbiAgICBwcm94eTogdHJ1ZVxuICB9O1xuXG4gIGFzeW5jIGZ1bmN0aW9uIGdvdFByb2ZpbGUoYWNjZXNzVG9rZW4sIHJlZnJlc2hUb2tlbiwgcHJvZmlsZSwgZG9uZSkge1xuICAgIGNvbnNvbGUubG9nKFwiR29vZ2xlIHByb2ZpbGUgaGFzIGFycml2ZWRcIiwgcHJvZmlsZSk7XG4gICAgLy8gaGVyZSBpcyBhIGdvb2QgcGxhY2UgdG8gY2hlY2sgaWYgdXNlciBpcyBpbiBEQixcbiAgICAvLyBhbmQgdG8gc3RvcmUgaGltIGluIERCIGlmIG5vdCBhbHJlYWR5IHRoZXJlLiBcbiAgICAvLyBTZWNvbmQgYXJnIHRvIFwiZG9uZVwiIHdpbGwgYmUgcGFzc2VkIGludG8gc2VyaWFsaXplVXNlcixcbiAgICAvLyBzaG91bGQgYmUga2V5IHRvIGdldCB1c2VyIG91dCBvZiBkYXRhYmFzZS5cblxuICAgIGxldCB1c2VyaWQgPSBwcm9maWxlLmlkO1xuICAgIC8vIEdldCBmaXJzdCBuYW1lIGZyb20gZGF0YSBnaXZlbiBieSBnb29nbGUuXG4gICAgbGV0IGZpcnN0TmFtZSA9IHByb2ZpbGUubmFtZS5naXZlbk5hbWU7XG4gICAgY29uc29sZS5sb2coXCJGaXJzdCBuYW1lIGlzOiBcIisgIGZpcnN0TmFtZSk7XG4gICAgLy8gdXNlcmlkID0gcGFyc2VJbnQodXNlcmlkKTtcblxuICAgIGRvbmUobnVsbCwgdXNlcmlkKTtcbiAgfVxuXG4gIHBhc3Nwb3J0LnVzZShuZXcgR29vZ2xlU3RyYXRlZ3koZ29vZ2xlTG9naW5EYXRhLCBnb3RQcm9maWxlKSk7XG5cbiAgY29uc3QgYXBwID0gZXhwcmVzcygpO1xuXG4gIGFwcC51c2UoY29va2llU2Vzc2lvbih7XG4gICAgbWF4QWdlOiA2ICogNjAgKiA2MCAqIDEwMDAsIC8vIFNpeCBob3VycyBpbiBtaWxsaXNlY29uZHNcbiAgICAvLyBhZnRlciB0aGlzIHVzZXIgaXMgbG9nZ2VkIG91dC5cbiAgICAvLyBtZWFuaW5nbGVzcyByYW5kb20gc3RyaW5nIHVzZWQgYnkgZW5jcnlwdGlvblxuICAgIGtleXM6IFsnaGFuZ2VyIHdhbGRvIG1lcmN5IGRhbmNlJ11cbiAgfSkpO1xuXG4gIGFwcC51c2UoKF8sIHJlcywgbmV4dCkgPT4ge1xuICAgIHJlcy5oZWFkZXIoJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbicsICcqJyk7XG4gICAgcmVzLmhlYWRlcignQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVycycsICcqJyk7XG4gICAgcmVzLmhlYWRlcignQWNjZXNzLUNvbnRyb2wtQWxsb3ctTWV0aG9kcycsICdQVVQsIFBPU1QsIEdFVCwgREVMRVRFLCBPUFRJT05TJyk7XG4gICAgbmV4dCgpO1xuICB9KVxuXG4gIGFwcC51c2UoZXhwcmVzcy5qc29uKCkpO1xuXG4gIGFwcC51c2UocGFzc3BvcnQuaW5pdGlhbGl6ZSgpKTtcblxuICAvLyBJZiB0aGVyZSBpcyBhIHZhbGlkIGNvb2tpZSwgdGhpcyBzdGFnZSB3aWxsIHVsdGltYXRlbHkgY2FsbCBkZXNlcmlhbGl6ZVVzZXIoKSxcbiAgLy8gd2hpY2ggd2UgY2FuIHVzZSB0byBjaGVjayBmb3IgYSBwcm9maWxlIGluIHRoZSBkYXRhYmFzZVxuICBhcHAudXNlKHBhc3Nwb3J0LnNlc3Npb24oKSk7XG5cbiAgYXBwLmdldCgnL2F1dGgvZ29vZ2xlJyxcbiAgICAgIHBhc3Nwb3J0LmF1dGhlbnRpY2F0ZSgnZ29vZ2xlJywgeyBzY29wZTogWydwcm9maWxlJ10gfSkpO1xuXG4gIGFwcC5nZXQoJy9hdXRoL2FjY2VwdGVkJyxcbiAgLy8gZm9yIGVkdWNhdGlvbmFsIHB1cnBvc2VzXG4gIGZ1bmN0aW9uIChyZXEsIHJlcywgbmV4dCkge1xuICAgICAgY29uc29sZS5sb2coXCJhdCBhdXRoL2FjY2VwdGVkXCIpO1xuICAgICAgbmV4dCgpO1xuICB9LFxuICAvLyBUaGlzIHdpbGwgaXNzdWUgU2VydmVyJ3Mgb3duIEhUVFBTIHJlcXVlc3QgdG8gR29vZ2xlXG4gIC8vIHRvIGFjY2VzcyB0aGUgdXNlcidzIHByb2ZpbGUgaW5mb3JtYXRpb24gd2l0aCB0aGUgXG4gIC8vIHRlbXBvcmFyeSBrZXkgd2UgZ290IGluIHRoZSByZXF1ZXN0LiBcbiAgcGFzc3BvcnQuYXV0aGVudGljYXRlKCdnb29nbGUnKSxcbiAgLy8gdGhlbiBpdCB3aWxsIHJ1biB0aGUgXCJnb3RQcm9maWxlXCIgY2FsbGJhY2sgZnVuY3Rpb24sXG4gIC8vIHNldCB1cCB0aGUgY29va2llLCBjYWxsIHNlcmlhbGl6ZSwgd2hvc2UgXCJkb25lXCIgXG4gIC8vIHdpbGwgY29tZSBiYWNrIGhlcmUgdG8gc2VuZCBiYWNrIHRoZSByZXNwb25zZVxuICAvLyAuLi53aXRoIGEgY29va2llIGluIGl0IGZvciB0aGUgQnJvd3NlciEgXG4gIGZ1bmN0aW9uIChyZXEsIHJlcykge1xuICAgICAgY29uc29sZS5sb2coJ0xvZ2dlZCBpbiBhbmQgdXNpbmcgY29va2llcyEnKVxuICAgICAgLy8gdGVsbCBicm93c2VyIHRvIGdldCB0aGUgaGlkZGVuIG1haW4gcGFnZSBvZiB0aGUgYXBwXG4gICAgICByZXMucmVkaXJlY3QoJy9tYWluJyk7XG4gIH0pO1xufSJdLCJuYW1lcyI6WyJwYXNzcG9ydCIsIlN0cmF0ZWd5IiwiR29vZ2xlU3RyYXRlZ3kiLCJleHByZXNzIiwicmVxdWlyZSIsImNvb2tpZVNlc3Npb24iLCJBcHAiLCJoaWRkZW5DbGllbnRJRCIsInByb2Nlc3MiLCJlbnYiLCJDTElFTlRfSUQiLCJoaWRkZW5DbGllbnRTZWNyZXQiLCJDTElFTlRfU0VDUkVUIiwiZ29vZ2xlTG9naW5EYXRhIiwiY29uc3VtZXJLZXkiLCJjb25zdW1lclNlY3JldCIsImNhbGxiYWNrVVJMIiwicHJveHkiLCJnb3RQcm9maWxlIiwiYWNjZXNzVG9rZW4iLCJyZWZyZXNoVG9rZW4iLCJwcm9maWxlIiwiZG9uZSIsImNvbnNvbGUiLCJsb2ciLCJ1c2VyaWQiLCJpZCIsImZpcnN0TmFtZSIsIm5hbWUiLCJnaXZlbk5hbWUiLCJ1c2UiLCJhcHAiLCJtYXhBZ2UiLCJrZXlzIiwiXyIsInJlcyIsIm5leHQiLCJoZWFkZXIiLCJqc29uIiwiaW5pdGlhbGl6ZSIsInNlc3Npb24iLCJnZXQiLCJhdXRoZW50aWNhdGUiLCJzY29wZSIsInJlcSIsInJlZGlyZWN0Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/api/app.js\n");

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