'use strict'

import classnames from 'classnames'
import PropTypes from '../utils/proptypes'

import _tables from '../styles/_tables.scss'

function getClassName (base, name, asc, status) {
  return classnames(
    base,
    name === status.key && asc === status.asc && _tables.active
  )
}

export default function Header (props) {
  const { onSort, sortStatus, name, sort, header, children } = props

  const handleSort = (asc, fn) => {
    if (name === sortStatus.key && asc === sortStatus.asc) return
    return () => onSort(name, asc, fn)
  }

  let icons

  if (sort === true || Array.isArray(sort)) {
    let fns = sort === true ? [] : sort
    icons = [
      <a key="up" onClick={handleSort(0, fns[0])} className={getClassName(_tables['sort-up'], name, 0, sortStatus)} />,
      <a key="down" onClick={handleSort(1, fns[1])} className={getClassName(_tables['sort-down'], name, 1, sortStatus)} />
    ]
  } else if (typeof sort === 'function') {
    icons = <a onClick={handleSort(0, sort)} className={getClassName(_tables['sort-one'], name, 0, sortStatus)} />
  }

  return <th>{header}{children}{icons}</th>
}

Header.propTypes = {
  children: PropTypes.any,
  content: PropTypes.any,
  header: PropTypes.any,
  hidden: PropTypes.bool,
  name: PropTypes.string,
  onSort: PropTypes.func,
  sort: PropTypes.bool_func,
  sortStatus: PropTypes.object,
  width: PropTypes.number_string
}

Header.defaultProps = {
  hidden: false,
  sortStatus: {}
}
