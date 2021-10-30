import React, { useState } from 'react'
import Like from './common/like'
import Pagination from './common/pagination'
import { getMovies } from '../services/fakeMovieService'
import { paginate } from '../utils/paginate'

export default function Movies() {
  const [movies, setMovies] = useState(getMovies())
  const [pageSize, setPageSize] = useState(4)
  const [currentPage, setCurrentPage] = useState(1)

  function handleLike(movie) {
    const newMovies = [...movies]
    const index = newMovies.indexOf(movie)
    newMovies[index] = { ...newMovies[index] }
    newMovies[index].liked = !newMovies[index].liked
    setMovies(newMovies)
  }

  function handlePageChange(page) {
    setCurrentPage(page)
  }

  const paginatedMovies = paginate(movies, currentPage, pageSize)

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
              {paginatedMovies.map((movie, i) => (
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
          <Pagination
            itemsCount={movies.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  )
}
