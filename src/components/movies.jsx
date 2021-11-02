import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import ListGroup from './common/listGroup'
import Pagination from './common/pagination'
import MoviesTable from './moviesTable'
import { getMovies } from '../services/fakeMovieService'
import { getGenres } from '../services/fakeGenreService'
import { paginate } from '../utils/paginate'

const Movies = () => {
  const [movies, setMovies] = useState(getMovies())
  let allGenres = [{ _id: '', name: 'All Genres' }, ...getGenres()]
  const [genres, setGenres] = useState(allGenres)
  const [selectedGenre, setSelectedGenre] = useState()
  const [pageSize, setPageSize] = useState(4)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState({ path: 'title', order: 'asc' })

  function handleLike(movie) {
    const newMovies = [...movies]
    const index = newMovies.indexOf(movie)
    newMovies[index] = { ...newMovies[index] }
    newMovies[index].liked = !newMovies[index].liked
    setMovies(newMovies)
  }

  function handleDelete(movie) {
    setMovies(movies.filter((m) => m._id !== movie._id))
  }

  function handlePageChange(page) {
    setCurrentPage(page)
  }

  function handleGenreSelect(genre) {
    setSelectedGenre(genre)
    setCurrentPage(1)
  }

  function handleSort(sortColumn) {
    setSortColumn(sortColumn)
  }

  function getPageData() {
    const filtered =
      selectedGenre && selectedGenre._id
        ? movies.filter((m) => m.genre._id === selectedGenre._id)
        : movies

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])

    const paginatedMovies = paginate(sorted, currentPage, pageSize)

    return { totalCount: filtered.length, data: paginatedMovies }
  }

  const { totalCount, data } = getPageData()

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
        <Link
          to='/movies/new'
          className='btn btn-primary'
          style={{ marginBottom: 20 }}
        >
          New Movie
        </Link>
        {movies.length === 0 ? (
          <p>There are no movies to show in database.</p>
        ) : (
          <React.Fragment>
            <p>Showing {totalCount} movies in the database.</p>
            <MoviesTable
              movies={data}
              sortColumn={sortColumn}
              onLike={handleLike}
              onDelete={handleDelete}
              onSort={handleSort}
            />
            <Pagination
              itemsCount={totalCount}
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

export default Movies
