import { EntityRepository, Repository } from 'typeorm';
import { RefreshTokenEntity } from '@infrastructure/database/entities/auth/refresh-token.entity';

@EntityRepository(RefreshTokenEntity)
export class RefreshTokenEntityRepository extends Repository<RefreshTokenEntity> {}
