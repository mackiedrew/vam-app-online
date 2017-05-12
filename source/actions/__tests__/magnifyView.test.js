import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { MAGNIFY_VIEW, SET_VIEW } from "../../constants/actionTypes";
import magnifyView, { magnifyViewLabel } from "../magnifyView";

describe("magnifyViewLabel() action creator", () => {
  it("should create an action to label a magnified view", () => {
    const expectedAction = { type: MAGNIFY_VIEW };
    const result = magnifyViewLabel();
    expect(result).toEqual(expectedAction);
  });
});

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("magnifyView() Thunk", () => {
  it("returns a function", () => {
    const result = magnifyView();
    expect(typeof result).toBe("function");
  });

  describe("dispatch expected magnifyView action", () => {
    const mockState = {
      tracks: {
        trackList: { "123ABC": { grains: [{ end: 200 }] } },
        view: {
          start: 10,
          end: 100
        }
      }
    };

    it("without hitting bounds and zooming out", () => {
      const store = mockStore(mockState);
      store.dispatch(magnifyView(1.5));
      const result = store.getActions();
      expect(result[0].type).toBe(MAGNIFY_VIEW);
      expect(result[1].payload).toEqual({ start: 10, end: 145 });
      expect(result[1].type).toBe(SET_VIEW);
    });

    it("without hitting bounds and zooming in", () => {
      const store = mockStore(mockState);
      store.dispatch(magnifyView(0.5));
      const result = store.getActions();
      expect(result[0].type).toBe(MAGNIFY_VIEW);
      expect(result[1].payload).toEqual({ start: 10, end: 55 });
      expect(result[1].type).toBe(SET_VIEW);
    });

    it("magnify x1 should do nothing", () => {
      const store = mockStore(mockState);
      store.dispatch(magnifyView(1));
      const result = store.getActions();
      expect(result[0].type).toBe(MAGNIFY_VIEW);
      expect(result[1].payload).toEqual({ start: 10, end: 100 });
      expect(result[1].type).toBe(SET_VIEW);
    });

    it("can't magnify beyond 2x the longest track", () => {
      const store = mockStore(mockState);
      store.dispatch(magnifyView(500));
      const result = store.getActions();
      expect(result[0].type).toBe(MAGNIFY_VIEW);
      expect(result[1].payload).toEqual({ start: 0, end: 400 });
      expect(result[1].type).toBe(SET_VIEW);
    });

    it("while zooming in very, very far", () => {
      const store = mockStore(mockState);
      store.dispatch(magnifyView(1.0e-10));
      const result = store.getActions();
      expect(result[0].type).toBe(MAGNIFY_VIEW);
      expect(result[1].payload).toEqual({ start: 10, end: 12 });
      expect(result[1].type).toBe(SET_VIEW);
    });

    it("while zooming in very, very far, twice", () => {
      const store = mockStore(mockState);
      store.dispatch(magnifyView(1.0e-10));
      store.dispatch(magnifyView(1.0e-10));
      const result = store.getActions();
      expect(result[0].type).toBe(MAGNIFY_VIEW);
      expect(result[1].payload).toEqual({ start: 10, end: 12 });
      expect(result[1].type).toBe(SET_VIEW);
      expect(result[2].type).toBe(MAGNIFY_VIEW);
      expect(result[3].payload).toEqual({ start: 10, end: 12 });
      expect(result[3].type).toBe(SET_VIEW);
    });

    it("while zooming out very, very far, twice", () => {
      const store = mockStore(mockState);
      store.dispatch(magnifyView(5000));
      store.dispatch(magnifyView(5000));
      const result = store.getActions();
      expect(result[0].type).toBe(MAGNIFY_VIEW);
      expect(result[1].payload).toEqual({ start: 0, end: 400 });
      expect(result[1].type).toBe(SET_VIEW);
      expect(result[2].type).toBe(MAGNIFY_VIEW);
      expect(result[3].payload).toEqual({ start: 0, end: 400 });
      expect(result[3].type).toBe(SET_VIEW);
    });

    it("while zooming in so that start is affected, but not set to 0", () => {
      const store = mockStore(mockState);
      store.dispatch(magnifyView(4.4));
      const result = store.getActions();
      expect(result[0].type).toBe(MAGNIFY_VIEW);
      expect(result[1].payload).toEqual({ start: 3, end: 400 });
      expect(result[1].type).toBe(SET_VIEW);
    });
  });
});
