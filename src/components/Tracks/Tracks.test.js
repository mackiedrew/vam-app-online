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