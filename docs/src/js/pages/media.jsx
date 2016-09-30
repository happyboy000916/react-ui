import { Component } from 'react'
import Code from '../Code'
import Example from '../Example'
import { Media } from '../rctui'
import { Cn, En } from '../Language'


module.exports = class extends Component {
  render () {
    let options = []
    for (let i = 2; i <= 48; i++) {
      options.push(i.toString())
    }

    return (
      <div>
        <div className="header">
          <h1>Media</h1>
          <Cn tag="h2">媒体</Cn>
        </div>

        <div className="content">
          <Cn>可以实现左右布局（定宽+自适应宽度的布局）</Cn>
          <En>It is support for left and right aligned content, content alignment options, nesting, and more.</En>

          <Cn>
            <Code>
{`<Media></Media>                                //Media容器
  <Media.Left align={string}>{定宽元素}</Media.Left>       //align垂直对齐，可选值为'top|bottom|middle'
  <Media.Body align={string}>{自适应宽度元素}</Media.Body>  
  <Media.Right align={string}>{定宽元素}</Media.Right>
  `
}
            </Code>
          </Cn>
          <En>
            <Code>
{`<Media></Media>                                         //Media Container
  <Media.Left align={string}>{定宽元素}</Media.Left>       //align option:'top|bottom'
  <Media.Body align={string}>{自适应宽度元素}</Media.Left>  
  <Media.Right align={string}>{定宽元素}</Media.Right>
  `
}
            </Code>
          </En>

          <h2 className="subhead">Example</h2>

          <Example>
            <Media>
              <Media.Left align="bottom">
                <div style={{
                  width: 64,
                  height: 64,
                  backgroundColor: '#ddd'
                }}>64x64</div>
              </Media.Left>
              <Media.Body>
                <h2> Media heading </h2>
                Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
              </Media.Body>
            </Media>
          </Example>

          <h2 className="subhead">支持嵌套</h2>

          <Example>
            <Media>
              <Media.Left align="top">
                <div style={{
                  width: 64,
                  height: 64,
                  backgroundColor: '#ddd'
                }}>64x64</div>
              </Media.Left>
              <Media.Body>
                <h2>Media heading</h2>
                Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                <Media>
                  <Media.Left align="bottom">
                  <div style={{
                    width: 64,
                    height: 64,
                    backgroundColor: '#ddd'
                  }}>64x64</div>
                  </Media.Left>
                  <Media.Body>
                  <h2>Nested Media heading</h2>
                  Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                  </Media.Body>
                </Media>
              </Media.Body>
            </Media>
          </Example>
        </div>
      </div>
    )
  }
}
