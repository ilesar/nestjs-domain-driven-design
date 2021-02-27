import { Module } from '@nestjs/common';
import { RefreshTokenEntityRepository } from '@infrastructure/database/repositories/refresh-token-entity.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAccountEntityRepository } from '@infrastructure/database/repositories/user-account-entity.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([RefreshTokenEntityRepository]),
    TypeOrmModule.forFeature([UserAccountEntityRepository]),
  ],
  providers: [],
  exports: [
    TypeOrmModule.forFeature([RefreshTokenEntityRepository]),
    TypeOrmModule.forFeature([UserAccountEntityRepository]),
  ],
})
export class DatabaseModule {}
