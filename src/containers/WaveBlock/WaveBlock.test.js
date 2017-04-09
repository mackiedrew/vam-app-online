import Subject from './WaveBlock'

const mockProps = {
  amplitude: 3,
  maxAmplitude: 10,
}

describe('<WaveBlock />', () => {

  it('renders without crashing', () => {
    shallow(<Subject {...mockProps} />)
  })

  it('renders as a div with class: `wave-block`', () => {
    const wrapper = shallow(<Subject {...mockProps} />)
    assume(wrapper.is('div.wave-block')).to.be.equal(true)
  })

    it('renders a single div with class: `amplitude`', () => {
    const wrapper = shallow(<Subject {...mockProps} />)
    assume(wrapper.find('div.amplitude')).to.have.length(1)
  })

})