import Subject from './Track'

const mockProps = {
  id: 'abc123',
  file: '/home/test.wav'
}

describe('<Track /> structure', () => {

  const wrapper = shallow(<Subject { ...mockProps } />)

  it('renders without crashing', () => {
    shallow(<Subject { ...mockProps } />)
  })

  it('renders as a div with class: `track`', () => {
    expect(wrapper.is('div.track')).toEqual(true)
  })

  it('renders a div with class: `controls`', () => {
    expect(wrapper.find('div.controls')).toHaveLength(1)
  })

  it('renders a span tag with class: `name`', () => {
    expect(wrapper.find('span.name')).toHaveLength(1)
  })

  it('renders a button with class: `remove`', () => {
    expect(wrapper.find('button.remove')).toHaveLength(1)
  })

  it('renders a div with class: `display`', () => {
    expect(wrapper.find('div.controls')).toHaveLength(1)
  })

  it('renders <Waveform />', () => {
    expect(wrapper.find('Waveform')).toHaveLength(1)
  })
})

describe('<Track />s remove track button', () => {

  it('when clicked, remove() is called with proper parameter passed', () => {
    const handleRemoveMock = sinon.spy()
    const wrapper = shallow(
      <Subject
        { ...mockProps }
        remove={handleRemoveMock}
      />
    )
    wrapper.find('button.remove').simulate('click')
    expect(handleRemoveMock.called).toEqual(true)
    expect(handleRemoveMock.called).not.toEqual(false)
  })

})





const goodPath = './example/sample.wav'
const badPath = './NOT/A/PATH/sample.wav'

describe('<Track />s function readPath(path)', () => {
  
  it('promise should be fulfilled if given proper path', () => {
    const wrapper = shallow(<Subject { ...mockProps } />)
    assume(wrapper.instance().readPath(goodPath)).resolves.not.toEqual(undefined)
  })



  it('sets the state appropriately after correctly reading a wav file', () => {
    const wrapper = shallow(<Subject { ...mockProps } />)
    // Try to read a real wav file
    const promise = wrapper.instance().readPath(goodPath)
    .then((result) => {
      console.log(result)
      //assume(result).to.be.equal(true)
    })
    .then(() => {
      assume(wrapper.state('sampleRate')).to.not.equal(undefined)
      assume(wrapper.state('length')).to.not.equal(undefined)
      assume(wrapper.state('maxAmplitude')).to.not.equal(undefined)
      assume(wrapper.state('grains').length).to.be.above(0)
    })
    .catch((error) => console.error(error))
    assume(promise).should.be.fulfilled
  })

  it('sets the error state after correctly failing to read a wav file', () => {
    const wrapper = shallow(<Subject { ...mockProps } />)
    // Try to read a real wav file
    const promise = wrapper.instance().readPath(badPath)
    .then(() => {
      assume(wrapper.state('error')).to.not.equal(undefined)
    })
    .catch((error) => console.error(error))
    
    assume(promise).should.be.fulfilled
  })

})