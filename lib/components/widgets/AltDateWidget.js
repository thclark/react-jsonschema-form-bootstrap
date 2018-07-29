var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { shouldRender, parseDateString, toDateString, pad } from 'react-jsonschema-form/lib/utils';

function rangeOptions(start, stop) {
  var options = [];
  for (var i = start; i <= stop; i++) {
    options.push({ value: i, label: pad(i, 2) });
  }
  return options;
}

function readyForChange(state) {
  return Object.keys(state).every(function (key) {
    return state[key] !== -1;
  });
}

function DateElement(props) {
  var type = props.type,
      range = props.range,
      value = props.value,
      select = props.select,
      rootId = props.rootId,
      disabled = props.disabled,
      readonly = props.readonly,
      autofocus = props.autofocus,
      registry = props.registry,
      onBlur = props.onBlur;

  var id = rootId + '_' + type;
  var SelectWidget = registry.widgets.SelectWidget;

  return React.createElement(SelectWidget, {
    schema: { type: 'integer' },
    id: id,
    className: 'form-control',
    options: { enumOptions: rangeOptions(range[0], range[1]) },
    placeholder: type,
    value: value,
    disabled: disabled,
    readonly: readonly,
    autofocus: autofocus,
    onChange: function onChange(value) {
      return select(type, value);
    },
    onBlur: onBlur,
    registry: registry
  });
}

var AltDateWidget = function (_Component) {
  _inherits(AltDateWidget, _Component);

  function AltDateWidget(props) {
    _classCallCheck(this, AltDateWidget);

    var _this = _possibleConstructorReturn(this, (AltDateWidget.__proto__ || Object.getPrototypeOf(AltDateWidget)).call(this, props));

    _this.onChange = function (property, value) {
      _this.setState(_defineProperty({}, property, typeof value === 'undefined' ? -1 : value), function () {
        // Only propagate to parent state if we have a complete date{time}
        if (readyForChange(_this.state)) {
          _this.props.onChange(toDateString(_this.state, _this.props.time));
        }
      });
    };

    _this.setNow = function (event) {
      event.preventDefault();
      var _this$props = _this.props,
          time = _this$props.time,
          disabled = _this$props.disabled,
          readonly = _this$props.readonly,
          onChange = _this$props.onChange;

      if (disabled || readonly) {
        return;
      }
      var nowDateObj = parseDateString(new Date().toJSON(), time);
      _this.setState(nowDateObj, function () {
        return onChange(toDateString(_this.state, time));
      });
    };

    _this.clear = function (event) {
      event.preventDefault();
      var _this$props2 = _this.props,
          time = _this$props2.time,
          disabled = _this$props2.disabled,
          readonly = _this$props2.readonly,
          onChange = _this$props2.onChange;

      if (disabled || readonly) {
        return;
      }
      _this.setState(parseDateString('', time), function () {
        return onChange(undefined);
      });
    };

    _this.renderElement = function (elemProps, index) {
      var _this$props3 = _this.props,
          id = _this$props3.id,
          disabled = _this$props3.disabled,
          readonly = _this$props3.readonly,
          autofocus = _this$props3.autofocus,
          onBlur = _this$props3.onBlur,
          registry = _this$props3.registry;

      return React.createElement(DateElement, Object.assign({
        rootId: id,
        select: _this.onChange
      }, elemProps, {
        disabled: disabled,
        readonly: readonly,
        registry: registry,
        onBlur: onBlur,
        autofocus: autofocus && index === 0
      }));
    };

    _this.state = parseDateString(props.value, props.time);
    return _this;
  }

  _createClass(AltDateWidget, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState(parseDateString(nextProps.value, nextProps.time));
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return shouldRender(this, nextProps, nextState);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React.createElement(
        'ul',
        { className: 'list-inline' },
        this.dateElementProps.map(function (elemProps, index) {
          return React.createElement(
            'li',
            { key: index, className: 'list-inline-item' },
            _this2.renderElement(elemProps, index)
          );
        }),
        React.createElement(
          'li',
          { className: 'list-inline-item' },
          React.createElement(
            'button',
            { className: 'btn btn-info btn-now', onClick: this.setNow },
            'Now'
          )
        ),
        React.createElement(
          'li',
          { className: 'list-inline-item' },
          React.createElement(
            'button',
            { className: 'btn btn-warning btn-clear', onClick: this.clear },
            'Clear'
          )
        )
      );
    }
  }, {
    key: 'dateElementProps',
    get: function get() {
      var time = this.props.time;
      var _state = this.state,
          year = _state.year,
          month = _state.month,
          day = _state.day,
          hour = _state.hour,
          minute = _state.minute,
          second = _state.second;

      var data = [{ type: 'year', range: [1900, 2020], value: year }, { type: 'month', range: [1, 12], value: month }, { type: 'day', range: [1, 31], value: day }];
      if (time) {
        data.push({ type: 'hour', range: [0, 23], value: hour }, { type: 'minute', range: [0, 59], value: minute }, { type: 'second', range: [0, 59], value: second });
      }
      return data;
    }
  }]);

  return AltDateWidget;
}(Component);

AltDateWidget.defaultProps = {
  time: false,
  disabled: false,
  readonly: false,
  autofocus: false
};


if (process.env.NODE_ENV !== 'production') {
  AltDateWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    value: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    autofocus: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    time: PropTypes.bool
  };
}

export default AltDateWidget;