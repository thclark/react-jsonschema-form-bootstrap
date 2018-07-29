import React from "react";

var ArrowUp = function ArrowUp(props) {
  return React.createElement(
    "svg",
    Object.assign({
      viewBox: "0 0 32 32",
      fill: "currentColor",
      width: "1em",
      height: "1em"
    }, props),
    React.createElement("path", { d: "M16 1L1 16h9v16h12V16h9z" })
  );
};

export default ArrowUp;