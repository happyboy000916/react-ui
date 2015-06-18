"use strict"

require('../../less/checkbox.less')
let React = require('react')
let Classable = require('../mixins/classable')
let Objects = require('../utils/objects')
let Resource = require('../mixins/resource')
let ReceiveValue = require('../mixins/receive-value')
let Radio = require('./radio.jsx')

module.exports = React.createClass({
  displayName: "RadioGroup",

  propTypes: {
    cache: React.PropTypes.bool,
    data: React.PropTypes.array,
    inline: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    readOnly: React.PropTypes.bool,
    src: React.PropTypes.string,
    style: React.PropTypes.object,
    textKey: React.PropTypes.string,
    value: React.PropTypes.any,
    valueKey: React.PropTypes.string
  },

  mixins: [Classable, Resource, ReceiveValue],

  getInitialState: function () {
    return {
      data: []
    }
  },

  initData: function (data) {
    data = Objects.toTextValue(data, this.props.textKey, this.props.valueKey)
    this.setState({ data: data })
  },

  getValue: function () {
    return this.state.value
  },

  handleChange: function (value) {
    if (this.props.readOnly) {
      return
    }

    this.setState({ value: value })
    let change = this.props.onChange
    if (change) {
      setTimeout(function () {
        change(value)
      }, 0)
    }
  },

  render: function () {
    let className = this.getClasses(
      'radio-group',
      {
        'inline': this.props.inline
      }
    )
    let items = this.state.data.map(function (item, i) {
      return (
        <Radio key={i} onClick={this.handleChange} readOnly={this.props.readOnly} checked={this.state.value === item.value} text={item.text} value={item.value} />
      )
    }, this)

    return (
      <div style={this.props.style} className={className}>{items}</div>
    )
  }
})
