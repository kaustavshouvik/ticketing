import { useEffect } from 'react';
import Router from 'next/router'
import useRequest from '../../hooks/useRequest.js';

const Logout = () => {
  const { doRequest } = useRequest({
    url: '/api/users/logout',
    method: 'get',
    onSuccess: () => { Router.push('/') }
  })

  useEffect(() => {
    doRequest();
  }, [])

  return <h2>Logging you out...</h2>
}

export default Logout;