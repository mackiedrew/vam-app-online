// Make functions available in all test files without importing
import { shallow, render, mount } from "enzyme";
import sinon from "sinon";
import React from "react";
import ReactDOM from "react-dom";
import WebAudioMock from "web-audio-mock-api";
import rewire from "rewire";

// Test Suite
global.shallow = shallow;
global.render = render;
global.mount = mount;
global.sinon = sinon;
global.rewire = rewire;
global.AudioContext = WebAudioMock.AudioContext;


// Framework
global.React = React;
global.ReactDOM = ReactDOM;

// Fail tests on any warning
console.error = (message) => {
   throw new Error(message);
};
