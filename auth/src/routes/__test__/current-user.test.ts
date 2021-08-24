import request from 'supertest';
import { app } from '../../app';
import { signup } from './helper';

it('returns details about the current user', async () => {
  const cookie = await signup();
  
  const res = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200)
  
  console.log(res.body);
})

it('returns with null if not authenticated', async () => {
  const res = await request(app)
    .get('/api/users/currentuser')
    .expect(200)
  
  expect(res.body.currentUser).toEqual(null);
})