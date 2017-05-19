import Subject from "../Modal";

const testPropsNoButtonText = {
  noCallBack: () => sinon.spy(),
  text: "Once it is removed it cannot be undone.",
  title: "Are you sure you want to remove the track?",
  yesCallback: () => sinon.spy()
};

const testProps = {
  ...testPropsNoButtonText,
  noText: "No",
  yesText: "Yes"
};

describe("<Modal />", () => {
  describe("renders without crashing", () => {
    it("with all props provided", () => {
      shallow(<Subject {...testProps} />);
    });

    it("with no button text props provided", () => {
      shallow(<Subject {...testPropsNoButtonText} />);
    });
  });

  describe("buttons work", () => {
    it("yes button fires callback", () => {
      const yesCallbackMock = sinon.spy();
      const subject = shallow(
        <Subject {...testProps} yesCallback={yesCallbackMock} />
      );
      subject.find("button.yes-button").simulate("click");
      expect(yesCallbackMock.calledOnce).toBe(true);
    });
    it("no button fires callback", () => {
      const noCallbackMock = sinon.spy();
      const subject = shallow(
        <Subject {...testProps} noCallback={noCallbackMock} />
      );
      subject.find("button.no-button").simulate("click");
      expect(noCallbackMock.calledOnce).toBe(true);
    });
  });

  describe("renders correctly", () => {
    it("with props", () => {
      const tree = renderer.create(<Subject {...testProps} />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("with no button text props provided", () => {
      const tree = renderer
        .create(<Subject {...testPropsNoButtonText} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
