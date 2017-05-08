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
    const result = shiftView();
    expect(typeof result).toBe("function");
  });

  it("dispatch a shiftView action", () => {
    const store = mockStore({
      tracks: {
        view: {
          start: 50,
          end: 100
        }
      }
    });
    store.dispatch(shiftView(1));
    const result = store.getActions();

    expect(result[0].type).toBe(SHIFT_VIEW);

    expect(result[1].payload).toEqual({ start: 100, end: 150 });
    expect(result[1].type).toBe(SET_VIEW);
  });
});
