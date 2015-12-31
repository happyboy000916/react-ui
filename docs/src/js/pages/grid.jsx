'use strict';

import { Component } from 'react';
import prettify from '../prettify';
const { Grid, Utils, Select } = global.uiRequire();

const borderGridStyle = {border: 'solid 1px #ccc', lineHeight: '30px', textAlign:'center'};

class Page extends Component {
  constructor (props) {
    super(props);
    this.state = {
      grid: '12'
    };
  }

  gridChange (i) {
    setTimeout(() => {
      this.setState({ grid: i });
    }, 0);
  }

  renderSingle () {
    let grid = this.state.grid;
    let gs = [];
    for (var i=1; i<=grid; i++) {
      gs.push(
        <Grid key={i} grid={ 1/grid }>
          <div style={borderGridStyle}>{i}</div>
        </Grid>
      );
    }
    return gs;
  }

  renderGroup () {
    let grid = this.state.grid;
    let gs = [];
    for (var i=1; i<=grid; i++) {
      gs.push(
        <div key={i} style={{background: '#fafafa', marginTop: 10}}>
          <Grid grid={ i/grid }>
            <div style={{ background: '#eee', lineHeight: '30px' }}>{i}</div>
          </Grid>
        </div>
      );
    }
    return gs;
  }

  render() {
    let options = [];
    for (let i=2; i<=48; i++) {
      options.push(i.toString());
    }

    return (
      <div>
        <div className="header">
          <h1>Grid</h1>
          <h2>栅格</h2>
        </div>

        <div className="content">
          <p>动态生成css，省去几十KB的css文件，可以实现任意等分的栅格，支持responsive。</p>

          <pre className="prettyprint">
{`<Grid
  grid={[
    width,        // 必填，小于1的小数，值为列数/总列数，例如：1/2, 2/5
    responsive    // 可选值为'sm|md|lg|xl'，对应的值为'35.5em|48em|64em|80em|'，默认值为'md'
  ]}              // 如果只填width，可以不传入数组，只传入width
  style={object}
  className={string}
/>`}
          </pre>

          <h2 className="subhead">任意等分</h2>
          <Select data={options} value={this.state.grid} onChange={this.gridChange.bind(this)} /> 等分

          <div style={{ marginTop: 10 }}>
            { this.renderSingle() }
          </div>

          <div>
            { this.renderGroup() }
          </div>

          <h2 className="subhead">嵌套栅格</h2>
          <div>
            <Grid style={{background: '#eee'}} grid={ 1/2 }>
              <div style={{ textAlign: 'center', lineHeight: '30px' }}>1/2</div>
              <Grid grid={ 1/3 }>
                <div style={borderGridStyle}>1/3</div>
              </Grid>
              <Grid grid={ 2/3 }>
                <div style={borderGridStyle}>2/3</div>
              </Grid>
            </Grid>
            <Grid style={{background: '#fafafa'}} grid={ 1/2 }>
              <div style={{ textAlign: 'center', lineHeight: '30px' }}>1/2</div>
              <Grid grid={ 1/5 }>
                <div style={borderGridStyle}>1/5</div>
              </Grid>
              <Grid grid={ 2/5 }>
                <div style={borderGridStyle}>2/5</div>
              </Grid>
              <Grid grid={ 2/5 }>
                <div style={borderGridStyle}>2/5</div>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = prettify(Page);
