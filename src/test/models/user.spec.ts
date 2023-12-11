// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { userType, Users } from '../../models/users';

const user = new Users();

describe('Test module admin', () => {
  it('Define index:', () => {
    expect(user.index).toBeDefined();
  });

  it('Read row:', async () => {
    expect(user.read).toBeDefined();
  });

  it('Create row:', async () => {
    expect(user.create).toBeDefined();
  });

  it('Detele row:', async () => {
    expect(user.delete).toBeDefined();
  });
});
