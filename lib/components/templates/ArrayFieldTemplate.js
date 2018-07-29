function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';

import ArrowUp from '../icons/ArrowUp';
import ArrowDown from '../icons/ArrowDown';
import Cross from '../icons/Cross';
import Plus from '../icons/Plus';

export function NormalTemplate(props) {
  return React.createElement(
    'fieldset',
    { className: props.className },
    React.createElement(ArrayFieldTitle, {
      key: 'array-field-title-' + props.idSchema.$id,
      idSchema: props.idSchema,
      title: props.uiSchema['ui:title'] || props.title,
      required: props.required,
      TitleTemplate: props.TitleTemplate
    }),
    (props.uiSchema['ui:description'] || props.schema.description) && React.createElement(ArrayFieldDescription, {
      key: 'array-field-description-' + props.idSchema.$id,
      idSchema: props.idSchema,
      description: props.uiSchema['ui:description'] || props.schema.description,
      DescriptionTemplate: props.DescriptionTemplate
    }),
    React.createElement(
      'div',
      {
        className: 'array-item-list',
        key: 'array-item-list-' + props.idSchema.$id
      },
      props.items && props.items.map(function (p) {
        return ArrayFieldItem(p);
      })
    ),
    props.canAdd && React.createElement(AddButton, {
      onClick: props.onAddClick,
      disabled: props.disabled || props.readonly
    })
  );
}

export function FixedTemplate(props) {
  return React.createElement(
    'fieldset',
    { className: props.className },
    React.createElement(ArrayFieldTitle, {
      key: 'array-field-title-' + props.idSchema.$id,
      idSchema: props.idSchema,
      title: props.uiSchema['ui:title'] || props.title,
      required: props.required,
      TitleTemplate: props.TitleTemplate
    }),
    (props.uiSchema['ui:description'] || props.schema.description) && React.createElement(
      'div',
      {
        className: 'field-description',
        key: 'field-description-' + props.idSchema.$id
      },
      props.uiSchema['ui:description'] || props.schema.description
    ),
    React.createElement(
      'div',
      {
        className: 'array-item-list',
        key: 'array-item-list-' + props.idSchema.$id
      },
      props.items && props.items.map(ArrayFieldItem)
    ),
    props.canAdd && React.createElement(AddButton, {
      onClick: props.onAddClick,
      disabled: props.disabled || props.readonly
    })
  );
}

function ArrayFieldTitle(_ref) {
  var TitleTemplate = _ref.TitleTemplate,
      idSchema = _ref.idSchema,
      title = _ref.title,
      required = _ref.required;

  if (!title) {
    // See #312: Ensure compatibility with old versions of React.
    return React.createElement('div', null);
  }
  var id = idSchema.$id + '__title';
  return React.createElement(TitleTemplate, { id: id, title: title, required: required });
}

function ArrayFieldDescription(_ref2) {
  var DescriptionTemplate = _ref2.DescriptionTemplate,
      idSchema = _ref2.idSchema,
      description = _ref2.description;

  if (!description) {
    // See #312: Ensure compatibility with old versions of React.
    return React.createElement('div', null);
  }
  var id = idSchema.$id + '__description';
  return React.createElement(DescriptionTemplate, { id: id, description: description });
}

// Used in the two templates
function ArrayFieldItem(props) {
  var btnStyle = {
    flex: 1,
    paddingLeft: 6,
    paddingRight: 6,
    fontWeight: 'bold'
  };

  return React.createElement(
    'div',
    { key: props.index, className: props.className + ' row' },
    React.createElement(
      'div',
      { className: props.hasToolbar ? 'col-9' : 'col-12' },
      props.children
    ),
    props.hasToolbar && React.createElement(
      'div',
      { className: 'col-3 array-item-toolbox' },
      React.createElement(
        'div',
        {
          className: 'btn-group',
          style: {
            display: 'flex',
            justifyContent: 'space-around'
          }
        },
        (props.hasMoveUp || props.hasMoveDown) && React.createElement(IconButton, {
          icon: ArrowUp,
          className: 'array-item-move-up',
          'data-testid': 'array-move-up',
          tabIndex: '-1',
          style: btnStyle,
          disabled: props.disabled || props.readonly || !props.hasMoveUp,
          onClick: props.onReorderClick(props.index, props.index - 1)
        }),
        (props.hasMoveUp || props.hasMoveDown) && React.createElement(IconButton, {
          icon: ArrowDown,
          className: 'array-item-move-down',
          'data-testid': 'array-move-down',
          tabIndex: '-1',
          style: btnStyle,
          disabled: props.disabled || props.readonly || !props.hasMoveDown,
          onClick: props.onReorderClick(props.index, props.index + 1)
        }),
        props.hasRemove && React.createElement(IconButton, {
          type: 'danger',
          icon: Cross,
          className: 'array-item-remove',
          'data-testid': 'array-remove',
          tabIndex: '-1',
          style: btnStyle,
          disabled: props.disabled || props.readonly,
          onClick: props.onDropIndexClick(props.index)
        })
      )
    )
  );
}

function AddButton(_ref3) {
  var onClick = _ref3.onClick,
      disabled = _ref3.disabled;

  return React.createElement(
    'div',
    { className: 'row' },
    React.createElement(
      'p',
      { className: 'col-sm-3 offset-sm-9 array-item-add text-right' },
      React.createElement(IconButton, {
        type: 'info',
        icon: Plus,
        className: 'btn-add col-sm-12',
        'data-testid': 'array-add',
        tabIndex: '0',
        onClick: onClick,
        disabled: disabled
      })
    )
  );
}

function IconButton(props) {
  var _props$type = props.type,
      type = _props$type === undefined ? 'secondary' : _props$type,
      Icon = props.icon,
      className = props.className,
      otherProps = _objectWithoutProperties(props, ['type', 'icon', 'className']);

  return React.createElement(
    'button',
    Object.assign({
      type: 'button',
      className: 'btn btn-' + type + ' ' + className
    }, otherProps),
    React.createElement(Icon, null)
  );
}