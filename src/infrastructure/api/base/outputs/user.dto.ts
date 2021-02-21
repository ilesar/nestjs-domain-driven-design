import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('User')
export class UserDto {
  @Field()
  userId: string;
  @Field()
  username: string;
}
