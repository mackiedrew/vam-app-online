import Subject from './Tracks'
import electron from 'electron'

const remote = electron.remote

describe('<Tracks /> structure', () => {

  it('renders without crashing', () => {
    shallow(<Subject />)
  })

  const wrapper = shallow(<Subject />)

  it('renders as a div with class: `tracks`', () => {
    expect(wrapper.is('div.tracks')).toEqual(true)
  })

  it('renders a button with class: `add-tracks`, and internal label', () => {
    expect(wrapper.find('button.add-tracks')).toHaveLength(1)
    expect(wrapper.find('button.add-tracks').contains('Add Tracks')).toEqual(true)
  })

  it('renders no <Track /> if there are no tracks in state', () => {
    expect(wrapper.find('Track')).toHaveLength(0)
  })

  it('renders a single <SeekBar />', () => {
    expect(wrapper.find('SeekBar')).toHaveLength(1)
  })

  it('renders three <Track /> if there is three track in state', () => {
    const wrapperWithThree = shallow(<Subject />)
    wrapperWithThree.instance().handleAdd([
      '/path/to/track1.wav',
      '/path/to/track2.wav',
      '/path/to/track3.wav'
    ])
    expect(Object.keys(wrapperWithThree.state('tracks'))).toHaveLength(3)
    wrapperWithThree.update()
    expect(wrapperWithThree.find('Track')).toHaveLength(3)
  })
})

describe('<Tracks /> functionality', () => {

  it('when no parameter is passed to handleAdd() doesn\'t change state' , () => {
    const wrapper = shallow(<Subject />)
    const previousState = wrapper.state('tracks')
    wrapper.instance().handleAdd()
    const newState = wrapper.state('tracks')
    expect(newState).toEqual(previousState)
  })

  it('when an empty array is passed to handleAdd() doesn\'t change state', () => {
    const wrapper = shallow(<Subject />)
    const previousState = wrapper.state('tracks')
    wrapper.instance().handleAdd([])
    const newState = wrapper.state('tracks')
    expect(newState).toEqual(previousState)
  })

  it('can add a single track to the track list with handleAdd', () => {
    const wrapper = shallow(<Subject />)
    wrapper.instance().handleAdd(['/path/to/track1.wav'])
    expect(Object.keys(wrapper.state('tracks'))).toHaveLength(1)
  })

  it('can add multiple tracks to the track list with handleAdd', () => {
    const wrapper = shallow(<Subject />)
    wrapper.instance().handleAdd(['/path/to/track1.wav', '/path/to/track2.wav'])
    expect(Object.keys(wrapper.state('tracks'))).toHaveLength(2)
  })

  it('selectTracks function should invoke handleAdd with mocked tracks', () => {
    const wrapper = shallow(<Subject />)
    wrapper.instance().selectTracks()
    const tracksArray = Object.keys(wrapper.state('tracks'))
    expect(tracksArray).toHaveLength(1)
  })

  it('renders one <Track /> if there is one track in state', () => {
    const wrapper = shallow(<Subject />)
    wrapper.instance().handleAdd(['/path/to/track1.wav'])
    expect(Object.keys(wrapper.state('tracks'))).toHaveLength(1)
    wrapper.update()
    expect(wrapper.find('Track')).toHaveLength(1)
  })

  it('when no parameter is passed to handleRemove() doesn\'t change state' , () => {
    const wrapper = shallow(<Subject />)
    const previousState = wrapper.state('tracks')
    wrapper.instance().handleRemove()
    const newState = wrapper.state('tracks')
    expect(newState).toEqual(previousState)
  })

  it('when an empty string is passed to handleRemove() doesn\'t change state' , () => {
    const wrapper = shallow(<Subject />)
    const previousState = wrapper.state('tracks')
    wrapper.instance().handleRemove('')
    const newState = wrapper.state('tracks')
    expect(newState).toEqual(previousState)
  })

  it('test that the proper track is removed when handleRemove is called', () => {
    const targetTrack = '/path/to/track1.wav'
    const wrapper = shallow(<Subject />)
    wrapper.instance().handleAdd([targetTrack, '/path/to/track2.wav'])
    expect(Object.keys(wrapper.state('tracks'))).toHaveLength(2)
    // Generate track list
    const tracks = wrapper.state('tracks')
    // Get targetID from list
    const targetID = Object.keys(tracks).filter((id) => tracks[id] === targetTrack)[0]
    // Attempt removal by id
    wrapper.instance().handleRemove(targetID)
    expect(Object.keys(wrapper.state('tracks'))).toHaveLength(1)
  })

})

describe('<Tracks />s seek functions', () => {

  it('initializes with seek at 0 samples', () => {
    const wrapper = shallow(<Subject />)
    expect(wrapper.state('seek')).toEqual(0)
  })

  it('seekTo(sample) returns a value no lower than 0', () => {
    const wrapper = shallow(<Subject />)
    wrapper.instance().reportTrackLength('test', 44100 * 100)
    expect(wrapper.instance().seekTo(-30)).toEqual(0)
    expect(wrapper.state('seek')).toEqual(0)
  })

  it('seekTo() returns 0 when provided no argument', () => {
    const wrapper = shallow(<Subject />)
    wrapper.instance().reportTrackLength('test', 44100 * 100)
    expect(wrapper.instance().seekTo()).toEqual(0)
    expect(wrapper.state('seek')).toEqual(0)
  })

  it('seekTo(sample) returns sets the state of seek to the value passed to it.', () => {
    const wrapper = shallow(<Subject />)
    wrapper.instance().reportTrackLength('test', 44100 * 100)
    expect(wrapper.instance().seekTo(30)).toEqual(30)
    expect(wrapper.state('seek')).toEqual(30)
  })

})

describe('<Tracks /> reportTrackLength()', () => {
  it('returns an array containing an id of the added track')
  it('trackLengths is changed after a single track is added')
})