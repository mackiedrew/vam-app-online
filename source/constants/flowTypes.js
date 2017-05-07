// @flow

// Array Types
export type grainArray = Array<grainType>;
export type numberArray = Array<number>;
export type objectArray = Array<{}>;
export type mixedArray = Array<mixed>;
export type stringArray = Array<string>;

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
