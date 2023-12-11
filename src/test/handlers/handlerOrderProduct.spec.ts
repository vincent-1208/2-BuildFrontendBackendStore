import supertest from 'supertest';
import app from '../../app';

const request = supertest(app);

describe('Test order product Endpoint', () => {
  const token =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo5LCJ1c2VybmFtZSI6InRobmciLCJwYXNzd29yZCI6IiQyYiQxMCRneS5Bc2RFZWE1RkRBUS9tZS5ETWtlQ2IxU0tubXh0M1p5aTNjTWdpM0NxWFpuLmNSSFA0ZSJ9LCJpYXQiOjE2OTY2Njg3NTh9.hq5QQF_Dun4SPPrQEXmx-GVkifIWI2DCEwYt3d5Crvw';

  it('Create order product success', async () => {
    const response = await request
      .post('/orderproduct')
      .set('authorization', token)
      .send({
        "quantity": "5",
        "orderId": "1",
        "productId": "1"
        });
    expect(response.status).toBe(200);
  });

  it('Create order product fail, un-authorize', async () => {
    const response = await request
      .post('/orderproduct')
      .send({
        "quantity": "5",
        "orderId": "1",
        "productId": "1"
        });
    expect(response.status).toBe(401);
  });

  it('Order product list success', async () => {
    const response = await request.get('/orderproduct');
    expect(response.status).toBe(200);
  });

  it('Order product with id=1 success', async () => {
    const response = await request.get('/orderproduct/1');
    expect(response.status).toBe(200);
  });

  it('Delete order product false', async () => {
    const response = await request
      .delete('/orderproduct/1')
    expect(response.status).toBe(401);
  });

  it('Delete order product success', async () => {
    const response = await request
      .delete('/orderproduct/1')
      .set('authorization', token)
    expect(response.status).toBe(200);
  });
})