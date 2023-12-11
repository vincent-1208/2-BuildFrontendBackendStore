import supertest from 'supertest';
import app from '../../app';

const request = supertest(app);

describe('Test order Endpoint', () => {
  const token =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo5LCJ1c2VybmFtZSI6InRobmciLCJwYXNzd29yZCI6IiQyYiQxMCRneS5Bc2RFZWE1RkRBUS9tZS5ETWtlQ2IxU0tubXh0M1p5aTNjTWdpM0NxWFpuLmNSSFA0ZSJ9LCJpYXQiOjE2OTY2Njg3NTh9.hq5QQF_Dun4SPPrQEXmx-GVkifIWI2DCEwYt3d5Crvw';

  it('Create Admin success', async () => {
    const response = await request
      .post('/order')
      .set('authorization', token)
      .send({
        "status": "pending",
        "userId": "1"
        });
    expect(response.status).toBe(200);
  });

  it('Create Admin fail, un-authorize', async () => {
    const response = await request
      .post('/order')
      .send({
        "status": "pending",
        "userId": "1"
        });
    expect(response.status).toBe(401);
  });

  it('Order list success', async () => {
    const response = await request.get('/order');
    expect(response.status).toBe(200);
  });

  it('Order with id=1 success', async () => {
    const response = await request.get('/order/1');
    expect(response.status).toBe(200);
  });

});