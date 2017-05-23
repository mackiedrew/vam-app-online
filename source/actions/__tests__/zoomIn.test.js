import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { MAGNIFY_VIEW, SET_VIEW } from "../../constants/actionTypes";
import zoomIn from "../zoomIn";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("zoomIn()", () => {
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
        }
      },
      keyboard: {
        augmentA: false,
        augmentB: false,
        augmentC: false
      }
    };
    const store = mockStore(initialState);
    store.dispatch(zoomIn());
    const result = store.getActions();
    expect(result[0].type).toBe(MAGNIFY_VIEW);
    expect(result[1].type).toBe(SET_VIEW);
  });
});
