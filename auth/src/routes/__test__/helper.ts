import request from 'supertest';
import { app } from '../../app';

const signup = async () => {
  const email = 'flash@gmail.com';
  const password = '12345'

  const res = await request(app)
    .post('/api/users/signup')
    .send({
      email, password
    })
    .expect(201)

  return res.get('Set-Cookie');
}

export { signup };