'use strict';

import { Component } from 'react';
import Code from '../Code';
import Example from '../Example';
const {Button, Modal, Form, FormControl} = global.uiRequire();

module.exports = class extends Component {
  constructor (props) {
    super(props);
    this.state = {
      index: 0
    };
  }

  multOpen () {
    let index = this.state.index + 1,
        width = Math.ceil((Math.random() + 1) * 400),
        ps = [];

    for (var i = 1; i <= index; i++) {
      ps.push(<p key={i}>{`第 ${i} 层Modal`}</p>);
    }

    let options = {
      header: `第 ${index} 层Modal`,
      width: width,
      content: (
        <div>
          {ps}
          <a style={{marginRight: 20}} onClick={this.multOpen.bind(this)}>弹出新的Modal</a>
          <a style={{marginRight: 20}} onClick={() => Modal.alert('alert')}>alert</a>
          <a onClick={() => Modal.close()}>关闭</a>
        </div>
      ),
      onClose: () => {
        this.setState({ index: index - 1 });
      },
      buttons: {
        '关闭': true
      }
    };
    Modal.open(options);
    this.setState({ index });
  }

  render () {
    return (
      <div>
        <div className="header">
          <h1>Modal</h1>
          <h2>对话框</h2>
        </div>

        <div className="content">
          <div><em>Modal</em> 为全局对象，所有的方法都为静态方法。</div>
          <h2 className="subhead">Modal.open(options)</h2>
          <Code>
{`options = {
  clickaway: {bool},         // 为 true 时，点击页面空白部分关闭Modal，默认值为 false
  header: {string|element},  // 标题，值为 string 或者 ReactElement，可为空
  content: {string|element}, // 内容，值为 string 或者 ReactElement，必填
  width: {int|string},       // 宽度，默认值为 500
  onClose: function,         // 当Modal关闭时触发
  buttons: {
    {text}: function         // text 为按钮文字，function 返回 true 或者值为 true，关闭 Modal
  }
}`}
          </Code>

          <Example>
<Button status="primary" 
  onClick={ () => {
    Modal.open({
      header: '一个弹出表单',
      content: (
        <div>
          <Form layout="aligned">
            <FormControl name="name" required={true} label="姓名" type="text" />
            <FormControl name="birthday" required={true} label="生日" type="date" />
            <FormControl name="description" label="简介" type="textarea" width={20} rows={6} />
          </Form>
        </div>
      ),
      width: 700,
      buttons: {
        '确定': () => {
          return true;
        },
        '重置': () => {
        },
        '取消': true
      }
    });
  }
}>open a form</Button>
          </Example>

          <h2 className="subhead">Modal.alert(content)</h2>
          <div>快捷方式， <em>content</em> 为 <em>string</em> 或者 <em>ReactElement</em></div>
          <Example>
<Button status="primary" onClick={() => Modal.alert('这是一个alert')}>alert example</Button>
          </Example>

          <h2 className="subhead">Modal.confirm(content, onOk)</h2>
          <div>快捷方式， <em>content</em> 为 <em>string</em> 或者 <em>ReactElement</em>。 <em>onOk</em> 为 <em>function </em>，点击确定后回调。</div>
          <Example>
<Button status="primary" onClick={() => Modal.confirm(
  <div>
    <p>如果你知道要做什么，请点确定。</p>
    <p>如果你不知道，点取消吧。</p>
  </div>,
  () => { alert('点击了确定'); })}
>confirm example</Button>
          </Example>

          <h2 className="subhead">Modal.close(data)</h2>
          <div>关闭最上层弹出的Modal</div>

          <h2 className="subhead">多层弹出</h2>
          <Example>
<Button status="primary" onClick={
  () => {
    let index = this.state.index + 1,
        width = Math.ceil((Math.random() + 1) * 400),
        ps = [];

    for (var i = 1; i <= index; i++) {
      ps.push(<p key={i}>{'第 ' + i + ' 层Modal'}</p>);
    }

    let options = {
      header: '第 ' + index + ' 层Modal',
      width: width,
      content: (
        <div>
          {ps}
          <a style={{marginRight: 20}} onClick={this.multOpen.bind(this)}>弹出新的Modal</a>
          <a style={{marginRight: 20}} onClick={() => Modal.alert('alert')}>alert</a>
          <a onClick={() => Modal.close()}>关闭</a>
        </div>
      ),
      onClose: () => {
        this.setState({ index: index - 1 });
      },
      buttons: {
        '关闭': true
      }
    };
    Modal.open(options);
    this.setState({ index });
  }
}>mult open</Button>
          </Example>
        </div>
      </div>
    );
  }
}
