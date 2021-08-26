import { useState } from 'react';
import useRequest from '../../hooks/useRequest';
import Router from 'next/router';

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { doRequest, errors } = useRequest({
    url: '/api/users/login',
    method: 'post',
    body: {
      email, password
    },
    onSuccess: () => {
      Router.push('/')
    }
  })

  const onSubmit = async e => {
    e.preventDefault();

    doRequest();
  }

  return (
    <div className='mt-3' style={{ width: '50%', margin: '0 auto' }}>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
      <div className='my-3'>
        <label htmlFor='email' className='form-label'>Email</label>
        <input
          required
          type='email'
          className='form-control'
          id='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div className='my-3'>
        <label htmlFor='password' className='form-label'>Password</label>
        <input
          required
          type='password'
          className='form-control'
          id='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      {errors}
      <button className='btn btn-primary'>Login</button>
      </form>
    </div>
  )
}

export default Login;