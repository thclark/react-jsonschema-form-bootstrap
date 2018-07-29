import React from 'react';

var ErrorListTemplate = function ErrorListTemplate(props) {
  var errors = props.errors;


  return React.createElement(
    "div",
    { className: "card text-white bg-danger mb-3" },
    React.createElement(
      "div",
      { className: "card-header" },
      "Errors"
    ),
    React.createElement(
      "ul",
      { className: "list-group list-group-flush" },
      errors.map(function (error, index) {
        return React.createElement(
          "li",
          { key: index, className: "list-group-item list-group-item-danger" },
          error.stack
        );
      })
    )
  );
};

export default ErrorListTemplate;