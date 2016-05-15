"use strict";

import { Component } from 'react';
import Code from '../Code';
import Example from '../Example';
import Refetch from 'refetch';
const {Tree, Checkbox, RadioGroup, Icon} = global.uiRequire();

Tree.setDefaultIcons([
  <Icon style={{color: '#f2da81'}} icon="folder-star" />,
  <Icon style={{color: '#f2da81'}} icon="folder" />,
  <Icon icon="file" />
]);

module.exports = class extends Component {
  constructor (props) {
    super(props);
    this.state = {
      readOnly: false,
      selectAble: true,
      greedy: false,
      sep: ',',
      value: '1.2.2',
      showValue: '1.2.2',
      showAccountsIcon: false,
      treeData: null
    };
  }

  componentWillMount () {
    Refetch.get('json/tree.json', null, {cache: 3600})
      .then(res => {
        this.setState({ treeData: JSON.stringify(res, null, 2) });
      });
  }

  handleChange (value) {
    if (Array.isArray(value)) {
      value = JSON.stringify(value);
    }
    this.setState({ showValue: value });
  }

  render () {
    return (
      <div>
        <div className="header">
          <h1>Tree</h1>
        </div>

        <div className="content">
          <Code>
{`<Tree
  className={string}  // class
  selectAble={bool}   // show checkbox, default is false
  data={array}        // array
  fetch={object}
  sep={string|null}   // 返回值分隔字符，默认值为 ","。为 "" 或 null 时，返回值类型为 array
  greedy={bool|string} // true|false|never, default is false
                      true or 'true', onChange value will contains indeterminate value
                      false or 'false', onChange value only contains checked value
                      'never', if a node all children are checked, return only parent value
  onClick={function(data)}  // 点击某元素触发事件，参数为当前节点
  onChange={function} // 当选项改变时回调方法，参数为 value
  readOnly={bool}     // 为 true 时，只读。默认为 false
  textTpl="string"    // 显示文字模板，默认为 "{text}"
  valueTpl="string"   // 返回数据模板，默认为 "{id}"
  value={string|array}
  icons={array}       // 图标 0-目录折起 1-目录展开 2-子节点
/>`}
          </Code>
          <div><a href="#/fetch">fetch 参见这里</a></div>
          <div>0.6 删除默认icon，需要icon可以通过icons传入</div>

          <h2 className="subhead">Example</h2>
          <Example>
<Tree fetch={{ url: './json/tree.json' }}
  readOnly={this.state.readOnly}
  selectAble={this.state.selectAble}
  greedy={this.state.greedy}
  icons={
    this.state.showAccountsIcon ?
      [
        <Icon icon="accounts-add" />,
        <Icon icon="accounts" />,
        <Icon icon="account" />
      ]:
      undefined
  }
  onClick={(data) => console.log(data)}
  onChange={this.handleChange.bind(this)}
  textTpl={(data) => {
    return (
      <label className="tree-example">
        {data.text} - {data.id}
        <a href="javascript:;" onClick={() => alert('You clicked ' + data.text)}>
          <Icon icon="edit" />edit
        </a>
      </label>
    );
  }}
  valueTpl="{id}"
  value={this.state.value}
  open={true}
  sep={this.state.sep}
/>

<div style={{ padding: 10, margin: '10px 0', border: 'solid 1px #ccc' }}>
  current value: {this.state.showValue}
</div>

<div>
  <div><Checkbox onChange={(value)=>this.setState({ selectAble: value })} checked={this.state.selectAble} text="selectAble" /></div>
  <div><Checkbox onChange={(value)=>this.setState({ readOnly: value })} checked={this.state.readOnly} text="readOnly" /></div>
  <div><Checkbox onChange={(value)=>this.setState({ showAccountsIcon: value })} checked={this.state.showAccountsIcon} text="switch to accounts icon" /></div>
  <div>greedy: <RadioGroup style={{ display: 'inline-block' }} onChange={(value) => this.setState({ greedy: value })} value={this.state.greedy} data={['true', 'false', 'never']} /></div>
  <div>sep: 
    {
      ([',', '|', '#', null]).map((sep, i) => {
        return (
          <a key={i} style={{margin: "0 10px", color: this.state.sep === sep ? 'red' : ''}}
            onClick={() => { this.setState({ sep }) }}>
            {JSON.stringify(sep)}
          </a>
        );
      })
    }
  </div>
</div>
          </Example>
          <Code>
{`// class tree-example
.tree-example {
  a {
    margin-left: 10px;
    visibility: hidden;
  }

  &:hover a {
    visibility: visible;
  }
}`}
          </Code>
          <Code>
{`// set global icons
Tree.setDefaultIcons([
  <Icon style={{color: '#f2da81'}} icon="folder-star" />,
  <Icon style={{color: '#f2da81'}} icon="folder" />,
  <Icon icon="file" />
]);`}
          </Code>
          
          <h2 className="subhead">Example Data</h2>
          <pre className="prettyprint">{this.state.treeData}</pre>
        </div>
      </div>
    );
  }
}
