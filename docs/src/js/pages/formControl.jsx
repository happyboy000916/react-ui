'use strict';

import React from 'react';
import Code from '../Code';
import Example from '../Example';
let {FormControl, Button, Input, Icon, Grid} = global.uiRequire();

module.exports = class extends React.Component {
  renderExample (type, component) {
    component = component || 'Input';
    return (
      <div>
        <p><em><b>{type}</b></em> => <a href={"#/" + component.toLowerCase()}>{component}</a></p>
        <div>
          <FormControl grid={{width: 1/2}} type={type} />
        </div>
        <Code>
          {`<FormControl grid={{width: 1/2}} type="${type}" />`}
        </Code>
      </div>
    );
  }

  render () {
    return (
      <div>
        <div className="header">
          <h1>FormControl</h1>
          <h2>表单元素</h2>
        </div>

        <div className="content pure-form">
          <p>一系列表单控件的马甲，统一封装用来实现表单数据验证，输入提示，动态创建表单等功能。<b>可以通过 <em>getReference()</em> 这个方法获取被封装的控件。</b></p>
          <Code>
{`<FormControl
  className="string",     // 需要额外添加的 className
  label={string|element}  // 提示文字
  name={string}           // 数据key名称，唯一
  ignore={bool}           // 为true时，不提交该项数据，默认为 false
  type={string}           // 控件注册名称
  grid={{width, offset, responsive}} // 宽度，详见Grid
  {...validate}           // 数据验证
  {...props}              // 控件属性
/>`}
          </Code>

          <h2 className="subhead">数据验证属性</h2>
          <p><em>FormControl</em> 会根据这些属性自动验证输入，自动生成提示文字和错误信息，文字在 <a href="#/lang">Lang</a> 中设置。</p>
          <Code>
{`<FormControl
  equal={string}  // 判断值是否与另一个 FormControl 相等，string 为另一个 FormControl name
  min={int}       // 值类型为 string 时，最小长度；为 number 时，最小值；为 array 时，最少选项数
  max={int}       // 值类型为 string 时，最大长度；为 number 时，最大值；为 array 时，最多选项数
  required={bool} // 是否必填，默认为 false
  tip={string}    // 额外提示信息
  type={string}   // 会自动判断某些类型 type，如 email, integer, url 等
/>`}
          </Code>

          <h2 className="subhead">已注册控件</h2>

          <div>
            <p><em><b>text</b></em> => <a href="#/input">Input</a></p>
            <Example>
<FormControl required={true} grid={{width: 1/2}} type="text" min={2} max={10} />
            </Example>
          </div>

          {this.renderExample('email')}
          {this.renderExample('alpha')}
          {this.renderExample('alphanum')}
          {this.renderExample('url')}
          {this.renderExample('integer')}
          {this.renderExample('number')}
          {this.renderExample('password')}

          {this.renderExample('date', 'Datetime')}
          {this.renderExample('time', 'Datetime')}
          {this.renderExample('datetime', 'Datetime')}

          <div>
            <p><em><b>textarea</b></em> => <a href="#/input">Input</a></p>
            <Example>
<FormControl type="textarea" rows={5} />
            </Example>
          </div>

          <div>
            <p><em><b>select</b></em> => <a href="#/select">Select</a></p>
            <Example>
<FormControl
  type="select"
  required={true}
  fetch={{url:"json/countries.json", cache: 3600}}
  filterAble={true}
  optionTpl='<img src="//lobos.github.io/react-ui/images/flags/{code}.png" /> {country}-{en}'
  valueTpl="{country}-{en}"
  mult={true}
  min={2}
  max={6}
 />
             </Example>
          </div>

          <div>
            <p><em><b>tree</b></em> => <a href="#/tree">Tree</a></p>
            <Example>
<FormControl
  type="tree"
  checkAble={true}
  fetch={{url:"json/tree.json", cache:3600}}
  textTpl="{text}({id})"
  valueTpl="{id}"
 />
            </Example>
          </div>

          <div>
            <p><em><b>checkbox</b></em> => <a href="#/checkbox">Checkbox</a></p>
            <Example>
<FormControl type="checkbox" text="I'm a checkbox" />
            </Example>
          </div>

          <div>
            <p><em><b>checkbox-group</b></em> => <a href="#/checkbox-group">CheckboxGroup</a></p>
            <Example>
<FormControl
  type="checkbox-group"
  fetch={{url:"json/text-value.json", cache:3600}}
  textTpl="{text}"
  valueTpl="{id}"
  min={2}
  max={4}
 />
            </Example>
          </div>

          <div>
            <p><em><b>radio-group</b></em> => <a href="#/radio-group">RadioGroup</a></p>
            <Example>
<FormControl
  type="radio-group"
  fetch={{url:"json/text-value.json", cache:3600}}
  textTpl="{text}"
  valueTpl="{id}"
 />
            </Example>
          </div>

          <div>
            <p><em><b>rating</b></em> => <a href="#/rating">RadioGroup</a></p>
            <Example>
<FormControl
  type="rating"
  maxValue={10}
  tip="亲，给个好评吧"
  required={true}
  icons={[<Icon icon="favorite-outline" style={{color: 'red'}} />, <Icon icon="favorite" style={{color: 'red'}} />]}
 />
            </Example>
          </div>

          <div>
            <p><em><b>upload</b></em> => <a href="#/upload">Upload</a></p>
            <Example>
<FormControl
  type="upload"
  autoUpload={true}
  grid={{width:1}}
  name="test"
  action="http://216.189.159.94:8080/upload"
  accept="image/*"
  limit={3}
  content={<Button><Icon icon="upload" /> 选择文件</Button>} />
            </Example>
          </div>

          <h2 className="subhead">Children</h2>
          <p>可以使用 children 来处理一些复杂结构。<b>注意每个 FormControl 只能有一个表单组件，类型必须和 FormControl 的 <em>type</em> 相同。</b></p>
          <Example>
<FormControl name="email" label="email" type="email">
  <span className="rct-input-group">
    <span className="addon"><Icon icon="email" /></span>
    <Input type="email" />
  </span>
</FormControl>
          </Example>

          <h2 className="subhead">自定义 FormControl</h2>
          <p>
            <em>FormControl</em> 提供一个静态方法 <em>register</em>，将一个 <em>Component</em> 注册为 <em>FormControl</em> 成员。<br />
            每个注册为 <em>FormControl</em> 的控件必须实现 <em>getValue()</em> , <em>setValue(data)</em> 这两个接口。
          </p>
          <Code>
{`FormControl.register(
  type,       // string，控件类型，唯一。如果同名，后注册的将会覆盖先注册的控件
  render,     // function，匹配到类型时，调用render方法返回相应控件
  valueType,  // 'string|array|number'，控件值类型，三选一，数据验证时调用
)`}
          </Code>
        </div>
      </div>
    );
  }
}
