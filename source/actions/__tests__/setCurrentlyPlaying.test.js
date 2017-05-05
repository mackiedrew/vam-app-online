import { SET_CURRENTLY_PLAYING } from "../../constants/actionTypes";
import setCurrentlyPlaying, {
  setCurrentlyPlayingSimple
} from "../setCurrentlyPlaying";

describe("setCurrentlyPlayingSimple() action creator", () => {
  it("should create an action to set the currentlyPlaying state", () => {
    const expectedAction = { type: SET_CURRENTLY_PLAYING, payload: false };
    const result = setCurrentlyPlayingSimple(false);
    expect(result).toEqual(expectedAction);
  });
});

describe("setCurrentlyPlaying() Thunk", () => {
  it("returns a function", () => {
    const result = setCurrentlyPlaying();
    expect(typeof result).toBe("function");
  });

  it("dispatch a removeTrack action", () => {
    const getState = () => ({ tracks: { currentlyPlaying: false } });
    const dispatch = sinon.spy();
    const expectedAction = { type: SET_CURRENTLY_PLAYING, payload: true };
    setCurrentlyPlaying(true)(dispatch, getState);
    expect(dispatch.calledWith(expectedAction)).toBe(true);
  });
});
