import React from 'react'
import Like from './common/like'

const MoviesTable = (props) => {
  const { movies, onDelete, onLike } = props
  return (
    <table className='table'>
      <thead>
        <tr>
          <th scope='col'>Title</th>
          <th scope='col'>Genre</th>
          <th scope='col'>Stock</th>
          <th scope='col'>Rate</th>
          <th scope='col'></th>
          <th scope='col'></th>
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
