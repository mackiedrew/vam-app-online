import Subject from './WaveBlock'

const mockProps = {
  amplitude: 3,
  maxAmplitude: 10,
}

describe('<WaveBlock /> structure', () => {

  const wrapper = shallow(<Subject {...mockProps} />)

  it('renders without crashing', () => {
    shallow(<Subject {...mockProps} />)
  })

  it('renders as a div with class: `wave-block`', () => {
    expect(wrapper.is('div.wave-block')).toEqual(true)
  })

  it('renders a single button with class: `amplitude`', () => {
    expect(wrapper.find('button.amplitude')).toHaveLength(1)
  })

})

describe('<WaveBlock /> display math', () => {

  it('relative amplitude is returns 1 (100%) when provided with maxAmplitude === amplitude', () => {
    const wrapper = shallow(<Subject amplitude={10} maxAmplitude={10} />)
    expect(wrapper.instance().relativeAmplitude()).toEqual(1)
  })

  it('relative amplitude is returns 0 (0%) when provided with amplitude 0', () => {
    const wrapper = shallow(<Subject amplitude={0} maxAmplitude={10} />)
    expect(wrapper.instance().relativeAmplitude()).toEqual(0)
  })

  it('amplitudeStyle returns an object with expected keys', () => {
    const wrapper = shallow(<Subject amplitude={5} maxAmplitude={10} />)
    expect(wrapper.instance().amplitudeStyle()).toBeInstanceOf(Object)
    expect(wrapper.instance().amplitudeStyle().height).toEqual('50%')
  })

})

describe('<WaveBlock /> handleClick()', () => {
  it('calls seekTo() function one time', () => {
    const mockSeekTo = sinon.spy()
    const wrapper = shallow(<Subject {...mockProps} seekTo={mockSeekTo} />)
    wrapper.instance().handleClick()
    expect(mockSeekTo.called).toEqual(true)
  })
})