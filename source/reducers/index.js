import { combineReducers } from "redux";
import UIReducer from "./ui";
import SettingsReducer from "./settings";

const rootReducer = combineReducers({
  ui: UIReducer,
  settings: SettingsReducer
});

export default rootReducer;
