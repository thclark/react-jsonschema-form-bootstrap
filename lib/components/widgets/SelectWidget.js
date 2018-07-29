import React from 'react';
import PropTypes from 'prop-types';

import { asNumber } from 'react-jsonschema-form/lib/utils';

/**
 * This is a silly limitation in the DOM where option change event values are
 * always retrieved as strings.
 */
function processValue(_ref, value) {
  var type = _ref.type,
      items = _ref.items;

  if (value === '') {
    return undefined;
  } else if (type === 'array' && items && ['number', 'integer'].includes(items.type)) {
    return value.map(asNumber);
  } else if (type === 'boolean') {
    return value === 'true';
  } else if (type === 'number') {
    return asNumber(value);
  }
  return value;
}

function getValue(event, multiple) {
  if (multiple) {
    return [].slice.call(event.target.options).filter(function (o) {
      return o.selected;
    }).map(function (o) {
      return o.value;
    });
  } else {
    return event.target.value;
  }
}

function SelectWidget(props) {
  var id = props.id,
      schema = props.schema,
      options = props.options,
      value = props.value,
      onChange = props.onChange,
      onBlur = props.onBlur,
      onFocus = props.onFocus,
      readonly = props.readonly,
      disabled = props.disabled,
      required = props.required,
      autofocus = props.autofocus,
      placeholder = props.placeholder,
      multiple = props.multiple;
  var enumOptions = options.enumOptions,
      enumDisabled = options.enumDisabled;

  var emptyValue = props.multiple ? [] : '';

  var _onBlur = function _onBlur(event) {
    var newValue = getValue(event, props.multiple);
    onBlur(props.id, processValue(props.schema, newValue));
  };

  var _onFocus = function _onFocus(event) {
    var newValue = getValue(event, props.multiple);
    onFocus(props.id, processValue(props.schema, newValue));
  };

  var _onChange = function _onChange(event) {
    var newValue = getValue(event, props.multiple);
    onChange(processValue(props.schema, newValue));
  };

  return React.createElement(
    'select',
    {
      id: id,
      multiple: multiple,
      className: 'form-control',
      value: typeof value === 'undefined' ? emptyValue : value,
      required: required,
      disabled: disabled || readonly,
      autoFocus: autofocus,
      onBlur: onBlur && _onBlur,
      onFocus: onFocus && _onFocus,
      onChange: _onChange
    },
    !multiple && !schema.default && React.createElement(
      'option',
      { value: '' },
      placeholder
    ),
    enumOptions.map(function (_ref2, i) {
      var value = _ref2.value,
          label = _ref2.label;

      var disabled = enumDisabled && enumDisabled.indexOf(value) !== -1;
      return React.createElement(
        'option',
        { key: i, value: value, disabled: disabled },
        label
      );
    })
  );
}

SelectWidget.defaultProps = {
  autofocus: false
};

if (process.env.NODE_ENV !== 'production') {
  SelectWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    options: PropTypes.shape({
      enumOptions: PropTypes.array
    }).isRequired,
    value: PropTypes.any,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    multiple: PropTypes.bool,
    autofocus: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func
  };
}

export default SelectWidget;