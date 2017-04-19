var serviceWorkerOption = {"assets":["./20b6c47d173c42147658.worker.js","./1df1b3c902249f81d44e.worker.js","./f3a23bb47d8387dc6890.worker.js","./android-chrome-36x36.png","./android-chrome-48x48.png","./android-chrome-96x96.png","./android-chrome-144x144.png","./android-chrome-192x192.png","./android-chrome-72x72.png","./android-chrome-256x256.png","./android-chrome-512x512.png","./android-chrome-384x384.png","./coast-228x228.png","./yandex-browser-50x50.png","./apple-touch-icon-72x72.png","./apple-touch-icon-114x114.png","./apple-touch-icon-60x60.png","./apple-touch-icon-144x144.png","./apple-touch-icon-167x167.png","./apple-touch-icon-57x57.png","./apple-touch-icon-180x180.png","./apple-touch-icon-76x76.png","./apple-touch-icon-precomposed.png","./apple-touch-icon-152x152.png","./apple-touch-icon.png","./apple-touch-icon-120x120.png","./mstile-144x144.png","./mstile-70x70.png","./mstile-150x150.png","./mstile-310x150.png","./mstile-310x310.png","./favicon-16x16.png","./favicon-96x96.png","./favicon-32x32.png","./favicon-230x230.png","./favicon.ico","./apple-touch-startup-image-320x460.png","./apple-touch-startup-image-640x1096.png","./apple-touch-startup-image-750x1294.png","./apple-touch-startup-image-768x1004.png","./apple-touch-startup-image-748x1024.png","./apple-touch-startup-image-1182x2208.png","./apple-touch-startup-image-640x920.png","./apple-touch-startup-image-1242x2148.png","./apple-touch-startup-image-1536x2008.png","./apple-touch-startup-image-1496x2048.png","./firefox_app_60x60.png","./firefox_app_512x512.png","./firefox_app_128x128.png","./manifest.json","./yandex-browser-manifest.json","./browserconfig.xml","./manifest.webapp","./iconstats.json","./bundle.js"]};
        
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