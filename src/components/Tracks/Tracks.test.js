import Subject from './Tracks'

describe('<Test />', () => {

  it('renders without crashing', () => {
    shallow(<Subject />)
  })

  it('renders correct children at initial state', () => {
    const wrapper = mount(<Subject />)
  })

})