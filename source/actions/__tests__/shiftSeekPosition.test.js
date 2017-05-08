import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { SHIFT_SEEK_POSITION, SET_SEEK_POSITION } from "../../constants/actionTypes";
import shiftSeekPosition, { shiftSeekPositionLabel } from "../shiftSeekPosition";

describe("shiftSeekPositionLabel()", () => {
  it("should create an action to shift the seek position", () => {
    const expectedAction = { type: SHIFT_SEEK_POSITION };
    const result = shiftSeekPositionLabel();
    expect(result).toEqual(expectedAction);
  });
});


const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("shiftSeekPosition() Thunk", () => {
  it("returns a function", () => {
    const result = shiftSeekPosition(1);
    expect(typeof result).toBe("function");
  });

  describe("dispatches action while properly bounding changes", () => {
    const fakeStore = {
      tracks: {
        seekPosition: 50,
        trackList: {
          fakeTrack1: { grains: [{ end: 100 }] }
        }
      }
    };

    it("change seek position to lower within bounds", () => {
      const store = mockStore(fakeStore);
      store.dispatch(shiftSeekPosition(-10));
      const result = store.getActions();
      expect(result[0].type).toBe(SHIFT_SEEK_POSITION);
      expect(result[1].payload).toBe(40);
      expect(result[1].type).toBe(SET_SEEK_POSITION);
    });

    it("change seek position to higher within bounds", () => {
      const store = mockStore(fakeStore);
      store.dispatch(shiftSeekPosition(10));
      const result = store.getActions();
      expect(result[0].type).toBe(SHIFT_SEEK_POSITION);
      expect(result[1].payload).toBe(60);
      expect(result[1].type).toBe(SET_SEEK_POSITION);
    });

    it("change seek position to lower than bounds", () => {
      const store = mockStore(fakeStore);
      store.dispatch(shiftSeekPosition(-100));
      const result = store.getActions();
      expect(result[0].type).toBe(SHIFT_SEEK_POSITION);
      expect(result[1].payload).toBe(0);
      expect(result[1].type).toBe(SET_SEEK_POSITION);
    });

    it("change seek position to higher than bounds", () => {
      const store = mockStore(fakeStore);
      store.dispatch(shiftSeekPosition(100));
      const result = store.getActions();
      expect(result[0].type).toBe(SHIFT_SEEK_POSITION);
      expect(result[1].payload).toBe(100);
      expect(result[1].type).toBe(SET_SEEK_POSITION);
    });

    it("doesn't change seek position if shifting 0", () => {
      const store = mockStore(fakeStore);
      store.dispatch(shiftSeekPosition(0));
      const result = store.getActions();
      expect(result[0].type).toBe(SHIFT_SEEK_POSITION);
      expect(result[1].payload).toBe(50);
      expect(result[1].type).toBe(SET_SEEK_POSITION);
    });

  });
});
