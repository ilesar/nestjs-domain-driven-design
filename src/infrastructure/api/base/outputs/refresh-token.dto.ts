import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('RefreshToken')
export class RefreshTokenDto {
  @Field()
  token: string;
}
