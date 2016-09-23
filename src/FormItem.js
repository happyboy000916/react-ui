import { Component, cloneElement, PropTypes } from 'react'
import Enhance from './higherOrders/FormItem'

class FormItem extends Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (value) {
    if (value && value.nativeEvent) {
      value = value.target.value
    }

    this.props.onChange(value)
  }

  render () {
    const { children } = this.props
    let value = this.props.value
    if (value === undefined && children && typeof children.type === 'object' && children.type.defaultProps) {
      value = children.type.defaultProps.vlaue
    }

    if (value === undefined && children.props) {
      value = children.props.value
    }

    return cloneElement(children, {
      value,
      onChange: this.handleChange
    })
  }
}

FormItem.propTypes = {
  children: PropTypes.element,
  onChange: PropTypes.func,
  value: PropTypes.any
}

export default Enhance(FormItem)
