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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * This generates an array with length of given size. With array entries being from zero to size
 * minus one. Which makes it work well as a mappable object with a build-in index.
 * @param {Number} size The eventual length of the array generated.
 * @returns {Array} Array with keys from 0 to size-1
 */
var range = exports.range = function range(size) {
  return [].concat(_toConsumableArray(Array(size).keys()));
};

/**
 * Calculate the max value of all the entries in an array
 * @param {Array} array Array of values to determine the max array size.
 */
var max = exports.max = function max(array) {
  return Math.max.apply(Math, _toConsumableArray(array));
};

/**
 * Adds all the elements of an array together
 * @param {Array} array Array of values to add
 */
var add = exports.add = function add(array) {
  return array.reduce(function (a, b) {
    return a + b;
  }, 0);
};

/**
 * Faster flooring method using a bitwise trick with better behavior than Math.floor().
 * Will round both positive and negative numbers closer to zero.
 * @param {Number} value The value to be rounded closer to zero.
 */
var floor = exports.floor = function floor(value) {
  return ~~value;
};

/**
 * Creates an array of 'segments' that contain two values: start and end.
 * These values indicate the segments' key in the array in which the begin and end.
 * It is designed to work like, and with, slice(), where start is inclusive, and end is exclusive.
 * Will not mutate the original array.
 * @param {Array} array Array of values to be segmented, basically just need this for the length.
 * @param {Number} segmentSize Integer, number of array elements per segment (inclusive).
 */
var logicalSegment = exports.logicalSegment = function logicalSegment(array, segmentSize) {
  var totalSegments = Math.ceil(array.length / segmentSize);
  var segmentsRange = range(totalSegments);
  var starts = segmentsRange.map(function (segment) {
    return segment * segmentSize;
  });
  var ends = segmentsRange.map(function (segment) {
    return segment === totalSegments - 1 ? array.length - 1 : (segment + 1) * segmentSize;
  });
  var segments = segmentsRange.map(function (segment) {
    return {
      start: starts[segment],
      end: ends[segment]
    };
  });
  return segments;
};

/**
 * This binary search will use large divisions of a sorted, continuous integer array with keys:
 * start, end. It will look for the index of the division containing a target value between it's
 * start and end keys.
 * @param {Number} targetValue Value within divisionArray to match for.
 * @param {Array} divisionArray Value of divisions with a start and end key with the start being
 * inclusive and the end being exclusive. Each entry in the array should obviously be an object.
 */
var divisionBinarySearch = exports.divisionBinarySearch = function divisionBinarySearch(targetValue, divisionArray) {
  // Exit quickly if the sample is not in the track.
  if (typeof targetValue !== "number" || !divisionArray || divisionArray.length < 1) {
    return false;
  }
  var maxIndex = divisionArray && divisionArray[divisionArray.length - 1].end;
  if (targetValue < 0 || targetValue > maxIndex) {
    return false;
  }

  // Search bounds for binary search, when they are equal, the value is found
  var low = 0;
  var high = divisionArray.length;
  while (low <= high) {
    // Middle is the current search point, keep bisecting to search
    var middle = floor(low + (high - low) / 2);
    var currentDivision = divisionArray[middle];
    var start = currentDivision.start,
        end = currentDivision.end;

    var targetIsLowerThanCurrentGrain = targetValue < start;
    var targetIsInCurrentGrain = targetValue >= start && targetValue < end;
    if (targetIsInCurrentGrain) {
      return middle;
    } else if (targetIsLowerThanCurrentGrain) {
      high = middle - 1;
    } else {
      low = middle + 1;
    }
  }
};

var leadingZeros = exports.leadingZeros = function leadingZeros(rawNumber) {
  var columns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

  var number = String(Math.round(rawNumber));
  var digits = number.length;
  var neededZeros = columns - digits;
  var zeroes = neededZeros > 0 ? new Array(neededZeros).fill("0") : [];
  var allColumns = [].concat(_toConsumableArray(zeroes), [number]);
  var output = allColumns.reduce(function (a, b) {
    return a + b;
  }, "");
  return output;
};

/**
 * Figure out the mean average of the elements in an array.
 * @param {Array} array Array to find the mean of.
 */
var mean = exports.mean = function mean(array) {
  return add(array) / array.length;
};

/**
 * Adds a new key with given values to an existing array of object.
 * @param {Array} array Original array to add the values to under the given key.
 * @param {String} key The key name that the values should be added to the array as.
 * @param {String} values A hopefully length-matched array of values to add to the arry.
 */
var zipObjectArray = exports.zipObjectArray = function zipObjectArray(array, key, values) {
  var newArray = array.map(function (object, index) {
    return _extends({}, object, _defineProperty({}, key, values[index] || undefined));
  });
  return newArray;
};

/**
 * Get a random integer from provided minimum and maximum number. This will produce an integer.
 * @param {Number} min Minimum possible value (inclusive).
 * @param {Number} max Maximum possible value (exclusive).
 */
var random = exports.random = function random(min, max) {
  return floor(Math.random() * (max - min)) + min;
};

/**
 * Pulls the provided key from each object in the provided array, should return undefined if it
 * doesn't exist in that object.
 * @param {Array} array Array of objects with keys contained.
 * @param {String} key Object key to take from each array entry.
 */
var getKeyFromObjectArray = exports.getKeyFromObjectArray = function getKeyFromObjectArray(array, key) {
  return array.map(function (entry) {
    return entry[key] || undefined;
  });
};

/***/ }),
/* 1 */
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.areGrainsQuiet = exports.isGrainQuiet = exports.createSampleCases = exports.grainLengths = exports.createEquallySpacedGrains = exports.splitGrain = exports.splitGrainIntoTwo = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * File should contain all functions for working with grains with an emphasis on pure functions.
                                                                                                                                                                                                                                                                   */

var _generic = __webpack_require__(0);

var _convert = __webpack_require__(4);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Splits a single grain object into two adjacent grain objects that maintain any additional grain
 * meta data of the original grain. Should also return the same grain if splitPoint is out of 
 * bounds: grain.start == splitPint, or splitPoint is not within the grain.
 * @param {Object} grain Contains 'start' and 'end' keys.
 * @param {Number} splitPoint The value of the sample this grain should be split at.
 */
var splitGrainIntoTwo = exports.splitGrainIntoTwo = function splitGrainIntoTwo(grain, splitPoint) {
  var pointTooLow = splitPoint <= grain.start;
  // grain.end minus one because it is exclusive
  var pointTooHigh = splitPoint >= grain.end - 1;
  // Quick exit
  if (pointTooLow || pointTooHigh) {
    return [grain];
  }
  // Determine new start and end points.
  var leftStart = grain.start;
  var leftEnd = splitPoint;
  var rightStart = splitPoint;
  var rightEnd = grain.end;
  // Create new grains, ensure copying extra keys that may have existed in original grain
  var leftGrain = _extends({}, grain, {
    start: leftStart,
    end: leftEnd
  });
  var rightGrain = _extends({}, grain, {
    start: rightStart,
    end: rightEnd
  });
  // Create array to return grains in order.
  var splitGrain = [leftGrain, rightGrain];
  return splitGrain;
};

/**
 * Finds the location of a sample within an array of grains, isolates the grain that the sample
 * belongs to, and if the sample is within the grains range and is not a on a cut point between
 * grains it will return a new grains array containing the new split grains instead of original.
 * @param {Array} grains An array containing all of the grains in a range.
 * @param {Number} splitPoint The value of the sample this grain should be split at.
 */
var splitGrain = exports.splitGrain = function splitGrain(grains, splitPoint) {
  // Isolate samples for quick exit check.
  var firstSample = grains[0].start;
  var lastGrainIndex = grains.length - 1;
  var lastSample = grains[lastGrainIndex].end - 1;
  // Comparisons for quick exit.
  var pointTooLow = splitPoint <= firstSample;
  var pointTooHigh = splitPoint >= lastSample;
  // Quick exit
  if (pointTooLow || pointTooHigh) {
    return grains;
  }
  // Find location of split point for dividing array.
  var targetGrainIndex = (0, _generic.divisionBinarySearch)(splitPoint, grains);
  // Divide array prior to reassembly.
  var leftSide = grains.slice(0, targetGrainIndex);
  var rightSide = grains.slice(targetGrainIndex + 1, lastGrainIndex + 1);
  var targetGrain = grains.slice(targetGrainIndex, targetGrainIndex + 1)[0];
  // Create new array with split grains included.
  var splitGrain = splitGrainIntoTwo(targetGrain, splitPoint);
  var newGrains = [].concat(_toConsumableArray(leftSide), _toConsumableArray(splitGrain), _toConsumableArray(rightSide));
  return newGrains;
};

/**
 * Logically segments grains into equally spaced components. This is hopefully temporary.
 * @param {Array} data Only used to get the length of the array.
 * @param {Number} secondsPerGrain Number of seconds per grain, the end grain may be shorter.
 */
var createEquallySpacedGrains = exports.createEquallySpacedGrains = function createEquallySpacedGrains(data, secondsPerGrain) {
  var grainLength = (0, _convert.secondsToSamples)(secondsPerGrain);
  var grains = (0, _generic.logicalSegment)(data, grainLength);
  return grains;
};

/**
 * Calculates the difference between start and end for every supplied grain.
 * @param {Array} grains Grain objects with keys start and end.
 */
var grainLengths = exports.grainLengths = function grainLengths(grains) {
  return grains.map(function (_ref) {
    var start = _ref.start,
        end = _ref.end;
    return end - start;
  });
};

/**
 * Get a certain number of samples (or cases to not be confused with audio samples) from provided
 * grains. This can be used to get a representative sample of a segment of audio.
 * @param {Array} grains Grain objects with keys start and end.
 * @param {Array} data Original data to pull samples from, grains should be generated from this.
 * @param {Number} caseRate Per how many data points should there be a sample case?
 */
var createSampleCases = exports.createSampleCases = function createSampleCases(grains, data, caseRate) {
  var lengths = grainLengths(grains);
  var casesPerGrain = lengths.map(function (l) {
    return Math.ceil(l / caseRate);
  });
  var rangePerGrain = casesPerGrain.map(_generic.range);
  var cases = grains.map(function (_ref2, i) {
    var start = _ref2.start,
        end = _ref2.end;

    var casesIndexes = rangePerGrain[i].map(function () {
      return (0, _generic.random)(start, end);
    });
    var collectedSignedData = casesIndexes.map(function (i) {
      return data[i];
    });
    var collectedData = collectedSignedData.map(Math.abs);
    return collectedData;
  });
  return cases;
};

/**
 * This will contain whatever our current quietness calculation algorithm should be.
 * @param {Object} grain Grain containing at least the amplitude key.
 * @param {Number} cutOff Percentage (0 to 1) threshold that of which below, is considered quiet.
 * @param {Number} maxAmplitude Maximum amplitude of the track.
 */
var isGrainQuiet = exports.isGrainQuiet = function isGrainQuiet(_ref3, cutOff, maxAmplitude) {
  var amplitude = _ref3.amplitude;

  var amplitudePercentage = amplitude / maxAmplitude;
  var quiet = amplitudePercentage <= cutOff;
  return quiet;
};

/**
 * Checks against an array of grains to see if the grains match criteria to be "quiet".
 * @param {Array} grains Grains array containing objects with at least the amplitude key.
 * @param {Number} cutOff Percentage (0 to 1) threshold that of which below, is considered quiet.
 */
var areGrainsQuiet = exports.areGrainsQuiet = function areGrainsQuiet(grains, cutOff) {
  var amplitudes = (0, _generic.getKeyFromObjectArray)(grains, "amplitude");
  var maxAmplitude = (0, _generic.max)(amplitudes);
  var quiet = grains.map(function (grain) {
    return isGrainQuiet(grain, cutOff, maxAmplitude);
  });
  return quiet;
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isPromise = __webpack_require__(6);

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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.samplesToTime = exports.millisecondsToSamples = exports.minutesToSamples = exports.hoursToSamples = exports.samplesToHours = exports.samplesToMinutes = exports.samplesToMilliseconds = exports.samplesToSeconds = exports.secondsToSamples = undefined;

var _generic = __webpack_require__(0);

/**
 * Converts seconds to samples, given a sample rate. Both have defaults so if you provide not params
 * it will simply provide a typical conversion factor. This is intentionally over-verbose.
 * @param {Number} seconds This should be pretty clear. 1/60 of a minute, 1000 milliseconds
 * @param {Number} sampleRate Number of samples per seconds, default is 44100Hz or 44.1kHz 
 */
var secondsToSamples = exports.secondsToSamples = function secondsToSamples() {
  var seconds = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var sampleRate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 44100;
  return seconds * sampleRate;
};

/**
 * Converts samples to seconds, given a sample rate. Both have defaults so if you provide not params
 * it will simply provide a typical conversion factor. This is intentionally over-verbose.
 * @param {Number} samples Number of samples for the given sample rate.
 * @param {Number} sampleRate Number of samples per seconds, default is 44100Hz or 44.1kHz 
 */
var samplesToSeconds = exports.samplesToSeconds = function samplesToSeconds() {
  var samples = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var sampleRate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 44100;
  return samples / sampleRate;
};

/**
 * Converts samples to milliseconds, given a sample rate. Both have defaults so if you provide
 * not params it will simply provide a typical conversion factor.
 * @param {Number} samples Number of samples for the given sample rate.
 * @param {Number} sampleRate Number of samples per seconds, default is 44100Hz or 44.1kHz 
 */
var samplesToMilliseconds = exports.samplesToMilliseconds = function samplesToMilliseconds() {
  var samples = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var sampleRate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 44100;
  return samples / sampleRate * 1000;
};

/**
 * Converts samples to minutes, given a sample rate. Both have defaults so if you provide
 * not params it will simply provide a typical conversion factor.
 * @param {Number} samples Number of samples for the given sample rate.
 * @param {Number} sampleRate Number of samples per seconds, default is 44100Hz or 44.1kHz 
 */
var samplesToMinutes = exports.samplesToMinutes = function samplesToMinutes() {
  var samples = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var sampleRate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 44100;
  return samples / sampleRate / 60;
};

/**
 * Converts samples to hours, given a sample rate. Both have defaults so if you provide
 * not params it will simply provide a typical conversion factor.
 * @param {Number} samples Number of samples for the given sample rate.
 * @param {Number} sampleRate Number of samples per seconds, default is 44100Hz or 44.1kHz 
 */
var samplesToHours = exports.samplesToHours = function samplesToHours() {
  var samples = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var sampleRate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 44100;
  return samples / sampleRate / 3600;
};

/**
 * Converts hours to samples, given a sample rate. Both have defaults so if you provide
 * not params it will simply provide a typical conversion factor.
 * @param {Number} hours Number of hours to convert to samples.
 * @param {Number} sampleRate Number of samples per seconds, default is 44100Hz or 44.1kHz 
 */
var hoursToSamples = exports.hoursToSamples = function hoursToSamples() {
  var hours = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var sampleRate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 44100;
  return hours * 3600 * sampleRate;
};

/**
 * Converts minutes to samples, given a sample rate. Both have defaults so if you provide
 * not params it will simply provide a typical conversion factor.
 * @param {Number} minutes Number of minutes to convert to samples.
 * @param {Number} sampleRate Number of samples per seconds, default is 44100Hz or 44.1kHz 
 */
var minutesToSamples = exports.minutesToSamples = function minutesToSamples() {
  var minutes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var sampleRate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 44100;
  return minutes * 60 * sampleRate;
};

/**
 * Converts milliseconds to samples, given a sample rate. Both have defaults so if you provide
 * not params it will simply provide a typical conversion factor.
 * @param {Number} milliseconds Number of milliseconds to convert to samples.
 * @param {Number} sampleRate Number of samples per seconds, default is 44100Hz or 44.1kHz 
 */
var millisecondsToSamples = exports.millisecondsToSamples = function millisecondsToSamples() {
  var milliseconds = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var sampleRate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 44100;
  return milliseconds * 1000 * sampleRate;
};

/**
 * Converts samples to a series of keys representing hours, minutes, seconds, and milliseconds, as
 * well as a remaining number of samples.
 * @param {Number} samples Number of samples for the given sample rate.
 * @param {Number} sampleRate Number of samples per seconds, default is 44100Hz or 44.1kHz 
 * @return {Object} keys representing the number of time units in the time.
 */
var samplesToTime = exports.samplesToTime = function samplesToTime(samples) {
  var sampleRate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 44100;

  var remainingSamples = samples;

  var h = (0, _generic.floor)(samplesToHours(remainingSamples, sampleRate));
  remainingSamples -= hoursToSamples(h, sampleRate);

  var m = (0, _generic.floor)(samplesToMinutes(remainingSamples, sampleRate));
  remainingSamples -= minutesToSamples(m, sampleRate);

  var s = (0, _generic.floor)(samplesToSeconds(remainingSamples, sampleRate));
  remainingSamples -= secondsToSamples(s, sampleRate);

  var ms = (0, _generic.floor)(samplesToMilliseconds(remainingSamples, sampleRate));
  remainingSamples -= millisecondsToSamples(s, sampleRate);

  return { h: h, m: m, s: s, ms: ms, samples: remainingSamples };
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _register = __webpack_require__(3);

var _register2 = _interopRequireDefault(_register);

var _generic = __webpack_require__(0);

var _grain = __webpack_require__(2);

var _config = __webpack_require__(1);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */

(0, _register2.default)(function (_ref) {
  var protoGrains = _ref.protoGrains,
      cases = _ref.cases;


  // Add amplitudes to grains
  var amplitudes = cases.map(_generic.mean);
  var simpleGrains = (0, _generic.zipObjectArray)(protoGrains, "amplitude", amplitudes);

  // Add quietness to grains
  var quietnessCutoff = _config2.default.quietCutoff.value / 100;
  var quietGrains = (0, _grain.areGrainsQuiet)(simpleGrains, quietnessCutoff);
  var finalGrains = (0, _generic.zipObjectArray)(simpleGrains, "quiet", quietGrains);

  // Calculate max amplitude
  var maxAmplitude = (0, _generic.max)(amplitudes);

  var result = { grains: finalGrains, maxAmplitude: maxAmplitude };
  return result;
});

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = isPromise;

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}


/***/ })
/******/ ]);