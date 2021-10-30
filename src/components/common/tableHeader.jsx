import React from 'react'

const TableHeader = (props) => {
  const { sortColumn, columns, onSort } = props

  function raiseSort(path) {
    const newSortColumn = { ...sortColumn }
    if (newSortColumn.path === path)
      newSortColumn.order = newSortColumn.order === 'asc' ? 'desc' : 'asc'
    else {
      newSortColumn.path = path
      newSortColumn.order = 'asc'
    }
    onSort(newSortColumn)
  }

  function renderSortIcon(column) {
    if (column.path !== sortColumn.path) return null
    if (sortColumn.order === 'asc') return <i className='fa fa-sort-asc' />
    return <i className='fa fa-sort-desc' />
  }

  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            className='clickable'
            key={column.path || column.key}
            onClick={() => raiseSort(column.path)}
          >
            {column.label}
            {renderSortIcon(column)}
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default TableHeader
