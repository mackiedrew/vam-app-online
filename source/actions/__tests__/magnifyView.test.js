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

  it("dispatch expected magnifyView action", () => {
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

    it("without hitting bounds and zooming in", () => {
      const store = mockStore(mockState);
      store.dispatch(magnifyView(0.5));
      const result = store.getActions();
      expect(result[0].type).toBe(MAGNIFY_VIEW);
      expect(result[1].payload).toEqual({ start: 10, end: 55 });
      expect(result[1].type).toBe(SET_VIEW);
    });
  });
});
