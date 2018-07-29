import React from 'react';
import PropTypes from 'prop-types';

function ColorWidget(props) {
  var _props$className = props.className,
      className = _props$className === undefined ? '' : _props$className,
      disabled = props.disabled,
      readonly = props.readonly,
      BaseInput = props.registry.widgets.BaseInput;

  var style = Object.assign({}, props.styles || {}, {
    height: '2.25rem'
  });
  return React.createElement(BaseInput, Object.assign({
    type: 'color'
  }, props, {
    style: style,
    disabled: disabled || readonly,
    className: 'color-input ' + className
  }));
}

if (process.env.NODE_ENV !== 'production') {
  ColorWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    value: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    autofocus: PropTypes.bool,
    onChange: PropTypes.func
  };
}

export default ColorWidget;