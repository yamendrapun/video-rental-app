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

  function handleChange({ currentTarget: input }) {
    let newAccount = { ...account }
    newAccount[input.name] = input.value
    setAccount(newAccount)
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
