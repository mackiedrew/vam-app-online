import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { GENERATE_NEXT_TRACK_ID } from "../../constants/actionTypes";
import generateNextTrackId, { setNextTrackId } from "../generateNextTrackId";

describe("setNextTrackId()", () => {

  it("should create an action to set the next track ID", () => {
    const payload = "123ABC";
    const expectedAction = { type: GENERATE_NEXT_TRACK_ID, payload };
    const result = setNextTrackId(payload);
    expect(result).toEqual(expectedAction);
  });

});

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("generateNextTrackId()", () => {

  it("should produce appropriate actions in the store", () => {
    const expectedActions = [{ type: GENERATE_NEXT_TRACK_ID, payload: "123ABC" }];
    const store = mockStore({ nextTrackId: undefined });
    store.dispatch(generateNextTrackId());
    const result = store.getActions();
    expect(typeof result[0].payload).toBe("string");
    expect(result[0].type).toBe(GENERATE_NEXT_TRACK_ID);
  });

});
