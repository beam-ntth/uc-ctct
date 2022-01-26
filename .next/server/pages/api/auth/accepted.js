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
exports.id = "pages/api/auth/accepted";
exports.ids = ["pages/api/auth/accepted"];
exports.modules = {

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

/***/ "./pages/api/auth/accepted.js":
/*!************************************!*\
  !*** ./pages/api/auth/accepted.js ***!
  \************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__) => {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var next_connect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-connect */ \"next-connect\");\n/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! passport */ \"passport\");\n/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(passport__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var passport_google_oauth20__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! passport-google-oauth20 */ \"passport-google-oauth20\");\n/* harmony import */ var passport_google_oauth20__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(passport_google_oauth20__WEBPACK_IMPORTED_MODULE_2__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([next_connect__WEBPACK_IMPORTED_MODULE_0__]);\nnext_connect__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? await __webpack_async_dependencies__ : __webpack_async_dependencies__)[0];\n\n\n\nconst hiddenClientID = \"304769669090-jbm2d80nfpp83j1bgkvrj80cpr0qv7oq.apps.googleusercontent.com\";\nconst hiddenClientSecret = \"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\";\n// const handler = nextConnect();\n// handler.get('/auth/accepted',\n//   function(req, res) {\n//     res.redirect('/main');\n//   });\n// export default handler;\nfunction handler(req, res) {\n    res.status(200).redirect(\"/main\");\n};\n\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9hcGkvYXV0aC9hY2NlcHRlZC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBc0M7QUFDUDtBQUNxQztBQUVwRSxLQUFLLENBQUNJLGNBQWMsR0FBR0MsMEVBQXFCO0FBQzVDLEtBQUssQ0FBQ0csa0JBQWtCLEdBQUdILHFDQUF5QjtBQUVwRCxFQUFpQztBQUVqQyxFQUFnQztBQUNoQyxFQUF5QjtBQUN6QixFQUE2QjtBQUM3QixFQUFRO0FBRVIsRUFBMEI7QUFFWCxRQUFRLENBQUNLLE9BQU8sQ0FBQ0MsR0FBRyxFQUFFQyxHQUFHLEVBQUUsQ0FBQztJQUN2Q0EsR0FBRyxDQUFDQyxNQUFNLENBQUMsR0FBRyxFQUFFQyxRQUFRLENBQUMsQ0FBTztBQUNwQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdWMtY3RjdC8uL3BhZ2VzL2FwaS9hdXRoL2FjY2VwdGVkLmpzP2Q5M2IiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG5leHRDb25uZWN0IGZyb20gJ25leHQtY29ubmVjdCc7XG5pbXBvcnQgcGFzc3BvcnQgZnJvbSAncGFzc3BvcnQnXG5pbXBvcnQgeyBTdHJhdGVneSBhcyBHb29nbGVTdHJhdGVneSB9IGZyb20gJ3Bhc3Nwb3J0LWdvb2dsZS1vYXV0aDIwJztcblxuY29uc3QgaGlkZGVuQ2xpZW50SUQgPSBwcm9jZXNzLmVudi5DTElFTlRfSURcbmNvbnN0IGhpZGRlbkNsaWVudFNlY3JldCA9IHByb2Nlc3MuZW52LkNMSUVOVF9TRUNSRVRcblxuLy8gY29uc3QgaGFuZGxlciA9IG5leHRDb25uZWN0KCk7XG5cbi8vIGhhbmRsZXIuZ2V0KCcvYXV0aC9hY2NlcHRlZCcsXG4vLyAgIGZ1bmN0aW9uKHJlcSwgcmVzKSB7XG4vLyAgICAgcmVzLnJlZGlyZWN0KCcvbWFpbicpO1xuLy8gICB9KTtcblxuLy8gZXhwb3J0IGRlZmF1bHQgaGFuZGxlcjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaGFuZGxlcihyZXEsIHJlcykge1xuICAgIHJlcy5zdGF0dXMoMjAwKS5yZWRpcmVjdChcIi9tYWluXCIpXG59Il0sIm5hbWVzIjpbIm5leHRDb25uZWN0IiwicGFzc3BvcnQiLCJTdHJhdGVneSIsIkdvb2dsZVN0cmF0ZWd5IiwiaGlkZGVuQ2xpZW50SUQiLCJwcm9jZXNzIiwiZW52IiwiQ0xJRU5UX0lEIiwiaGlkZGVuQ2xpZW50U2VjcmV0IiwiQ0xJRU5UX1NFQ1JFVCIsImhhbmRsZXIiLCJyZXEiLCJyZXMiLCJzdGF0dXMiLCJyZWRpcmVjdCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/api/auth/accepted.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/api/auth/accepted.js"));
module.exports = __webpack_exports__;

})();