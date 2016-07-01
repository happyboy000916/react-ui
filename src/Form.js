'use strict'

import React, { Component } from 'react'
import classnames from 'classnames'
import { forEach, deepEqual, hashcode, objectAssign } from './utils/objects'
import clone from './utils/clone'
import { getGrid } from './utils/grids'
import FormControl from './FormControl'
import Button from './Button'
import PropTypes from './utils/proptypes'
import { compose } from './utils/compose'

import Fetch from './higherOrders/Fetch'
import PureRender from './mixins/PureRender'

import _forms from './styles/_form.scss'

class Form extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: clone(props.data)
    }

    this.handleReset = this.handleReset.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.submit = this.submit.bind(this)

    this.itemBind = this.itemBind.bind(this)
    this.itemUnbind = this.itemUnbind.bind(this)
    this.itemChange = this.itemChange.bind(this)

    this.items = {}
  }

  getChildContext () {
    const { columns, disabled, labelWidth, layout, hintType } = this.props

    return {
      formData: this.state.data,
      itemBind: this.itemBind,
      itemUnbind: this.itemUnbind,
      itemChange: this.itemChange,
      controlProps: {
        hintType,
        labelWidth,
        disabled,
        layout,
        columns
      }
    }
  }

  componentWillReceiveProps (nextProps) {
    if (!deepEqual(this.props.data, nextProps.data)) {
      this.setState({ data: clone(nextProps.data) })

      // if data changed, clear validation
      forEach(this.items, (item) => {
        delete item.$validation
      })
    }
  }

  itemBind (item) {
    const { name, value } = item
    this.items[name] = item
    let { data } = this.state
    if (value && !data[name]) {
      data = objectAssign({}, data, {[name]: value})
      this.setState({ data })
    }
  }

  itemUnbind (name) {
    delete this.items[name]
    delete this.state.data[name]
  }

  itemChange (name, value) {
    const item = this.items[name]
    const data = objectAssign({}, this.state.data, {[name]: value})
    this.setState({ data }, () => {
      if (item.dispatch) {
        const ds = Array.isArray(item.dispatch) ? item.dispatch : [item.dispatch]
        ds.forEach((d) => this.items[d].validate())
      }
    })
  }

  validate () {
    return Object.keys(this.items)
      .reduce((suc, key) => suc && (this.items[key].validate() === true), true)
  }

  handleSubmit (event) {
    if (this.props.disabled) {
      return
    }

    event.preventDefault()
    this.submit()
  }

  handleReset () {
    const { onReset, data } = this.props
    this.setState({ data: clone(data) })

    onReset && onReset(data)
  }

  submit () {
    let success = this.validate()
    if (success && this.props.beforeSubmit) {
      success = this.props.beforeSubmit()
    }

    if (!success) {
      return
    }

    if (this.props.onSubmit) {
      // send clone data
      let data = clone(this.state.data)

      // remove disabled value
      forEach(this.items, (item) => {
        if (item.disabled) {
          delete data[item.name]
        }
      })

      this.props.onSubmit(data)
    }

    return true
  }

  renderControls () {
    const { hintType, controls, disabled, layout } = this.props

    return clone(controls).map((control) => {
      if (typeof control !== 'object') {
        return control
      } else {
        control.key = control.key || control.name || hashcode(control)
        control.hintType = control.hintType || hintType
        control.readOnly = control.readOnly || disabled
        control.layout = layout
        return <FormControl { ...control } />
      }
    })
  }

  renderButtons (buttons) {
    if (typeof buttons === 'string') {
      buttons = { 'submit': buttons }
    }

    const { submit, reset, cancel } = buttons

    return (
      <FormControl key="buttons" columns={null}>
        { submit && <Button className={_forms.button} type="submit" status="primary">{submit}</Button> }
        { reset && <Button onClick={this.handleReset} className={_forms.button}>{reset}</Button> }
        { cancel && <Button onClick={this.props.onCancel} className={_forms.button}>{cancel}</Button> }
      </FormControl>
    )
  }

  render () {
    const { button, buttons, controls, children, grid, layout, ...props } = this.props

    const className = classnames(
      this.props.className,
      getGrid(grid),
      _forms.form,
      _forms[layout]
    )

    const btns = buttons || button

    return (
      <form {...props} onSubmit={this.handleSubmit} className={className}>
        {controls && this.renderControls()}
        {children}
        {btns && this.renderButtons(btns)}
      </form>
    )
  }
}

Form.propTypes = {
  beforeSubmit: PropTypes.func,
  button: PropTypes.string,
  buttons: PropTypes.object,
  children: PropTypes.any,
  className: PropTypes.string,
  columns: PropTypes.number,
  controls: PropTypes.array,
  data: PropTypes.object,
  disabled: PropTypes.bool,
  grid: PropTypes.grid,
  hintType: PropTypes.oneOf(['block', 'none', 'pop', 'inline']),
  labelWidth: PropTypes.number_string,
  layout: PropTypes.oneOf(['aligned', 'stacked', 'inline']),
  onCancel: PropTypes.func,
  onReset: PropTypes.func,
  onSubmit: PropTypes.func,
  style: PropTypes.object
}

Form.defaultProps = {
  data: {},
  layout: 'aligned',
  disabled: false
}

Form.childContextTypes = {
  formData: PropTypes.object,
  itemBind: PropTypes.func,
  itemChange: PropTypes.func,
  itemUnbind: PropTypes.func,
  controlProps: PropTypes.object
}

export default compose(Fetch, PureRender(true))(Form)
