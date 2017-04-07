import Subject from './Tracks'

describe('<Tracks />', () => {

  it('renders without crashing', () => {
    shallow(<Subject />)
  })

  it('renders as a div with class: `tracks`', () => {
    const wrapper = shallow(<Subject />)
    assume(wrapper.is('div.tracks')).to.be.equal(true)
  })

  it('renders a button with class: `add-tracks`, and internal label', () => {
    const wrapper = shallow(<Subject />)
    assume(wrapper.find('button.add-tracks')).to.have.length(1)
    assume(
      wrapper
      .find('button.add-tracks')
      .contains('Add Tracks')
    ).to.be.equal(true)
  })

  it('renders no <Track /> if there are no tracks in state', () => {
    const wrapper = shallow(<Subject />)
    assume(wrapper.find('Track')).to.have.length(0)
  })

  it('can add a single track to the track list with handleAdd', () => {
    const wrapper = shallow(<Subject />)
    wrapper.instance().handleAdd(['/path/to/track1.wav'])
    assume(Object.keys(wrapper.state('tracks'))).to.have.length(1)
  })

  it('can add multiple tracks to the track list with handleAdd', () => {
    const wrapper = shallow(<Subject />)
    wrapper.instance().handleAdd(['/path/to/track1.wav', '/path/to/track2.wav'])
    assume(Object.keys(wrapper.state('tracks'))).to.have.length(2)
  })

  it('selectTracks function', () => {
    const wrapper = shallow(<Subject />)
    wrapper.instance().selectTracks()
  })

  it('selectTracks function', () => {
    const wrapper = shallow(<Subject />)
  })

  it('renders one <Track /> if there is one track in state', () => {
    const wrapper = shallow(<Subject />)
    wrapper.instance().handleAdd(['/path/to/track1.wav'])
    assume(Object.keys(wrapper.state('tracks'))).to.have.length(1)
    wrapper.update()
    assume(wrapper.find('Track')).to.have.length(1)
  })

  it('test that the proper track is removed when handleRemove is called', () => {
    const targetTrack = '/path/to/track1.wav'
    const wrapper = shallow(<Subject />)
    wrapper.instance().handleAdd([targetTrack, '/path/to/track2.wav'])
    assume(Object.keys(wrapper.state('tracks'))).to.have.length(2)
    // Generate track list
    const tracks = wrapper.state('tracks')
    // Get targetID from list
    const targetID = Object.keys(tracks).filter((id) => tracks[id] === targetTrack)[0]
    console.log(targetID)
    // Attempt removal by id
    wrapper.instance().handleRemove(targetID)
    assume(Object.keys(wrapper.state('tracks'))).to.have.length(1)
  })

  it('renders three <Track /> if there is three track in state', () => {
    const wrapper = shallow(<Subject />)
    wrapper.instance().handleAdd([
      '/path/to/track1.wav',
      '/path/to/track2.wav',
      '/path/to/track3.wav'
    ])
    assume(Object.keys(wrapper.state('tracks'))).to.have.length(3)
    wrapper.update()
    assume(wrapper.find('Track')).to.have.length(3)
  })

})