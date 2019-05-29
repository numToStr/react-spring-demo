import React from "react";
import ReactDOM from "react-dom";

import UseTransition from "./UseTransition";
import UseSpring from "./UseSpring";
import UseTrail from "./UseTrail";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <UseTransition />
      <UseSpring />
      <UseTrail />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
