import React from "react";
import ReactDOM from "react-dom";

// import UseTransition from "./UseTransition";
// import UseSpring from "./UseSpring";
// import UseTrail from "./UseTrail";
import Drawer from "./Drawer";

import "./styles.scss";

function App() {
  return (
    <div className="App">
      {/* <UseTransition /> */}
      {/* <UseSpring /> */}
      {/* <UseTrail /> */}
      <Drawer />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
