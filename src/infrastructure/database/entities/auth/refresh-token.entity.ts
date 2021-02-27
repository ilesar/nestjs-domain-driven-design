import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserAccountEntity } from '@infrastructure/database/entities/auth/user-account.entity';

@Entity({
  name: 'refresh_tokens',
})
export class RefreshTokenEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @PrimaryGeneratedColumn('uuid')
  hash: string;

  @Column()
  expiresIn: Date;

  @Column({ type: 'boolean' })
  isRevoked: boolean;

  @OneToOne(
    () => UserAccountEntity,
    (userAccount) => userAccount.refreshToken,
    { nullable: true },
  )
  userAccount: UserAccountEntity;
}
