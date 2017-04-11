import Subject from './SeekBar'

describe('<SeekBar /> structure', () => {
  
  it('renders without crashing', () => {
    shallow(<Subject />)
  })

  const wrapper = shallow(<Subject />)

  it('renders as a div with class: `seek-bar`', () => {
    expect(wrapper.is('div.seek-bar')).toEqual(true)
  })

  it('renders two div\'s with class: `indicator`', () => {
    expect(wrapper.find('div.indicator')).toHaveLength(2)
  })

  it('renders a div with class: `current-sample`', () => {
    expect(wrapper.find('div.current-sample')).toHaveLength(1)
  })

  it('renders a div with class: `current-time`', () => {
    expect(wrapper.find('div.current-time')).toHaveLength(1)
  })

  it('renders a button with class: `seek-forward`', () => {
    expect(wrapper.find('button.seek-forward')).toHaveLength(1)
  })

})

describe('<SeekBar /> function seekForward(samples)', () => {

  const mockSeek = 44100 * 30 // 30 seconds
  const mockSamples = 20000

  it('calls the function provided by props.seekTo, exactly once.', () => {
    const mockSeekTo = sinon.spy()
    const wrapper = shallow(<Subject seek={mockSeek} seekTo={mockSeekTo} />)
    wrapper.instance().seekForward()
    expect(mockSeekTo.calledOnce).toBe(true)
  })

})