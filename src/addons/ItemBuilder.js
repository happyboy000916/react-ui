'use strict';

import React, { PropTypes } from 'react';
import Form from '../Form';
import FormControl from '../FormControl';
import { COMPONENTS } from '../higherOrders/FormItem';
import FormSubmit from '../FormSubmit';
import Checkbox from '../Checkbox';
import '../Input';
import '../Select';
import '../Datepicker';
import '../RadioGroup';

const TYPES = Object.keys(COMPONENTS).sort();

class ItemBuilder extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      type: props.item.type || 'text'
    };
    this.handleType = this.handleType.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleType (type) {
    const component = COMPONENTS[type];
    console.log(type, component);
  }

  handleSubmit (data) {
    this.props.onSubmit(data);
  }

  renderTypeControls (type) {
  }

  render () {
    let { item } = this.props;
    item.type = this.state.type;

    return (
      <Form data={item} onSubmit={this.handleSubmit}>
        <FormControl onChange={this.handleType} grid={1/3} required name="type" label="类型" type="select" data={TYPES} />
        <FormControl grid={1/3} name="label" label="label文字" />
        <FormControl grid={1/3} required name="name" label="name" />
        <FormControl grid={1/2} name="placeholder" label="placeholder" />
        <FormControl>
          <Checkbox name="required" text="必填" />
          <Checkbox name="readOnly" text="只读" />
        </FormControl>

        <FormControl type="textarea" grid={5/6} rows={2} autoHeight name="style" label="style" />

        <FormSubmit>确定</FormSubmit>
      </Form>
    );
  }
}

ItemBuilder.propTypes = {
  item: PropTypes.object,
  onSubmit: PropTypes.func
};

ItemBuilder.defaultProps = {
  item: {}
}

module.exports = ItemBuilder;

