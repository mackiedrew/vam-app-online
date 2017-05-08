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

  it("dispatch a magnifyView action", () => {
    const store = mockStore({
      tracks: {
        view: {
          start: 10,
          end: 100
        }
      }
    });
    store.dispatch(magnifyView(1.5));
    const result = store.getActions();

    expect(result[0].type).toBe(MAGNIFY_VIEW);

    expect(result[1].payload).toEqual({ start: 10, end: 150 });
    expect(result[1].type).toBe(SET_VIEW);
  });
});
