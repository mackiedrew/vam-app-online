import Subject from './Track'

const mockProps = {
  id: 'abc123',
  file: '/home/test.wav'
}

describe('<Track />', () => {

  it('renders without crashing', () => {
    shallow(<Subject { ...mockProps } />)
  })

  it('renders as a div with class: `track`', () => {
    const wrapper = shallow(<Subject { ...mockProps } />)
    assume(wrapper.is('div.track')).to.be.equal(true)
  })

  it('renders a div with class: `controls`', () => {
    const wrapper = shallow(<Subject { ...mockProps } />)
    assume(wrapper.find('div.controls')).to.have.length(1)
  })

  it('renders a span tag with class: `name`', () => {
    const wrapper = shallow(<Subject { ...mockProps } />)
    assume(wrapper.find('span.name')).to.have.length(1)
  })

  it('renders a button with class: `remove`', () => {
    const wrapper = shallow(<Subject { ...mockProps } />)
    assume(wrapper.find('button.remove')).to.have.length(1)
  })

  it('remove() is called when you click the remove button with parameter passed', () => {
    const handleRemoveMock = sinon.spy()
    const wrapper = shallow(
      <Subject
        { ...mockProps }
        remove={handleRemoveMock}
      />
    )
    wrapper.find('button.remove').simulate('click')
    assume(handleRemoveMock.called).to.be.equal(true)
    assume(handleRemoveMock.called).to.not.be.equal(false)
  })

  it('renders a div with class: `display`', () => {
    const wrapper = shallow(<Subject { ...mockProps } />)
    assume(wrapper.find('div.controls')).to.have.length(1)
  })

  it('renders <Waveform />', () => {
    const wrapper = shallow(<Subject { ...mockProps } />)
    assume(wrapper.find('Waveform')).to.have.length(1)
  })

})

const goodPath = './example/sample.wav'
const badPath = './NOTAPATH/sample.wav'

describe('<Track />s function readPath(path)', () => {
  
  it('promise should be fufilled if given proper path', () => {
    const wrapper = shallow(<Subject { ...mockProps } />)
    const promise = wrapper.instance().readPath(goodPath)
    assume(promise).should.be.fufilled
  })

  it('sets the state appropriately after correctly reading a wav file', () => {
    const wrapper = shallow(<Subject { ...mockProps } />)
    // Try to read a real wav file
    const promise = wrapper.instance().readPath(goodPath)
    .then((sucess) => {
      assume(sucess).to.be.equal(true)
      assume(wrapper.state('sampleRate')).to.not.equal(undefined)
      assume(wrapper.state('length')).to.not.equal(undefined)
      assume(wrapper.state('maxAmplitude')).to.not.equal(undefined)
      assume(wrapper.state('grains').length).to.be.above(0)
    })
    .catch((error) => console.error(error))
    assume(promise).should.be.fufilled
  })

  it('sets the error state after correctly failing to read a wav file', () => {
    const wrapper = shallow(<Subject { ...mockProps } />)
    // Try to read a real wav file
    const promise = wrapper.instance().readPath(badPath)
    .then(() => {
      assume(wrapper.state('error')).to.not.equal(undefined)
    })
    .catch((error) => console.error(error))
    
    assume(promise).should.be.fufilled
  })

})