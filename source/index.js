import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import App from "./containers/App";
import * as OfflinePluginRuntime from "offline-plugin/runtime";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";

const store = configureStore();

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById("root")
  );
};

render(App);

// Hot Module Replacement
if (module.hot) {
  const NextApp = require("./containers/App").default;
  module.hot.accept("./containers/App", () => {
    render(NextApp);
  });
}

// Service Worker
OfflinePluginRuntime.install();
