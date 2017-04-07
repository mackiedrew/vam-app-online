import Subject from './App'

describe('<App />', () => {

  it('renders without crashing', () => {
    shallow(<Subject />)
  })

  it('renders as a div with class: `app`', () => {
    const wrapper = shallow(<Subject />)
    assume(wrapper.is('div.app')).to.be.equal(true)
  })

  it('renders a header tag', () => {
    const wrapper = shallow(<Subject />)
    assume(wrapper.find('header')).to.have.length(1)
  })

  it('renders a main tag', () => {
    const wrapper = shallow(<Subject />)
    assume(wrapper.find('main')).to.have.length(1)
  })


  it('renders a footer tag', () => {
    const wrapper = shallow(<Subject />)
    assume(wrapper.find('footer')).to.have.length(1)
  })

  it('renders one, and only one h1 tag', () => {
    const wrapper = render(<Subject />)
    assume(wrapper.find('h1')).to.have.length(1)
  })

})