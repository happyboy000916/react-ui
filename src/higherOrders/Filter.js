'use strict'

import React, { cloneElement } from 'react'
import PropTypes from '../utils/proptypes'
import Filter from '../Filter'
import { compose } from '../utils/compose'

export default function (Component) {
  class FilterEnhance extends React.Component {
    constructor (props) {
      super(props)
      this.state = {}
      this.handleFilter = this.handleFilter.bind(this)
    }

    handleFilter (filters) {
      this.setState({ filters })
    }

    filterData (data) {
      let { filters } = this.state
      if (!filters) return data
      return compose(...filters)(data)
    }

    renderFilter (filter) {
      if (!filter) return
      if (filter.onFilter) return filter
      return cloneElement(filter, { innerFilter: this.handleFilter })
    }

    render () {
      const { data, filter, ...props } = this.props
      return (
        <Component {...props}
          data={this.filterData(data)}
          filter={this.renderFilter(filter)} />
      )
    }
  }

  FilterEnhance.propTypes = {
    data: PropTypes.array,
    filter: PropTypes.oneOfType([Filter])
  }

  return FilterEnhance
}
