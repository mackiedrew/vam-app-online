import { REMOVE_TRACK } from "../../constants/actionTypes";
import removeTrack, { removeTrackSimple } from "../removeTrack";

describe("removeTrackSimple() action creator", () => {
  it("should create an action to return a new track list", () => {
    const payload = "123ABC";
    const expectedAction = { type: REMOVE_TRACK, payload };
    const result = removeTrackSimple(payload);
    expect(result).toEqual(expectedAction);
  });
});

describe("removeTrack() Thunk", () => {
  it("returns a function", () => {
    const result = removeTrack();
    expect(typeof result).toBe("function");
  });

  it("dispatch a removeTrack action", () => {
    const getState = () => ({
      tracks: {
        trackList: {
          "123ABC": { muted: true },
          "456DEF": { muted: true }
        }
      }
    });
    const dispatch = sinon.spy();
    const expectedType = REMOVE_TRACK;
    const expectedPayload = {
      "456DEF": { muted: true }
    };
    const expectedAction = { type: expectedType, payload: expectedPayload };

    removeTrack("123ABC")(dispatch, getState);
    expect(dispatch.calledWith(expectedAction)).toBe(true);
  });
});
