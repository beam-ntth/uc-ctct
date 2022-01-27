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
exports.id = "pages/api/auth/google";
exports.ids = ["pages/api/auth/google"];
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

/***/ "./api-lib/auth/passportConfig.js":
/*!****************************************!*\
  !*** ./api-lib/auth/passportConfig.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! passport */ \"passport\");\n/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(passport__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var passport_google_oauth20__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! passport-google-oauth20 */ \"passport-google-oauth20\");\n/* harmony import */ var passport_google_oauth20__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(passport_google_oauth20__WEBPACK_IMPORTED_MODULE_1__);\n\n\nlet googleLoginData = {\n    clientID: \"304769669090-jbm2d80nfpp83j1bgkvrj80cpr0qv7oq.apps.googleusercontent.com\",\n    clientSecret: \"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\",\n    callbackURL: `${\"http://localhost:3000\"}/api/auth/accepted`,\n    proxy: true\n};\npassport__WEBPACK_IMPORTED_MODULE_0___default().serializeUser((userid, done)=>{\n    console.log(\"Serializing User. Input is: \", userid);\n    done(null, userid);\n});\npassport__WEBPACK_IMPORTED_MODULE_0___default().deserializeUser(async (userid, done)=>{\n    console.log(\"Deserializing user: \", userid);\n    done(null, {\n        userData: \"This is a test. Must create db function first\"\n    });\n});\npassport__WEBPACK_IMPORTED_MODULE_0___default().use(new passport_google_oauth20__WEBPACK_IMPORTED_MODULE_1__.Strategy(googleLoginData, gotProfile));\n// Call back function used when passport gets a request. \n// Used to insert profile data for use in the pipeline later. \nasync function gotProfile(accessToken, refreshToken, profile, done) {\n    console.log(\"User profile has arrived.\", profile);\n    let userid = profile.id;\n    done(null, userid);\n}\n;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((passport__WEBPACK_IMPORTED_MODULE_0___default()));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9hcGktbGliL2F1dGgvcGFzc3BvcnRDb25maWcuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBK0I7QUFDcUM7QUFDcEUsR0FBRyxDQUFDRyxlQUFlLEdBQUcsQ0FBQztJQUNyQkMsUUFBUSxFQUFFQywwRUFBcUI7SUFDL0JHLFlBQVksRUFBRUgscUNBQXlCO0lBQ3ZDSyxXQUFXLEtBQUtMLHVCQUFxQixDQUFDLGtCQUFrQjtJQUN4RE8sS0FBSyxFQUFFLElBQUk7QUFDYixDQUFDO0FBR0RaLDZEQUFzQixFQUFFYyxNQUFNLEVBQUVDLElBQUksR0FBSyxDQUFDO0lBQ3hDQyxPQUFPLENBQUNDLEdBQUcsQ0FBQyxDQUE4QiwrQkFBRUgsTUFBTTtJQUNsREMsSUFBSSxDQUFDLElBQUksRUFBRUQsTUFBTTtBQUNuQixDQUFDO0FBRURkLCtEQUF3QixRQUFRYyxNQUFNLEVBQUVDLElBQUksR0FBSyxDQUFDO0lBQ2hEQyxPQUFPLENBQUNDLEdBQUcsQ0FBQyxDQUFzQix1QkFBRUgsTUFBTTtJQUMxQ0MsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQUNJLFFBQVEsRUFBRSxDQUErQztJQUFDLENBQUM7QUFDMUUsQ0FBQztBQUVEbkIsbURBQVksQ0FBQyxHQUFHLENBQUNFLDZEQUFjLENBQUNDLGVBQWUsRUFBRWtCLFVBQVU7QUFFM0QsRUFBeUQ7QUFDekQsRUFBOEQ7ZUFDL0NBLFVBQVUsQ0FBQ0MsV0FBVyxFQUFFQyxZQUFZLEVBQUVDLE9BQU8sRUFBRVQsSUFBSSxFQUFFLENBQUM7SUFDbkVDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLENBQTJCLDRCQUFFTyxPQUFPO0lBQ2hELEdBQUcsQ0FBQ1YsTUFBTSxHQUFHVSxPQUFPLENBQUNDLEVBQUU7SUFDdkJWLElBQUksQ0FBQyxJQUFJLEVBQUVELE1BQU07QUFDbkIsQ0FBQzs7QUFLRCxpRUFBZWQsaURBQVEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3VjLWN0Y3QvLi9hcGktbGliL2F1dGgvcGFzc3BvcnRDb25maWcuanM/YThkNCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGFzc3BvcnQgZnJvbSBcInBhc3Nwb3J0XCI7XG5pbXBvcnQgeyBTdHJhdGVneSBhcyBHb29nbGVTdHJhdGVneSB9IGZyb20gJ3Bhc3Nwb3J0LWdvb2dsZS1vYXV0aDIwJ1xubGV0IGdvb2dsZUxvZ2luRGF0YSA9IHtcbiAgY2xpZW50SUQ6IHByb2Nlc3MuZW52LkNMSUVOVF9JRCxcbiAgY2xpZW50U2VjcmV0OiBwcm9jZXNzLmVudi5DTElFTlRfU0VDUkVULFxuICBjYWxsYmFja1VSTDogYCR7cHJvY2Vzcy5lbnYuTE9DQUxfVVJMfS9hcGkvYXV0aC9hY2NlcHRlZGAsXG4gIHByb3h5OiB0cnVlXG59O1xuXG5cbnBhc3Nwb3J0LnNlcmlhbGl6ZVVzZXIoKHVzZXJpZCwgZG9uZSkgPT4ge1xuICBjb25zb2xlLmxvZyhcIlNlcmlhbGl6aW5nIFVzZXIuIElucHV0IGlzOiBcIiwgdXNlcmlkKTtcbiAgZG9uZShudWxsLCB1c2VyaWQpO1xufSk7XG5cbnBhc3Nwb3J0LmRlc2VyaWFsaXplVXNlcihhc3luYyAodXNlcmlkLCBkb25lKSA9PiB7XG4gIGNvbnNvbGUubG9nKFwiRGVzZXJpYWxpemluZyB1c2VyOiBcIiwgdXNlcmlkKTtcbiAgZG9uZShudWxsLCB7IHVzZXJEYXRhOiBcIlRoaXMgaXMgYSB0ZXN0LiBNdXN0IGNyZWF0ZSBkYiBmdW5jdGlvbiBmaXJzdFwiIH0pO1xufSk7XG5cbnBhc3Nwb3J0LnVzZShuZXcgR29vZ2xlU3RyYXRlZ3koZ29vZ2xlTG9naW5EYXRhLCBnb3RQcm9maWxlKSk7XG5cbi8vIENhbGwgYmFjayBmdW5jdGlvbiB1c2VkIHdoZW4gcGFzc3BvcnQgZ2V0cyBhIHJlcXVlc3QuIFxuLy8gVXNlZCB0byBpbnNlcnQgcHJvZmlsZSBkYXRhIGZvciB1c2UgaW4gdGhlIHBpcGVsaW5lIGxhdGVyLiBcbmFzeW5jIGZ1bmN0aW9uIGdvdFByb2ZpbGUoYWNjZXNzVG9rZW4sIHJlZnJlc2hUb2tlbiwgcHJvZmlsZSwgZG9uZSkge1xuICBjb25zb2xlLmxvZyhcIlVzZXIgcHJvZmlsZSBoYXMgYXJyaXZlZC5cIiwgcHJvZmlsZSk7XG4gIGxldCB1c2VyaWQgPSBwcm9maWxlLmlkO1xuICBkb25lKG51bGwsIHVzZXJpZCk7XG59O1xuXG5cblxuXG5leHBvcnQgZGVmYXVsdCBwYXNzcG9ydDsiXSwibmFtZXMiOlsicGFzc3BvcnQiLCJTdHJhdGVneSIsIkdvb2dsZVN0cmF0ZWd5IiwiZ29vZ2xlTG9naW5EYXRhIiwiY2xpZW50SUQiLCJwcm9jZXNzIiwiZW52IiwiQ0xJRU5UX0lEIiwiY2xpZW50U2VjcmV0IiwiQ0xJRU5UX1NFQ1JFVCIsImNhbGxiYWNrVVJMIiwiTE9DQUxfVVJMIiwicHJveHkiLCJzZXJpYWxpemVVc2VyIiwidXNlcmlkIiwiZG9uZSIsImNvbnNvbGUiLCJsb2ciLCJkZXNlcmlhbGl6ZVVzZXIiLCJ1c2VyRGF0YSIsInVzZSIsImdvdFByb2ZpbGUiLCJhY2Nlc3NUb2tlbiIsInJlZnJlc2hUb2tlbiIsInByb2ZpbGUiLCJpZCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./api-lib/auth/passportConfig.js\n");

/***/ }),

/***/ "./api-lib/auth/passportSetup.js":
/*!***************************************!*\
  !*** ./api-lib/auth/passportSetup.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _passportConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./passportConfig */ \"./api-lib/auth/passportConfig.js\");\n/* harmony import */ var cookie_session__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cookie-session */ \"cookie-session\");\n/* harmony import */ var cookie_session__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(cookie_session__WEBPACK_IMPORTED_MODULE_1__);\n\n\n// Creation of session\nconst session = cookie_session__WEBPACK_IMPORTED_MODULE_1___default()({\n    maxAge: 6 * 60 * 60 * 1000,\n    keys: [\n        'random dancing my guy'\n    ]\n});\n// Setup needed for passport\nlet setup = [\n    session,\n    _passportConfig__WEBPACK_IMPORTED_MODULE_0__[\"default\"].initialize(),\n    _passportConfig__WEBPACK_IMPORTED_MODULE_0__[\"default\"].session()\n];\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (setup);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9hcGktbGliL2F1dGgvcGFzc3BvcnRTZXR1cC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQXVDO0FBQ0c7QUFFMUMsRUFBc0I7QUFDdEIsS0FBSyxDQUFDRSxPQUFPLEdBQUdELHFEQUFhLENBQUMsQ0FBQztJQUM3QkUsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUk7SUFDMUJDLElBQUksRUFBRSxDQUFDO1FBQUEsQ0FBdUI7SUFBQSxDQUFDO0FBQ2pDLENBQUM7QUFFRCxFQUE0QjtBQUM1QixHQUFHLENBQUNDLEtBQUssR0FBRyxDQUFDSDtJQUFBQSxPQUFPO0lBQUVGLGtFQUFtQjtJQUFJQSwrREFBZ0I7QUFBRSxDQUFDO0FBRWhFLGlFQUFlSyxLQUFLLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly91Yy1jdGN0Ly4vYXBpLWxpYi9hdXRoL3Bhc3Nwb3J0U2V0dXAuanM/ZGUyZiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGFzc3BvcnQgZnJvbSAnLi9wYXNzcG9ydENvbmZpZyc7XG5pbXBvcnQgY29va2llU2Vzc2lvbiBmcm9tIFwiY29va2llLXNlc3Npb25cIjtcblxuLy8gQ3JlYXRpb24gb2Ygc2Vzc2lvblxuY29uc3Qgc2Vzc2lvbiA9IGNvb2tpZVNlc3Npb24oe1xuICBtYXhBZ2U6IDYgKiA2MCAqIDYwICogMTAwMCxcbiAga2V5czogWydyYW5kb20gZGFuY2luZyBteSBndXknXVxufSk7XG5cbi8vIFNldHVwIG5lZWRlZCBmb3IgcGFzc3BvcnRcbmxldCBzZXR1cCA9IFtzZXNzaW9uLCBwYXNzcG9ydC5pbml0aWFsaXplKCksIHBhc3Nwb3J0LnNlc3Npb24oKV1cblxuZXhwb3J0IGRlZmF1bHQgc2V0dXA7Il0sIm5hbWVzIjpbInBhc3Nwb3J0IiwiY29va2llU2Vzc2lvbiIsInNlc3Npb24iLCJtYXhBZ2UiLCJrZXlzIiwic2V0dXAiLCJpbml0aWFsaXplIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./api-lib/auth/passportSetup.js\n");

/***/ }),

/***/ "./pages/api/auth/google.js":
/*!**********************************!*\
  !*** ./pages/api/auth/google.js ***!
  \**********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__) => {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! passport */ \"passport\");\n/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(passport__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_connect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-connect */ \"next-connect\");\n/* harmony import */ var _api_lib_auth_passportSetup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../api-lib/auth/passportSetup */ \"./api-lib/auth/passportSetup.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([next_connect__WEBPACK_IMPORTED_MODULE_1__]);\nnext_connect__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? await __webpack_async_dependencies__ : __webpack_async_dependencies__)[0];\n\n\n\nconst handler = (0,next_connect__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\nhandler.use(..._api_lib_auth_passportSetup__WEBPACK_IMPORTED_MODULE_2__[\"default\"]);\n// Valid example of using next-connect. Call to google.js when clicking login button was hanging\n// because next() was not included.\nhandler.get('api/auth/google', async (req, res, next)=>{\n    next();\n}, passport__WEBPACK_IMPORTED_MODULE_0___default().authenticate(\"google\", {\n    scope: [\n        'profile',\n        'email'\n    ]\n}));\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handler);\n\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9hcGkvYXV0aC9nb29nbGUuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBK0I7QUFDTztBQUNpQjtBQUV2RCxLQUFLLENBQUNHLE9BQU8sR0FBR0Ysd0RBQVc7QUFFM0JFLE9BQU8sQ0FBQ0MsR0FBRyxJQUFJRixtRUFBSztBQUNwQixFQUFnRztBQUNoRyxFQUFtQztBQUNuQ0MsT0FBTyxDQUFDRSxHQUFHLENBQUMsQ0FBaUIseUJBQ3BCQyxHQUFHLEVBQUVDLEdBQUcsRUFBRUMsSUFBSSxHQUFLLENBQUM7SUFDekJBLElBQUk7QUFDTixDQUFDLEVBQ0RSLDREQUFxQixDQUFDLENBQVEsU0FBRSxDQUFDO0lBQUNVLEtBQUssRUFBRSxDQUFDO1FBQUEsQ0FBUztRQUFFLENBQU87SUFBQSxDQUFDO0FBQUMsQ0FBQztBQUNqRSxpRUFBZVAsT0FBTyxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdWMtY3RjdC8uL3BhZ2VzL2FwaS9hdXRoL2dvb2dsZS5qcz9hZTJiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwYXNzcG9ydCBmcm9tICdwYXNzcG9ydCdcbmltcG9ydCBuZXh0Q29ubmVjdCBmcm9tICduZXh0LWNvbm5lY3QnO1xuaW1wb3J0IHNldHVwIGZyb20gJy4uLy4uLy4uL2FwaS1saWIvYXV0aC9wYXNzcG9ydFNldHVwJ1xuXG5jb25zdCBoYW5kbGVyID0gbmV4dENvbm5lY3QoKTtcblxuaGFuZGxlci51c2UoLi4uc2V0dXApO1xuLy8gVmFsaWQgZXhhbXBsZSBvZiB1c2luZyBuZXh0LWNvbm5lY3QuIENhbGwgdG8gZ29vZ2xlLmpzIHdoZW4gY2xpY2tpbmcgbG9naW4gYnV0dG9uIHdhcyBoYW5naW5nXG4vLyBiZWNhdXNlIG5leHQoKSB3YXMgbm90IGluY2x1ZGVkLlxuaGFuZGxlci5nZXQoJ2FwaS9hdXRoL2dvb2dsZScsXG4gIGFzeW5jIChyZXEsIHJlcywgbmV4dCkgPT4ge1xuICAgIG5leHQoKVxuICB9LFxuICBwYXNzcG9ydC5hdXRoZW50aWNhdGUoXCJnb29nbGVcIiwgeyBzY29wZTogWydwcm9maWxlJywgJ2VtYWlsJ10gfSkpO1xuZXhwb3J0IGRlZmF1bHQgaGFuZGxlcjsiXSwibmFtZXMiOlsicGFzc3BvcnQiLCJuZXh0Q29ubmVjdCIsInNldHVwIiwiaGFuZGxlciIsInVzZSIsImdldCIsInJlcSIsInJlcyIsIm5leHQiLCJhdXRoZW50aWNhdGUiLCJzY29wZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/api/auth/google.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/api/auth/google.js"));
module.exports = __webpack_exports__;

})();