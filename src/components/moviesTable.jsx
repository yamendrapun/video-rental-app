import React from 'react'
import TableHeader from './common/tableHeader'
import Like from './common/like'

const MoviesTable = (props) => {
  const { movies, onDelete, onLike, onSort, sortColumn } = props
  const columns = [
    { path: 'title', label: 'Title' },
    { path: 'genre.name', label: 'Genre' },
    { path: 'numberInStock', label: 'Stock' },
    { path: 'dailyRentalRate', label: 'Rate' },
    { key: 'like' },
    { key: 'delete' },
  ]

  return (
    <table className='table'>
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
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
