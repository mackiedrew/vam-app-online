import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { MAGNIFY_VIEW, SET_VIEW } from "../../constants/actionTypes";
import augmentMagnifyView from "../augmentMagnifyView";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("augmentMagnifyView()", () => {
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
          }
        },
        keyboard: {
          augmentA: false,
          augmentB: false,
          augmentC: false
        }
      };
      const store = mockStore(initialState);
      store.dispatch(augmentMagnifyView());
      const result = store.getActions();
      expect(result[0].type).toBe(MAGNIFY_VIEW);
      expect(result[1].type).toBe(SET_VIEW);
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
          }
        },
        keyboard: {
          augmentA: true,
          augmentB: false,
          augmentC: false
        }
      };
      const store = mockStore(initialState);
      store.dispatch(augmentMagnifyView());
      const result = store.getActions();
      expect(result[0].type).toBe(MAGNIFY_VIEW);
      expect(result[1].type).toBe(SET_VIEW);
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
          }
        },
        keyboard: {
          augmentA: false,
          augmentB: true,
          augmentC: false
        }
      };
      const store = mockStore(initialState);
      store.dispatch(augmentMagnifyView());
      const result = store.getActions();
      expect(result[0].type).toBe(MAGNIFY_VIEW);
      expect(result[1].type).toBe(SET_VIEW);
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
          }
        },
        keyboard: {
          augmentA: false,
          augmentB: false,
          augmentC: true
        }
      };
      const store = mockStore(initialState);
      store.dispatch(augmentMagnifyView());
      const result = store.getActions();
      expect(result[0].type).toBe(MAGNIFY_VIEW);
      expect(result[1].type).toBe(SET_VIEW);
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
          }
        },
        keyboard: {
          augmentA: false,
          augmentB: true,
          augmentC: true
        }
      };
      const store = mockStore(initialState);
      store.dispatch(augmentMagnifyView());
      const result = store.getActions();
      expect(result[0].type).toBe(SET_VIEW);
    });

    it("with augmentA and zoomIn true", () => {
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
          }
        },
        keyboard: {
          augmentA: true,
          augmentB: false,
          augmentC: false
        }
      };
      const store = mockStore(initialState);
      store.dispatch(augmentMagnifyView(true));
      const result = store.getActions();
      expect(result[0].type).toBe(MAGNIFY_VIEW);
      expect(result[1].type).toBe(SET_VIEW);
    });
  });
});
