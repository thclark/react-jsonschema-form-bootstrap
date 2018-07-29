import React from 'react';
import PropTypes from 'prop-types';

function selectValue(value, selected, all) {
  var at = all.indexOf(value);
  var updated = selected.slice(0, at).concat(value, selected.slice(at));
  // As inserting values at predefined index positions doesn't work with empty
  // arrays, we need to reorder the updated selection to match the initial order
  return updated.sort(function (a, b) {
    return all.indexOf(a) > all.indexOf(b);
  });
}

function deselectValue(value, selected) {
  return selected.filter(function (v) {
    return v !== value;
  });
}

function CheckboxesWidget(props) {
  var id = props.id,
      disabled = props.disabled,
      options = props.options,
      value = props.value,
      autofocus = props.autofocus,
      readonly = props.readonly,
      onChange = props.onChange;
  var enumOptions = options.enumOptions,
      inline = options.inline;


  var _onChange = function _onChange(option) {
    return function (event) {
      var all = enumOptions.map(function (_ref) {
        var value = _ref.value;
        return value;
      });
      if (event.target.checked) {
        onChange(selectValue(option.value, value, all));
      } else {
        onChange(deselectValue(option.value, value));
      }
    };
  };
  var inlineCls = inline ? 'form-check-inline' : '';
  var disabledCls = disabled || readonly ? 'disabled' : '';

  return React.createElement(
    'div',
    {
      className: 'checkboxes',
      id: id,
      'data-testid': inline ? 'checkboxes-inline' : 'checkboxes'
    },
    enumOptions.map(function (option, index) {
      var checked = value.indexOf(option.value) !== -1;

      return React.createElement(
        'div',
        { key: index, className: 'form-check ' + inlineCls + ' ' + disabledCls },
        React.createElement('input', {
          type: 'checkbox',
          id: id + '_' + index,
          className: 'form-check-input',
          checked: checked,
          disabled: disabled || readonly,
          autoFocus: autofocus && index === 0,
          onChange: _onChange(option)
        }),
        React.createElement(
          'label',
          { htmlFor: id + '_' + index, className: 'form-check-label' },
          option.label
        )
      );
    })
  );
}

CheckboxesWidget.defaultProps = {
  autofocus: false,
  options: {
    inline: false
  }
};

if (process.env.NODE_ENV !== 'production') {
  CheckboxesWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    options: PropTypes.shape({
      enumOptions: PropTypes.array,
      inline: PropTypes.bool
    }).isRequired,
    value: PropTypes.any,
    required: PropTypes.bool,
    readonly: PropTypes.bool,
    disabled: PropTypes.bool,
    multiple: PropTypes.bool,
    autofocus: PropTypes.bool,
    onChange: PropTypes.func
  };
}

export default CheckboxesWidget;