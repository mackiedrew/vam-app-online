<<<<<<< ef97b3dc783b5f27ace9bad51153d4797e1c70b8
import {
  ModalManager as Subject,
  mapStateToProps,
  mapDispatchToProps
} from "../ModalManager";
=======
import { ModalManager as Subject, mapStateToProps, mapDispatchToProps } from "../ModalManager";
>>>>>>> :spakles: Added modals! Only one so far
jest.mock("../../components/RemoveTrackModal", () => "RemoveTrackModal");

const baseMockProps = {
  clearModal: jest.fn(),
  removeTrack: jest.fn(),
  data: { trackId: "123ABC" }
};

const noneMock = {
  ...baseMockProps,
  type: "NONE"
};

const removeTrackMock = {
  ...baseMockProps,
  type: "REMOVE_TRACK"
};

describe("<ModalManager />", () => {
  describe("renders without crashing", () => {
    it("as NONE modal", () => {
      shallow(<Subject {...noneMock} />);
    });
    it("as REMOVE_TRACK modal", () => {
      shallow(<Subject {...removeTrackMock} />);
    });
  });

  describe("combined modal removal functions fire correctly", () => {
    it("removeTrackAndModal", () => {
      const mockRemoveTrack = sinon.spy();
      const mockClearModal = sinon.spy();
      const subject = shallow(
        <Subject
          {...removeTrackMock}
          clearModal={mockRemoveTrack}
          removeTrack={mockClearModal}
        />
      );
      subject.instance().removeTrackAndModal();
      expect(mockRemoveTrack.called).toBe(true);
      expect(mockClearModal.called).toBe(true);
    });

    it("removeTrackAndModal without trackId", () => {
      const mockRemoveTrack = sinon.spy();
      const mockClearModal = sinon.spy();
      const subject = shallow(
        <Subject
          {...removeTrackMock}
          clearModal={mockRemoveTrack}
          data={{}}
          removeTrack={mockClearModal}
        />
      );
      subject.instance().removeTrackAndModal();
      expect(mockRemoveTrack.called).toBe(true);
      expect(mockClearModal.called).toBe(true);
    });
<<<<<<< ef97b3dc783b5f27ace9bad51153d4797e1c70b8
=======

>>>>>>> :spakles: Added modals! Only one so far
  });

  describe("renders correctly", () => {
    it("as NONE modal", () => {
      const tree = renderer.create(<Subject {...noneMock} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
    it("as REMOVE_TRACK modal", () => {
      const tree = renderer.create(<Subject {...removeTrackMock} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe("mapStateToProps()", () => {
    const mockState = {
      ui: {
        modalType: 1,
        modalData: 2
      }
    };

    it("returns object with expected properties", () => {
      const { type, data } = mapStateToProps(mockState);
      expect(type).toBe(1);
      expect(data).toBe(2);
    });
  });

  describe("mapDispatchToProps()", () => {
    it("returns object with expected properties", () => {
      const mockDispatch = sinon.spy();
      const { clearModal, removeTrack } = mapDispatchToProps(mockDispatch);
      expect(typeof clearModal).toBe("function");
      expect(typeof removeTrack).toBe("function");
    });
  });
});
