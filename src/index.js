import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./Index.css";
import App from "./components/App";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reminder from "./reducers";

const store = createStore(reminder);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
