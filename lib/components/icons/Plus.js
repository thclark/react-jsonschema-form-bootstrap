import React from "react";

var Plus = function Plus(props) {
  return React.createElement(
    "svg",
    Object.assign({
      viewBox: "0 0 32 32",
      fill: "currentColor",
      width: "1em",
      height: "1em"
    }, props),
    React.createElement("path", { d: "M31 12H20V1a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v11H1a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h11v11a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V20h11a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1z" })
  );
};

export default Plus;