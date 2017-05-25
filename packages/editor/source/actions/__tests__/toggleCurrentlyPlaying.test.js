import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  TOGGLE_CURRENTLY_PLAYING,
  SET_CURRENTLY_PLAYING
} from "../../constants/actionTypes";
import toggleCurrentlyPlaying, {
  toggleCurrentlyPlayingLabel
} from "../toggleCurrentlyPlaying";

describe("toggleCurrentlyPlayingLabel() action creator", () => {
  it("should create an action to label a toggled playing state", () => {
    const expectedAction = { type: TOGGLE_CURRENTLY_PLAYING };
    const result = toggleCurrentlyPlayingLabel();
    expect(result).toEqual(expectedAction);
  });
});

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("toggleCurrentlyPlaying() Thunk", () => {
  it("returns a function", () => {
    const result = toggleCurrentlyPlaying();
    expect(typeof result).toBe("function");
  });

  it("dispatch a shiftView action", () => {
    const store = mockStore({
      tracks: {
        currentlyPlaying: true
      }
    });
    store.dispatch(toggleCurrentlyPlaying());
    const result = store.getActions();

    expect(result[0].type).toBe(TOGGLE_CURRENTLY_PLAYING);

    expect(result[1].payload).toEqual(false);
    expect(result[1].type).toBe(SET_CURRENTLY_PLAYING);
  });
});
