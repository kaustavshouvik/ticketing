import request from 'supertest';
import { app } from '../../app';

it('fails when an email does not exist', async () => {
  await request(app)
    .post('/api/users/login')
    .send({
      email: 'kaustavshouvik@gmail.com',
      password: '12345'
    })
    .expect(400);
})

it('fails when an incorrect password is supplied', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'kaustavshouvik@gmail.com',
      password: '12345'
    })
    .expect(201);
  
  const res = await request(app)
    .post('/api/users/login')
    .send({
      email: 'kaustavshouvik@gmail.com',
      password: '12345'
    })
    .expect(201);
  
  expect(res.get('Set-Cookie')).toBeDefined();
})