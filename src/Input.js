'use strict';

import React, { Component } from 'react';
import classnames from 'classnames';
import Regs from './utils/regs';
import { getGrid } from './utils/grids';
import { register } from './higherOrders/FormItem';
import { triggerAble } from './higherOrders/Trigger';
import PropTypes from './utils/proptypes';
import { compose } from './utils/compose';

import _inputs from './styles/_input.scss';

class Input extends Component {
  constructor (props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (event) {
    const { type } = this.props;

    let value = event.target.value;
    if (value && (type === 'integer' || type === 'number')) {
      if (!Regs[type].test(value)) return;
    }

    this.props.onChange(value);
  }

  render () {
    const { className, grid, type, size, readOnly, ...other } = this.props;
    const props = {
      className: classnames(
        className,
        _inputs.input,
        _inputs[size],
        readOnly && _inputs.disabled,
        getGrid(grid)
      ),
      readOnly,
      onChange: readOnly ? undefined : this.handleChange,
      type: type === 'password' ? 'password' : 'text'
    };

    return (<input {...other} {...props} />);
  }
}

Input.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.string,
  grid: PropTypes.grid,
  id: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  rows: PropTypes.number,
  size: PropTypes.oneOf(['small', 'large', 'middle']),
  style: PropTypes.object,
  type: PropTypes.string,
  value: PropTypes.any
};

Input.defaultProps = {
  size: 'middle',
  trigger: 'change',
  value: ''
};

export default compose(
  register(['text', 'email', 'alpha', 'alphanum', 'password', 'url', 'integer', 'number'], {}),
  triggerAble
)(Input);
