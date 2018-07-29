import React from 'react';
import PropTypes from 'prop-types';

function selectValue(value, selected, all) {
  const at = all.indexOf(value);
  const updated = selected.slice(0, at).concat(value, selected.slice(at));
  // As inserting values at predefined index positions doesn't work with empty
  // arrays, we need to reorder the updated selection to match the initial order
  return updated.sort((a, b) => all.indexOf(a) > all.indexOf(b));
}

function deselectValue(value, selected) {
  return selected.filter(v => v !== value);
}

function CheckboxesWidget(props) {
  const { id, disabled, options, value, autofocus, readonly, onChange } = props;
  const { enumOptions, inline } = options;

  const _onChange = option => event => {
    const all = enumOptions.map(({ value }) => value);
    if (event.target.checked) {
      onChange(selectValue(option.value, value, all));
    } else {
      onChange(deselectValue(option.value, value));
    }
  };
  const inlineCls = inline ? 'form-check-inline' : '';
  const disabledCls = disabled || readonly ? 'disabled' : '';

  return (
    <div
      className="checkboxes"
      id={id}
      data-testid={inline ? 'checkboxes-inline' : 'checkboxes'}
    >
      {enumOptions.map((option, index) => {
        const checked = value.indexOf(option.value) !== -1;

        return (
          <div key={index} className={`form-check ${inlineCls} ${disabledCls}`}>
            <input
              type="checkbox"
              id={`${id}_${index}`}
              className="form-check-input"
              checked={checked}
              disabled={disabled || readonly}
              autoFocus={autofocus && index === 0}
              onChange={_onChange(option)}
            />
            <label htmlFor={`${id}_${index}`} className="form-check-label">
              {option.label}
            </label>
          </div>
        );
      })}
    </div>
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
