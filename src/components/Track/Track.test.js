import React from 'react'
import { shallow, render } from 'enzyme'
import { expect } from 'chai'
import { sinon } from 'sinon'

// Components
import Tracks from './Track'

// Test Suite
describe('<Track />', () => {

  // Shallow Render
  it('renders without crashing', () => {
    const wrapper = shallow(<Track />)
    expect(wrapper.is('div.track')).to.be.equal(true)
  })

})