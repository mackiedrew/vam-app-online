import Subject from './App'

describe('<App /> structure', () => {

  const wrapper = shallow(<Subject />)

  it('renders without crashing', () => {
    shallow(<Subject />)
  })

  it('renders as a div with class: `app`', () => {
    expect(wrapper.is('div.app')).toEqual(true)
  })

  it('renders a header tag', () => {
    expect(wrapper.find('header')).toHaveLength(1)
  })

  it('renders a main tag', () => {
    expect(wrapper.find('main')).toHaveLength(1)
  })

  it('renders a footer tag', () => {
    expect(wrapper.find('footer')).toHaveLength(1)
  })

  it('renders one, and only one h1 tag', () => {
    expect(wrapper.find('h1')).toHaveLength(1)
  })

})