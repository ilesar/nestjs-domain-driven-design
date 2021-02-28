import { UserAccountSeed } from '@application/seed/user-account.seed';

export class SeederService {
  constructor(private readonly userAccountSeed: UserAccountSeed) {}

  async seedDatabase(): Promise<void> {
    await this.userAccountSeed.processData();
  }
}
