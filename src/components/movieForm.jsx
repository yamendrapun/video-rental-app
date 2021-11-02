import React, { useState, useEffect } from 'react'
import Joi from 'joi-browser'
import { getMovie, saveMovie } from '../services/fakeMovieService'
import { getGenres } from '../services/fakeGenreService'
import Select from './common/select'
import Input from './common/input'

const MovieForm = ({ match, history }) => {
  const [data, setData] = useState({
    title: '',
    genreId: '',
    numberInStock: '',
    dailyRentalRate: '',
  })
  const [genres, setGenres] = useState([])
  const [errors, setErrors] = useState({})

  const schema = {
    _id: Joi.string(),
    title: Joi.string().required().label('Title'),
    genreId: Joi.string().required().label('Genre'),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label('Number in Stock'),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label('Daily Rental Rate'),
  }

  useEffect(() => {
    const allGenres = getGenres()
    setGenres(allGenres)

    const movieId = match.params.id
    if (movieId === 'new') return

    const movie = getMovie(movieId)
    if (!movie) return history.replace('/not-found')

    setData({ data: mapToViewModel(movie) })
  }, [])

  function mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    }
  }

  function validate() {
    const options = {
      abortEarly: false,
    }
    const { error } = Joi.validate(data, schema, options)
    if (!error) return null

    const newErrors = {}
    for (let item of error.details) newErrors[item.path[0]] = item.message
    return newErrors
  }

  function validateProperty({ name, value }) {
    const obj = { [name]: value }
    const fieldSchema = { [name]: schema[name] }
    const { error } = Joi.validate(obj, fieldSchema)
    return error ? error.details[0].message : null
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    let newErrors = validate()
    setErrors(newErrors || {})
    if (errors) return

    console.log(data)

    saveMovie(data)
    history.push('/movies')
  }

  function handleChange({ currentTarget: input }) {
    let newErrors = { ...errors }
    const errorMessage = validateProperty(input)
    if (errorMessage) newErrors[input.name] = errorMessage
    else delete newErrors[input.name]

    let newData = { ...data }
    newData[input.name] = input.value
    setData(newData)
    setErrors(newErrors)
  }

  return (
    <div>
      <h1>Movie Form</h1>
      <form onSubmit={handleSubmit}>
        <Input
          name='title'
          type='text'
          value={data.title}
          label='Title'
          onChange={handleChange}
          error={errors.title}
          options={genres}
        />
        <Select
          name='genreId'
          value={data.genreId}
          label='Genre'
          options={genres}
          onChange={handleChange}
          error={errors.genreId}
        />
        <Input
          name='numberInStock'
          type='number'
          value={data.numberInStock}
          label='Number in Stock'
          onChange={handleChange}
          error={errors.numberInStock}
        />
        <Input
          name='dailyRentalRate'
          type='text'
          value={data.dailyRentalRate}
          label='Rate'
          onChange={handleChange}
          error={errors.dailyRentalRate}
        />
        <button disabled={validate()} className='btn btn-primary'>
          Save
        </button>
      </form>
    </div>
  )
}

export default MovieForm
