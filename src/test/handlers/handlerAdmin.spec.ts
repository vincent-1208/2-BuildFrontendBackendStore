import supertest from 'supertest';
import app from '../../app';

const request = supertest(app);

describe('Test Admin Endpoint', () => {
  const token =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo5LCJ1c2VybmFtZSI6InRobmciLCJwYXNzd29yZCI6IiQyYiQxMCRneS5Bc2RFZWE1RkRBUS9tZS5ETWtlQ2IxU0tubXh0M1p5aTNjTWdpM0NxWFpuLmNSSFA0ZSJ9LCJpYXQiOjE2OTY2Njg3NTh9.hq5QQF_Dun4SPPrQEXmx-GVkifIWI2DCEwYt3d5Crvw';

  it('Login success', async () => {
    const response = await request
      .post('/admin/login')
      .send({ username: 'admin', password: '123456789' });
    expect(response.status).toBe(200);
  });

  it('Login fail', async () => {
    const response = await request
      .post('/admin/login')
      .send({ username: 'admin', password: '1234567' });
    expect(response.status).toBe(401);
  });

  it('Admin list success', async () => {
    const response = await request.get('/admin').set('authorization', token);
    expect(response.status).toBe(200);
  });

  it('Admin list fail, un-authorize', async () => {
    const response = await request.get('/admin');
    expect(response.status).toBe(401);
  });

  it('Admin with id=1 success', async () => {
    const response = await request.get('/admin/1').set('authorization', token);
    expect(response.status).toBe(200);
  });

  it('Admin with id=1 fail, un-authorize', async () => {
    const response = await request.get('/admin/1');
    expect(response.status).toBe(401);
  });

  // it('Create Admin success', async () => {
  //   const response = await request
  //     .post('/admin')
  //     .set('authorization', token)
  //     .send({ username: 'admin2', password: '123456' });
  //   expect(response.status).toBe(200);
  // });

  it('Create Admin fail, un-authorize', async () => {
    const response = await request
      .post('/admin')
      .send({ username: 'admin3', password: '123456' });
    expect(response.status).toBe(401);
  });
});