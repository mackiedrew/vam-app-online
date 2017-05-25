import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { REMOVE_TRACK, SELECT_TRACK } from "../../constants/actionTypes";
import removeTrack, { removeTrackSimple } from "../removeTrack";

describe("removeTrackSimple() action creator", () => {
  it("should create an action to return a new track list", () => {
    const payload = "123ABC";
    const expectedAction = { type: REMOVE_TRACK, payload };
    const result = removeTrackSimple(payload);
    expect(result).toEqual(expectedAction);
  });
});

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("removeTrack() Thunk", () => {
  it("returns a function", () => {
    const result = removeTrack();
    expect(typeof result).toBe("function");
  });

  const fakeStore = {
    tracks: {
      trackList: {
        "123ABC": { muted: true },
        "456DEF": { muted: true },
        "789GHI": { muted: true }
      }
    }
  };

  const removedTrackList = {
    "456DEF": { muted: true },
    "789GHI": { muted: true }
  };

  describe("dispatch a removeTrack action", () => {
    const getState = () => fakeStore;
    const dispatch = sinon.spy();
    const expectedType = REMOVE_TRACK;
    const expectedAction = { type: expectedType, payload: removedTrackList };
    removeTrack("123ABC")(dispatch, getState);
    expect(dispatch.calledWith(expectedAction)).toBe(true);
  });

  describe("should produce appropriate actions in the store", () => {
    it("when removed track is NOT selected", () => {
      const store = mockStore({
        tracks: {
          ...fakeStore.tracks,
          selectedTrack: "789GHI"
        }
      });
      store.dispatch(removeTrack("123ABC"));
      const result = store.getActions();
      expect(result[0].payload).toEqual(removedTrackList);
      expect(result[0].type).toBe(REMOVE_TRACK);
    });
    it("when removed track is selected, and first", () => {
      const store = mockStore({
        tracks: {
          ...fakeStore.tracks,
          selectedTrack: "123ABC"
        }
      });
      store.dispatch(removeTrack("123ABC"));
      const result = store.getActions();
      expect(result[0].payload).toEqual(removedTrackList);
      expect(result[0].type).toBe(REMOVE_TRACK);
      expect(result[1].payload).toEqual("456DEF");
      expect(result[1].type).toBe(SELECT_TRACK);
    });
    it("when removed track is selected, and in the middle", () => {
      const store = mockStore({
        tracks: {
          ...fakeStore.tracks,
          selectedTrack: "456DEF"
        }
      });
      store.dispatch(removeTrack("456DEF"));
      const result = store.getActions();
      expect(result[0].payload).toEqual({
        "123ABC": { muted: true },
        "789GHI": { muted: true }
      });
      expect(result[0].type).toBe(REMOVE_TRACK);
      expect(result[1].payload).toEqual("789GHI");
      expect(result[1].type).toBe(SELECT_TRACK);
    });
    it("when removed track is selected, and last", () => {
      const store = mockStore({
        tracks: {
          ...fakeStore.tracks,
          selectedTrack: "789GHI"
        }
      });
      store.dispatch(removeTrack("789GHI"));
      const result = store.getActions();
      expect(result[0].payload).toEqual({
        "123ABC": { muted: true },
        "456DEF": { muted: true }
      });
      expect(result[0].type).toBe(REMOVE_TRACK);
      expect(result[1].payload).toEqual("456DEF");
      expect(result[1].type).toBe(SELECT_TRACK);
    });
  });
});
