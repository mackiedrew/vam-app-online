import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { PAUSE_CONTROLS } from "../../constants/actionTypes";
import pauseControls, { pauseControlsSimple } from "../pauseControls";

describe("pauseControlsSimple()", () => {
  it("should create an action to pause keyboard controls", () => {
    const expected = { type: PAUSE_CONTROLS };
    const result = pauseControlsSimple();
    expect(result).toEqual(expected);
  });
});

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("pauseControls()", () => {
  it("should produce appropriate actions in the store", () => {
    const store = mockStore();
    store.dispatch(pauseControls());
    const result = store.getActions();
    expect(result[0].type).toBe(PAUSE_CONTROLS);
  });
});
