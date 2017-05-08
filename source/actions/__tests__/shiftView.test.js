import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { SHIFT_VIEW, SET_VIEW } from "../../constants/actionTypes";
import shiftView, { shiftViewLabel } from "../shiftView";

describe("shiftViewLabel() action creator", () => {
  it("should create an action to label a shifted view", () => {
    const expectedAction = { type: SHIFT_VIEW };
    const result = shiftViewLabel();
    expect(result).toEqual(expectedAction);
  });
});

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("shiftView() Thunk", () => {
  it("returns a function", () => {
    const result = shiftView(1);
    expect(typeof result).toBe("function");
  });

  describe("dispatches action while properly bounding changes", () => {
    const fakeStore = {
      tracks: {
        view: {
          start: 50,
          end: 100
        },
        trackList: {
          fakeTrack1: { grains: [{ end: 1000 }] }
        }
      }
    };

    const fakeStoreMaxed = {
      tracks: {
        view: {
          start: 500,
          end: 1000
        },
        trackList: {
          fakeTrack1: { grains: [{ end: 1000 }] }
        }
      }
    };

    it("change view to lower within bounds", () => {
      const store = mockStore(fakeStore);
      store.dispatch(shiftView(1));
      const result = store.getActions();
      expect(result[0].type).toBe(SHIFT_VIEW);
      expect(result[1].payload).toEqual({ start: 100, end: 150 });
      expect(result[1].type).toBe(SET_VIEW);
    });
    it("change view to higher within bounds", () => {
      const store = mockStore(fakeStore);
      store.dispatch(shiftView(-1));
      const result = store.getActions();
      expect(result[0].type).toBe(SHIFT_VIEW);
      expect(result[1].payload).toEqual({ start: 0, end: 50 });
      expect(result[1].type).toBe(SET_VIEW);
    });
    it("can't seek below zero", () => {
      const store = mockStore(fakeStore);
      store.dispatch(shiftView(-2));
      const result = store.getActions();
      expect(result[0].type).toBe(SHIFT_VIEW);
      expect(result[1].payload).toEqual({ start: 0, end: 50 });
      expect(result[1].type).toBe(SET_VIEW);
    });
    it("can't seek below zero, even when start at zero", () => {
      const store = mockStore(fakeStore);
      store.dispatch(shiftView(-2));
      const result = store.getActions();
      expect(result[0].type).toBe(SHIFT_VIEW);
      expect(result[1].payload).toEqual({ start: 0, end: 50 });
      expect(result[1].type).toBe(SET_VIEW);
      store.dispatch(shiftView(-2));
      const result2 = store.getActions();
      expect(result2[0].type).toBe(SHIFT_VIEW);
      expect(result2[1].payload).toEqual({ start: 0, end: 50 });
      expect(result2[1].type).toBe(SET_VIEW);
    });
    it("can't seek above longest track length times two", () => {
      const store = mockStore(fakeStoreMaxed);
      store.dispatch(shiftView(10));
      const result2 = store.getActions();
      expect(result2[0].type).toBe(SHIFT_VIEW);
      expect(result2[1].payload).toEqual({ start: 500, end: 1000 });
      expect(result2[1].type).toBe(SET_VIEW);
    });
    it("can't seek above longest track length times two,even when starting there", () => {
      const store = mockStore(fakeStoreMaxed);
      store.dispatch(shiftView(10));
      const result = store.getActions();
      expect(result[0].type).toBe(SHIFT_VIEW);
      expect(result[1].payload).toEqual({ start: 500, end: 1000 });
      expect(result[1].type).toBe(SET_VIEW);
      store.dispatch(shiftView(10));
      const result2 = store.getActions();
      expect(result2[0].type).toBe(SHIFT_VIEW);
      expect(result2[1].payload).toEqual({ start: 500, end: 1000 });
      expect(result2[1].type).toBe(SET_VIEW);
    });
    it("large view shift keeps the same view range", () => {
      const store = mockStore(fakeStoreMaxed);
      store.dispatch(shiftView(1000));
      const result = store.getActions();
      const { start, end } = result[1].payload;
      const viewRange = end - start;
      expect(viewRange).toEqual(500);
    });
    it("when providing a view shift of 0, view doesn't change", () => {
      const store = mockStore(fakeStore);
      store.dispatch(shiftView(0));
      const result = store.getActions();
      expect(result[0].type).toBe(SHIFT_VIEW);
      expect(result[1].payload).toEqual({ start: 50, end: 100 });
      expect(result[1].type).toBe(SET_VIEW);
    });
  });
});
