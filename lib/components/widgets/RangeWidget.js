import React from 'react';
import PropTypes from 'prop-types';

import { rangeSpec } from 'react-jsonschema-form/lib/utils';

function RangeWidget(props) {
  var schema = props.schema,
      value = props.value,
      BaseInput = props.registry.widgets.BaseInput;


  return React.createElement(
    'div',
    { className: 'field-range-wrapper' },
    React.createElement(BaseInput, Object.assign({ type: 'range' }, props, rangeSpec(schema))),
    React.createElement(
      'span',
      { className: 'range-view' },
      value
    )
  );
}

if (process.env.NODE_ENV !== 'production') {
  RangeWidget.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  };
}

export default RangeWidget;