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
export type Reducer<State, Action> = (
  state: State,
  action: ReduxAction<Action>
) => State;

export type Store<State, Action> = {
  dispatch: (action: ReduxAction<Action>) => ReduxAction<Action>,
  subscribe: (listener: () => void) => () => void,
  getState: () => State,
  getReducer: () => Reducer<State, Action>,
  replaceReducer: any
};

export type ReduxAction = {
  type: string,
  payload?: any
};

export type SettingsType = {
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
  selectedTrack: string,
  nextTrackId: string
};

export type Hotkey = {
  value: string,
  label: string
};

export type Hotkeys = {
  play: Hotkey,
  settings: Hotkey,
  augmentA: Hotkey,
  augmentB: Hotkey,
  augmentC: Hotkey,
  nextTrack: Hotkey,
  previousTrack: Hotkey
};

export type HotkeyValues = {
  play: string,
  settings: string,
  augmentA: string,
  augmentB: string,
  augmentC: string,
  nextTrack: string,
  previousTrack: string
};

export type KeyboardState = {
  hotkeys: Hotkeys,
  controlsEnabled: boolean,
  augmentA: boolean,
  augmentB: boolean,
  augmentC: boolean
};

export type State = {
  ui: UIState,
  tracks: TracksState,
  settings: SettingsType,
  keyboard: KeyboardState
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
