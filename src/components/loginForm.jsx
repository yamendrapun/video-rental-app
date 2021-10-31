import React, { useState } from 'react'

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
        <div className='mb-3'>
          <label htmlFor='username'>Username</label>
          <input
            value={account.username}
            onChange={handleChange}
            id='username'
            name='username'
            type='text'
            className='form-control'
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='password'>Password</label>
          <input
            value={account.password}
            onChange={handleChange}
            id='password'
            name='password'
            type='text'
            className='form-control'
          />
        </div>
        <button className='btn btn-primary'>Login</button>
      </form>
    </div>
  )
}

export default LoginForm
