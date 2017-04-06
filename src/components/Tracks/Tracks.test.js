import React from 'react'
import { shallow, render } from 'enzyme'
import { expect } from 'chai'
import { sinon } from 'sinon'

// Components
import Tracks from './Tracks'

// Test Suite
describe('<Tracks />', () => {

  // Shallow Render
  it('renders without crashing', () => {
    const wrapper = shallow(<Tracks />)
    expect(wrapper.is('div.tracks')).to.be.equal(true)
    expect(wrapper.find('p')).to.have.length(1)
  })

})