import Subject from './Waveform'

describe('<Waveform />', () => {

  it('renders without crashing', () => {
    shallow(<Subject />)
  })

  it('renders as a div with class: `waveform`', () => {
    const wrapper = shallow(<Subject />)
    assume(wrapper.is("div.waveform")).to.be.equal(true)
  })

})