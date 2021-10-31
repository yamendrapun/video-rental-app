import React, { useState } from 'react'
import Input from './common/input'

const LoginForm = () => {
  const [account, setAccount] = useState({ username: '', password: '' })

  function handleSubmit(e) {
    e.preventDefault()

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
        />
        <Input
          name='password'
          value={account.password}
          label='Password'
          onChange={handleChange}
        />
        <button className='btn btn-primary'>Login</button>
      </form>
    </div>
  )
}

export default LoginForm
