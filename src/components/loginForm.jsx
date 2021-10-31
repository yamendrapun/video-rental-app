import React, { useState } from 'react'
import Input from './common/input'

const LoginForm = () => {
  const [account, setAccount] = useState({ username: '', password: '' })
  const [errors, setErrors] = useState({})

  function validate() {
    const errors = {}

    const { username, password } = account
    if (username.trim() === '') errors.username = 'Username is required.'
    if (password.trim() === '') errors.password = 'Password is required.'

    return Object.keys(errors).length == 0 ? null : errors
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
    if (name === 'username') {
      if (value.trim() === '') return 'Username is required.'
    }
    if (name === 'password') {
      if (value.trim() === '') return 'Password is required.'
    }
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
        <button className='btn btn-primary'>Login</button>
      </form>
    </div>
  )
}

export default LoginForm
