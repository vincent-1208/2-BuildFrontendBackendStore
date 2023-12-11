// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { orderProductType, orderProducts } from '../../models/orderProduct';

const orderproduct = new orderProducts();

describe('Test module admin', () => {
  it('Define index:', () => {
    expect(orderproduct.index).toBeDefined();
  });

  it('Read row:', async () => {
    expect(orderproduct.read).toBeDefined();
  });

  it('Create row:', async () => {
    expect(orderproduct.create).toBeDefined();
  });

  it('Detele row:', async () => {
    expect(orderproduct.delete).toBeDefined();
  });
});
