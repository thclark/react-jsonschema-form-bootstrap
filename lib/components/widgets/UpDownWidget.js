import React from 'react';
import PropTypes from 'prop-types';

import { rangeSpec } from 'react-jsonschema-form/lib/utils';

function UpDownWidget(props) {
  var BaseInput = props.registry.widgets.BaseInput;

  return React.createElement(BaseInput, Object.assign({ type: 'number' }, props, rangeSpec(props.schema)));
}

if (process.env.NODE_ENV !== 'production') {
  UpDownWidget.propTypes = {
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  };
}

export default UpDownWidget;