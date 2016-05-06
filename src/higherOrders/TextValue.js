'use strict';

import React, { PropTypes, Children } from 'react';
import curry from 'curry';
import { toArray } from '../utils/strings';
import { toTextValue, hashcode } from '../utils/objects';

export const textValueEnhance = curry((single, Component) => {
  class TextValue extends React.Component {
    constructor (props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
    }

    formatData (data) {
      let values = toArray(this.props.value, this.props.sep);
      data = toTextValue(data, this.props.textTpl, this.props.valueTpl)
        .map((d) => {
          d.$checked = values.indexOf(d.$value) >= 0;
          return d;
        });

      Children.map(this.props.children, (child) => {
        if (typeof child === 'object') {
          let position = child.props.position;
          if (position === undefined) {
            position = data.length;
          }
          data = [
            ...data.slice(0, position),
            {
              $checked: values.indexOf(child.props.defaultValue) >= 0,
              $value: child.props.defaultValue,
              $text: child.props.children || child.props.text,
              $key: child.props.id || hashcode(child.props.defaultValue)
            },
            ...data.slice(position)
          ];
        }
      });

      // for get checked values
      this.data = data;
      return data;
    }

    handleChange (value, checked, index) {
      const { sep, onChange } = this.props;
      let data = this.data,
          values = [],
          raw = [];

      if (!single) {
        data[index].$checked = checked;
        data.forEach((d) => {
          if (d.$checked) {
            values.push(d.$value);
            raw.push(d);
          }
        });

        if (sep && typeof sep === 'string') {
          value = values.join(sep);
        } else if (typeof sep === 'function') {
          value = sep(raw);
        } else {
          value = values;
        }
      }

      if (onChange) {
        onChange(value);
      }
    }

    render () {
      return (
        <Component {...this.props}
          data={this.formatData(this.props.data)}
          onChange={this.handleChange}
        />
      );
    }
  }

  TextValue.propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.array
    ]),
    data: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ]),
    onChange: PropTypes.func,
    sep: PropTypes.string,
    textTpl: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func
    ]),
    value: PropTypes.any,
    valueTpl: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func
    ])
  };

  TextValue.defaultProps = {
    data: [],
    sep: ',',
    textTpl: '{text}',
    valueTpl: '{id}'
  };

  return TextValue;
});
