'use strict';

import React, { PropTypes } from 'react';
import { Checkbox } from './Checkbox';
import { fetchEnhance } from './higherOrders/Fetch';
import { register } from './higherOrders/FormItem';
import { textValueEnhance } from './higherOrders/TextValue';
import { compose } from './utils/compose';

const CheckboxGroup = (props) => {
  const { className, style, data, readOnly, block, inline, onChange } = props;

  // old inline prop
  let checkBlock = block;
  if (block === undefined && inline !== undefined) {
    checkBlock = !inline;
  }

  return (
    <div style={style} className={className}>
    {
      data.map((item, i) => {
        return (
          <Checkbox key={item.$key}
            index={i}
            readOnly={readOnly}
            block={checkBlock}
            checked={item.$checked}
            onChange={onChange}
            text={item.$text}
            defaultValue={item.$value}
          />
        );
      })
    }
    </div>
  );
}

CheckboxGroup.propTypes = {
  block: PropTypes.bool,
  className: PropTypes.string,
  data: PropTypes.array,
  inline: PropTypes.bool,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
  style: PropTypes.object
};
 
CheckboxGroup.defaultProps = {
  data: []
};

module.exports = compose(
  register('checkbox-group', {valueType: 'array'}),
  fetchEnhance,
  textValueEnhance(false)
)(CheckboxGroup)
