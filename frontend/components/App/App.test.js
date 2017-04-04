import React from 'react'
import { shallow, render } from 'enzyme'
import { expect } from 'chai'
import { sinon } from 'sinon'

// Components
import App from './App'

// Test Suite
describe('<App />', () => {

  // Shallow Render
  it('renders without crashing', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.is('div.app')).to.be.equal(true)
    expect(wrapper.find('header')).to.have.length(1)
    expect(wrapper.find('main')).to.have.length(1)
    expect(wrapper.find('footer')).to.have.length(1)
  })

})