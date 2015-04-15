var React = require('react')
var classnames = require('classnames')

var Checkbox = require('./checkbox.jsx')
var CheckboxGroup = require('./checkbox-group.jsx')
var Datetime = require('./datetime.jsx')
var RadioGroup = require('./radio-group.jsx')
var Input = require('./input.jsx')
var Select = require('./select.jsx')
var MultSelect = require('./mult-select.jsx')
var TextArea = require('./textarea.jsx')
var Tree = require('./tree.jsx')

var Classable = require('../mixins/classable')
var Validatable = require('../mixins/validatable')


var Control = React.createClass({
  mixins: [Classable, Validatable],

  propTypes: {
    name: React.PropTypes.string.isRequired 
  },

  getInitialState: function () {
    return {
      hasError: false,
      hasValue: this.props.value,
      value: this.props.value,
      hintText: '',
      labelWidth: this.props.labelWidth || 2,
      width: 0,
    }
  },

  componentWillMount: function () {
    this.setWidth()
  },

  setWidth: function () {
    var labelWidth = this.props.labelWidth || 2,
        width = this.props.width || 12
    if (labelWidth + width > 12)
      width = 12 - labelWidth
    this.setState({
      labelWidth: labelWidth,
      width: width
    })
  },

  handleChange: function (value) {
    if (this.props.onChange)
      this.props.onChange(value)
    this.validate(value)
  },

  getValue: function () {
    return this.refs.control.getValue()
  },

  setValue: function (value) {
    this.setState({ value: value, hasValue: true })
  },

  getLabel: function () {
    var className
    if ('horizontal' === this.props.layout) {
      className = 'control-label col-sm-' + (this.state.labelWidth)
    }

    var label = <label className={className}>{this.props.label}</label>
    return label
  },

  getHint: function () {
    var text = this.state.hasValue ? "" : this.state.hintText
    if (this.state.hasError) {
      text = this.state.errorText
    }

    if (this.props.layout === 'inline' || !text)
      return null

    var className = "help-block"
    if ('horizontal' === this.props.layout) {
      var width = 12 - this.state.labelWidth
      className = classnames(className, "col-sm-offset-" + this.state.labelWidth, "col-sm-" + width)
    }

    return <p className={className}>{text}</p>
  },

  getControl: function () {
    var control
    switch (this.props.type) {
      case 'checkbox':
        control = <Checkbox {...this.copyProps()} />
      break
      case 'checkbox-group':
        control = <CheckboxGroup {...this.copyProps()} />
      break
      case 'datetime':
        control = <Datetime className="form-control" {...this.copyProps()} />
      break
      case 'radio-group':
        control = <RadioGroup {...this.copyProps()} />
      break
      case 'select':
        control = <Select className="form-control" {...this.copyProps()} />
      break
      case 'mult-select':
        control = <MultSelect className="form-control" {...this.copyProps()} />
      break
      case 'tree':
        control = <Tree {...this.copyProps()} />
      break
      case 'textarea':
        control = <TextArea className="form-control" {...this.copyProps()} />
      break
      default:
        control = <Input className="form-control" {...this.copyProps()} />
      break
    }

    if ('horizontal' === this.props.layout) {
      control = <div className={'col-sm-' + this.state.width}>{control}</div>
    }
    
    return control
  },

  copyProps: function () {
    var keys = [
      'checked',
      'checkAble',
      'checkKey',
      'data',
      'dateOnly',
      'flat',
      'rows',
      'greedy',
      'inline',
      'open',
      'placeholder', 
      'readOnly',
      'single',
      'src',
      'text',
      'timeOnly',
      'type',
      'unixtime',
    ]

    var props = { 
      ref: "control",
      value: this.state.value,
      onChange: this.handleChange,
    }

    keys.forEach(function (key) {
      if (this.props.hasOwnProperty(key))
        props[key] = this.props[key]
    }.bind(this))
    return props
  },

  render: function () {
    var className = this.getClasses(
      "form-group", 
      {
        "has-error": this.state.hasError
      }
    )

    return (
      <div className={className}>
        {this.getLabel()}
        {this.getControl()}
        {this.getHint()}
      </div>
    )
  }
})

module.exports = Control
