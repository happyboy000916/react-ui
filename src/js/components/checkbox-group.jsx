"use strict";

var React = require('react');
var Checkbox = require('./checkbox.jsx');
var Strings = require('../utils/strings');
var Classable = require('../mixins/classable');
//var Resourceable = require('../mixins/resourceable')
var ReceiveValue = require('../mixins/receive-value');

module.exports = React.createClass({
  displayName: "CheckboxGroup",

  propTypes: {
    data: React.PropTypes.array,
    inline: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    readOnly: React.PropTypes.bool,
    src: React.PropTypes.string,
    stringify: React.PropTypes.bool,
    textKey: React.PropTypes.string,
    value: React.PropTypes.any,
    valueKey: React.PropTypes.string
  },

  mixins: [Classable, ReceiveValue],

  getInitialState: function () {
    return {
      data: []
    };
  },

  formatValue: function (value) {
    return Strings.formatValue(value, this.props.stringify);
  },

  handleChange: function (checked, value) {
    if (typeof value !== 'string') {
      value = value.toString();
    }

    var values = this.state.value;
    if (checked) {
      values.push(value);
    } else {
      var i = values.indexOf(value);
      if (i >= 0) {
        values.splice(i, 1);
      }
    }

    if (this.props.onChange) {
      this.props.onChange(values);
    }

    this.setState({ value: values });
  },

  getValue: function (raw) {
    var value = this.state.value;
    if (this.props.stringify && raw !== true) {
      value = value.join(',');
    }
    return value;
  },

  render: function () {
    var className = this.getClasses(
      'rui-checkbox-group',
      {
        'inline': this.props.inline
      }
    );
    var values = this.state.value,
        valueKey = this.props.valueKey || 'value',
        textKey = this.props.textKey || 'text';

    var items = this.state.data.map(function (item, i) {
      //var value = this.stringify ? item.value.toString() : item.value;
      var value = item[valueKey];
      if (this.stringify) {
        value = value.toString();
      }
      var checked = values.indexOf(value) >= 0;
      return (
        <Checkbox key={i} index={i} readOnly={this.props.readOnly} checked={checked} onChange={this.handleChange} text={item[textKey]} value={item[valueKey]} />
      );
    }, this);

    return (
      <div className={className}>{items}</div>
    );
  }
});
