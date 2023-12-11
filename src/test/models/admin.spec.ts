// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { adminType, Admins } from '../../models/admins';

const admin = new Admins();

describe('Test module admin', () => {
  it('Define index:', () => {
    expect(admin.index).toBeDefined();
  });

  it('Read row:', async () => {
    const result = await admin.read('1');
    expect(result.id).toEqual(1);
    expect(result.username).toEqual('admin');
  });

  it('Create row:', async () => {
    expect(admin.create).toBeDefined();
  });

  it('Authenticate:', async () => {
    expect(admin.authenticate).toBeDefined();
  });
});
