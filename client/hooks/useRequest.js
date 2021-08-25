import axios from 'axios';
import { useState } from 'react';

const useRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null)

  const doRequest = async () => {
    try {
      setErrors(null);
      const res = await axios[method](url, body);

      if (onSuccess) {
        onSuccess(res.data);
      }

      return res.data;
    } catch (err) {
      setErrors(
        <div className='alert alert-danger'>
          <ul className='my-0'>
            
            {err.response.data.errors.map((err, idx) => <li key={idx}>{err.message}</li>)}
          </ul>
        </div>
      )
    }
  }

  return { doRequest, errors };
}

export default useRequest;
