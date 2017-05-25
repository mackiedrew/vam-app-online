import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  ADD_TRACK,
  GENERATE_NEXT_TRACK_ID,
  SELECT_TRACK
} from "../../constants/actionTypes";
import addTrack, { addTrackSimple } from "../addTrack";

describe("addTrackSimple()", () => {
  it("should create an action to add a new track Id and object to the track list", () => {
    const payload = {
      "123ABC": { trackContents: "A lot!" }
    };
    const expectedAction = { type: ADD_TRACK, payload };
    const result = addTrackSimple(payload);
    expect(result).toEqual(expectedAction);
  });
});

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("addTrack()", () => {
  it("should produce appropriate actions in the store", () => {
    const store = mockStore({
      tracks: {
        trackList: {},
        nextTrackId: "123ABC"
      }
    });
    store.dispatch(addTrack({ trackContents: "A lot!" }));
    const result = store.getActions();

    expect(result[0].payload).toEqual({
      "123ABC": { trackContents: "A lot!" }
    });
    expect(result[0].type).toBe(ADD_TRACK);

    expect(typeof result[1].payload).toBe("string");
    expect(result[1].type).toBe(GENERATE_NEXT_TRACK_ID);

    expect(result[2].payload).toBe("123ABC");
    expect(result[2].type).toBe(SELECT_TRACK);
  });
});
