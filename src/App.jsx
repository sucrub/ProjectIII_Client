import React from "react";
import AppRouter from "./router";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store()}>
      <AppRouter />
    </Provider>
  );
}

export default App;
