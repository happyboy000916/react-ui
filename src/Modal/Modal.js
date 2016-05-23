'use strict';

import React from 'react';
import { findDOMNode } from 'react-dom';
import classnames from 'classnames';
import Button from '../Button';
import { CLOSE } from '../svgs';

import ModalStyles from '../styles/_modal.scss';

export const ZINDEX = 1100;

export default class extends React.Component {
  constructor (props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
  }

  handleClose () {
    this.props.onClose(this.props.id);
  }

  renderHeader () {
    const { header } = this.props;
    return header ? <div className={ModalStyles.header}>{header}</div> : undefined;
  }

  renderFooter () {
    const { buttons } = this.props;
    if (!buttons) {
      return undefined;
    }

    let btns = Object.keys(buttons).map((btn, j) => {
      let func = buttons[btn];
      let status = j === 0 ? 'primary' : undefined;
      let handle = () => {
          if (func === true) {
            this.handleClose();
          } else if (func === 'submit') {
            let form = findDOMNode(this).querySelector('form');
            if (form) {
              let event = document.createEvent('HTMLEvents');
              event.initEvent('submit');
              form.dispatchEvent(event);
            }
          } else {
            if (func()) {
              this.handleClose();
            }
          }
        };
      return <Button status={status} key={btn} onClick={handle}>{btn}</Button>;
    });

    return <div className={ModalStyles.footer}>{btns}</div>;
  }

  render () {
    const { width, content, index, padding, onClose } = this.props;

    let className = classnames(
      ModalStyles.modal
    );

    const clickaway = this.props.clickaway ? this.clickaway : undefined;

    return (
      <div className={ModalStyles.inner} onClick={clickaway} style={{ zIndex: ZINDEX + index }}>
        <div style={{width: width || '35rem'}} className={className}>
          <a className={ModalStyles.close} onClick={this.handleClose}>{CLOSE}</a>
          {this.renderHeader()}
          <div style={{padding}} className={ModalStyles.content}>
            {content}
          </div>
          {this.renderFooter()}
        </div>
      </div>
    );
  }
}
