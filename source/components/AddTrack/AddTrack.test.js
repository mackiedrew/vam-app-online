import Subject from './AddTrack';

describe('<AddTrack />', () => {
  
  it("renders without crashing", () => {
    shallow(<Subject />)
  });

  it('handleOnChange() calls the handleTrackAdd props once.', () => {
    const mockId = "test"
    const mockTrackAdd = sinon.spy()
    global.document.getElementById = (id) => {
      return {
        files: [13, 11, 12]
      }
    };
    const subject = shallow(<Subject id={mockId} handleTrackAdd={mockTrackAdd} />)
    subject.instance().handleOnChange()
    expect(mockTrackAdd.calledOnce).toBe(true)
  })

});