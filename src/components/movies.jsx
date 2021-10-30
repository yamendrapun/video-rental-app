import React, { useState, useEffect } from 'react'
import Like from './common/like'
import ListGroup from './listGroup'
import Pagination from './common/pagination'
import { getMovies } from '../services/fakeMovieService'
import { getGenres } from '../services/fakeGenreService'
import { paginate } from '../utils/paginate'
import { mapValues } from 'lodash'

export default function Movies() {
  const [movies, setMovies] = useState(getMovies())
  let allGenres = [{ name: 'All Genres' }, ...getGenres()]
  const [genres, setGenres] = useState(allGenres)
  const [selectedGenre, setSelectedGenre] = useState()
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

  function handleGenreSelect(genre) {
    setSelectedGenre(genre)
    setCurrentPage(1)
  }

  const filtered =
    selectedGenre && selectedGenre._id
      ? movies.filter((m) => m.genre._id === selectedGenre._id)
      : movies
  const paginatedMovies = paginate(filtered, currentPage, pageSize)

  return (
    <div className='row'>
      <div className='col-3'>
        <ListGroup
          items={genres}
          selectedItem={selectedGenre}
          onItemSelect={handleGenreSelect}
        />
      </div>
      <div className='col'>
        {movies.length === 0 ? (
          <p>There are no movies to show in database.</p>
        ) : (
          <React.Fragment>
            <p>Showing {filtered.length} movies in the database.</p>
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
              itemsCount={filtered.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </React.Fragment>
        )}
      </div>
    </div>
  )
}
