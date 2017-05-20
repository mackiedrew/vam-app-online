// @flow

// Flow Types
import type { State, Dispatch, HotkeyValues } from "../constants/flowTypes";

// Render
import React, { Component } from "react";

// State
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Libraries
import keyboard from "keyboardjs";

// Actions
import toggleCurrentlyPlaying from "../actions/toggleCurrentlyPlaying";

// Selectors
import getHotkeyValues from "../selectors/getHotkeyValues";

/**
 * Manages the operations and state of the keyboard hot keys and shortcuts.
 * 
 * @extends React.Component
 */
export class KeyboardManager extends Component {
  // Set flow types for class properties
  hotkeys: Array<{
    operation: Function,
    binding: string
  }>;

  constructor(props: {
    hotkeyValues: HotkeyValues,
    toggleCurrentlyPlaying: Function
  }) {
    super(props);
  }

  render() {
    const {
      hotkeyValues,
      toggleCurrentlyPlaying
    }: {
      hotkeyValues: HotkeyValues,
      toggleCurrentlyPlaying: Function
    } = this.props;
    // Set actual actions (not necessarily redux actions) of hotkey events.
    const hotkeyOperations = {
      play: toggleCurrentlyPlaying
    };
    const setOperations: Array<string> = Object.keys(hotkeyOperations);
    const fullBindings: HotkeyValues = {
      ...hotkeyValues
      // Add special varieties here: `play: hotkeyValues[play] + " -> x"`
    };
    const hotkeys = setOperations.map(operationName => {
      return {
        operation: hotkeyOperations[operationName],
        binding: fullBindings[operationName]
      };
    });
    keyboard.reset();
    hotkeys.forEach(
      ({
        binding,
        operation
      }: {
        binding: string,
        operation: Function
      }): void => {
        keyboard.bind(binding, operation);
      }
    );
    return <div className="keyboard-manager" />;
  }
}

export const makeMapStateToProps = () => {
  const mapStateToProps = (state: State) => ({
    hotkeyValues: getHotkeyValues(state)
  });
  return mapStateToProps;
};

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      toggleCurrentlyPlaying: toggleCurrentlyPlaying
    },
    dispatch
  );
};

export const mapStateToProps = makeMapStateToProps();

export default connect(mapStateToProps, mapDispatchToProps)(KeyboardManager);
