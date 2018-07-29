import React from 'react';

var SubmitTemplate = function SubmitTemplate() {
  return React.createElement(
    "p",
    null,
    React.createElement(
      "button",
      { type: "submit", className: "btn btn-info" },
      "Submit"
    )
  );
};

export default SubmitTemplate;