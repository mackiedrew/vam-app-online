/*eslint-env node*/

import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import App from "./containers/App/App";

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById("root")
  );
};

render(App);

// Hot Module Replacement
if (module.hot) {
  module.hot.accept("./containers/App/App", () => {
    render(App);
  });
}
