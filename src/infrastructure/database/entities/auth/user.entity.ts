import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserAccountEntity } from '@infrastructure/database/entities/auth/user-account.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @PrimaryGeneratedColumn('uuid')
  hash: string;

  @Column({ length: 255 })
  firstName: string;

  @Column({ length: 255 })
  lastName: string;

  @Column()
  country: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @OneToOne(() => UserAccountEntity, (userAccount) => userAccount.user, {
    nullable: true,
  })
  userAccount: UserAccountEntity;
}
