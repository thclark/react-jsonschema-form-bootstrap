import React from "react";
import PropTypes from "prop-types";

function PasswordWidget(props) {
  var BaseInput = props.registry.widgets.BaseInput;

  return React.createElement(BaseInput, Object.assign({ type: "password" }, props));
}

if (process.env.NODE_ENV !== "production") {
  PasswordWidget.propTypes = {
    value: PropTypes.string
  };
}

export default PasswordWidget;