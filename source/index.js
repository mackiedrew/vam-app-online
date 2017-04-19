/*eslint-env node*/

import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import App from "./components/App/App";

const render = (Component) => {
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
  const NextApp = require("./components/App/App").default;
  module.hot.accept("./components/App/App", () => {
    render(NextApp);
  });
}
