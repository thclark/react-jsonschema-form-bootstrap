import React from 'react';
import PropTypes from 'prop-types';

import { utcToLocal, localToUTC } from 'react-jsonschema-form/lib/utils';

function DateTimeWidget(props) {
  var value = props.value,
      _onChange = props.onChange,
      BaseInput = props.registry.widgets.BaseInput;

  return React.createElement(BaseInput, Object.assign({
    type: 'datetime-local'
  }, props, {
    value: utcToLocal(value),
    onChange: function onChange(value) {
      return _onChange(localToUTC(value));
    }
  }));
}

if (process.env.NODE_ENV !== 'production') {
  DateTimeWidget.propTypes = {
    value: PropTypes.string
  };
}

export default DateTimeWidget;