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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var configuration = {
  grain: {
    label: "Grain Time",
    value: 5,
    unit: "s",
    type: "number"
  },
  quietCutoff: {
    label: "Quietness Threshold",
    value: 10,
    unit: "%",
    type: "number"
  },
  play: {
    label: "Play/Pause Key",
    value: "p",
    type: "text"
  },
  next: {
    label: "Next Grain Key",
    value: "e",
    type: "text"
  },
  previous: {
    label: "Previous Grain Key",
    value: "q",
    type: "text"
  },
  nextTrack: {
    label: "Next Track Key",
    value: "j",
    type: "text"
  },
  previousTrack: {
    label: "Previous Track Key",
    value: "k",
    type: "text"
  }
};

exports.default = configuration;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isPromise = __webpack_require__(3);

function parseJsonSafely(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return false;
  }
}

function registerPromiseWorker(callback) {

  function postOutgoingMessage(e, messageId, error, result) {
    function postMessage(msg) {
      /* istanbul ignore if */
      if (typeof self.postMessage !== 'function') { // service worker
        e.ports[0].postMessage(msg);
      } else { // web worker
        self.postMessage(msg);
      }
    }
    if (error) {
      /* istanbul ignore else */
      if (typeof console !== 'undefined' && 'error' in console) {
        // This is to make errors easier to debug. I think it's important
        // enough to just leave here without giving the user an option
        // to silence it.
        console.error('Worker caught an error:', error);
      }
      postMessage(JSON.stringify([messageId, {
        message: error.message
      }]));
    } else {
      postMessage(JSON.stringify([messageId, null, result]));
    }
  }

  function tryCatchFunc(callback, message) {
    try {
      return {res: callback(message)};
    } catch (e) {
      return {err: e};
    }
  }

  function handleIncomingMessage(e, callback, messageId, message) {

    var result = tryCatchFunc(callback, message);

    if (result.err) {
      postOutgoingMessage(e, messageId, result.err);
    } else if (!isPromise(result.res)) {
      postOutgoingMessage(e, messageId, null, result.res);
    } else {
      result.res.then(function (finalResult) {
        postOutgoingMessage(e, messageId, null, finalResult);
      }, function (finalError) {
        postOutgoingMessage(e, messageId, finalError);
      });
    }
  }

  function onIncomingMessage(e) {
    var payload = parseJsonSafely(e.data);
    if (!payload) {
      // message isn't stringified json; ignore
      return;
    }
    var messageId = payload[0];
    var message = payload[1];

    if (typeof callback !== 'function') {
      postOutgoingMessage(e, messageId, new Error(
        'Please pass a function into register().'));
    } else {
      handleIncomingMessage(e, callback, messageId, message);
    }
  }

  self.addEventListener('message', onIncomingMessage);
}

module.exports = registerPromiseWorker;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint-disable */

var _register = __webpack_require__(1);

var _register2 = _interopRequireDefault(_register);

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _register2.default)(function (message) {
  var samples = message.samples,
      grains = message.grains,
      framesPerSample = message.framesPerSample;

  var amplitudes = grains.map(function (grain, i) {
    var totaledAmplitude = samples[i].reduce(function (a, b) {
      return a + b;
    }, 0);
    return totaledAmplitude / (grain.end - grain.start + 1);
  });
  var simpleGrains = grains.map(function (grain, index) {
    return {
      start: grain.start,
      end: grain.end,
      amplitude: amplitudes[index]
    };
  });
  var maxAmplitude = amplitudes.reduce(function (a, b) {
    return a > b ? a : b;
  }, -Infinity);
  var finalGrains = simpleGrains.map(function (grain) {
    var amplitudePercentage = grain.amplitude / maxAmplitude;
    var cutoffPercentage = _config2.default.quietCutoff.value / 100;
    var quiet = amplitudePercentage <= cutoffPercentage;
    return _extends({}, grain, {
      quiet: quiet
    });
  });
  var result = {
    grains: finalGrains,
    maxAmplitude: maxAmplitude
  };
  return result;
});

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = isPromise;

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}


/***/ })
/******/ ]);