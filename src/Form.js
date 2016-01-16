'use strict';

import React, { Children, Component, PropTypes } from 'react';
import classnames from 'classnames';
import { forEach } from './utils/objects';
import isEqual from './utils/isEqual';
import FormControl from './FormControl';
import FormSubmit from './FormSubmit';
import { fetchEnhance } from './higherOrders/Fetch';

import { requireCss } from './themes';
requireCss('form');

class Form extends Component {
  constructor (props) {
    super(props);
    this.state = {
      data: this.props.data
    };

    this.form = {
      itemBind: (props) => {
        console.log(props);
      },

      itemUnbind: (name) => {
        console.log(`unbind ${name}`);
      },

      itemChange: (name, value) => {
        console.log(name, value);
      }
    }
  }
  
  componentWillMount () {
  }

  componentWillReceiveProps (nextProps) {
    if (!isEqual(this.props.data, nextProps.data)) {
      this.setState({ data: nextProps.data });
    }
  }

  /*
  getValue () {
    let data = this.state.data;
    forEach(this.refs, (ref, k) => {
      if (!ref.props.ignore) {
        data[k] = ref.getValue();
      }
    });
    return data;
  }

  setValue (key, value) {
    let data = this.state.data;
    data[key] = value;
    this.setState({ data });
  }

  equalValidate (targetRef, equalRef) {
    let self = this;
    return function () {
      let target = self.refs[targetRef];
      if (!target) {
        console.warn(`equal target '${targetRef}' not existed`);
        return false;
      }
      let equal = self.refs[equalRef];
      return target.getValue() === equal.getValue();
    };
  }
  */


  renderChildren () {
    let { data } = this.state;
    return Children.map(this.props.children, (child) => {
      let { hintType, readOnly, name } = child.props;
      let props = {
        hintType: hintType || this.props.hintType,
        readOnly: readOnly || this.props.disabled,
        layout: this.props.layout
      };
      if (child.type === FormControl) {
        if (data[name] !== undefined) {
          props.value = data[name];
        }
        //if (child.props.equal) {
        //  props.onValidate = this.equalValidate(child.props.equal, child.props.name);
        //}
        props.form = this.form;
      } else if (child.type === FormSubmit) {
        props.disabled = this.props.disabled;
      }

      return React.cloneElement(child, props);
    });
  }

  validate () {
    let success = true;
    forEach(this.refs, function (child) {
      if (child.props.ignore) {
        return;
      }
      let suc = child.validate();
      success = success && suc;
    });
    return success;
  }

  handleSubmit (event) {
    if (this.props.disabled) {
      return;
    }

    event.preventDefault();
    this.onSubmit();
  }

  onSubmit () {
    let success = this.validate();
    if (success && this.props.beforeSubmit) {
      success = this.props.beforeSubmit();
    }

    if (!success) {
      return;
    }

    if (this.props.onSubmit) {
      this.props.onSubmit(this.getValue());
    }
  }

  render () {
    let className = classnames(
      this.props.className,
      'rct-form',
      {
        'rct-form-aligned': this.props.layout === 'aligned',
        'rct-form-inline': this.props.layout === 'inline',
        'rct-form-stacked': this.props.layout === 'stacked'
      }
    );

    return (
      <form onSubmit={this.handleSubmit.bind(this)} style={this.props.style} className={className}>
        {this.renderChildren()}
      </form>
    );
  }
}

Form.propTypes = {
  beforeSubmit: PropTypes.func,
  children: PropTypes.any,
  className: PropTypes.string,
  data: PropTypes.object,
  hintType: PropTypes.oneOf(['block', 'none', 'pop', 'inline']),
  layout: PropTypes.oneOf(['aligned', 'stacked', 'inline']),
  disabled: PropTypes.bool,
  onSubmit: PropTypes.func,
  style: PropTypes.object
};

Form.defaultProps = {
  data: {},
  layout: 'inline',
  disabled: false
};

module.exports = fetchEnhance(Form);
