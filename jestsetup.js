// Make Enzyme functions available in all test files without importing
import { shallow, render, mount } from 'enzyme'
import React from 'react'
import ReactDOM from 'react-dom'

global.shallow = shallow
global.render = render
global.mount = mount

global.React = React
global.ReactDOM = ReactDOM

// Fail tests on any warning
console.error = (message) => {
   throw new Error(message)
}