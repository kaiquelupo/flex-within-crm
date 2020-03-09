import React from "react";
import ReactDOM from "react-dom";
import "regenerator-runtime/runtime";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

const mountNode = document.getElementById("root");

function renderApp() {
  ReactDOM.render(
    <App />,
    mountNode
  );
}

renderApp();

registerServiceWorker();
