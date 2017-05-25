import { combineReducers } from "redux";
import UIReducer from "./ui";
import SettingsReducer from "./settings";
import TracksReducer from "./tracks";
import KeyboardReducer from "./keyboard";

const rootReducer = combineReducers({
  ui: UIReducer,
  settings: SettingsReducer,
  tracks: TracksReducer,
  keyboard: KeyboardReducer
});

export default rootReducer;
