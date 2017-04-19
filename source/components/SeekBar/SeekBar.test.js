import Subject from './SeekBar'

describe('<SeekBar /> structure', () => {
  
  it('renders without crashing', () => {
    shallow(<Subject seek={0} />)
  })

  const wrapper = shallow(<Subject seek={0}/>)

  it('renders as a div with class: `seek-bar`', () => {
    expect(wrapper.is('div.seek-bar')).toEqual(true)
  })

  it('renders a div with class: `indicators`', () => {
    expect(wrapper.find('div.indicators')).toHaveLength(1)
  })

  it('renders a div with class: `current-sample`', () => {
    expect(wrapper.find('div.current-sample')).toHaveLength(1)
  })

  it('renders a div with class: `current-time`', () => {
    expect(wrapper.find('div.current-time')).toHaveLength(1)
  })

  it('renders a div with class: `control-bar`', () => {
    expect(wrapper.find('div.control-bar')).toHaveLength(1)
  })

  it('renders a button with class: `seek-minus-10`', () => {
    expect(wrapper.find('button.seek-minus-10')).toHaveLength(1)
  })

  it('renders a button with class: `seek-minus-1`', () => {
    expect(wrapper.find('button.seek-minus-1')).toHaveLength(1)
  })

  it('renders a button with class: `seek-plus-10`', () => {
    expect(wrapper.find('button.seek-plus-10')).toHaveLength(1)
  })

  it('renders a button with class: `seek-plus-1`', () => {
    expect(wrapper.find('button.seek-plus-1')).toHaveLength(1)
  })

})

describe('<SeekBar /> function seekSample(samples)', () => {

  const mockSeek = 44100 * 30 // 30 seconds
  const mockSamples = 20000

  it('calls the function provided by props.seekTo, exactly once.', () => {
    const mockSeekTo = sinon.spy()
    const wrapper = shallow(<Subject seek={mockSeek} seekTo={mockSeekTo} />)
    wrapper.instance().seekSamples(mockSamples)
    expect(mockSeekTo.calledOnce).toBe(true)
  })

})

describe('<SeekBar /> click handle function', () => {
  
  const mockSeek = 44100 * 30 // 30 seconds
  const mockSamples = 20000


  it('seekSeconds() calls the function provided by props.seekTo, exactly once.', () => {
    const mockSeekTo = sinon.spy()
    const wrapper = shallow(<Subject seek={mockSeek} seekTo={mockSeekTo} />)
    wrapper.instance().seekSeconds(30)
    expect(mockSeekTo.calledOnce).toBe(true)
  })


  it('seekSeconds(seconds, samples) calls the function provided by props.seekTo.', () => {
    const mockSeekTo = sinon.spy()
    const wrapper = shallow(<Subject seek={mockSeek} seekTo={mockSeekTo} />)
    wrapper.instance().seekSeconds(30, 44100)
    expect(mockSeekTo.calledOnce).toBe(true)
  })

  it('handlePlus10() calls the function provided by props.seekTo, exactly once.', () => {
    const mockSeekTo = sinon.spy()
    const wrapper = shallow(<Subject seek={mockSeek} seekTo={mockSeekTo} />)
    wrapper.instance().handlePlus10()
    expect(mockSeekTo.calledOnce).toBe(true)
  })

  it('handleMinus10() calls the function provided by props.seekTo, exactly once.', () => {
    const mockSeekTo = sinon.spy()
    const wrapper = shallow(<Subject seek={mockSeek} seekTo={mockSeekTo} />)
    wrapper.instance().handleMinus10()
    expect(mockSeekTo.calledOnce).toBe(true)
  })

  it('handlePlus1() calls the function provided by props.seekTo, exactly once.', () => {
    const mockSeekTo = sinon.spy()
    const wrapper = shallow(<Subject seek={mockSeek} seekTo={mockSeekTo} />)
    wrapper.instance().handlePlus1()
    expect(mockSeekTo.calledOnce).toBe(true)
  })

  it('handleMinus1() calls the function provided by props.seekTo, exactly once.', () => {
    const mockSeekTo = sinon.spy()
    const wrapper = shallow(<Subject seek={mockSeek} seekTo={mockSeekTo} />)
    wrapper.instance().handleMinus1()
    expect(mockSeekTo.calledOnce).toBe(true)
  })


})