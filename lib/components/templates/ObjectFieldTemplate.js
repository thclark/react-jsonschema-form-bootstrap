import React from 'react';

var ObjectFieldTemplate = function ObjectFieldTemplate(props) {
  var TitleTemplate = props.TitleTemplate,
      DescriptionTemplate = props.DescriptionTemplate;

  return React.createElement(
    'fieldset',
    null,
    (props.uiSchema['ui:title'] || props.title) && React.createElement(TitleTemplate, {
      id: props.idSchema.$id + '__title',
      title: props.title || props.uiSchema['ui:title'],
      required: props.required,
      formContext: props.formContext
    }),
    props.description && React.createElement(DescriptionTemplate, {
      id: props.idSchema.$id + '__description',
      description: props.description,
      formContext: props.formContext
    }),
    props.properties.map(function (prop) {
      return prop.content;
    })
  );
};

export default ObjectFieldTemplate;