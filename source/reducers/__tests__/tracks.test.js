import reducer, { DEFAULT_STATE } from "../tracks";
import {
  SET_SEEK_POSITION,
  SET_VIEW,
  SET_CURRENTLY_PLAYING,
  GENERATE_NEXT_TRACK_ID,
  ADD_TRACK,
  SELECT_TRACK,
  TOGGLE_TRACK_MUTED,
  REMOVE_TRACK,
  SET_TRACK_SAMPLE_RATE,
  SET_TRACK_FILE_NAME,
  SET_TRACK_GRAINS,
  SET_TRACK_MAX_AMPLITUDE,
  TOGGLE_CURRENTLY_PLAYING
} from "../../constants/actionTypes";

describe("tracks reducer", () => {
  it("should return the initial state", () => {
    const result = reducer(DEFAULT_STATE, {});
    expect(result).toEqual(DEFAULT_STATE);
  });

  it("should not the initial state when the state is null", () => {
    const result = reducer(null, {});
    const expected = null;
    expect(result).toEqual(expected);
  });

  it("should not the initial state when the state is not defined", () => {
    const result = reducer(undefined, {});
    const expected = DEFAULT_STATE;
    expect(result).toEqual(expected);
  });

  it("should handle SET_SEEK_POSITION", () => {
    const mockAction = {
      type: SET_SEEK_POSITION,
      payload: 12345
    };
    const result = reducer(DEFAULT_STATE, mockAction);
    const expected = {
      ...DEFAULT_STATE,
      seekPosition: 12345
    };
    expect(result).toEqual(expected);
  });

  it("should handle SET_VIEW", () => {
    const mockAction = {
      type: SET_VIEW,
      payload: { start: 0, end: 10 }
    };
    const result = reducer(DEFAULT_STATE, mockAction);
    const expected = {
      ...DEFAULT_STATE,
      view: { start: 0, end: 10 }
    };
    expect(result).toEqual(expected);
  });

  it("should handle SET_CURRENTLY_PLAYING", () => {
    const mockAction = {
      type: SET_CURRENTLY_PLAYING,
      payload: true
    };
    const result = reducer(DEFAULT_STATE, mockAction);
    const expected = {
      ...DEFAULT_STATE,
      currentlyPlaying: true
    };
    expect(result).toEqual(expected);
  });

  it("should handle GENERATE_NEXT_TRACK_ID", () => {
    const mockAction = {
      type: GENERATE_NEXT_TRACK_ID,
      payload: "123ABC"
    };
    const result = reducer(DEFAULT_STATE, mockAction);
    const expected = {
      ...DEFAULT_STATE,
      nextTrackId: "123ABC"
    };
    expect(result).toEqual(expected);
  });

  it("should handle ADD_TRACK", () => {
    const mockAction = {
      type: ADD_TRACK,
      payload: { "123ABC": { trackContents: "lots" } }
    };
    const result = reducer(DEFAULT_STATE, mockAction);
    const expected = {
      ...DEFAULT_STATE,
      trackList: { "123ABC": { trackContents: "lots" } }
    };
    expect(result).toEqual(expected);
  });

  it("should handle SELECT_TRACK", () => {
    const mockAction = {
      type: SELECT_TRACK,
      payload: "123ABC"
    };
    const result = reducer(DEFAULT_STATE, mockAction);
    const expected = {
      ...DEFAULT_STATE,
      selectedTrack: "123ABC"
    };
    expect(result).toEqual(expected);
  });

  it("should handle REMOVE_TRACK", () => {
    const mockAction = {
      type: REMOVE_TRACK,
      payload: { "123ABC": { trackContents: "lots" } }
    };
    const result = reducer(DEFAULT_STATE, mockAction);
    const expected = {
      ...DEFAULT_STATE,
      trackList: { "123ABC": { trackContents: "lots" } }
    };
    expect(result).toEqual(expected);
  });

  it("should handle TOGGLE_TRACK_MUTED", () => {
    const mockAction = {
      type: TOGGLE_TRACK_MUTED,
      payload: "123ABC"
    };
    const initialState = {
      trackList: { "123ABC": { muted: true } }
    };
    const result = reducer(initialState, mockAction);
    const expected = {
      trackList: { "123ABC": { muted: false } }
    };
    expect(result).toEqual(expected);
  });

  it("should handle TOGGLE_CURRENTLY_PLAYING", () => {
    const mockAction = { type: TOGGLE_CURRENTLY_PLAYING };
    const initialState = { currentlyPlaying: false };
    const result = reducer(initialState, mockAction);
    const expected = { currentlyPlaying: true };
    expect(result).toEqual(expected);
  });

  it("should handle SET_TRACK_SAMPLE_RATE", () => {
    const mockAction = {
      type: SET_TRACK_SAMPLE_RATE,
      payload: { id: "123ABC", sampleRate: 1000 }
    };
    const initialState = {
      trackList: { "123ABC": {} }
    };
    const result = reducer(initialState, mockAction);
    const expected = {
      trackList: { "123ABC": { sampleRate: 1000 } }
    };
    expect(result).toEqual(expected);
  });

  it("should handle SET_TRACK_FILE_NAME", () => {
    const mockAction = {
      type: SET_TRACK_FILE_NAME,
      payload: { id: "123ABC", fileName: "file.ext" }
    };
    const initialState = {
      trackList: { "123ABC": {} }
    };
    const result = reducer(initialState, mockAction);
    const expected = {
      trackList: { "123ABC": { fileName: "file.ext" } }
    };
    expect(result).toEqual(expected);
  });

  it("should handle SET_TRACK_GRAINS", () => {
    const mockAction = {
      type: SET_TRACK_GRAINS,
      payload: { id: "123ABC", grains: [] }
    };
    const initialState = {
      trackList: { "123ABC": {} }
    };
    const result = reducer(initialState, mockAction);
    const expected = {
      trackList: { "123ABC": { grains: [] } }
    };
    expect(result).toEqual(expected);
  });

  it("should handle SET_TRACK_MAX_AMPLITUDE", () => {
    const mockAction = {
      type: SET_TRACK_MAX_AMPLITUDE,
      payload: { id: "123ABC", maxAmplitude: 1000 }
    };
    const initialState = {
      trackList: { "123ABC": {} }
    };
    const result = reducer(initialState, mockAction);
    const expected = {
      trackList: { "123ABC": { maxAmplitude: 1000 } }
    };
    expect(result).toEqual(expected);
  });
});
