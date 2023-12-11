import supertest from 'supertest';
import app from '../../app';

const request = supertest(app);

describe('Test product Endpoint', () => {
  const token =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo5LCJ1c2VybmFtZSI6InRobmciLCJwYXNzd29yZCI6IiQyYiQxMCRneS5Bc2RFZWE1RkRBUS9tZS5ETWtlQ2IxU0tubXh0M1p5aTNjTWdpM0NxWFpuLmNSSFA0ZSJ9LCJpYXQiOjE2OTY2Njg3NTh9.hq5QQF_Dun4SPPrQEXmx-GVkifIWI2DCEwYt3d5Crvw';

    it('Create product success', async () => {
      const response = await request
        .post('/product')
        .set('authorization', token)
        .send({
          "name": "product2",
          "price": 500,
          "category": "cold"
          });
      expect(response.status).toBe(200);
    });
  
    it('Create product fail, un-authorize', async () => {
      const response = await request
        .post('/orderproduct')
        .send({
          "name": "product2",
          "price": 500,
          "category": "cold"
          });
      expect(response.status).toBe(401);
    });

    it('Product list success', async () => {
    const response = await request.get('/product');
    expect(response.status).toBe(200);
  });

  it('Product with id=1 success', async () => {
    const response = await request.get('/product/1');
    expect(response.status).toBe(200);
  });

  it('Delete product success', async () => {
    const response = await request
      .delete('/product/1')
      .set('authorization', token)
      .send({});
    expect(response.status).toBe(200);
  });

  it('Delete product false', async () => {
    const response = await request
      .delete('/product/1')
      .send({});
    expect(response.status).toBe(401);
  });
});