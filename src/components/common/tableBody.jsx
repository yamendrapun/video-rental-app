import React from 'react'
import _ from 'lodash'

const TableBody = ({ data, columns }) => {
  function renderCell(item, column) {
    if (column.content) return column.content(item)

    return _.get(item, column.path)
  }

  function createKey(item, column) {
    return item._id + (column.path || column.key)
  }
  return (
    <tbody>
      {data.map((item) => (
        <tr key={item._id}>
          {columns.map((column) => (
            <td key={createKey(item, column)}>{renderCell(item, column)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  )
}

export default TableBody
