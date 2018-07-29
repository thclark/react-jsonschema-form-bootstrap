import React from 'react';
import PropTypes from 'prop-types';

function TextareaWidget(props) {
  var id = props.id,
      onChange = props.onChange,
      onBlur = props.onBlur,
      onFocus = props.onFocus,
      placeholder = props.placeholder,
      required = props.required,
      readonly = props.readonly,
      disabled = props.disabled,
      autofocus = props.autofocus,
      value = props.value,
      options = props.options;

  var _onChange = function _onChange(_ref) {
    var value = _ref.target.value;

    return onChange(value === '' ? props.options.emptyValue : value);
  };

  return React.createElement('textarea', {
    id: id,
    className: 'form-control',
    value: typeof value === 'undefined' ? '' : value,
    placeholder: placeholder,
    required: required,
    disabled: disabled,
    readOnly: readonly,
    autoFocus: autofocus,
    rows: options.rows,
    onBlur: onBlur && function (event) {
      return onBlur(props.id, event.target.value);
    },
    onFocus: onFocus && function (event) {
      return onFocus(props.id, event.target.value);
    },
    onChange: _onChange
  });
}

TextareaWidget.defaultProps = {
  autofocus: false,
  options: {}
};

if (process.env.NODE_ENV !== 'production') {
  TextareaWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    options: PropTypes.shape({
      rows: PropTypes.number
    }),
    value: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    autofocus: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func
  };
}

export default TextareaWidget;