// @flow

export type grainType = {
  start: number,
  end: number,
  amplitude?: number,
  filler?: boolean,
  more?: boolean,
  quiet?: boolean
};

export type viewType = {
  start: number,
  end: number
};

export type settingsField = {
  label: string,
  value: string | number,
  type: "number" | "text",
  unit?: "s"
};

// Array Types
export type grainArray = Array<grainType>;
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

export type State = {
  ui: {},
  tracks: {},
  settings: {},
  keyboard: {}
};
