import React from 'react';
import PropTypes from 'prop-types';

import DescriptionTemplate from '../templates/DescriptionTemplate';

function CheckboxWidget(props) {
  var id = props.id,
      schema = props.schema,
      value = props.value,
      _onChange = props.onChange,
      label = props.label,
      disabled = props.disabled,
      readonly = props.readonly,
      required = props.required,
      autofocus = props.autofocus;


  return React.createElement(
    'div',
    { className: 'checkbox' },
    schema.description && React.createElement(DescriptionTemplate, { description: schema.description }),
    React.createElement(
      'div',
      { className: 'form-check ' + (disabled || readonly ? 'disabled' : '') },
      React.createElement(
        'label',
        { className: 'form-check-label' },
        React.createElement('input', {
          type: 'checkbox',
          id: id,
          className: 'form-check-input',
          checked: typeof value === 'undefined' ? false : value,
          required: required,
          disabled: disabled || readonly,
          autoFocus: autofocus,
          onChange: function onChange(event) {
            return _onChange(event.target.checked);
          }
        }),
        React.createElement(
          'span',
          null,
          label
        )
      )
    )
  );
}

CheckboxWidget.defaultProps = {
  autofocus: false
};

if (process.env.NODE_ENV !== 'production') {
  CheckboxWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    value: PropTypes.bool,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    autofocus: PropTypes.bool,
    onChange: PropTypes.func
  };
}

export default CheckboxWidget;