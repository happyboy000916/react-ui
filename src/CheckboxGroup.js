'use strict';

import { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Checkbox from './Checkbox';
import { toArray } from './utils/strings';
import isEqual from './utils/isEqual';
import { toTextValue } from './utils/objects';
import { fetchEnhance } from './higherOrders/Fetch';
import { register } from './higherOrders/FormItem';

class CheckboxGroup extends Component {
  constructor (props) {
    super(props);
    this.state = {
      value: this.formatValue(this.props.value),
      data: this.formatData(this.props.data)
    };
    this.handleChange = this.handleChange.bind(this);
  }
 
  componentWillReceiveProps (nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setValue(nextProps.value);
    }
    if (!isEqual(nextProps.data, this.props.data)) {
      this.setState({ data: this.formatData(nextProps.data) });
    }
  }

  formatValue (value) {
    return toArray(value, this.props.sep);
  }

  getValue (sep) {
    let value = this.state.value;
    if (sep === undefined) {
      sep = this.props.sep;
    }
    if (sep) {
      value = value.join(sep);
    }
    return value;
  }

  setValue (value) {
    this.setState({ value: this.formatValue(value) });
  }

  formatData (data) {
    return toTextValue(data, this.props.textTpl, this.props.valueTpl);
  }

  handleChange (value, checked) {
    if (typeof value !== 'string') {
      value = value.toString();
    }

    let values = this.state.value;
    if (checked) {
      values.push(value);
    } else {
      let i = values.indexOf(value);
      if (i >= 0) {
        values.splice(i, 1);
      }
    }

    if (this.props.onChange) {
      this.props.onChange(this.props.sep ? values.join(this.props.sep) : values);
    }

    this.setState({ value: values });
  }

  render () {
    let className = classnames(
      this.props.className,
      'rct-checkbox-group',
      { 'rct-inline': this.props.inline }
    );
    let values = this.state.value;

    let items = this.state.data.map((item, i) => {
      let value = this.props.sep ? item.$value.toString() : item.$value;
      let checked = values.indexOf(value) >= 0;
      return (
        <Checkbox key={i}
          index={i}
          readOnly={this.props.readOnly}
          checked={checked}
          onChange={this.handleChange}
          text={item.$text}
          value={item.$value}
        />
      );
    });

    return (
      <div style={this.props.style} className={className}>{this.state.msg || items}</div>
    );
  }
}

CheckboxGroup.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array,
  inline: PropTypes.bool,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
  sep: PropTypes.string,
  style: PropTypes.object,
  textTpl: PropTypes.string,
  value: PropTypes.any,
  valueTpl: PropTypes.string
};
 
CheckboxGroup.defaultProps = {
  data: [],
  sep: ',',
  textTpl: '{text}',
  valueTpl: '{id}'
};

CheckboxGroup = fetchEnhance(CheckboxGroup);

module.exports = register(CheckboxGroup, 'checkbox-group', { valueType: 'array' });
