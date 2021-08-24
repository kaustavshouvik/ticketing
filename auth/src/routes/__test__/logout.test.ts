import request from 'supertest';
import { app } from '../../app';

it('clears the cookie after logging out', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'kaustav@gmail.com',
      password: '12345'
    })
    .expect(201)

  const res = await request(app)
    .get('/api/users/logout')
    .expect(200)
  
  expect(res.get('Set-Cookie')[0]).toEqual(
    `express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly`
  )
})