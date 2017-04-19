var serviceWorkerOption = {"assets":["./20b6c47d173c42147658.worker.js","./f3a23bb47d8387dc6890.worker.js","./1df1b3c902249f81d44e.worker.js","./icons-4c4dfbd517d48971f211c45f9fa9df7e/android-chrome-36x36.png","./icons-4c4dfbd517d48971f211c45f9fa9df7e/android-chrome-48x48.png","./icons-4c4dfbd517d48971f211c45f9fa9df7e/android-chrome-72x72.png","./icons-4c4dfbd517d48971f211c45f9fa9df7e/android-chrome-96x96.png","./icons-4c4dfbd517d48971f211c45f9fa9df7e/android-chrome-192x192.png","./icons-4c4dfbd517d48971f211c45f9fa9df7e/android-chrome-144x144.png","./icons-4c4dfbd517d48971f211c45f9fa9df7e/android-chrome-256x256.png","./icons-4c4dfbd517d48971f211c45f9fa9df7e/android-chrome-384x384.png","./icons-4c4dfbd517d48971f211c45f9fa9df7e/android-chrome-512x512.png","./icons-4c4dfbd517d48971f211c45f9fa9df7e/coast-228x228.png","./icons-4c4dfbd517d48971f211c45f9fa9df7e/yandex-browser-50x50.png","./icons-4c4dfbd517d48971f211c45f9fa9df7e/apple-touch-icon-72x72.png","./icons-4c4dfbd517d48971f211c45f9fa9df7e/apple-touch-icon-60x60.png","./icons-4c4dfbd517d48971f211c45f9fa9df7e/apple-touch-icon-57x57.png","./icons-4c4dfbd517d48971f211c45f9fa9df7e/apple-touch-icon-76x76.png","./icons-4c4dfbd517d48971f211c45f9fa9df7e/apple-touch-icon-120x120.png","./icons-4c4dfbd517d48971f211c45f9fa9df7e/apple-touch-icon-144x144.png","./icons-4c4dfbd517d48971f211c45f9fa9df7e/apple-touch-icon-152x152.png","./icons-4c4dfbd517d48971f211c45f9fa9df7e/apple-touch-icon-precomposed.png","./icons-4c4dfbd517d48971f211c45f9fa9df7e/apple-touch-icon-180x180.png","./icons-4c4dfbd517d48971f211c45f9fa9df7e/apple-touch-icon-114x114.png","./icons-4c4dfbd517d48971f211c45f9fa9df7e/apple-touch-icon-167x167.png","./icons-4c4dfbd517d48971f211c45f9fa9df7e/apple-touch-icon.png","./icons-4c4dfbd517d48971f211c45f9fa9df7e/mstile-144x144.png","./icons-4c4dfbd517d48971f211c45f9fa9df7e/mstile-310x150.png","./icons-4c4dfbd517d48971f211c45f9fa9df7e/mstile-70x70.png","./icons-4c4dfbd517d48971f211c45f9fa9df7e/mstile-150x150.png","./icons-4c4dfbd517d48971f211c45f9fa9df7e/mstile-310x310.png","./icons-4c4dfbd517d48971f211c45f9fa9df7e/favicon-16x16.png","./icons-4c4dfbd517d48971f211c45f9fa9df7e/favicon-230x230.png","./icons-4c4dfbd517d48971f211c45f9fa9df7e/favicon-96x96.png","./icons-4c4dfbd517d48971f211c45f9fa9df7e/favicon-32x32.png","./icons-4c4dfbd517d48971f211c45f9fa9df7e/favicon.ico","./icons-4c4dfbd517d48971f211c45f9fa9df7e/apple-touch-startup-image-320x460.png","./icons-4c4dfbd517d48971f211c45f9fa9df7e/apple-touch-startup-image-640x920.png","./icons-4c4dfbd517d48971f211c45f9fa9df7e/apple-touch-startup-image-640x1096.png","./icons-4c4dfbd517d48971f211c45f9fa9df7e/apple-touch-startup-image-768x1004.png","./icons-4c4dfbd517d48971f211c45f9fa9df7e/apple-touch-startup-image-750x1294.png","./icons-4c4dfbd517d48971f211c45f9fa9df7e/apple-touch-startup-image-748x1024.png","./icons-4c4dfbd517d48971f211c45f9fa9df7e/apple-touch-startup-image-1182x2208.png","./icons-4c4dfbd517d48971f211c45f9fa9df7e/apple-touch-startup-image-1242x2148.png","./icons-4c4dfbd517d48971f211c45f9fa9df7e/apple-touch-startup-image-1496x2048.png","./icons-4c4dfbd517d48971f211c45f9fa9df7e/apple-touch-startup-image-1536x2008.png","./icons-4c4dfbd517d48971f211c45f9fa9df7e/firefox_app_60x60.png","./icons-4c4dfbd517d48971f211c45f9fa9df7e/firefox_app_512x512.png","./icons-4c4dfbd517d48971f211c45f9fa9df7e/firefox_app_128x128.png","./icons-4c4dfbd517d48971f211c45f9fa9df7e/manifest.json","./icons-4c4dfbd517d48971f211c45f9fa9df7e/yandex-browser-manifest.json","./icons-4c4dfbd517d48971f211c45f9fa9df7e/browserconfig.xml","./icons-4c4dfbd517d48971f211c45f9fa9df7e/manifest.webapp","./iconstats-98f7b491e892398b358b.json","./bundle.js","./manifest.json"]};
        
        /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
	return new Worker(__webpack_require__.p + "20b6c47d173c42147658.worker.js");
};

/***/ })
/******/ ]);