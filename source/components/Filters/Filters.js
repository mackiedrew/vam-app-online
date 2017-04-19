import React, { Component } from "react";
import "./Filters.styl";

class Filters extends Component {
  constructor(props) {
    // Initialize extended class with passed props
    super(props);
  }

  filterStyle (open) {
    return open ? { marginLeft: "0px" } : { marginLeft: "-100px" };
  }

  render() {
    // Break out values for the sake of easier template reading
    const { open } = this.props;

    return (
      <aside className="filters" style={this.filterStyle(open)}>
        Filter!
      </aside>
    );
  }
}

export default Filters;
