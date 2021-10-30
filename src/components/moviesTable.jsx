import React from 'react'
import Like from './common/like'

const MoviesTable = (props) => {
  const { movies, onDelete, onLike, onSort, sortColumn } = props

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

  return (
    <table className='table'>
      <thead>
        <tr>
          <th onClick={() => raiseSort('title')}>Title</th>
          <th onClick={() => raiseSort('genre.name')}>Genre</th>
          <th onClick={() => raiseSort('numberInStock')}>Stock</th>
          <th onClick={() => raiseSort('dailyRentalRate')}>Rate</th>
          <th />
          <th />
        </tr>
      </thead>
      <tbody>
        {movies.map((movie, i) => (
          <tr key={movie._id}>
            <th>{movie.title}</th>
            <th>{movie.genre.name}</th>
            <th>{movie.numberInStock}</th>
            <th>{movie.dailyRentalRate}</th>
            <th>
              <Like liked={movie.liked} onClick={() => onLike(movie)} />
            </th>
            <th>
              <button
                onClick={() => onDelete(movie)}
                className='btn btn-danger btn-sm'
              >
                Delete
              </button>
            </th>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default MoviesTable
