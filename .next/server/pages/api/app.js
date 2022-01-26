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

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__) => {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! passport */ \"passport\");\n/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(passport__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_connect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-connect */ \"next-connect\");\n/* harmony import */ var passport_google_oauth20__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! passport-google-oauth20 */ \"passport-google-oauth20\");\n/* harmony import */ var passport_google_oauth20__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(passport_google_oauth20__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var cookie_session__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cookie-session */ \"cookie-session\");\n/* harmony import */ var cookie_session__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(cookie_session__WEBPACK_IMPORTED_MODULE_3__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([next_connect__WEBPACK_IMPORTED_MODULE_1__]);\nnext_connect__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? await __webpack_async_dependencies__ : __webpack_async_dependencies__)[0];\n\n\n\n\nconst hiddenClientID = \"304769669090-jbm2d80nfpp83j1bgkvrj80cpr0qv7oq.apps.googleusercontent.com\";\nconst hiddenClientSecret = \"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\";\nconst handler = (0,next_connect__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\npassport__WEBPACK_IMPORTED_MODULE_0___default().use(new passport_google_oauth20__WEBPACK_IMPORTED_MODULE_2__.Strategy({\n    clientID: hiddenClientID,\n    clientSecret: hiddenClientSecret,\n    // TODO: Will need to change this to the real URL\n    callbackURL: \"http://localhost:3000/api/auth/accepted\"\n}, function(accessToken, refreshToken, profile, cb) {\n    User.findOrCreate({\n        googleId: profile.id\n    }, function(err, user) {\n        return cb(err, user);\n    });\n}));\n// handler.use(cookieSession({\n//   maxAge: 6 * 60 * 60 * 1000, // Six hours in milliseconds\n//   // after this user is logged out.\n//   // meaningless random string used by encryption\n//   keys: ['hanger waldo mercy dance']\n// }));\nhandler.use(passport__WEBPACK_IMPORTED_MODULE_0___default().initialize());\n// If there is a valid cookie, this stage will ultimately call deserializeUser(),\n// which we can use to check for a profile in the database\n// handler.use(passport.session());\nhandler.get('/api/app', passport__WEBPACK_IMPORTED_MODULE_0___default().authenticate(\"google\", {\n    scope: [\n        'profile',\n        'email'\n    ]\n}));\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handler);\n\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9hcGkvYXBwLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStCO0FBQ087QUFDOEI7QUFDMUI7QUFFMUMsS0FBSyxDQUFDSyxjQUFjLEdBQUdDLDBFQUFxQjtBQUM1QyxLQUFLLENBQUNHLGtCQUFrQixHQUFHSCxxQ0FBeUI7QUFFcEQsS0FBSyxDQUFDSyxPQUFPLEdBQUdWLHdEQUFXO0FBRTNCRCxtREFBWSxDQUFDLEdBQUcsQ0FBQ0csNkRBQWMsQ0FBQyxDQUFDO0lBQy9CVSxRQUFRLEVBQUVSLGNBQWM7SUFDeEJTLFlBQVksRUFBRUwsa0JBQWtCO0lBQ2hDLEVBQWlEO0lBQ2pETSxXQUFXLEVBQUUsQ0FBeUM7QUFDeEQsQ0FBQyxFQUNELFFBQVEsQ0FBQ0MsV0FBVyxFQUFFQyxZQUFZLEVBQUVDLE9BQU8sRUFBRUMsRUFBRSxFQUFFLENBQUM7SUFDaERDLElBQUksQ0FBQ0MsWUFBWSxDQUFDLENBQUM7UUFBQ0MsUUFBUSxFQUFFSixPQUFPLENBQUNLLEVBQUU7SUFBQyxDQUFDLEVBQUUsUUFBUSxDQUFFQyxHQUFHLEVBQUVDLElBQUksRUFBRSxDQUFDO1FBQ2hFLE1BQU0sQ0FBQ04sRUFBRSxDQUFDSyxHQUFHLEVBQUVDLElBQUk7SUFDckIsQ0FBQztBQUNILENBQUM7QUFHRCxFQUE4QjtBQUM5QixFQUE2RDtBQUM3RCxFQUFzQztBQUN0QyxFQUFvRDtBQUNwRCxFQUF1QztBQUN2QyxFQUFPO0FBRVBkLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDWiwwREFBbUI7QUFFL0IsRUFBaUY7QUFDakYsRUFBMEQ7QUFDMUQsRUFBbUM7QUFFbkNXLE9BQU8sQ0FBQ2dCLEdBQUcsQ0FBQyxDQUFVLFdBQUUzQiw0REFBcUIsQ0FBQyxDQUFRLFNBQUUsQ0FBQzZCO0lBQUFBLEtBQUssRUFBRSxDQUFDO1FBQUEsQ0FBUztRQUFFLENBQU87SUFBQSxDQUFDO0FBQUEsQ0FBQztBQUVyRixpRUFBZWxCLE9BQU8sRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3VjLWN0Y3QvLi9wYWdlcy9hcGkvYXBwLmpzPzM2ZDYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBhc3Nwb3J0IGZyb20gJ3Bhc3Nwb3J0J1xyXG5pbXBvcnQgbmV4dENvbm5lY3QgZnJvbSAnbmV4dC1jb25uZWN0JztcclxuaW1wb3J0IHsgU3RyYXRlZ3kgYXMgR29vZ2xlU3RyYXRlZ3kgfSBmcm9tICdwYXNzcG9ydC1nb29nbGUtb2F1dGgyMCc7XHJcbmltcG9ydCBjb29raWVTZXNzaW9uIGZyb20gJ2Nvb2tpZS1zZXNzaW9uJztcclxuXHJcbmNvbnN0IGhpZGRlbkNsaWVudElEID0gcHJvY2Vzcy5lbnYuQ0xJRU5UX0lEXHJcbmNvbnN0IGhpZGRlbkNsaWVudFNlY3JldCA9IHByb2Nlc3MuZW52LkNMSUVOVF9TRUNSRVRcclxuXHJcbmNvbnN0IGhhbmRsZXIgPSBuZXh0Q29ubmVjdCgpO1xyXG5cclxucGFzc3BvcnQudXNlKG5ldyBHb29nbGVTdHJhdGVneSh7XHJcbiAgY2xpZW50SUQ6IGhpZGRlbkNsaWVudElELFxyXG4gIGNsaWVudFNlY3JldDogaGlkZGVuQ2xpZW50U2VjcmV0LFxyXG4gIC8vIFRPRE86IFdpbGwgbmVlZCB0byBjaGFuZ2UgdGhpcyB0byB0aGUgcmVhbCBVUkxcclxuICBjYWxsYmFja1VSTDogXCJodHRwOi8vbG9jYWxob3N0OjMwMDAvYXBpL2F1dGgvYWNjZXB0ZWRcIlxyXG59LFxyXG5mdW5jdGlvbihhY2Nlc3NUb2tlbiwgcmVmcmVzaFRva2VuLCBwcm9maWxlLCBjYikge1xyXG4gIFVzZXIuZmluZE9yQ3JlYXRlKHsgZ29vZ2xlSWQ6IHByb2ZpbGUuaWQgfSwgZnVuY3Rpb24gKGVyciwgdXNlcikge1xyXG4gICAgcmV0dXJuIGNiKGVyciwgdXNlcik7XHJcbiAgfSk7XHJcbn1cclxuKSk7XHJcblxyXG4vLyBoYW5kbGVyLnVzZShjb29raWVTZXNzaW9uKHtcclxuLy8gICBtYXhBZ2U6IDYgKiA2MCAqIDYwICogMTAwMCwgLy8gU2l4IGhvdXJzIGluIG1pbGxpc2Vjb25kc1xyXG4vLyAgIC8vIGFmdGVyIHRoaXMgdXNlciBpcyBsb2dnZWQgb3V0LlxyXG4vLyAgIC8vIG1lYW5pbmdsZXNzIHJhbmRvbSBzdHJpbmcgdXNlZCBieSBlbmNyeXB0aW9uXHJcbi8vICAga2V5czogWydoYW5nZXIgd2FsZG8gbWVyY3kgZGFuY2UnXVxyXG4vLyB9KSk7XHJcblxyXG5oYW5kbGVyLnVzZShwYXNzcG9ydC5pbml0aWFsaXplKCkpO1xyXG5cclxuLy8gSWYgdGhlcmUgaXMgYSB2YWxpZCBjb29raWUsIHRoaXMgc3RhZ2Ugd2lsbCB1bHRpbWF0ZWx5IGNhbGwgZGVzZXJpYWxpemVVc2VyKCksXHJcbi8vIHdoaWNoIHdlIGNhbiB1c2UgdG8gY2hlY2sgZm9yIGEgcHJvZmlsZSBpbiB0aGUgZGF0YWJhc2VcclxuLy8gaGFuZGxlci51c2UocGFzc3BvcnQuc2Vzc2lvbigpKTtcclxuXHJcbmhhbmRsZXIuZ2V0KCcvYXBpL2FwcCcsIHBhc3Nwb3J0LmF1dGhlbnRpY2F0ZShcImdvb2dsZVwiLCB7c2NvcGU6IFsncHJvZmlsZScsICdlbWFpbCddfSkpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgaGFuZGxlcjsiXSwibmFtZXMiOlsicGFzc3BvcnQiLCJuZXh0Q29ubmVjdCIsIlN0cmF0ZWd5IiwiR29vZ2xlU3RyYXRlZ3kiLCJjb29raWVTZXNzaW9uIiwiaGlkZGVuQ2xpZW50SUQiLCJwcm9jZXNzIiwiZW52IiwiQ0xJRU5UX0lEIiwiaGlkZGVuQ2xpZW50U2VjcmV0IiwiQ0xJRU5UX1NFQ1JFVCIsImhhbmRsZXIiLCJ1c2UiLCJjbGllbnRJRCIsImNsaWVudFNlY3JldCIsImNhbGxiYWNrVVJMIiwiYWNjZXNzVG9rZW4iLCJyZWZyZXNoVG9rZW4iLCJwcm9maWxlIiwiY2IiLCJVc2VyIiwiZmluZE9yQ3JlYXRlIiwiZ29vZ2xlSWQiLCJpZCIsImVyciIsInVzZXIiLCJpbml0aWFsaXplIiwiZ2V0IiwiYXV0aGVudGljYXRlIiwic2NvcGUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/api/app.js\n");

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