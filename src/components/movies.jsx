import React, { useState } from 'react'
import Like from './common/like'
import { getMovies } from '../services/fakeMovieService'

export default function Movies() {
  const [movies, setMovies] = useState(getMovies())

  function handleLike(movie) {
    const newMovies = [...movies]
    const index = newMovies.indexOf(movie)
    newMovies[index] = { ...newMovies[index] }
    newMovies[index].liked = !newMovies[index].liked
    setMovies(newMovies)
  }

  return (
    <React.Fragment>
      {movies.length === 0 ? (
        <p>There are no movies to show in database.</p>
      ) : (
        <React.Fragment>
          <p>Showing {movies.length} movies in the database.</p>
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
                    <Like
                      liked={movie.liked}
                      onClick={() => handleLike(movie)}
                    />
                  </th>
                  <th>
                    <button
                      onClick={() =>
                        setMovies(movies.filter((m) => m._id !== movie._id))
                      }
                      className='btn btn-danger btn-sm'
                    >
                      Delete
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}
