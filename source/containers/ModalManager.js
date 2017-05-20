// @flow

// Flow Types
import type {
  ModalTypes,
  ReactChildren,
  State,
  Dispatch
} from "../constants/flowTypes";

// Render
import React, { Component } from "react";

// State
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Actions
import clearModal from "../actions/clearModal";
import removeTrack from "../actions/removeTrack";

// Components
import RemoveTrackModal from "../components/RemoveTrackModal";

/**
 * Manages the state of the currently displayed modal and composes more complex
 * actions.
 * 
 * @extends React.Component
 */
export class ModalManager extends Component {
  removeTrackAndModal: Function;

  constructor(props: {
    type: ModalTypes,
    data: Object,
    clearModal: Function,
    removeTrack: Function
  }) {
    super(props);
    // Bind props to class methods.
    this.removeTrackAndModal = this.removeTrackAndModal.bind(this);
  }

  /**
   * Removes the track specified by the modal generating function. Then clears
   * the modal.
   */
  removeTrackAndModal() {
    // Which props need easy access?
    const { data, removeTrack, clearModal } = this.props;
    // Protects against type issues when no data is provided.
    removeTrack(data.trackId || "");
    clearModal();
  }

  render() {
    // Which props do we need easy access to?
    const { data, type, clearModal } = this.props;
    // Which modal should we show?
    const children: ReactChildren = ((modalType: ModalTypes) => {
      switch (modalType) {
        case "REMOVE_TRACK":
          return (
            <RemoveTrackModal
              clearModal={clearModal}
              fileName={data.fileName || "this track"}
              removeTrack={this.removeTrackAndModal}
            />
          );
        case "NONE":
        default:
          return "";
      }
    })(type);

    return (
      <div className="modal-manager">
        {children}
      </div>
    );
  }
}

export const makeMapStateToProps = () => {
  const mapStateToProps = (state: State) => ({
    type: state.ui.modalType,
    data: state.ui.modalData
  });
  return mapStateToProps;
};

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      clearModal: clearModal,
      removeTrack: removeTrack
    },
    dispatch
  );
};

export const mapStateToProps = makeMapStateToProps();

export default connect(mapStateToProps, mapDispatchToProps)(ModalManager);
