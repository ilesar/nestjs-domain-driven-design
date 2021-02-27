import { EntityRepository, Repository } from 'typeorm';
import { UserAccountEntity } from '@infrastructure/database/entities/auth/user-account.entity';

@EntityRepository(UserAccountEntity)
export class UserAccountEntityRepository extends Repository<UserAccountEntity> {}
