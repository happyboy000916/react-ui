'use strict';

import { Component } from 'react';
import Code from '../Code';
import Example from '../Example';
const {Button, Icon, Upload} = global.uiRequire();

module.exports = class extends Component {
  render () {
    return (
      <div>
        <div className="header">
          <h1>Upload</h1>
          <h2>文件上传</h2>
        </div>

        <div className="content">
          <Code>
{`<Upload
  accept={string}         // input accept
  action={string}         // 服务端地址，必填
  autoUpload={bool}       // 选中文件后自动上传，默认值为 false
  className={string}      //
  content={element}       // 显示内容
  disabled={bool}         // 禁用，默认为 false
  fileSize={number}       // 单个文件最大尺寸，单位 KB
  limit={number}          // 最大上传文件个数，默认为 1
  name={string}           // field name，必填
  readOnly={bool}         // 只读，默认为 false
  style={object}
  grid={[width, responsive]} // 宽度，详见Grid
  withCredentials={bool}  // xhr2 withCredentials
/>`}
          </Code>

          <h2 className="subhead">Example</h2>
          <Example>
<Upload autoUpload={true}
  grid={1/2}
  name="test"
  action="http://216.189.159.94:8080/upload"
  accept="image/*"
  limit={3}
  content={<Button><Icon icon="upload" /> 选择文件</Button>} />
          </Example>
        </div>
      </div>
    );
  }
}
