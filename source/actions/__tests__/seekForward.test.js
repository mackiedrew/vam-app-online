import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { SET_SEEK_POSITION } from "../../constants/actionTypes";
import seekForward from "../seekForward";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("seekForward()", () => {
  it("produces proper actions in store", () => {
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
        },
        selectedTrack: "123ABC"
      },
      keyboard: {
        augmentA: false,
        augmentB: false,
        augmentC: false
      }
    };
    const store = mockStore(initialState);
    store.dispatch(seekForward());
    const result = store.getActions();
    expect(result[0].type).toBe(SET_SEEK_POSITION);
  });
});
