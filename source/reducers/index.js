import { combineReducers } from "redux";
import UIReducer from "./ui";
import SettingsReducer from "./settings";
import TracksReducer from "./tracks";

const rootReducer = combineReducers({
  ui: UIReducer,
  settings: SettingsReducer,
  tracks: TracksReducer
});

export default rootReducer;
