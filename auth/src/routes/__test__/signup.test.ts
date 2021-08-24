import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful signup', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'kaustav.shouvik00@gmail.com',
      password: '12345'
    })
    .expect(201);
})

it('returns a 400 with an invalid email', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'kaustav.shouvik00',
      password: '12345'
    })
    .expect(400);
})

it('returns a 400 with an invalid password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'kaustav.shouvik00@gmail.com',
      password: '1'
    })
    .expect(400);
})

it('returns a 400 with missing email and password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'kaustav@gmail.com'
    })
    .expect(400);

  await request(app)
    .post('/api/users/signup')
    .send({
      password: '123455'
    })
    .expect(400);
})

it('sets a cookie after successful signup', async () => {
  const res = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'kaustav@gmail.com',
      password: '12345'
    })
    .expect(201);

  expect(res.get('Set-Cookie')).toBeDefined();
})