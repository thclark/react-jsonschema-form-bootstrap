import React from "react";

var ArrowDown = function ArrowDown(props) {
  return React.createElement(
    "svg",
    Object.assign({
      viewBox: "0 0 32 32",
      fill: "currentColor",
      width: "1em",
      height: "1em"
    }, props),
    React.createElement("path", { d: "M16 31l15-15h-9V0H10v16H1z" })
  );
};

export default ArrowDown;