import supertest from 'supertest';
import app from '../../app';

const request = supertest(app);

describe('Test user Endpoint', () => {
  const token =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo5LCJ1c2VybmFtZSI6InRobmciLCJwYXNzd29yZCI6IiQyYiQxMCRneS5Bc2RFZWE1RkRBUS9tZS5ETWtlQ2IxU0tubXh0M1p5aTNjTWdpM0NxWFpuLmNSSFA0ZSJ9LCJpYXQiOjE2OTY2Njg3NTh9.hq5QQF_Dun4SPPrQEXmx-GVkifIWI2DCEwYt3d5Crvw';

  it('Create user success', async () => {
    const response = await request
      .post('/user')
      .set('authorization', token)
      .send({
        "firstname": "vu",
        "lastname": "minh",
        "username": "vuvtm1",
        "password": "1234"
    });
    expect(response.status).toBe(200);
  });

  it('Create user fail, un-authorize', async () => {
    const response = await request
      .post('/user')
      .send({
        "firstname": "vu",
        "lastname": "minh",
        "username": "vuvtm2",
        "password": "1234"
    });
    expect(response.status).toBe(401);
  });

  it('User list success', async () => {
    const response = await request.get('/user');
    expect(response.status).toBe(200);
  });

  it('User with id=1 success', async () => {
    const response = await request.get('/user/1');
    expect(response.status).toBe(200);
  });
});