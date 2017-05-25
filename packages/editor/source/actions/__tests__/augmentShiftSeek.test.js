import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  SHIFT_SEEK_POSITION,
  SET_SEEK_POSITION
} from "../../constants/actionTypes";
import augmentShiftSeek from "../augmentShiftSeek";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("augmentShiftSeek()", () => {
  describe("should produce appropriate actions in the store", () => {
    it("with no augments", () => {
      const initialState = {
        tracks: {
          view: {
            start: 0,
            end: 100
          },
          trackList: {
            "123ABC": {
              grains: [{ start: 0, end: 10 }, { start: 10, end: 20 }]
            }
          },
          selectedTrack: "123ABC"
        },
        keyboard: {
          augmentA: false,
          augmentB: false,
          augmentC: false
        }
      };
      const store = mockStore(initialState);
      store.dispatch(augmentShiftSeek());
      const result = store.getActions();
      expect(result[0].type).toBe(SET_SEEK_POSITION);
    });

    it("with no augments but forward is now true", () => {
      const initialState = {
        tracks: {
          view: {
            start: 0,
            end: 100
          },
          trackList: {
            "123ABC": {
              grains: [{ start: 0, end: 10 }, { start: 10, end: 20 }]
            }
          },
          selectedTrack: "123ABC"
        },
        keyboard: {
          augmentA: false,
          augmentB: false,
          augmentC: false
        }
      };
      const store = mockStore(initialState);
      store.dispatch(augmentShiftSeek(true));
      const result = store.getActions();
      expect(result[0].type).toBe(SET_SEEK_POSITION);
    });

    it("with augmentA", () => {
      const initialState = {
        tracks: {
          view: {
            start: 0,
            end: 100
          },
          trackList: {
            "123ABC": {
              grains: [{ start: 0, end: 10 }, { start: 10, end: 20 }]
            }
          },
          selectedTrack: "123ABC"
        },
        keyboard: {
          augmentA: true,
          augmentB: false,
          augmentC: false
        }
      };
      const store = mockStore(initialState);
      store.dispatch(augmentShiftSeek());
      const result = store.getActions();
      expect(result[0].type).toBe(SHIFT_SEEK_POSITION);
      expect(result[1].type).toBe(SET_SEEK_POSITION);
    });

    it("with augmentA and augmentC", () => {
      const initialState = {
        tracks: {
          view: {
            start: 0,
            end: 100
          },
          trackList: {
            "123ABC": {
              grains: [{ start: 0, end: 10 }, { start: 10, end: 20 }]
            }
          },
          selectedTrack: "123ABC"
        },
        keyboard: {
          augmentA: true,
          augmentB: false,
          augmentC: true
        }
      };
      const store = mockStore(initialState);
      store.dispatch(augmentShiftSeek());
      const result = store.getActions();
      expect(result[0].type).toBe(SHIFT_SEEK_POSITION);
      expect(result[1].type).toBe(SET_SEEK_POSITION);
    });

    it("with augmentC", () => {
      const initialState = {
        tracks: {
          view: {
            start: 0,
            end: 100
          },
          trackList: {
            "123ABC": {
              grains: [{ start: 0, end: 10 }, { start: 10, end: 20 }]
            }
          },
          selectedTrack: "123ABC"
        },
        keyboard: {
          augmentA: false,
          augmentB: false,
          augmentC: true
        }
      };
      const store = mockStore(initialState);
      store.dispatch(augmentShiftSeek());
      const result = store.getActions();
      expect(result[0].type).toBe(SHIFT_SEEK_POSITION);
      expect(result[1].type).toBe(SET_SEEK_POSITION);
    });

    it("with augmentC and augmentB", () => {
      const initialState = {
        tracks: {
          view: {
            start: 0,
            end: 100
          },
          trackList: {
            "123ABC": {
              grains: [{ start: 0, end: 10 }, { start: 10, end: 20 }]
            }
          },
          selectedTrack: "123ABC"
        },
        keyboard: {
          augmentA: false,
          augmentB: true,
          augmentC: true
        }
      };
      const store = mockStore(initialState);
      store.dispatch(augmentShiftSeek());
      const result = store.getActions();
      expect(result[0].type).toBe(SHIFT_SEEK_POSITION);
      expect(result[1].type).toBe(SET_SEEK_POSITION);
    });

    it("with augmentA, augmentB and augmentC", () => {
      const initialState = {
        tracks: {
          view: {
            start: 0,
            end: 100
          },
          trackList: {
            "123ABC": {
              grains: [{ start: 0, end: 10 }, { start: 10, end: 20 }]
            }
          },
          selectedTrack: "123ABC"
        },
        keyboard: {
          augmentA: true,
          augmentB: true,
          augmentC: true
        }
      };
      const store = mockStore(initialState);
      store.dispatch(augmentShiftSeek());
      const result = store.getActions();
      expect(result[0].type).toBe(SHIFT_SEEK_POSITION);
      expect(result[1].type).toBe(SET_SEEK_POSITION);
    });

    it("with augmentB", () => {
      const initialState = {
        tracks: {
          view: {
            start: 0,
            end: 100
          },
          trackList: {
            "123ABC": {
              grains: [{ start: 0, end: 10 }, { start: 10, end: 20 }]
            }
          },
          selectedTrack: "123ABC"
        },
        keyboard: {
          augmentA: false,
          augmentB: true,
          augmentC: false
        }
      };
      const store = mockStore(initialState);
      store.dispatch(augmentShiftSeek());
      const result = store.getActions();
      expect(result[0].type).toBe(SET_SEEK_POSITION);
    });

    it("with augmentB and forward is true", () => {
      const initialState = {
        tracks: {
          view: {
            start: 0,
            end: 100
          },
          trackList: {
            "123ABC": {
              grains: [{ start: 0, end: 10 }, { start: 10, end: 20 }]
            }
          },
          selectedTrack: "123ABC"
        },
        keyboard: {
          augmentA: false,
          augmentB: true,
          augmentC: false
        }
      };
      const store = mockStore(initialState);
      store.dispatch(augmentShiftSeek(true));
      const result = store.getActions();
      expect(result[0].type).toBe(SET_SEEK_POSITION);
    });
  });
});
