// @flow

export type grainType = {
  start: number,
  end: number,
  amplitude?: number,
  disabled?: boolean,
  quiet?: boolean
};

export type grainTag = {
  quiet: boolean
};

export type viewType = {
  start: number,
  end: number
};

export type trackType = {
  fileName: string,
  url: string,
  type: string,
  grains?: grainArray
};

export type settingsTextField = {
  label: string,
  value: string,
  type: "text"
};

export type settingsNumberField = {
  label: string,
  value: number,
  type: "number",
  unit?: string
};

export type settingsValue = number | string;

export type settingsField = settingsTextField | settingsNumberField;

// Array Types
export type grainArray = Array<grainType>;
export type grainTagArray = Array<grainTag>;
export type numberArray = Array<number>;
export type objectArray = Array<Object>;
export type stringArray = Array<string>;
export type booleanArray = Array<boolean>;
export type mixedArray = Array<any>;
export type numberArrayArray = Array<numberArray>;

// Redux
export type ReduxAction = {
  type: string,
  payload?: any
};

export type Settings = {
  quietCutoff: settingsNumberField,
  grain: settingsNumberField
};

export type ModalTypes = "REMOVE_TRACK" | "NONE";

export type UIState = {
  settingsOpen: boolean,
  modalType: ModalTypes,
  modalData: Object
};

export type TracksState = {
  trackList: {},
  view: viewType,
  seekPosition: number,
  currentlyPlaying: boolean,
  selectedTrack: string
};

export type State = {
  ui: UIState,
  tracks: TracksState,
  settings: Settings,
  keyboard: {}
};

export type GetState = () => Object;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;
export type Payload = Array<any> | Object | string | number | boolean;
export type Action = { type: string, payload?: Payload };
export type ActionCreator = () => Action;
export type Dispatch = (
  action: Action | ThunkAction | PromiseAction | Array<Action>
) => any;

// React
export type Element<Config> = React$Element<Config>;
export type AnyReactElement = ?Element<any>;
export type ReactChildren =
  | AnyReactElement
  | Array<AnyReactElement>
  | string
  | number;
