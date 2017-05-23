import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { RESUME_CONTROLS } from "../../constants/actionTypes";
import resumeControls, { resumeControlsSimple } from "../resumeControls";

describe("resumeControlsSimple()", () => {
  it("should create an action to resume keyboard controls", () => {
    const expected = { type: RESUME_CONTROLS };
    const result = resumeControlsSimple();
    expect(result).toEqual(expected);
  });
});

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("resumeControls()", () => {
  it("should produce appropriate actions in the store", () => {
    const store = mockStore();
    store.dispatch(resumeControls());
    const result = store.getActions();
    expect(result[0].type).toBe(RESUME_CONTROLS);
  });
});
