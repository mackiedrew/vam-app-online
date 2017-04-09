import Subject from './Waveform'

const mockProps = {
  blocks: [
    {
      start: 0,
      end: 3,
      amplitude: 4,
    },
  ],
  maxAmplitude: 10,
}

describe('<Waveform />', () => {

  it('renders without crashing with no grains', () => {
    shallow(<Subject />)
  })

  it('renders without crashing with some grains', () => {
    shallow(<Subject {...mockProps} />)
  })

  it('renders with no <WaveBlock />s when no blocks are supplied', () => {
    const wrapper = shallow(<Subject />)
    assume(wrapper.find('WaveBlock')).to.have.length(0)
  })

  it('renders with a single <WaveBlock> when provided with one block', () => {
    const wrapper = shallow(<Subject {...mockProps} />)
    assume(wrapper.find('WaveBlock')).to.have.length(1)
  })

})