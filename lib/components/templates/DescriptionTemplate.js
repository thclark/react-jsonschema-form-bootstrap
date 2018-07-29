import React from 'react';
import PropTypes from 'prop-types';

var DescriptionTemplate = function DescriptionTemplate(props) {
  var id = props.id,
      description = props.description;

  if (!description) {
    // See #312: Ensure compatibility with old versions of React.
    return React.createElement('div', null);
  }
  if (typeof description === 'string') {
    return React.createElement(
      'p',
      { id: id, className: 'field-description' },
      React.createElement(
        'small',
        null,
        description
      )
    );
  } else {
    return React.createElement(
      'div',
      { id: id, className: 'field-description' },
      description
    );
  }
};

if (process.env.NODE_ENV !== 'production') {
  DescriptionTemplate.propTypes = {
    id: PropTypes.string,
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
  };
}

export default DescriptionTemplate;