import { Module } from '@nestjs/common';
import { RefreshTokenEntityRepository } from '@infrastructure/database/repositories/refresh-token-entity.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RefreshTokenEntityRepository])],
  providers: [],
  exports: [TypeOrmModule.forFeature([RefreshTokenEntityRepository])],
})
export class DatabaseModule {}
