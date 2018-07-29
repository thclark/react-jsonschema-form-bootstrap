function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';

import { omit } from 'react-jsonschema-form/lib/utils';

function BaseInput(props) {
  // Note: since React 15.2.0 we can't forward unknown element attributes, so we
  // exclude the "options" and "schema" ones here.
  if (!props.id) {
    /*eslint-disable-next-line*/
    console.log('No id for', props);
    throw new Error('no id for props ' + JSON.stringify(props));
  }

  var _omit = omit(['schema', 'formContext', 'registry', 'errors', 'rawErrors'], props),
      value = _omit.value,
      _omit$className = _omit.className,
      className = _omit$className === undefined ? '' : _omit$className,
      readonly = _omit.readonly,
      disabled = _omit.disabled,
      autofocus = _omit.autofocus,
      onBlur = _omit.onBlur,
      onFocus = _omit.onFocus,
      options = _omit.options,
      raw = _omit.raw,
      inputProps = _objectWithoutProperties(_omit, ['value', 'className', 'readonly', 'disabled', 'autofocus', 'onBlur', 'onFocus', 'options', 'raw']);

  inputProps.type = options.inputType || inputProps.type || 'text';
  var _onChange = function _onChange(_ref) {
    var value = _ref.target.value;

    if (raw) {
      return props.onChange(value, options.emptyValue);
    }
    return props.onChange(value === '' ? options.emptyValue : value);
  };

  return React.createElement('input', Object.assign({
    className: 'form-control ' + className,
    readOnly: readonly,
    disabled: disabled,
    autoFocus: autofocus,
    value: value == null ? '' : value
  }, inputProps, {
    onChange: _onChange,
    onBlur: onBlur,
    onFocus: onFocus
  }));
}

BaseInput.defaultProps = {
  type: 'text',
  required: false,
  disabled: false,
  readonly: false,
  autofocus: false
};

if (process.env.NODE_ENV !== 'production') {
  BaseInput.propTypes = {
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.any,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    autofocus: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func
  };
}

export default BaseInput;