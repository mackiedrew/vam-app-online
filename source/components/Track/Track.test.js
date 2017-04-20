import Subject from "./Track";
import { richReadWav } from "../../help/wav/wav";

const badSampleWavPath = "/XYZ123/ThisFileDoesNotExist.zip"
const sampleWavPath = "./example/sample.wav"
const mockProps = {
  id: "abc123",
  path: "./example/sample.wav",
  view: {
    start: 0,
    end: 44100 * 10, // 10 Seconds
  },
  file: {
    name: "test name!",
  }
};

describe("<Track />", () => {

  global.richReadWav = (pass) => new Promise((resolve, reject) => {
    if (pass) {
      resolve("Wav Data")
    }
    reject("Test Error")
  });

  describe("looks proper by", () => {
    const wrapper = shallow(<Subject { ...mockProps } />)

    it("renders without crashing", () => {
      shallow(<Subject { ...mockProps } />)
    })

    it("renders as a div with class: `track`", () => {
      expect(wrapper.is("div.track")).toEqual(true)
    })

    it("renders a div with class: `controls`", () => {
      expect(wrapper.find("div.controls")).toHaveLength(1)
    })

    it("renders a span tag with class: `name`", () => {
      expect(wrapper.find("span.name")).toHaveLength(1)
    })

    it("renders a button with class: `remove`", () => {
      expect(wrapper.find("button.remove")).toHaveLength(1)
    })

    it("renders a div with class: `display`", () => {
      expect(wrapper.find("div.controls")).toHaveLength(1)
    })

    it("renders <Waveform />", () => {
      expect(wrapper.find("Waveform")).toHaveLength(1)
    });
  });
  

  describe("generateSeekLineStyle()", () => {
    
    it("falls back to trackLength when view.end isn\"t available", () => {
      const wrapper = shallow(<Subject { ...mockProps } view={ { start: 0, end: undefined } }/>)
      const result = wrapper.instance().sampleToGrain(-1)
      expect(result).toBe(false)
    })

  })

  describe("sampleToGrain()", () => {
    
    it("returns false when provided sample lower than 0", () => {
      const wrapper = shallow(<Subject { ...mockProps } />)
      const result = wrapper.instance().sampleToGrain(-1)
      expect(result).toBe(false)
    })

  })

  describe("readPath()", () => {

    it("returns a rejected promise that sets the `error` state of <Track />", () => {
      const wrapper = shallow(<Subject {...mockProps} path={badSampleWavPath} />)
      return wrapper.instance().readPath()
      .then(
        (result) => {
          expect(wrapper.state("error")).toBeDefined()
        }
      )
    })

    it("returns a resolved promise that sets the state of <Track />", () => {
      const wrapper = shallow(<Subject {...mockProps} path={sampleWavPath} />)
      return wrapper.instance().readPath()
      .then(
        (result) => {
          expect(wrapper.state("sampleRate")).toBeDefined()
          expect(wrapper.state("trackLength")).toBeDefined()
          expect(wrapper.state("grains").length).toBeGreaterThan(0)
        }
      )
    })

  })

  describe("remove track button", () => {

    it("when clicked, remove() is called when button.remove clicked", () => {
      const handleRemoveMock = sinon.spy();
      const wrapper = shallow(
        <Subject
          { ...mockProps }
          remove={handleRemoveMock}
        />
      );
      wrapper.find("button.remove").simulate("click");
      expect(handleRemoveMock.called).toEqual(true);
      expect(handleRemoveMock.called).not.toEqual(false);
    });

  });

  it("handleSelectTrack() calls selectTrack() once", () => {
    const selectTrackMock = sinon.spy();
    const subject = shallow(
      <Subject
        { ...mockProps }
        selectTrack={selectTrackMock}
      />
    );
    subject.instance().handleSelectTrack()
    expect(selectTrackMock.called).toEqual(true);
  });

});
