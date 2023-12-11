// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { productType, Products } from '../../models/product';

const product = new Products();

describe('Test module admin', () => {
  it('Define index:', () => {
    expect(product.index).toBeDefined();
  });

  it('Read row:', async () => {
    expect(product.read).toBeDefined();
  });

  it('Create row:', async () => {
    expect(product.create).toBeDefined();
  });

  it('Detele row:', async () => {
    expect(product.delete).toBeDefined();
  });
});
