import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RefreshTokenEntity } from '@infrastructure/database/entities/auth/refresh-token.entity';
import { UserRoleEnum } from '@domain/enums/user-role.enum';
import { UserEntity } from '@infrastructure/database/entities/auth/user.entity';
import { Exclude } from 'class-transformer';

@Entity({ name: 'user_accounts' })
export class UserAccountEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @PrimaryGeneratedColumn('uuid')
  hash: string;

  @Column({ length: 255 })
  username: string;

  @Column({
    name: 'password',
    length: 255,
  })
  @Exclude()
  password: string;

  @Column({ type: 'text', nullable: true })
  role: UserRoleEnum;

  @OneToOne(() => UserEntity, (user) => user.userAccount, {
    nullable: true,
  })
  user?: UserEntity;

  @OneToOne(
    () => RefreshTokenEntity,
    (refreshToken) => refreshToken.userAccount,
    { nullable: true },
  )
  refreshToken?: RefreshTokenEntity;
}
