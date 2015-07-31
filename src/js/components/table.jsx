'use strict'

import React from 'react'
import classnames from 'classnames'
import { substitute } from '../utils/strings'

import styles from '../../less/tables.less'

class Table extends React.Component {
  static displayName = 'Table'

  static propTypes = {
    bordered: React.PropTypes.bool,
    className: React.PropTypes.string,
    data: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.func
    ]).isRequired,
    header: React.PropTypes.array.isRequired,
    height: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string
    ]),
    striped: React.PropTypes.bool,
    style: React.PropTypes.object,
    width: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string
    ])
  }

  componentWillMount () {
    this.fetchData(this.props.data)
  }

  componentDidMount () {
    this.setHeaderWidth()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.data !== this.props.data) {
      this.fetchData(nextProps.data)
    }
  }

  componentDidUpdate () {
    this.setHeaderWidth()
  }

  setHeaderWidth () {
    let body = React.findDOMNode(this.refs.body)
    let tr = body.querySelector('tr')
    if (!tr) {
      return
    }

    let ths = React.findDOMNode(this.refs.header).querySelectorAll('th')

    let tds = tr.querySelectorAll('td')
    for (let i = 0, count = tds.length; i < count; i++) {
      ths[i].style.width = tds[i].offsetWidth + 'px'
    }
  }

  state = {
    data: []
  }

  fetchData (data) {
    if (typeof data === 'function') {
      data(res => {
        this.fetchData(res)
      })
    } else {
      this.setState({ data })
    }
  }

  onBodyScroll (e) {
    let hc = React.findDOMNode(this.refs.headerContainer)
    hc.style.marginLeft = (0 - e.target.scrollLeft) + 'px'
  }

  renderBody () {
    let trs = this.state.data.map((d, i) => {
      let tds = this.props.header.map((h, j) => {
        let content = h.props.content
        if (typeof content === 'string') {
          return <td key={j}>{substitute(content, d)}</td>
        } else if (typeof content === 'function') {
          return <td key={i}>{content(d)}</td>
        }
      })
      return <tr key={i}>{tds}</tr>
    })

    return <tbody>{trs}</tbody>
  }

  render () {
    let bodyStyle = {}
    let headerStyle = {}
    let tableStyle = {}
    let onBodyScroll = null
    if (this.props.height) {
      bodyStyle.height = this.props.height
      bodyStyle.overflow = 'auto'
    }
    if (this.props.width) {
      headerStyle.width = this.props.width + 20
      tableStyle.width = this.props.width
      bodyStyle.overflow = 'auto'
      onBodyScroll = this.onBodyScroll.bind(this)
    }

    let className = classnames(
      this.props.className,
      styles.table,
      {
        'bordered': this.props.bordered,
        'scrolled': this.props.height,
        'striped': this.props.striped
      }
    )

    return (
      <div style={this.props.style} className={className}>
        <div ref="headerContainer" style={headerStyle} className={styles.headerContainer}>
          <table ref="header">
            <thead>{this.props.header}</thead>
          </table>
        </div>
        <div onScroll={onBodyScroll} style={bodyStyle}>
          <table style={tableStyle} className={styles.tableBody} ref="body">
            {this.renderBody()}
          </table>
        </div>
      </div>
    )
  }
}

export default Table
