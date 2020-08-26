import { AccountModule } from './account.module';

describe('AccountModule', () => {
  let account: AccountModule;

  beforeEach(() => {
    account = new AccountModule();
  });

  it('should create an instance', () => {
    expect(account).toBeTruthy();
  });
});
