import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'todo_items',
})
export class TodoItemEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id!: string;

  @ApiProperty()
  @Column()
  title!: string;

  @ApiProperty()
  @Column()
  completed!: boolean;

  @ApiProperty()
  @CreateDateColumn()
  created!: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated!: Date;
}
