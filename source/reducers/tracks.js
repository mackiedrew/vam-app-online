// Action Types
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
  SET_TRACK_LENGTH,
  SET_TRACK_MAX_AMPLITUDE,
  TOGGLE_CURRENTLY_PLAYING
} from "../constants/actionTypes";

// Initial State
export const DEFAULT_STATE = {
  seekPosition: 0,
  trackList: {},
  nextTrackId: "track1",
  selectedTrack: undefined,
  currentlyPlaying: false,
  length: 44100 * 60 * 10,
  view: {
    start: 0,
    end: 44100 * 60 * 10
  }
};

// Actual Reducer
const TracksReducer = (state = DEFAULT_STATE, { type, payload }) => {
  switch (type) {
    case SET_CURRENTLY_PLAYING:
      return {
        ...state,
        currentlyPlaying: payload
      };
    case SET_SEEK_POSITION:
      return {
        ...state,
        seekPosition: payload
      };
    case SET_VIEW:
      return {
        ...state,
        view: payload
      };
    case GENERATE_NEXT_TRACK_ID:
      return {
        ...state,
        nextTrackId: payload
      };
    case ADD_TRACK:
      return {
        ...state,
        trackList: {
          ...state.trackList,
          ...payload
        }
      };
    case REMOVE_TRACK:
      return {
        ...state,
        trackList: payload
      };
    case SELECT_TRACK:
      return {
        ...state,
        selectedTrack: payload
      };
    case TOGGLE_TRACK_MUTED:
      return {
        ...state,
        trackList: {
          ...state.trackList,
          [payload]: {
            ...state.trackList[payload],
            muted: !state.trackList[payload].muted
          }
        }
      };
    case SET_TRACK_SAMPLE_RATE:
      return {
        ...state,
        trackList: {
          ...state.trackList,
          [payload.id]: {
            ...state.trackList[payload.id],
            sampleRate: payload.sampleRate
          }
        }
      };
    case SET_TRACK_FILE_NAME:
      return {
        ...state,
        trackList: {
          ...state.trackList,
          [payload.id]: {
            ...state.trackList[payload.id],
            fileName: payload.fileName
          }
        }
      };
    case SET_TRACK_LENGTH:
      return {
        ...state,
        trackList: {
          ...state.trackList,
          [payload.id]: {
            ...state.trackList[payload.id],
            length: payload.length
          }
        }
      };
    case SET_TRACK_GRAINS:
      return {
        ...state,
        trackList: {
          ...state.trackList,
          [payload.id]: {
            ...state.trackList[payload.id],
            grains: payload.grains
          }
        }
      };
    case SET_TRACK_MAX_AMPLITUDE:
      return {
        ...state,
        trackList: {
          ...state.trackList,
          [payload.id]: {
            ...state.trackList[payload.id],
            maxAmplitude: payload.maxAmplitude
          }
        }
      };
    case TOGGLE_CURRENTLY_PLAYING:
      return {
        ...state,
        currentlyPlaying: !state.currentlyPlaying
      };
    default:
      return state;
  }
};

export default TracksReducer;
