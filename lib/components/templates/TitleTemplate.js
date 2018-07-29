import React from 'react';
import PropTypes from 'prop-types';

import { REQUIRED_FIELD_SYMBOL } from './FieldTemplate';

var TitleTemplate = function TitleTemplate(props) {
  var id = props.id,
      title = props.title,
      required = props.required;

  var legend = required ? title + REQUIRED_FIELD_SYMBOL : title;
  return React.createElement(
    'legend',
    { id: id },
    legend
  );
};

if (process.env.NODE_ENV !== 'production') {
  TitleTemplate.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    required: PropTypes.bool
  };
}

export default TitleTemplate;