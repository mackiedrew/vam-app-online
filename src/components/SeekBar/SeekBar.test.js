import Subject from './SeekBar'


describe('<SeekBar /> structure', () => {
  
  it('renders without crashing', () => {
    shallow(<Subject />)
  })

  const wrapper = shallow(<Subject />)

  it('renders as a div with class: `seek-bar`', () => {
    expect(wrapper.is('div.seek-bar')).toEqual(true)
  })

  it('renders two divs with class: `indicator`', () => {
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