import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @PrimaryGeneratedColumn('uuid')
  hash: string;

  @Column({ length: 255 })
  email: string;

  @Column({ length: 255 })
  username: string;

  @Column({
    name: 'password',
    length: 255,
  })
  @Exclude()
  password: string;

  @Column({ length: 255 })
  firstName: string;

  @Column({ length: 255 })
  lastName: string;

  @Column()
  country: string;

  @Column()
  phone: string;

  @Column({ length: 15 })
  role: string;
}
