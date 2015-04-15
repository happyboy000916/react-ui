var React = require('react')

var Checkbox = React.createClass({

  getInitialState: function () {
    return {
      checked: this.props.checked
    }
  },

  componentWillReceiveProps: function (nextProps) {
    if (nextProps.checked !== this.props.checked)
      this.setState({ checked: nextProps.checked })
  },

  handleChange: function (event) {
    this.setState({ checked: event.target.checked })
    if (this.props.onChange)
      this.props.onChange(event.target.checked, this.props.value, this.props.index)
  },

  getValue: function () {
    return React.findDOMNode(this.refs.input).checked ? (this.props.value || true) : false
  },

  render: function () {
    return (
      <div className="checkbox">
        <label>
          <input ref="input" type="checkbox" onChange={this.handleChange} checked={this.state.checked} value={this.props.value} />
          {this.props.text}
        </label>
      </div>
    )
  }
})

module.exports = Checkbox
