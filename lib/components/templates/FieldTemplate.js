import React from 'react';
import PropTypes from 'prop-types';

export var REQUIRED_FIELD_SYMBOL = '*';

var Label = function Label(props) {
  var label = props.label,
      required = props.required,
      id = props.id;

  if (!label) {
    // See #312: Ensure compatibility with old versions of React.
    return React.createElement('div', null);
  }
  return React.createElement(
    'label',
    { className: 'control-label', htmlFor: id },
    label,
    required && React.createElement(
      'span',
      { className: 'required' },
      REQUIRED_FIELD_SYMBOL
    )
  );
};

var Help = function Help(props) {
  var help = props.help;

  if (!help) {
    // See #312: Ensure compatibility with old versions of React.
    return React.createElement('div', null);
  }
  if (typeof help === 'string') {
    return React.createElement(
      'small',
      { className: 'form-text text-muted' },
      help
    );
  }
  return React.createElement(
    'div',
    { className: 'form-text' },
    help
  );
};

export var ErrorList = function ErrorList(props) {
  var _props$errors = props.errors,
      errors = _props$errors === undefined ? [] : _props$errors;

  if (errors.length === 0) {
    return React.createElement('div', null);
  }
  return React.createElement(
    'ul',
    null,
    errors.map(function (error, index) {
      return React.createElement(
        'li',
        { className: 'text-danger', key: index, 'data-testid': 'error-detail' },
        error
      );
    })
  );
};

var FieldTemplate = function FieldTemplate(props) {
  var id = props.id,
      label = props.label,
      children = props.children,
      errors = props.errors,
      help = props.help,
      description = props.description,
      hidden = props.hidden,
      required = props.required,
      displayLabel = props.displayLabel;

  var classNames = [props.classNames, errors && errors.length > 0 ? 'has-error has-danger' : ''].join(' ').trim();

  if (hidden) {
    return children;
  }

  return React.createElement(
    'div',
    { className: classNames, 'data-testid': id },
    displayLabel && React.createElement(Label, { label: label, required: required, id: id }),
    displayLabel && description ? description : null,
    children,
    React.createElement(ErrorList, { errors: errors }),
    React.createElement(Help, { help: help })
  );
};

if (process.env.NODE_ENV !== 'production') {
  FieldTemplate.propTypes = {
    id: PropTypes.string,
    classNames: PropTypes.string,
    label: PropTypes.string,
    children: PropTypes.node.isRequired,
    errors: PropTypes.arrayOf(PropTypes.string),
    help: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    description: PropTypes.element,
    rawDescription: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    hidden: PropTypes.bool,
    required: PropTypes.bool,
    readonly: PropTypes.bool,
    displayLabel: PropTypes.bool,
    fields: PropTypes.object,
    formContext: PropTypes.object
  };
}

FieldTemplate.defaultProps = {
  hidden: false,
  readonly: false,
  required: false,
  displayLabel: true
};

export default FieldTemplate;