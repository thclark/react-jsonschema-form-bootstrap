import React from "react";
import PropTypes from "prop-types";

function EmailWidget(props) {
  var BaseInput = props.registry.widgets.BaseInput;

  return React.createElement(BaseInput, Object.assign({ type: "email" }, props));
}

if (process.env.NODE_ENV !== "production") {
  EmailWidget.propTypes = {
    value: PropTypes.string
  };
}

export default EmailWidget;