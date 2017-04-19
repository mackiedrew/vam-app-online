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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isPromise = __webpack_require__(2);

function registerPromiseWorker(callback) {

  function postOutgoingMessage(e, messageId, error, result) {
    function postMessage(msg, transferList) {
      /* istanbul ignore if */
      if (typeof self.postMessage !== 'function') { // service worker
        e.ports[0].postMessage(msg, transferList);
      } else { // web worker
        self.postMessage(msg, transferList);
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
      postMessage([messageId, {
        message: error.message
      }]);
    } else {
      if (result instanceof MessageWithTransferList) {
        postMessage([messageId, null, result.message], result.transferList);
      } else {
        postMessage([messageId, null, result]);
      }
    }
  }

  function tryCatchFunc(callback, message) {
    try {
      return {res: callback(message, withTransferList)};
    } catch (e) {
      return {err: e};
    }
  }

  function withTransferList(resMessage, transferList) {
    return new MessageWithTransferList(resMessage, transferList);
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
    var payload = e.data;
    if (!Array.isArray(payload) || payload.length !== 2) {
      // message doens't match communication format; ignore
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

  function MessageWithTransferList(message, transferList) {
    this.message = message;
    this.transferList = transferList;
  }

  self.addEventListener('message', onIncomingMessage);
}

module.exports = registerPromiseWorker;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var formats = {
  0x0001: "lpcm",
  0x0003: "lpcm"
};

function decode(buffer) {
  if (global.Buffer && buffer instanceof global.Buffer) {
    buffer = Uint8Array.from(buffer).buffer;
  }

  return new Promise(function(resolve, reject) {
    var dataView = new DataView(buffer);
    var reader = createReader(dataView);

    if (reader.string(4) !== "RIFF") {
      return reject(new TypeError("Invalid WAV file"));
    }

    reader.uint32(); // skip file length

    if (reader.string(4) !== "WAVE") {
      return reject(new TypeError("Invalid WAV file"));
    }

    var format = null;
    var audioData = null;

    do {
      var chunkType = reader.string(4);
      var chunkSize = reader.uint32();

      switch (chunkType) {
      case "fmt ":
        format = decodeFormat(reader, chunkSize);
        if (format instanceof Error) {
          return reject(format);
        }
        break;
      case "data":
        audioData = decodeData(reader, chunkSize, format);
        if (audioData instanceof Error) {
          return reject(format);
        }
        break;
      default:
        reader.skip(chunkSize);
        break;
      }
    } while (audioData === null);

    resolve(audioData);
  });
}

function decodeFormat(reader, chunkSize) {
  var formatId = reader.uint16();

  if (!formats.hasOwnProperty(formatId)) {
    return new TypeError("Unsupported format in WAV file: 0x" + formatId.toString(16));
  }

  var format = {
    formatId: formatId,
    floatingPoint: formatId === 0x0003,
    numberOfChannels: reader.uint16(),
    sampleRate: reader.uint32(),
    byteRate: reader.uint32(),
    blockSize: reader.uint16(),
    bitDepth: reader.uint16()
  };
  reader.skip(chunkSize - 16);

  return format;
}

function decodeData(reader, chunkSize, format) {
  var length = Math.floor(chunkSize / format.blockSize);
  var numberOfChannels = format.numberOfChannels;
  var sampleRate = format.sampleRate;
  var channelData = new Array(numberOfChannels);

  for (var ch = 0; ch < numberOfChannels; ch++) {
    channelData[ch] = new Float32Array(length);
  }

  var retVal = readPCM(reader, channelData, length, format);

  if (retVal instanceof Error) {
    return retVal;
  }

  return {
    numberOfChannels: numberOfChannels,
    length: length,
    sampleRate: sampleRate,
    channelData: channelData
  };
}

function readPCM(reader, channelData, length, format) {
  var bitDepth = format.bitDepth;
  var floatingPoint = format.floatingPoint ? "f" : "";
  var methodName = "pcm" + bitDepth + floatingPoint;

  if (!reader[methodName]) {
    return new TypeError("Not supported bit depth: " + format.bitDepth);
  }

  var read = reader[methodName].bind(reader);
  var numberOfChannels = format.numberOfChannels;

  for (var i = 0; i < length; i++) {
    for (var ch = 0; ch < numberOfChannels; ch++) {
      channelData[ch][i] = read();
    }
  }

  return null;
}

function createReader(dataView) {
  var pos = 0;

  return {
    skip: function(n) {
      pos += n;
    },
    uint8: function() {
      var data = dataView.getUint8(pos, true);

      pos += 1;

      return data;
    },
    int16: function() {
      var data = dataView.getInt16(pos, true);

      pos += 2;

      return data;
    },
    uint16: function() {
      var data = dataView.getUint16(pos, true);

      pos += 2;

      return data;
    },
    uint32: function() {
      var data = dataView.getUint32(pos, true);

      pos += 4;

      return data;
    },
    string: function(n) {
      var data = "";

      for (var i = 0; i < n; i++) {
        data += String.fromCharCode(this.uint8());
      }

      return data;
    },
    pcm8: function() {
      var data = dataView.getUint8(pos) - 128;

      pos += 1;

      return data < 0 ? data / 128 : data / 127;
    },
    pcm16: function() {
      var data = dataView.getInt16(pos, true);

      pos += 2;

      return data < 0 ? data / 32768 : data / 32767;
    },
    pcm24: function() {
      var x0 = dataView.getUint8(pos + 0);
      var x1 = dataView.getUint8(pos + 1);
      var x2 = dataView.getUint8(pos + 2);
      var xx = (x0 + (x1 << 8) + (x2 << 16));
      var data = xx > 0x800000 ? xx - 0x1000000 : xx;

      pos += 3;

      return data < 0 ? data / 8388608 : data / 8388607;
    },
    pcm32: function() {
      var data = dataView.getInt32(pos, true);

      pos += 4;

      return data < 0 ? data / 2147483648 : data / 2147483647;
    },
    pcm32f: function() {
      var data = dataView.getFloat32(pos, true);

      pos += 4;

      return data;
    },
    pcm64f: function() {
      var data = dataView.getFloat64(pos, true);

      pos += 8;

      return data;
    }
  };
}

module.exports.decode = decode;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = isPromise;

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_promise_worker_transferable_register__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_promise_worker_transferable_register___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_promise_worker_transferable_register__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_wav_decoder__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_wav_decoder___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_wav_decoder__);
/* eslint-disable */




__WEBPACK_IMPORTED_MODULE_0_promise_worker_transferable_register___default()((file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsArrayBuffer(file);
  }).then(buffer => __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_wav_decoder__["decode"])(buffer));
});


/***/ })
/******/ ]);