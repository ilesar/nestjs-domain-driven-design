import {
  BeforeCreateMany,
  BeforeCreateOne,
  BeforeUpdateMany,
  BeforeUpdateOne,
  FilterableField,
} from '@nestjs-query/query-graphql';
import { ObjectType, GraphQLISODateTime, Field, Int } from '@nestjs/graphql';
import { CreateHook } from '../hooks/create.hook';
import { CreateManyHook } from '../hooks/create-many.hook';
import { UpdateManyHook } from '../hooks/update-many.hook';
import { UpdateHook } from '../hooks/update.hook';

@ObjectType('TodoItem')
@BeforeCreateOne(CreateHook)
@BeforeCreateMany(CreateManyHook)
@BeforeUpdateOne(UpdateHook)
@BeforeUpdateMany(UpdateManyHook)
export class TodoItemDto {
  @FilterableField(() => Int)
  id!: number;

  @FilterableField()
  title!: string;

  @FilterableField()
  completed!: boolean;

  @Field(() => GraphQLISODateTime)
  created!: Date;

  @Field(() => GraphQLISODateTime)
  updated!: Date;
}
