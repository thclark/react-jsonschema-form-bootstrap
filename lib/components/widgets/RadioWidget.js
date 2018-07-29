import React from 'react';
import PropTypes from 'prop-types';

function RadioWidget(props) {
  var options = props.options,
      value = props.value,
      disabled = props.disabled,
      readonly = props.readonly,
      required = props.required,
      autofocus = props.autofocus;
  // Generating a unique field name to identify this set of radio buttons

  var name = Math.random().toString();
  var enumOptions = options.enumOptions,
      inline = options.inline;

  var inlineCls = inline ? 'form-check-inline' : '';
  var onChange = function onChange(value) {
    return function () {
      return props.onChange(value);
    };
  };

  // checked={checked} has been moved above name={name}, As mentioned in #349;
  // this is a temporary fix for radio button rendering bug in React, facebook/react#7630.
  return React.createElement(
    'div',
    {
      className: 'field-radio-group',
      'data-testid': inline ? 'field-radio-group-inline' : 'field-radio-group'
    },
    enumOptions.map(function (option, index) {
      var checked = option.value === value;
      var disabledCls = disabled || readonly ? 'disabled' : '';

      return React.createElement(
        'div',
        { key: index, className: 'form-check ' + disabledCls + ' ' + inlineCls },
        React.createElement(
          'label',
          { className: 'form-check-label' },
          React.createElement('input', {
            type: 'radio',
            className: 'form-check-input',
            checked: checked,
            name: name,
            required: required,
            value: option.value,
            disabled: disabled || readonly,
            autoFocus: autofocus && index === 0,
            onChange: onChange(option.value)
          }),
          React.createElement(
            'span',
            null,
            option.label
          )
        )
      );
    })
  );
}

RadioWidget.defaultProps = {
  autofocus: false
};

if (process.env.NODE_ENV !== 'production') {
  RadioWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    options: PropTypes.shape({
      enumOptions: PropTypes.array,
      inline: PropTypes.bool
    }).isRequired,
    value: PropTypes.any,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    autofocus: PropTypes.bool,
    onChange: PropTypes.func
  };
}
export default RadioWidget;