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

const badSampleWavPath = '/XYZ123/ThisFileDoesNotExist.zip'
const sampleWavPath = './example/sample.wav'

describe('<Track />s function readPath(filePath)', () => {

  it('returns a rejected promise that sets the `error` state of <Track />', () => {
    const wrapper = shallow(<Subject { ...mockProps } />)
    return wrapper.instance().readPath(badSampleWavPath)
    .then(
      (result) => {
        expect(wrapper.state('error')).toBeDefined()
      }
    )
  })

  it('returns a resolved promise that sets the state of <Track />', () => {
    const wrapper = shallow(<Subject { ...mockProps } />)
    return wrapper.instance().readPath(sampleWavPath)
    .then(
      (result) => {
        expect(wrapper.state('sampleRate')).toBeDefined()
        expect(wrapper.state('length')).toBeDefined()
        expect(wrapper.state('grains').length).toBeGreaterThan(0)
      }
    )
  })

})
