import Subject from './Track'

const mockProps = {
  id: 'abc123',
  file: '/home/test.wav'
}

describe('<Track />', () => {

  it('renders without crashing', () => {
    shallow(<Subject { ...mockProps } />)
  })

  it('renders as a div with class: `track`', () => {
    const wrapper = shallow(<Subject { ...mockProps } />)
    assume(wrapper.is("div.track")).to.be.equal(true)
  })

  it('renders a button with class: `close`', () => {
    const wrapper = shallow(<Subject { ...mockProps } />)
    assume(wrapper.find("button.close")).to.have.length(1)
  })

  it('renders a span tag with class: `name`', () => {
    const wrapper = shallow(<Subject { ...mockProps } />)
    assume(wrapper.find("span.name")).to.have.length(1)
  })

  it('close() is called when you click the close button with parameter passed', () => {
    const handleRemoveMock = sinon.spy()
    const wrapper = shallow(
      <Subject
        { ...mockProps }
        close={handleRemoveMock}
      />
    )
    wrapper.find('button.close').simulate('click')
    assume(handleRemoveMock.called).to.be.equal(true)
    assume(handleRemoveMock.called).to.not.be.equal(false)
  })

})