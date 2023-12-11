// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { orderType, Orders } from '../../models/order';

const order = new Orders();

describe('Test module admin', () => {
  it('Define index:', () => {
    expect(order.index).toBeDefined();
  });

  it('Read row:', async () => {
    expect(order.read).toBeDefined();
  });

  it('Create row:', async () => {
    expect(order.create).toBeDefined();
  });

  it('Detele row:', async () => {
    expect(order.delete).toBeDefined();
  });
});
