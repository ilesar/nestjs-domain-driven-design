import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('UserAccount')
export class UserAccountDto {
  @Field()
  id: number;
  @Field()
  username: string;
}
