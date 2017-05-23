// Libraries
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// Reducers
import rootReducer from "../reducers";

const configureStore = initialState => {
  const createStoreWithMiddleWare = applyMiddleware(thunk)(createStore);
  const store = createStoreWithMiddleWare(
    rootReducer,
    initialState,
    window.devToolsExtension ? window.devToolsExtension() : undefined
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("../reducers", () => {
      const nextRootReducer = require("../reducers").default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;
