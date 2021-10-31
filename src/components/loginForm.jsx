import React, { useState } from 'react'
import Joi, { schema } from 'joi-browser'
import Input from './common/input'

const LoginForm = () => {
  const [account, setAccount] = useState({ username: '', password: '' })
  const [errors, setErrors] = useState({})

  const schema = {
    username: Joi.string().required().label('Username'),
    password: Joi.string().required().label('Password'),
  }

  function validate() {
    const options = {
      abortEarly: false,
    }
    const { error } = Joi.validate(account, schema, options)
    if (!error) return null

    const newErrors = {}
    for (let item of error.details) newErrors[item.path[0]] = item.message
    return newErrors
  }

  function handleSubmit(e) {
    e.preventDefault()

    let newErrors = validate()
    setErrors(newErrors || {})
    if (errors) return

    // Call the server
    console.log('Submitted')
  }

  function validateProperty({ name, value }) {
    const obj = { [name]: value }
    const fieldSchema = { [name]: schema[name] }
    const { error } = Joi.validate(obj, fieldSchema)
    return error ? error.details[0].message : null
  }

  function handleChange({ currentTarget: input }) {
    let newErrors = { ...errors }
    const errorMessage = validateProperty(input)
    if (errorMessage) newErrors[input.name] = errorMessage
    else delete newErrors[input.name]

    let newAccount = { ...account }
    newAccount[input.name] = input.value
    setAccount(newAccount)
    setErrors(newErrors)
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input
          name='username'
          value={account.username}
          label='Username'
          onChange={handleChange}
          error={errors.username}
        />
        <Input
          name='password'
          value={account.password}
          label='Password'
          onChange={handleChange}
          error={errors.password}
        />
        <button disabled={validate()} className='btn btn-primary'>
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
