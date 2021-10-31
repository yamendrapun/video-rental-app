import React from 'react'

const LoginForm = () => {
  function handleSubmit(e) {
    e.preventDefault()

    // Call the server
    console.log('Submitted')
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='username'>Username</label>
          <input id='username' type='text' className='form-control' />
        </div>
        <div className='mb-3'>
          <label htmlFor='password'>Password</label>
          <input id='password' type='text' className='form-control' />
        </div>
        <button className='btn btn-primary'>Login</button>
      </form>
    </div>
  )
}

export default LoginForm
